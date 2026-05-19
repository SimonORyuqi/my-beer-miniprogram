// pages/points/mall/mall.js
const mockData = require('../../../utils/mockData.js')

Page({
  data: {
    userPoints: 0,
    products: []
  },

  onLoad() {
    this.loadUserPoints()
    this.loadProducts()
  },

  onShow() {
    this.loadUserPoints()
    this.loadProducts()
  },

  // 加载用户积分
  loadUserPoints() {
    const userInfo = wx.getStorageSync('userInfo') || mockData.userInfo
    this.setData({
      userPoints: userInfo.points || 0
    })
  },

  // 加载兑换商品列表
  loadProducts() {
    // 从本地存储获取商品列表，如果没有则使用mock数据
    const products = wx.getStorageSync('pointsProducts') || mockData.pointsProducts || []
    this.setData({
      products: products
    })
  },

  // 跳转到积分明细页面
  goToDetail() {
    wx.navigateTo({
      url: '/pages/points/detail/detail'
    })
  },

  // 查看商品详情
  viewProductDetail(e) {
    const productId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/points/mall_detail/mall_detail?id=${productId}`
    })
  },

  // 兑换商品
  exchangeProduct(e) {
    const productId = e.currentTarget.dataset.id
    const product = this.data.products.find(item => item.id === productId)
    
    if (!product) {
      wx.showToast({
        title: '商品不存在',
        icon: 'none'
      })
      return
    }

    // 检查积分是否足够
    if (this.data.userPoints < product.pointsCost) {
      wx.showToast({
        title: '积分不足',
        icon: 'none'
      })
      return
    }

    // 确认兑换
    wx.showModal({
      title: '确认兑换',
      content: `确定使用${product.pointsCost}积分兑换"${product.name}"吗？`,
      confirmText: '确认兑换',
      confirmColor: '#D4A017',
      success: (res) => {
        if (res.confirm) {
          this.doExchange(product)
        }
      }
    })
  },

  // 执行兑换
  doExchange(product) {
    // 扣除积分
    const userInfo = wx.getStorageSync('userInfo') || mockData.userInfo
    userInfo.points = (userInfo.points || 0) - product.pointsCost
    wx.setStorageSync('userInfo', userInfo)

    // 添加积分明细记录
    const pointsRecords = wx.getStorageSync('pointsRecords') || []
    pointsRecords.unshift({
      id: 'pr_' + Date.now(),
      type: 'spend',
      amount: product.pointsCost,
      description: `兑换${product.name}`,
      createTime: this.formatTime(new Date())
    })
    wx.setStorageSync('pointsRecords', pointsRecords)

    // 更新页面数据
    this.setData({
      userPoints: userInfo.points
    })

    wx.showToast({
      title: '兑换成功',
      icon: 'success'
    })
  },

  // 格式化时间
  formatTime(date) {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    const second = date.getSeconds().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }
})
