// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerImages: [
      "../news/images/huawei.jpeg",
      "../news/images/5g.jpeg",
      "../news/images/ai.jpeg",
      "../news/images/timg.jpeg"
    ],
    inTheatersList: [],
    comingSoonList: [],
    top250List: [],
    searchList: [],
    showLoading: false,
    isSearching: false,
    isSearchEmpty: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    this.getInTheatersList()
    this.getComingSoonList()
    this.getTop250List()
  },
  getInTheatersList: function() {
    var _this = this;
    wx.request({
      url: 'http://t.yushu.im/v2/movie/in_theaters?count=5',
      // data:{  更改数据数量的另一种方法
      //   count:5

      // },
      success: function(data) {
        // console.log(data)
        _this.setData({
          inTheaterList: data.data.subjects
        })
        // console.log(_this.data.inTheaterList);
      },
      fail: function(data) {
        wx.showToast({
          title: '网络请求失败',
        })
      }
    })
  },
  getComingSoonList: function() {
    var _this = this;
    wx.request({
      url: 'http://t.yushu.im/v2/movie/coming_soon?',
      data: { //更改数据数量的另一种方法
        count: 3

      },
      success: function(data) {
        // console.log(data)
        _this.setData({
          comingSoonList: data.data.subjects
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
  openMore: function(event) {
    wx.navigateTo({
      url: '/pages/movie/movie-more',
    })
  },
  getTop250List: function() {
    var _this = this;
    var start = _this.data.comingSoonList.length;
    wx.request({
      url: 'http://t.yushu.im/v2/movie/top250',
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
          top250List: tempList,
          showLoading: false
        })
      },
      fail: function(data) {
        wx.showToast({
          title: '网络请求失败',
        })
      }
    })
  },
  // 页面相关事件处理函数--监听用户下拉动作
  onReachBottom: function(event) {
    this.setData({
      showLoading: true
    })
    this.getTop250List()
  },
  onImageError: function(event) {
    // debugger
    // console.log("error")
    var index = event.currentTarget.dataset.index;
    var top250List = this.data.top250List;
    var movieItem = top250List[index];
    movieItem.images.large = "../news/images/error_img.jpg";
    top250List[index] = movieItem;

    this.setData({
      top250List: top250List
    })
    // console.log(index)
  },
  onSearch: function(event) {
    if (event.detail.value) {
      this.getSearchList(event.detail.value);
    }else{
      this.setData({
        isSearching:false
      })
    }
    // console.log(event.detail.value)
  },
  getSearchList: function(queryValue) {
    var _this = this;
    var isSearchEmpty = false;
    var start = _this.data.comingSoonList.length;
    wx.request({
      url: 'http://t.yushu.im/v2/movie/search',
      data: { //更改数据数量的另一种方法
        q: queryValue
      },
      success: function(data) {
        var searchList = data.data.subjects;
        if (searchList.length == 0) {
          isSearchEmpty = true;
        } else {
          isSearchEmpty = false;
        }
        // console.log(data)
        _this.setData({
          searchList: data.data.subjects,
          isSearching: true,
          isSearchEmpty: isSearchEmpty
        })
      },
      fail: function(data) {
        wx.showToast({
          title: '网络请求失败',
        })
      }
    })
  },
})