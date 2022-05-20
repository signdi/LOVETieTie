// pages/reminder/reminder.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        backgroundMusic:true
    },

    //背景音乐的开关
    handleChangeSwitch(event) {
        console.log(event.detail);

        if (event.detail.value == true) { //如果开关状态是 开启 那么 1.将数据写入数据库为true  2.调用背景音乐开启
            console.log("开启");
            //修改数据库表  先查询到数据库的这条数据 在根据result里的_id修改这条数据
            wx.cloud.database().collection('login_users').where({
                _openid: app.globalData.openid
            }).get({
                success(result) {
                    console.log(result);
                    wx.cloud.database().collection('login_users').doc(result.data[0]._id).update({
                        data: {
                            backgroundMusic: true
                          }
                    })
                }
            })
        } else { //如果开关状态是 关闭 那么 1.将数据写入数据库为fales  2.调用背景音乐关闭
            console.log("关闭");
            //修改数据库表  先查询到数据库的这条数据 在根据result里的_id修改这条数据
            wx.cloud.database().collection('login_users').where({
                _openid: app.globalData.openid
            }).get({
                success(result) {
                    console.log(result);
                    wx.cloud.database().collection('login_users').doc(result.data[0]._id).update({
                        data: {
                            backgroundMusic: false
                          }
                    })
                }
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            backgroundMusic: app.globalData.backgroundMusic
        })
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