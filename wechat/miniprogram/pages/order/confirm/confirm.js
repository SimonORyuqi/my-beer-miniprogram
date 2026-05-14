// pages/order/confirm/confirm.js
const mockData = require('../../../utils/mockData.js')

Page({
  data: {
    cartList: [],
    totalPrice: 0,
    discount: 0,
    finalPrice: 0,
    pickupMethod: 'self', // self: 到店自取, delivery: 外卖配送
    storeInfo: mockData.storeInfo,
    remark: '',
    ageVerified: false,
    showAgeModal: false
  },

  onLoad() {
    this.loadCart()
    this.showAgeVerification()
  },

  // 加载购物车
  loadCart() {
    const cartList = wx.getStorageSync('cartList') || []
    let totalPrice = 0
    cartList.forEach(item => {
      totalPrice += item.price * item.quantity
    })
    
    // 会员折扣
    const userInfo = mockData.userInfo
    const vipLevels = mockData.vipLevels
    const vip = vipLevels.find(level => level.id === userInfo.vipLevel)
    const discount = vip ? (1 - vip.discount) * totalPrice : 0
    const finalPrice = totalPrice - discount
    
    this.setData({
      cartList,
      totalPrice,
      discount: discount.toFixed(2),
      finalPrice: finalPrice.toFixed(2)
    })
  },

  // 年龄验证弹窗
  showAgeVerification() {
    this.setData({ showAgeModal: true })
  },

  // 确认年龄
  confirmAge() {
    this.setData({
      ageVerified: true,
      showAgeModal: false
    })
  },

  // 切换取酒方式
  switchPickupMethod(e) {
    const method = e.currentTarget.dataset.method
    this.setData({ pickupMethod: method })
  },

  // 输入备注
  inputRemark(e) {
    this.setData({ remark: e.detail.value })
  },

  // 提交订单
  submitOrder() {
    if (!this.data.ageVerified) {
      this.showAgeVerification()
      return
    }

    const order = {
      id: 'ORD' + Date.now(),
      status: 'pending',
      statusText: '待付款',
      createTime: new Date().toLocaleString(),
      totalPrice: this.data.finalPrice,
      items: this.data.cartList,
      pickupMethod: this.data.pickupMethod === 'self' ? '到店自取' : '外卖配送',
      pickupTime: '立即制作',
      remark: this.data.remark
    }

    // 保存订单到本地存储
    let orders = wx.getStorageSync('orders') || []
    orders.unshift(order)
    wx.setStorageSync('orders', orders)

    // 清空购物车
    wx.removeStorageSync('cartList')

    // 显示支付成功弹窗（模拟）
    wx.showModal({
      title: '模拟支付',
      content: '支付成功！',
      showCancel: false,
      success: () => {
        // 更新订单状态为已支付
        const updatedOrders = wx.getStorageSync('orders') || []
        if (updatedOrders.length > 0) {
          updatedOrders[0].status = 'paid'
          updatedOrders[0].statusText = '待接单'
          wx.setStorageSync('orders', updatedOrders)
        }
        
        wx.showToast({
          title: '下单成功',
          icon: 'success'
        })
        
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/order/list/list'
          })
        }, 1500)
      }
    })
  }
})
