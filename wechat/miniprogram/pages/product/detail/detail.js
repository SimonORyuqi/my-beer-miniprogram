// pages/product/detail/detail.js
const mockData = require('../../../utils/mockData.js')

Page({
  data: {
    product: null,
    quantity: 1,
    cartList: []
  },

  onLoad(options) {
    const id = options.id
    const product = mockData.products.find(item => item.id === id)
    if (product) {
      this.setData({ product })
    }
  },

  // 增加数量
  addQuantity() {
    const maxQty = this.data.product.stock
    if (this.data.quantity < maxQty) {
      this.setData({ quantity: this.data.quantity + 1 })
    } else {
      wx.showToast({
        title: `库存不足，最多${maxQty}瓶`,
        icon: 'none'
      })
    }
  },

  // 减少数量
  reduceQuantity() {
    if (this.data.quantity > 1) {
      this.setData({ quantity: this.data.quantity - 1 })
    }
  },

  // 加入购物车
  addToCart() {
    const { product, quantity } = this.data
    let cartList = wx.getStorageSync('cartList') || []
    const existIndex = cartList.findIndex(item => item.id === product.id)
    
    if (existIndex > -1) {
      const newQty = cartList[existIndex].quantity + quantity
      if (newQty <= product.stock) {
        cartList[existIndex].quantity = newQty
      } else {
        wx.showToast({
          title: `库存不足，最多${product.stock}瓶`,
          icon: 'none'
        })
        return
      }
    } else {
      cartList.push({
        ...product,
        quantity: quantity
      })
    }
    
    wx.setStorageSync('cartList', cartList)
    
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    })
    
    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  },

  // 立即购买
  buyNow() {
    const { product, quantity } = this.data
    
    // 清空购物车并添加当前商品
    wx.setStorageSync('cartList', [{
      ...product,
      quantity: quantity
    }])
    
    wx.navigateTo({
      url: '/pages/order/confirm/confirm'
    })
  },

  // 返回
  goBack() {
    wx.navigateBack()
  }
})
