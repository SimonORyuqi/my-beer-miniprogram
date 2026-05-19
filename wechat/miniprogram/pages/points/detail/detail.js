// pages/points/detail/detail.js
const mockData = require('../../../utils/mockData.js')

Page({
  data: {
    currentFilter: 'all',  // 当前筛选类型：all/earn/spend/expire
    allRecords: [],          // 所有记录
    filteredRecords: []      // 筛选后的记录
  },

  onLoad() {
    this.loadRecords()
  },

  onShow() {
    this.loadRecords()
  },

  // 加载积分明细记录
  loadRecords() {
    // 从本地存储获取记录，如果没有则使用mock数据
    const records = wx.getStorageSync('pointsRecords') || mockData.pointsRecords || []
    
    // 按时间倒序排列
    const sortedRecords = records.sort((a, b) => {
      return new Date(b.createTime) - new Date(a.createTime)
    })
    
    this.setData({
      allRecords: sortedRecords
    })
    
    // 应用当前筛选
    this.applyFilter()
  },

  // 切换筛选类型
  switchFilter(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      currentFilter: type
    })
    this.applyFilter()
  },

  // 应用筛选
  applyFilter() {
    const { allRecords, currentFilter } = this.data
    
    let filteredRecords = allRecords
    if (currentFilter !== 'all') {
      filteredRecords = allRecords.filter(record => record.type === currentFilter)
    }
    
    this.setData({
      filteredRecords: filteredRecords
    })
  },

  // 格式化时间（示例方法，可根据需要扩展）
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
