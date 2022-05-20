// pages/tietie/tietie.js
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        username: '未登录', //用户姓名
        uaseheadportrait: '../../images/login.png', //用户头像
        deviceupordown: "front", //摄像头方向
        imageSrc: '', //拍摄照片地址
        videoSrc: '', //拍摄录像地址
        backgroundMusic: true //是否开启背景音乐 默认值
    },
    //播放背景音乐
    backmusic() {
        console.log('进行播放音乐');
        console.log('此时的播放状态为：' + this.data.backgroundMusic)
        if (this.data.backgroundMusic == true) {
            wx.getBackgroundAudioManager().title = "贴贴 "; // 必须要有一个title，音乐名字
            wx.getBackgroundAudioManager().src = "cloud://wangdi-users-1g3wyjfy571b1140.7761-wangdi-users-1g3wyjfy571b1140-1311648867/mp3/C400004AsmiX0aYdYs.m4a";
            wx.getBackgroundAudioManager().onEnded(() => {
                backmusic(); // 音乐循环播放
            })
        }
    },
    //获取用户信息
    getuserinfoss() {
        let that = this
        if (app.globalData.userstate === false) {
            wx.getUserProfile({
                desc: '用于完善个人信息',
                success(res) {
                    app.globalData.username = res.userInfo.nickName;
                    app.globalData.uaseheadportrait = res.userInfo.avatarUrl;
                    app.globalData.userstate = true;
                    app.globalData.backgroundMusic = true
                    that.setData({
                        username: app.globalData.username,
                        uaseheadportrait: app.globalData.uaseheadportrait
                    });
                    //向数据库添加数据   首先获取openid 在根据openid查询数据库是否有记录 如果没有则添加记录 
                    wx.cloud.database().collection('login_users').where({
                        _openid: app.globalData.openid
                    }).get({
                        success(res) {
                            if (res.data.length == 0) {
                                wx.cloud.database().collection('login_users').add({
                                    data: {
                                        nickName: app.globalData.username,
                                        avatarUrl: app.globalData.uaseheadportrait,
                                        backgroundMusic: true
                                    },
                                })
                            }
                        }
                    })

                    wx.showToast({
                        title: '登录成功',
                    })
                }
            })
        }
    },

    //touch start 手指触摸开始
    handleTouchStart: function (e) {
        console.log("触发开始点击");
        this.startTime = e.timeStamp;
    },

    //touch end 手指触摸结束
    handleTouchEnd: function (e) {
        console.log("触发结束点击");
        this.endTime = e.timeStamp;
        //判断是点击还是长按 点击不做任何事件，长按 触发结束录像
        if (this.endTime - this.startTime > 350) {
            //长按操作 调用结束录像方法
            this.stopShootVideo();
        }
    },
    //点击按钮 - 拍照
    handleClick: function (e) {
        console.log("触发普通点击，并判断点击时间，小于350触发拍照");
        if (this.endTime - this.startTime < 350) {
            this.takePhoto(); //调用拍照方法
        }
    },

    //长按按钮 - 录像
    handleLongPress: function (e) {
        console.log("触发长按点击");
        // 长按方法触发，调用开始录像方法
        // this.startShootVideo();
    },
    //拍照 
    takePhoto() {
        wx.createCameraContext().takePhoto({
            quality: 'high',
            success: (res) => {
                this.setData({
                    imageSrc: res.tempImagePath
                })
                this.album() //跳转到相册页
            }
        })
    },
    //开始录像
    startShootVideo() {
        console.log("开始录像");
        setTimeout(() => {
            wx.createCameraContext().startRecord({
                success: (res) => {
                    wx.showLoading({
                        title: '正在录像',
                    })
                }
            })
        }, 10)

    },
    //结束录像
    stopShootVideo() {
        console.log("结束录像");
        setTimeout(() => {
            console.log("触发结束定时器");
            wx.createCameraContext().stopRecord({
                success: (res) => {
                    console.log("完成结束录像1");
                    wx.hideLoading();
                    this.setData({
                        videoSrc: res.tempVideoPath,
                    })
                    console.log("完成结束录像后");
                    this.album() //跳转到相册页
                }
            })
        }, 100);

    },

    //切换摄像头
    device() {
        if (this.data.deviceupordown === "front") {
            this.setData({
                deviceupordown: "back"
            })
        } else {
            this.setData({
                deviceupordown: "front"
            })
        }

    },

    //跳转到相册页
    album() {
        wx.navigateTo({
            url: '/pages/tie/tie?imageSrc=' + this.data.imageSrc + '&videoSrc=' + this.data.videoSrc
        })
    },
    //跳转到添加好友页
    share() {
        wx.navigateTo({
            url: '/pages/Friends/Friends'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.ctx = wx.createCameraContext()

        //先判断openid是否获取，如果没有那么执行回调函数（一般为没有获取）  如果获取了则直接赋值
        if (app.globalData.openid == null) {
            console.log('openid没有获取，执行了回调函数');
            app.loginCallback = (data) => {
                console.log("回调函数执行成功，将数据库的值赋值给当前页面，实现自动登录");
                this.setData({
                    username: data[0].nickName,
                    uaseheadportrait: data[0].avatarUrl,
                    backgroundMusic: data[0].backgroundMusic
                })
                //背景音乐播放
                this.backmusic();
            }
        } else {
            console.log('openid获取了，直接赋值');
            this.setData({
                username: app.globalData.username,
                uaseheadportrait: app.globalData.uaseheadportrait,
                backgroundMusic: app.globalData.backgroundMusic,
            })
        }

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.setData({
            username: app.globalData.username,
            uaseheadportrait: app.globalData.uaseheadportrait,
            imageSrc: '',
            videoSrc: '',
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '宝贝快来和我一起贴贴~',
            path: '/pages/tietie/tietie',
            // 设置转发的图片
            imageUrl: 'https://img2.baidu.com/it/u=208654976,1738035950&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
        }
    },
    //分享到朋友圈
    onShareTimeline() {
        return {
            title: '宝贝快来和我一起贴贴~',
            path: '/pages/tietie/tietie',
            // 设置转发的图片
            imageUrl: 'cloud://wangdi-users-1g3wyjfy571b1140.7761-wangdi-users-1g3wyjfy571b1140-1311648867/images/logo.jpg',
        }
    }
})