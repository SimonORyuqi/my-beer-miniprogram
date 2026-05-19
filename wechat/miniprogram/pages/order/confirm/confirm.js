// pages/order/confirm/confirm.js
const mockData = require('../../../utils/mockData.js')

Page({
  data: {
    cartList: [],
    totalPrice: 0,
    finalPrice: 0,
    pickupMethod: 'self', // self: 到店自取, delivery: 外卖配送
    paymentMethod: 'wechat', // wechat: 微信支付, balance: 会员余额支付
    userBalance: '0.00',
    storeInfo: mockData.storeInfo,
    remark: '',
    ageVerified: false,
    showAgeModal: false
  },

  onLoad() {
    this.loadCart()
    this.loadUserBalance()
    this.showAgeVerification()
  },

  // 加载购物车
  loadCart() {
    const cartList = wx.getStorageSync('cartList') || []
    let totalPrice = 0
    cartList.forEach(item => {
      totalPrice += item.price * item.quantity
    })
    
    this.setData({
      cartList,
      totalPrice,
      finalPrice: totalPrice.toFixed(2)
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
    if (method === 'delivery') {
      wx.showToast({
        title: '尚未开启该功能，敬请期待',
        icon: 'none'
      })
      return
    }
    this.setData({ pickupMethod: method })
  },

  // 输入备注
  inputRemark(e) {
    this.setData({ remark: e.detail.value })
  },

  // 加载用户余额
  loadUserBalance() {
    // 模拟从后端获取用户余额
    const userInfo = wx.getStorageSync('userInfo') || {}
    this.setData({
      userBalance: userInfo.balance || '128.00' // 模拟余额
    })
  },

  // 切换支付方式
  switchPaymentMethod(e) {
    const method = e.currentTarget.dataset.method
    this.setData({ paymentMethod: method })
  },

  // 提交订单
  submitOrder() {
    if (!this.data.ageVerified) {
      this.showAgeVerification()
      return
    }

    // 生成订单ID（确保消费记录和订单使用同一个ID）
    const orderId = 'ORD' + Date.now()
    const totalAmount = parseFloat(this.data.finalPrice)

    // 如果使用会员余额支付，检查余额是否充足并扣除
    if (this.data.paymentMethod === 'balance') {
      const balance = parseFloat(this.data.userBalance)
      
      if (balance < totalAmount) {
        wx.showToast({
          title: '余额不足，请选择其他支付方式',
          icon: 'none'
        })
        return
      }

      // 扣除会员余额
      const newBalance = (balance - totalAmount).toFixed(2)
      this.setData({ userBalance: newBalance })
      
      // 更新用户信息中的余额
      let userInfo = wx.getStorageSync('userInfo') || {}
      userInfo.balance = newBalance
      wx.setStorageSync('userInfo', userInfo)

      // 添加消费记录
      this.addConsumeRecord(totalAmount, orderId)

      // 创建订单并跳转
      this.createOrder(orderId, 'paid', '待接单')

    } else {
      // 微信支付 - 先创建订单（待支付状态），支付成功后更新状态
      this.createOrder(orderId, 'pending', '待付款')
      
      // 显示模拟支付弹窗
      wx.showModal({
        title: '模拟支付',
        content: `确认支付 ¥${this.data.finalPrice} 吗？`,
        success: (res) => {
          if (res.confirm) {
            // 支付成功，更新订单状态
            this.updateOrderStatus(orderId, 'paid', '待接单')
            
            wx.showToast({
              title: '支付成功',
              icon: 'success'
            })
          } else {
            wx.showToast({
              title: '支付取消',
              icon: 'none'
            })
          }
          
          // 无论支付成功还是取消，都跳转到订单中心
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/order/list/list'
            })
          }, 1500)
        }
      })
      return
    }
  },

  // 创建订单
  createOrder(orderId, status, statusText) {
    const order = {
      id: orderId,
      status: status,
      statusText: statusText,
      createTime: new Date().toLocaleString(),
      totalPrice: this.data.finalPrice,
      paymentMethod: this.data.paymentMethod === 'balance' ? '会员余额支付' : '微信支付',
      items: this.data.cartList,
      pickupMethod: this.data.pickupMethod === 'self' ? '堂食' : '外卖配送',
      pickupTime: '立即制作',
      remark: this.data.remark
    }

    // 保存订单到本地存储
    let orders = wx.getStorageSync('orders') || []
    orders.unshift(order)
    wx.setStorageSync('orders', orders)

    // 清空购物车
    wx.removeStorageSync('cartList')

    // 会员余额支付时，直接跳转
    if (this.data.paymentMethod === 'balance') {
      wx.showToast({
        title: '支付成功',
        icon: 'success'
      })
      
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/order/list/list'
        })
      }, 1500)
    }
  },

  // 更新订单状态
  updateOrderStatus(orderId, status, statusText) {
    let orders = wx.getStorageSync('orders') || []
    const orderIndex = orders.findIndex(order => order.id === orderId)
    
    if (orderIndex !== -1) {
      orders[orderIndex].status = status
      orders[orderIndex].statusText = statusText
      wx.setStorageSync('orders', orders)
    }
  },

  // 添加消费记录
  addConsumeRecord(amount, orderNo) {
    const record = {
      id: 'REC' + Date.now(),
      amount: amount.toFixed(2),
      orderNo: orderNo,
      time: this.formatTime(new Date()),
      createTime: new Date().toISOString()
    }

    let consumeRecords = wx.getStorageSync('consumeRecords') || []
    consumeRecords.unshift(record)
    wx.setStorageSync('consumeRecords', consumeRecords)
  },

  // 格式化时间
  formatTime(date) {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}`
  }
})
