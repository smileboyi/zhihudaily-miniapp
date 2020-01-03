// index.ts

interface Comment {
  author: string
  content: string
  avatar: string
  time: number
  id: number
  likes: number
}

interface PageData {
  longComments: Comment[]
  shortComments: Comment[]
  detailsId: string
  comments: string
  open: boolean
  fromSwiper: string
}
interface PageInstance {
  handleFoldClick(): void
  fetchCommentsData(id: string): void
}

Page<PageData, PageInstance>({
  data: {
    longComments: [],
    shortComments: [],
    detailsId: "",
    comments: "0",
    open: false,
    fromSwiper: ""
  },

  onLoad(options: { id: string; comments: string; fromSwiper: string }) {
    const { id, comments, fromSwiper } = options
    this.setData({
      detailsId: id,
      comments,
      fromSwiper
    })
    this.fetchCommentsData(id)
  },

  handleFoldClick() {
    this.setData({
      open: !this.data.open
    })
  },

  fetchCommentsData(id) {
    wx.request({
      url: `https://news-at.zhihu.com/api/4/story/${id}/long-comments`,
      success: res => {
        if (res.statusCode === 200) {
          this.setData({
            longComments: (<any>res.data).comments
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
    wx.request({
      url: `https://news-at.zhihu.com/api/4/story/${id}/short-comments`,
      success: res => {
        if (res.statusCode === 200) {
          this.setData({
            shortComments: (<any>res.data).comments
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  }
})
