// pages/order/list/list.js
const mockData = require('../../../utils/mockData.js')

Page({
  data: {
    orders: [],
    currentTab: 'all',
    tabs: [
      { id: 'all', name: '全部' },
      { id: 'pending', name: '待付款' },
      { id: 'paid', name: '待取酒' },
      { id: 'completed', name: '已完成' },
      { id: 'cancelled', name: '已取消' }
    ]
  },

  onShow() {
    this.loadOrders()
  },

  onLoad() {
    this.loadOrders()
  },

  // 加载订单
  loadOrders() {
    // 合并本地订单和测试订单
    const localOrders = wx.getStorageSync('orders') || []
    const allOrders = [...localOrders, ...mockData.orders]
    
    // 去重
    const orderMap = new Map()
    allOrders.forEach(order => {
      if (!orderMap.has(order.id)) {
        orderMap.set(order.id, order)
      }
    })
    
    let orders = Array.from(orderMap.values())
    
    // 筛选
    if (this.data.currentTab !== 'all') {
      orders = orders.filter(order => order.status === this.data.currentTab)
    }
    
    // 按时间倒序
    orders.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
    
    this.setData({ orders })
  },

  // 切换Tab
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ currentTab: tab })
    this.loadOrders()
  },

  // 查看详情
  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.showToast({
      title: '订单详情开发中',
      icon: 'none'
    })
  },

  // 取消订单
  cancelOrder(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '提示',
      content: '确定要取消该订单吗？',
      success: (res) => {
        if (res.confirm) {
          let orders = wx.getStorageSync('orders') || []
          const index = orders.findIndex(order => order.id === id)
          if (index > -1) {
            orders[index].status = 'cancelled'
            orders[index].statusText = '已取消'
            wx.setStorageSync('orders', orders)
            this.loadOrders()
            wx.showToast({
              title: '订单已取消',
              icon: 'success'
            })
          }
        }
      }
    })
  },

  // 再次购买
  reOrder(e) {
    const order = this.data.orders.find(o => o.id === e.currentTarget.dataset.id)
    if (order && order.items) {
      // 将订单商品加入购物车
      const cartList = order.items.map(item => ({
        id: item.id || Date.now() + Math.random(),
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity
      }))
      wx.setStorageSync('cartList', cartList)
      wx.showToast({
        title: '已加入购物车',
        icon: 'success'
      })
      
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/product/list/list'
        })
      }, 1500)
    }
  },

  // 支付订单
  payOrder(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '模拟支付',
      content: '确认支付该订单？',
      success: (res) => {
        if (res.confirm) {
          let orders = wx.getStorageSync('orders') || []
          const index = orders.findIndex(order => order.id === id)
          if (index > -1) {
            orders[index].status = 'paid'
            orders[index].statusText = '待接单'
            wx.setStorageSync('orders', orders)
            this.loadOrders()
            wx.showToast({
              title: '支付成功',
              icon: 'success'
            })
          }
        }
      }
    })
  }
})
