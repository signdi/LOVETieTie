// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"未登录",
    uaseheadportrait: ""
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

//跳转到习惯提醒
HabitReminder(){
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
    const that =this
    wx.showModal({
      content: '是否退出登录',
      success: function (res) {
        if (res.confirm) { //这里是点击了确定以后
          console.log('用户点击确定')
          that.setData({
            username: "未登录",
            uaseheadportrait: ""
          })
        } else { //这里是点击了取消以后
          console.log('用户点击取消')
        }
      }
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

  }
})