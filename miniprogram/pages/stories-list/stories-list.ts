// index.ts
import { formatDate, APP } from "../../utils/util"

interface Storie {
  title: string
  ga_prefix: string
  id: number
  type: number
  image?: string
  images?: string[]
}

type ListItem = {
  date: string
  data: Storie[]
}

interface PageData {
  fetchDate: string
  topStories: Storie[]
  listStories: ListItem[]
}

interface PageInstance {
  fetchDateRef: string
  loadNextPageData(): void
  firstFetchStories(): void
  fetchMoreStories(fetchDate: string): void
}

Page<PageData, PageInstance>({
  fetchDateRef: "",

  data: {
    fetchDate: "",
    topStories: [],
    listStories: []
  },

  onLoad() {
    this.firstFetchStories()
  },

  onUnload() {
    wx.clearStorageSync()
  },

  loadNextPageData() {
    this.fetchMoreStories(this.fetchDateRef)
  },

  firstFetchStories() {
    wx.request({
      url: "http://news-at.zhihu.com/api/4/news/latest",
      success: res => {
        if (res.statusCode === 200) {
          const STORIES = <any>res.data
          this.setData({
            fetchDate: STORIES.date,
            topStories: STORIES.top_stories,
            listStories: [
              {
                data: STORIES.stories,
                date: "今日热闻"
              }
            ]
          })

          this.fetchDateRef = STORIES.date
          const ids: number[] = STORIES.stories.map((item: Storie) => item.id)
          APP.globalData.detailsSlideIds = ids
          wx.setStorage({
            key: "storiesIds",
            data: ids
          })
          this.fetchMoreStories(STORIES.date)
        }
      }
    })
  },

  fetchMoreStories(fetchDate) {
    wx.request({
      url: "https://news-at.zhihu.com/api/4/news/before/" + fetchDate,
      success: res => {
        if (res.statusCode === 200) {
          const STORIES = <any>res.data
          this.setData({
            fetchDate: STORIES.date,
            listStories: [
              ...this.data.listStories,
              {
                data: STORIES.stories,
                date: formatDate(STORIES.date)
              }
            ]
          })

          this.fetchDateRef = STORIES.date
          const ids: number[] = STORIES.stories.map((item: Storie) => item.id)
          APP.globalData.detailsSlideIds = [
            ...APP.globalData.detailsSlideIds,
            ...ids
          ]

          let storiesIds = wx.getStorageSync("storiesIds") || []
          wx.setStorage({
            key: "storiesIds",
            data: storiesIds.concat(ids)
          })
        }
      }
    })
  }
})
