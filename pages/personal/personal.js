// pages/personal/personal.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: "未登录",
        uaseheadportrait: ""
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
                    app.globalData.userstate = true
                    that.setData({
                        username: app.globalData.username,
                        uaseheadportrait: app.globalData.uaseheadportrait
                    });
                    //向数据库添加数据  在根据openid查询数据库是否有记录 如果没有则添加记录 
                    wx.cloud.database().collection('login_users').where({
                        _openid: app.globalData.openid
                    }).get({
                        success(res) {
                            if (res.data.length == 0) {
                                wx.cloud.database().collection('login_users').add({
                                    data: {
                                        nickName: app.globalData.username,
                                        avatarUrl: app.globalData.uaseheadportrait
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


    //跳转到能量罐
    energyTank(){
        wx.navigateTo({
            url: '/pages/energytank/energytank'
        })
    },

    //跳转到习惯提醒
    HabitReminder() {
        wx.navigateTo({
            url: '/pages/reminder/reminder'
        })
    },

    //跳转到短信开通记录
    gotuSMSopen() {
        wx.navigateTo({
            url: '/pages/SMSopen/SMSopen'
        })
    },

    //跳转到关于页
    gotoAboutus() {
        wx.navigateTo({
            url: '/pages/Aboutus/Aboutus'
        })
    },

    //退出登录
    signout() {
        if (app.globalData.userstate === true) {
            const that = this
            wx.showModal({
                content: '是否退出登录',
                success: function (res) {
                    if (res.confirm) {
                        app.globalData.username = "未登录";
                        app.globalData.uaseheadportrait = "../../images/login.png";
                        app.globalData.userstate = false;
                        that.setData({
                            username: app.globalData.username,
                            uaseheadportrait: app.globalData.uaseheadportrait
                        })
                        //删除数据库表  先查询到数据库的这条数据，在根据_id删除这条数据
                        wx.cloud.database().collection('login_users').where({
                            _openid: app.globalData.openid
                        }).get({
                            success(result) {
                                console.log(result.data[0]._id)
                                wx.cloud.database().collection('login_users').doc(result.data[0]._id).remove()
                            }
                        })
                    } else { //这里是点击了取消以后
                        console.log('用户点击取消')
                    }
                }
            })
        }
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
            uaseheadportrait: app.globalData.uaseheadportrait
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
    onShareTimeline(){
        return {
            title: '宝贝快来和我一起贴贴~',
            path: '/pages/tietie/tietie',
            // 设置转发的图片
            imageUrl: 'cloud://wangdi-users-1g3wyjfy571b1140.7761-wangdi-users-1g3wyjfy571b1140-1311648867/images/logo.jpg',
        }
    }
})