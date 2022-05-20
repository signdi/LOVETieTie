// pages/photo/photo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageSrc: '', //拍摄照片地址
        videoSrc: '', //拍摄录像地址
        messgas: '宝贝' //发送的消息
    },

    //保存图片或视频到本地
    saveToPhone() {
        wx.saveVideoToPhotosAlbum({
            filePath: this.data.videoSrc,
            success: function () {
                wx.showToast({
                    title: '保存成功'
                })
            }
        })
        wx.saveImageToPhotosAlbum({ //saveImageToPhotosAlbum 保存图片到系统相册
            filePath: this.data.imageSrc,
            success: function () {
                wx.showToast({
                    title: '保存成功'
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            imageSrc: options.imageSrc,
            videoSrc: options.videoSrc,
            messgas:options.messgas
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})