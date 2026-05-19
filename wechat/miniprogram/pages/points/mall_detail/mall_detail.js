// pages/points/mall_detail/mall_detail.js
const mockData = require('../../../utils/mockData.js')

Page({
  data: {
    product: null,
    userPoints: 0
  },

  onLoad(options) {
    const productId = options.id
    this.loadProduct(productId)
    this.loadUserPoints()
  },

  onShow() {
    this.loadUserPoints()
  },

  // 加载商品详情
  loadProduct(productId) {
    const products = wx.getStorageSync('pointsProducts') || mockData.pointsProducts || []
    const product = products.find(item => item.id === productId)
    
    if (product) {
      this.setData({ product })
    } else {
      wx.showToast({
        title: '商品不存在',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  },

  // 加载用户积分
  loadUserPoints() {
    const userInfo = wx.getStorageSync('userInfo') || mockData.userInfo
    this.setData({
      userPoints: userInfo.points || 0
    })
  },

  // 执行兑换
  doExchange() {
    const { product, userPoints } = this.data

    if (userPoints < product.pointsCost) {
      wx.showToast({
        title: '积分不足',
        icon: 'none'
      })
      return
    }

    wx.showModal({
      title: '确认兑换',
      content: `确定使用${product.pointsCost}积分兑换"${product.name}"吗？`,
      confirmText: '确认兑换',
      confirmColor: '#D4A017',
      success: (res) => {
        if (res.confirm) {
          this.exchangeSuccess()
        }
      }
    })
  },

  // 兑换成功
  exchangeSuccess() {
    const { product } = this.data
    const userInfo = wx.getStorageSync('userInfo') || mockData.userInfo
    
    // 扣除积分
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
<<<<<<< HEAD
})
=======
})
>>>>>>> 17d4582 (feat: 确认订单页面功能完善)
