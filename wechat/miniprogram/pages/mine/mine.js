// pages/mine/mine.js
const mockData = require('../../utils/mockData.js')

Page({
  data: {
    userInfo: mockData.userInfo,
    vipLevels: mockData.vipLevels,
    currentVip: null
  },

  onLoad() {
    this.checkUserLogin()
  },

  onShow() {
    // 每次显示页面时检查登录状态
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      this.checkUserLogin()
    } else {
      this.loadUserInfo()
    }
  },

  // 检查用户是否已注册/登录
  checkUserLogin() {
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      // 未注册，切换到首页并显示首页的注册界面
      const app = getApp()
      app.globalData.needShowLoginModal = true
      wx.switchTab({
        url: '/pages/index/index'
      })
    } else {
      // 已注册，加载用户信息
      this.loadUserInfo()
    }
  },

  // 加载用户信息
  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || mockData.userInfo
    const vipLevels = mockData.vipLevels
    const currentVip = vipLevels.find(level => level.id === userInfo.vipLevel) || vipLevels[0]
    
    this.setData({
      userInfo,
      vipLevels,
      currentVip
    })
  },

  // 跳转到订单列表
  goToOrders(e) {
    const status = e.currentTarget.dataset.status || 'all'
    wx.switchTab({
      url: '/pages/order/list/list'
    })
  },


  // 联系客服
  contactService() {
    wx.showToast({
      title: '客服功能开发中',
      icon: 'none'
    })
  },

  // 设置
  goToSettings() {
    wx.showToast({
      title: '设置功能开发中',
      icon: 'none'
    })
  }
})
