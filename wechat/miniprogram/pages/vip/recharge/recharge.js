// pages/vip/recharge/recharge.js

Page({
  data: {
    // 账户余额
    balance: 0,
    
    // 用户信息
    userInfo: {
      growthValue: 0,
      points: 0
    },
    
    // 会员等级配置
    vipLevels: [
      { level: 'VIP 1', minGrowth: 0, maxGrowth: 1500 },
      { level: 'VIP 2', minGrowth: 1500, maxGrowth: 3000 },
      { level: 'VIP 3', minGrowth: 3000, maxGrowth: 8888 },
      { level: 'VIP 4', minGrowth: 8888, maxGrowth: Infinity }
    ],
    
    // 充值套餐
    rechargePackages: [
      { id: 1, amount: 500, bonus: 60, growth: 500 },
      { id: 2, amount: 1000, bonus: 180, growth: 1000 },
      { id: 3, amount: 2000, bonus: 500, growth: 2000 }
    ],
    
    // 当前选中的套餐
    selectedPackage: null,
    
    // 会员等级信息
    vipName: 'VIP 1',
    nextLevelGrowth: 1500,
    needGrowth: 1500,
    growthProgress: 0,
    
    // 实际到账金额
    actualAmount: 0,
    
    // 弹窗状态
    showAgeModal: false,
    showSuccessModal: false,
    
    // 充值结果
    rechargedAmount: 0,
    rechargedGrowth: 0,
    rechargedPoints: 0,
    newGrowthProgress: 0
  },

  onLoad() {
    this.initUserInfo()
  },

  onShow() {
    this.initUserInfo()
  },

  // 初始化用户信息
  initUserInfo() {
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        balance: userInfo.balance || 0
      })
    }
    this.calculateVipProgress()
  },

  // 计算会员进度
  calculateVipProgress() {
    const { userInfo, vipLevels } = this.data
    const currentGrowth = userInfo.growthValue || 0
    
    let currentLevel = vipLevels[0]
    let nextLevel = vipLevels[1]
    
    for (let i = 0; i < vipLevels.length; i++) {
      if (currentGrowth >= vipLevels[i].minGrowth && currentGrowth < vipLevels[i].maxGrowth) {
        currentLevel = vipLevels[i]
        nextLevel = vipLevels[i + 1] || null
        break
      }
      if (currentGrowth >= vipLevels[i].maxGrowth && i === vipLevels.length - 1) {
        currentLevel = vipLevels[i]
        nextLevel = null
      }
    }
    
    let nextLevelGrowth = currentLevel.maxGrowth
    let needGrowth = nextLevelGrowth - currentGrowth
    let growthProgress = 0
    
    if (nextLevel) {
      const levelRange = currentLevel.maxGrowth - currentLevel.minGrowth
      growthProgress = Math.min(100, ((currentGrowth - currentLevel.minGrowth) / levelRange) * 100)
      needGrowth = nextLevelGrowth - currentGrowth
    } else {
      growthProgress = 100
      needGrowth = 0
    }
    
    this.setData({
      vipName: currentLevel.level,
      nextLevelGrowth: nextLevelGrowth,
      needGrowth: Math.max(0, needGrowth),
      growthProgress: Math.round(growthProgress)
    })
  },

  // 选择充值套餐
  selectPackage(e) {
    const packageId = e.currentTarget.dataset.id
    const packageItem = this.data.rechargePackages.find(p => p.id === packageId)
    
    if (packageItem) {
      this.setData({
        selectedPackage: packageId,
        actualAmount: packageItem.amount + packageItem.bonus
      })
    }
  },

  // 跳转充值（发起微信支付）
  goToRecharge() {
    if (!this.data.selectedPackage) {
      wx.showToast({
        title: '请先选择充值套餐',
        icon: 'none'
      })
      return
    }
    
    // 检查年龄
    const hasAgeVerified = wx.getStorageSync('ageVerified')
    if (!hasAgeVerified) {
      this.setData({
        showAgeModal: true
      })
      return
    }
    
    this.processRecharge()
  },

  // 确认年龄
  confirmAge() {
    wx.setStorageSync('ageVerified', true)
    this.setData({
      showAgeModal: false
    })
    this.processRecharge()
  },

  // 取消年龄验证
  cancelAge() {
    this.setData({
      showAgeModal: false
    })
    wx.showToast({
      title: '抱歉，未满18周岁无法充值',
      icon: 'none'
    })
  },

  // 处理充值逻辑
  processRecharge() {
    const { selectedPackage, rechargePackages, userInfo } = this.data
    const packageItem = rechargePackages.find(p => p.id === selectedPackage)
    
    if (!packageItem) return
    
    wx.showLoading({
      title: '支付中...'
    })
    
    setTimeout(() => {
      wx.hideLoading()
      
      // 计算新的余额和成长值
      const newBalance = (userInfo.balance || 0) + packageItem.amount + packageItem.bonus
      const newGrowth = userInfo.growthValue + packageItem.growth
      const newPoints = (userInfo.points || 0) + packageItem.growth
      
      // 更新用户信息
      const newUserInfo = {
        ...userInfo,
        balance: newBalance,
        growthValue: newGrowth,
        points: newPoints
      }
      wx.setStorageSync('userInfo', newUserInfo)
      
      // 保存充值记录
      const now = new Date()
      const record = {
        id: now.getTime(),
        amount: packageItem.amount,
        bonus: packageItem.bonus,
        growth: packageItem.growth,
        points: packageItem.growth,
        createTime: now.toISOString(),
        time: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      }
      
      const rechargeRecords = wx.getStorageSync('rechargeRecords') || []
      rechargeRecords.push(record)
      wx.setStorageSync('rechargeRecords', rechargeRecords)
      
      // 添加积分获得记录
      const pointsRecords = wx.getStorageSync('pointsRecords') || []
      pointsRecords.unshift({
        id: 'pr_' + now.getTime(),
        type: 'earn',
        amount: packageItem.growth,
        description: '充值获得',
        createTime: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
      })
      wx.setStorageSync('pointsRecords', pointsRecords)
      
      // 显示成功弹窗
      this.setData({
        showSuccessModal: true,
        rechargedAmount: packageItem.amount + packageItem.bonus,
        rechargedGrowth: packageItem.growth,
        rechargedPoints: packageItem.growth,
        newGrowthProgress: this.calculateNewProgress(newGrowth),
        userInfo: newUserInfo,
        balance: newBalance
      })
      
      this.calculateVipProgress()
    }, 1500)
  },

  // 计算新的进度
  calculateNewProgress(growth) {
    const { vipLevels } = this.data
    
    for (let i = 0; i < vipLevels.length; i++) {
      if (growth >= vipLevels[i].minGrowth && growth < vipLevels[i].maxGrowth) {
        const levelRange = vipLevels[i].maxGrowth - vipLevels[i].minGrowth
        return Math.min(100, ((growth - vipLevels[i].minGrowth) / levelRange) * 100)
      }
    }
    return 100
  },

  // 继续充值
  continueRecharge() {
    this.setData({
      showSuccessModal: false,
      selectedPackage: null,
      actualAmount: 0
    })
  },

  // 关闭成功弹窗
  closeSuccessModal() {
    this.setData({
      showSuccessModal: false,
      selectedPackage: null,
      actualAmount: 0
    })
  },

  // 跳转充值记录
  goToRecords() {
    wx.navigateTo({
      url: '/pages/vip/records/records'
    })
  },

  // 跳转消费记录
  goToConsumeRecords() {
    wx.navigateTo({
      url: '/pages/vip/consume/consume'
    })
  }
})
