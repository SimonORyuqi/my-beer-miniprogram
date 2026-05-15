// pages/vip/consume/consume.js

Page({
  data: {
    // 消费记录列表
    records: []
  },

  onLoad() {
    this.loadRecords()
  },

  onShow() {
    this.loadRecords()
  },

  // 加载消费记录
  loadRecords() {
    // 从本地存储读取消费记录
    const consumeRecords = wx.getStorageSync('consumeRecords') || []
    
    // 按时间排序（越早越靠下，即倒序排列）
    const sortedRecords = consumeRecords.sort((a, b) => {
      return new Date(b.createTime) - new Date(a.createTime)
    })
    
    this.setData({
      records: sortedRecords
    })
  }
})
