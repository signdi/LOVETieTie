// pages/message/message.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shijan: null
    },

    //跳转到新的朋友页面
    newFriends(){
        wx.navigateTo({
            url: '/pages/newFriends/newFriends'
        })
    },
    customerService(){
        wx.navigateTo({
            url: '/pages/customerService/customerService'
        })
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