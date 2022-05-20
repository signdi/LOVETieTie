// pages/tie/tie.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageSrc: '', //拍摄照片地址
        videoSrc: '', //拍摄录像地址
        messgas:''//发送的消息
    },
    //表单改变事件
    handmge(e){
        this.setData({
            messgas:e.detail.value
          })
    },

    //返回上一页（主页）
    gotoPrevious() {
        this.setData({
            imageSrc: '',
            videoSrc: '',
        })
        wx.navigateBack({
            delta: 0,
        })
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

    //分享好友，照片发送给好友
    shareFriends() {
        console.log('发送照片給朋友');
    },

    //弹框
    showMyToast: function () {
        wx.showToast({
            title: "还未添加好友，微信分享添加",
            icon: "none",
            image: "",
            duration: 2000,
            mask: false,
        });
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
        this.setData({
            imageSrc: options.imageSrc,
            videoSrc: options.videoSrc,
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
    onShareAppMessage: function () {
        return {
            // title: '宝贝快来和我一起贴贴~',
            title:this.data.messgas?this.data.messgas: '宝贝快来和我一起贴贴~',
            path: '/pages/photo/photo?imageSrc=' + this.data.imageSrc + '&videoSrc=' + this.data.videoSrc+ '&messgas=' + this.data.messgas,
            // 设置转发的图片
            imageUrl:this.data.imageSrc?this.data.imageSrc:'https://img2.baidu.com/it/u=208654976,1738035950&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
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