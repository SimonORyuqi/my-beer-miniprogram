// pages/index/index.js
const mockData = require('../../utils/mockData.js')

Page({
  data: {
    userInfo: null,
    storeInfo: mockData.storeInfo,
    storeCollapsed: true,
    showLoginModal: false,
    tempNickname: '点击获取昵称',
    tempAvatar: '/images/avatar.png',
    isRegistered: false
  },

  onLoad() {
    this.checkUserLogin()
  },

  onShow() {
    this.checkUserLogin()
  },

  // 检查用户登录状态
  checkUserLogin() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo && userInfo.nickname && userInfo.nickname !== '点击获取昵称') {
      this.setData({
        userInfo: userInfo,
        showLoginModal: false,
        isRegistered: true
      })
    } else {
      this.setData({
        showLoginModal: true,
        isRegistered: false
      })
    }
  },

  // 选择头像
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({
      tempAvatar: avatarUrl
    })
  },

  // 昵称输入
  onNicknameInput(e) {
    const nickname = e.detail.value
    if (nickname && nickname.trim()) {
      this.setData({
        tempNickname: nickname
      })
    }
  },

  // 昵称失焦时保存
  onNicknameBlur(e) {
    const nickname = e.detail.value
    if (nickname && nickname.trim()) {
      this.setData({
        tempNickname: nickname
      })
    } else {
      this.setData({
        tempNickname: '点击获取昵称'
      })
    }
  },

  // 确认注册
  confirmRegister() {
    const nickname = this.data.tempNickname
    if (nickname === '点击获取昵称' || !nickname.trim()) {
      wx.showToast({
        title: '请先获取昵称',
        icon: 'none'
      })
      return
    }

    // 保存用户信息
    const userInfo = {
      ...mockData.userInfo,
      nickname: nickname,
      avatar: this.data.tempAvatar
    }

    wx.setStorageSync('userInfo', userInfo)
    
    this.setData({
      userInfo: userInfo,
      showLoginModal: false,
      isRegistered: true
    })

    wx.showToast({
      title: '注册成功',
      icon: 'success'
    })
  },

  // 取消注册
  cancelRegister() {
    wx.showModal({
      title: '提示',
      content: '取消注册后将无法使用点单等服务，确认取消吗？',
      confirmText: '确认取消',
      cancelText: '返回',
      success: (res) => {
        if (res.confirm) {
          // 清除用户数据
          wx.removeStorageSync('userInfo')
          this.setData({
            showLoginModal: false,
            isRegistered: false
          })
          wx.showToast({
            title: '已取消注册',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  // 切换门店折叠状态
  toggleStoreCollapse() {
    this.setData({
      storeCollapsed: !this.data.storeCollapsed
    })
  },

  // 跳转到点单页面
  goToOrder() {
    if (!this.data.isRegistered) {
      wx.showToast({
        title: '请先完成注册',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/product/list/list'
    })
  },

  // 跳转到积分商城
  goToPoints() {
    if (!this.data.isRegistered) {
      wx.showToast({
        title: '请先完成注册',
        icon: 'none'
      })
      return
    }
    wx.showToast({
      title: '积分商城即将上线',
      icon: 'none'
    })
  },

  // 跳转到会员充值
  goToVip() {
    if (!this.data.isRegistered) {
      wx.showToast({
        title: '请先完成注册',
        icon: 'none'
      })
      return
    }
    wx.showToast({
      title: '会员系统即将上线',
      icon: 'none'
    })
  },

  // 跳转到订单中心
  goToOrders() {
    if (!this.data.isRegistered) {
      wx.showToast({
        title: '请先完成注册',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/order/list/list'
    })
  }
})
