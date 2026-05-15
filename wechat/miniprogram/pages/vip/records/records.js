// pages/vip/records/records.js

Page({
  data: {
    // 充值记录列表
    records: [],
    
    // 统计数据
    totalAmount: 0,
    totalGrowth: 0,
    totalPoints: 0
  },

  onLoad() {
    this.loadRecords()
  },

  onShow() {
    this.loadRecords()
  },

  // 加载充值记录
  loadRecords() {
    // 从本地存储读取充值记录
    const rechargeRecords = wx.getStorageSync('rechargeRecords') || []
    
    // 按时间排序（越早越靠下，即倒序排列）
    const sortedRecords = rechargeRecords.sort((a, b) => {
      return new Date(b.createTime) - new Date(a.createTime)
    })
    
    // 计算统计数据
    let totalAmount = 0
    let totalGrowth = 0
    let totalPoints = 0
    
    rechargeRecords.forEach(record => {
      totalAmount += record.amount + record.bonus
      totalGrowth += record.growth
      totalPoints += record.points
    })
    
    this.setData({
      records: sortedRecords,
      totalAmount: totalAmount,
      totalGrowth: totalGrowth,
      totalPoints: totalPoints
    })
  }
})
