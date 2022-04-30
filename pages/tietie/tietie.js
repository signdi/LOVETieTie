// pages/tietie/tietie.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        username: '未登录', //用户姓名
        uaseheadportrait: '../../images/login.png', //用户头像
        deviceupordown: "front", //摄像头方向
        touchStartTime: '', //触摸开始时间戳
        touchEndTime: '', //触摸结束时间戳
    },
    //自动播放背景音乐
    backmusic() {
        wx.getBackgroundAudioManager().title = "贴贴 "; // 必须要有一个title，音乐名字
        wx.getBackgroundAudioManager().src = "https://dl.stream.qqmusic.qq.com/C400004AsmiX0aYdYs.m4a?guid=7866742290&vkey=7DD1664770BC5459D94DFAAB434CD64583C73B7EBCFAA29C4A75144999B8852A51B77A7DC63867DBA2964B372D8C86CCB15D0235E326241C&uin=1330135152&fromtag=120002";
        wx.getBackgroundAudioManager().onEnded(() => {
            backmusic(); // 音乐循环播放
        })
    },
    //获取用户信息
    getuserinfoss() {
        let that = this
        wx.getUserProfile({
            desc: '用于完善个人信息',
            success(res) {
                console.log(res.userInfo);
                that.setData({
                    username: res.userInfo.nickName,
                    uaseheadportrait: res.userInfo.avatarUrl
                });
                wx.showToast({
                    title: '登录成功',
                })
            }
        })
    },

    //记录点击开始的时间点
    mytouchstart(e) {
        // console.log(e.timeStamp)
        this.setData({
            touchStartTime: e.timeStamp
        })
    },
    //记录点击结束的时间点。如果时间间隔大于2000毫秒，就触发新的事件
    mytouchend(e) {
        this.setData({
            touchEndTime: e.timeStamp
        })

        // if (e.timeStamp - this.data.touchStartTime > 1000) {
        //     console.log("触发长按事件") //调用视频

        // }
    },
    //打开相机
    takePhoto() {
        //跳转到另一个显示页面，并将照片或视频传递过去
        this.album();
        wx.createCameraContext().stopRecord();
        if (this.data.touchEndTime - this.data.touchStartTime < 350) {
            const ctx = wx.createCameraContext()
            ctx.takePhoto({
                quality: 'high',
                success: (res) => {
                    this.setData({
                        src: res.tempImagePath
                    })
                    wx.previewImage({
                        current: res.tempImagePath, // 当前显示图片的http链接
                        urls: [res.tempImagePath] // 需要预览的图片http链接列表
                    })
                }
            })
            ctx.setZoom({
                zoom: 10,
            })
        }

    },
    //打开摄像
    mylongtap() {
        console.log(789);
        const ctx = wx.createCameraContext()
        ctx.startRecord({
            selfieMirror: false,
        })
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
            url: '/pages/tie/tie'
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
        //背景音乐播放
        this.backmusic();
        this.getuserinfoss();
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

    },


})