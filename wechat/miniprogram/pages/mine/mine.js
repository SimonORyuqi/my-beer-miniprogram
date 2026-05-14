// pages/mine/mine.js
const mockData = require('../../utils/mockData.js')

Page({
  data: {
    userInfo: mockData.userInfo,
    vipLevels: mockData.vipLevels,
    currentVip: null,
    menuItems: [
      { id: 'favorites', icon: '❤️', name: '我的收藏', badge: '' },
      { id: 'address', icon: '📍', name: '收货地址', badge: '' },
      { id: 'coupon', icon: '🎫', name: '优惠券', badge: '2' },
      { id: 'points', icon: '💰', name: '积分明细', badge: '' }
    ],
    otherItems: [
      { id: 'help', icon: '❓', name: '帮助与反馈' },
      { id: 'about', icon: 'ℹ️', name: '关于我们' }
    ]
  },

  onLoad() {
    this.loadUserInfo()
  },

  onShow() {
    this.loadUserInfo()
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

  // 通用跳转
  goToPage(e) {
    const id = e.currentTarget.dataset.id
    const pages = {
      favorites: '/pages/mine/favorites/favorites',
      address: '/pages/mine/address/address',
      coupon: '/pages/mine/coupon/coupon',
      points: '/pages/mine/points/points',
      help: '/pages/mine/help/help',
      about: '/pages/mine/about/about'
    }
    
    if (pages[id]) {
      wx.showToast({
        title: '功能开发中',
        icon: 'none'
      })
    }
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
