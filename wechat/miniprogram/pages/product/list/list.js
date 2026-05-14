// pages/product/list/list.js
const mockData = require('../../../utils/mockData.js')

Page({
  data: {
    categories: mockData.categories,
    currentCategory: 'all',
    products: [],
    cartList: [],
    showCart: false,
    totalPrice: 0,
    totalCount: 0,
    showSpecModal: false,
    selectedProduct: null,
    selectedSpecIndex: 0,
    selectedSpecPrice: 0
  },

  onLoad() {
    this.loadProducts()
    this.loadCart()
  },

  // 加载商品
  loadProducts(category = 'all') {
    let products = mockData.products
    if (category !== 'all') {
      products = products.filter(item => item.style === category)
    }
    // 计算每个商品的购物车数量
    const cartList = wx.getStorageSync('cartList') || []
    products = products.map(product => {
      const cartQuantity = cartList
        .filter(item => item.id === product.id)
        .reduce((sum, item) => sum + item.quantity, 0)
      return { ...product, cartQuantity }
    })
    this.setData({ products })
  },

  // 加载购物车
  loadCart() {
    const cartList = wx.getStorageSync('cartList') || []
    this.updateCartInfo(cartList)
  },

  // 切换分类
  switchCategory(e) {
    const category = e.currentTarget.dataset.id
    this.setData({ currentCategory: category })
    this.loadProducts(category)
  },

  // 选择商品
  selectProduct(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/product/detail/detail?id=${id}`
    })
  },

  // 加入购物车 - 打开规格弹窗
  addToCart(e) {
    const id = e.currentTarget.dataset.id
    const product = mockData.products.find(item => item.id === id)
    
    this.setData({
      showSpecModal: true,
      selectedProduct: product,
      selectedSpecIndex: 0,
      selectedSpecPrice: product.specs[0].price
    })
  },

  // 选择规格
  selectSpec(e) {
    const index = e.currentTarget.dataset.index
    const spec = this.data.selectedProduct.specs[index]
    this.setData({
      selectedSpecIndex: index,
      selectedSpecPrice: spec.price
    })
  },

  // 关闭规格弹窗
  closeSpecModal() {
    this.setData({
      showSpecModal: false
    })
  },

  // 阻止事件冒泡
  stopPropagation() {},

  // 确认加入购物车
  confirmAddToCart() {
    const { selectedProduct, selectedSpecIndex } = this.data
    const spec = selectedProduct.specs[selectedSpecIndex]
    
    let cartList = wx.getStorageSync('cartList') || []
    // 使用 id + specName 作为唯一标识
    const cartKey = `${selectedProduct.id}_${spec.name}`
    const existIndex = cartList.findIndex(item => item.cartKey === cartKey)
    
    if (existIndex > -1) {
      cartList[existIndex].quantity++
    } else {
      cartList.push({
        cartKey: cartKey,
        id: selectedProduct.id,
        name: selectedProduct.name,
        styleName: selectedProduct.styleName,
        image: selectedProduct.image,
        abv: selectedProduct.abv,
        volume: spec.name,
        price: spec.price,
        quantity: 1
      })
    }
    
    wx.setStorageSync('cartList', cartList)
    this.updateCartInfo(cartList)
    this.closeSpecModal()
    this.loadProducts(this.data.currentCategory)
    
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1500
    })
  },

  // 更新购物车信息
  updateCartInfo(cartList) {
    let totalPrice = 0
    let totalCount = 0
    cartList.forEach(item => {
      totalPrice += item.price * item.quantity
      totalCount += item.quantity
    })
    this.setData({
      cartList,
      totalPrice,
      totalCount
    })
  },

  // 显示/隐藏购物车
  toggleCart() {
    this.setData({
      showCart: !this.data.showCart
    })
  },

  // 增加数量
  addQuantity(e) {
    const cartKey = e.currentTarget.dataset.cartkey
    let cartList = wx.getStorageSync('cartList') || []
    const index = cartList.findIndex(item => item.cartKey === cartKey)
    if (index > -1) {
      cartList[index].quantity++
      wx.setStorageSync('cartList', cartList)
      this.updateCartInfo(cartList)
      this.loadProducts(this.data.currentCategory)
    }
  },

  // 减少数量
  reduceQuantity(e) {
    const cartKey = e.currentTarget.dataset.cartkey
    let cartList = wx.getStorageSync('cartList') || []
    const index = cartList.findIndex(item => item.cartKey === cartKey)
    if (index > -1) {
      if (cartList[index].quantity > 1) {
        cartList[index].quantity--
      } else {
        cartList.splice(index, 1)
      }
      wx.setStorageSync('cartList', cartList)
      this.updateCartInfo(cartList)
      this.loadProducts(this.data.currentCategory)
    }
  },

  // 从商品卡片减少数量
  reduceFromCard(e) {
    const productId = e.currentTarget.dataset.id
    let cartList = wx.getStorageSync('cartList') || []
    // 找到该商品在购物车中的所有项
    const productCartItems = cartList.filter(item => item.id === productId)
    
    if (productCartItems.length === 0) return
    
    // 如果该商品只有一个规格在购物车中，直接减少
    if (productCartItems.length === 1) {
      const cartKey = productCartItems[0].cartKey
      const index = cartList.findIndex(item => item.cartKey === cartKey)
      if (cartList[index].quantity > 1) {
        cartList[index].quantity--
      } else {
        cartList.splice(index, 1)
      }
      wx.setStorageSync('cartList', cartList)
      this.updateCartInfo(cartList)
      this.loadProducts(this.data.currentCategory)
    } else {
      // 多规格，弹出购物车让用户操作
      this.toggleCart()
    }
  },

  // 清空购物车
  clearCart() {
    wx.removeStorageSync('cartList')
    this.setData({
      cartList: [],
      totalPrice: 0,
      totalCount: 0
    })
    this.loadProducts(this.data.currentCategory)
  },

  // 去结算
  goCheckout() {
    wx.navigateTo({
      url: '/pages/order/confirm/confirm'
    })
  }
})
