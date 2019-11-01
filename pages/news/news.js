// pages/news.js
var data = require("../static/newsdata.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerImages: ["./images/huawei.jpeg", "./images/5g.jpeg", "./images/ai.jpeg", "./images/timg.jpeg"],
    newsList:data.newsData
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var app = getApp();
    this.setData({
      newsList: app.globalData.newsList
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onOpenNewsDetail: function(event) {
    // debugger;
    var index = event.currentTarget.dataset.index;
    console.log("index:"+index)
    wx.navigateTo({
      url: "./news-detail?index=" + index,
    })

  }
})