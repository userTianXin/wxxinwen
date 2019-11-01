// pages/movie/movie-more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comingSoonList: [],
    showLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    _this.getComingSoonList()
  },
  getComingSoonList: function() {
    var _this = this;
    var start = _this.data.comingSoonList.length;
    wx.request({
      url: 'http://t.yushu.im/v2/movie/coming_soon?',
      data: { //更改数据数量的另一种方法
        start: start,
        count: 9

      },
      success: function(data) {
        // console.log(data)
        var tempList = _this.data.comingSoonList;
        for (var i = 0; i < data.data.subjects.length; i++) {
          tempList.push(data.data.subjects[i])
        }
        _this.setData({
          comingSoonList: tempList,
          showLoading:false
        })
      },
      fail: function(data) {
        wx.showToast({
          title: '网络请求失败',
        })
      }
    })
  },
  onOpenDetail: function(event) {
    var movieId = event.currentTarget.dataset.movieId;
    // console.log(movieId);
    wx.navigateTo({
      url: '/pages/movie/movie-detail?movieId=' + movieId,
    })
  },
  // 页面相关事件处理函数--监听用户下拉动作
  onReachBottom: function(event) {
    this.setData({
      showLoading:true
    })
    this.getComingSoonList();
  },
})