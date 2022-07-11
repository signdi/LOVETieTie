// pages/Friends/Friends.js
let interstitialAd = null
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (wx.createInterstitialAd) {
            interstitialAd = wx.createInterstitialAd({
                adUnitId: 'adunit-804991140a092259'
            })
            interstitialAd.onLoad(() => {})
            interstitialAd.onError((err) => {})
            interstitialAd.onClose(() => {})
        }
        setTimeout(function () {
            if (interstitialAd) {
                interstitialAd.show().catch((err) => {
                    console.error(err)
                })
            }
        }, 1000)
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
    onShareTimeline() {
        return {
            title: '宝贝快来和我一起贴贴~',
            path: '/pages/tietie/tietie',
            // 设置转发的图片
            imageUrl: 'cloud://wangdi-users-1g3wyjfy571b1140.7761-wangdi-users-1g3wyjfy571b1140-1311648867/images/logo.jpg',
        }
    }
})