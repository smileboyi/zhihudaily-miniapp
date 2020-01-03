// app.ts
App<IAppOption>({
  globalData: {
    detailsSlideIds: []
  },
  onLaunch() {
    wx.clearStorageSync()
  },
})