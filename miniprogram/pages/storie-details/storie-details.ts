// index.ts
import { APP } from "../../utils/util"

interface Article {
  image: string
  title: string
  body: string
  image_source: string
}

interface PageData {
  article: Article
  slideIndex: number
  detailsId: string
  duration: number
  scrollTop: number
  fromSwiper: string
  comments: number
  popularity: number
}

interface PageInstance {
  canFetch: boolean
  handleSwiperChange(e: any): void
  replaceHtml(html: string): string
  fetchDetailsData(detailsId: string | number, idIndex?: number): void
  switchSwiperCurrent(index: number): void
}

Page<PageData, PageInstance>({
  canFetch: true,

  data: {
    article: {
      image: "",
      title: "",
      image_source: "",
      body: ""
    },
    slideIndex: 1,
    detailsId: "",
    duration: 300,
    scrollTop: 0,
    comments: 0,
    popularity: 0,
    fromSwiper: ""
  },

  onLoad(options: { id: string; fromSwiper: "0" | "1" }) {
    const index = APP.globalData.detailsSlideIds.indexOf(Number(options.id))
    this.switchSwiperCurrent(index)
    this.setData({
      detailsId: options.id,
      fromSwiper: options.fromSwiper
    })
    if (this.data.fromSwiper === "1") {
      this.fetchDetailsData(options.id)
    } else {
      this.fetchDetailsData(options.id, index)
    }
  },

  handleSwiperChange(e) {
    const newSlideIndex: number = e.detail.current
    const oldSlideIndex: number = this.data.slideIndex

    if (oldSlideIndex !== newSlideIndex) {
      let idIndex = APP.globalData.detailsSlideIds.indexOf(
        Number(this.data.detailsId)
      )
      idIndex = idIndex - oldSlideIndex + newSlideIndex
      const detailsId = APP.globalData.detailsSlideIds[idIndex]
      this.setData({ detailsId: String(detailsId) })
      this.fetchDetailsData(detailsId, idIndex)
    }
  },

  // rich-text对html标签支持度不够，通过正则解析替换
  replaceHtml(html) {
    return html
      .replace(
        /<img/gi,
        '<img style="display:block;max-width:100%;height:auto;margin:10px auto" '
      )
      .replace(
        /<img.*class="avatar"/gi,
        '<img style="display:inline-block;width:20px;height:20px;border-radius:2px;margin: 5px 5px -5px 0" '
      )
      .replace(
        /<a href="http:\/\/www.zhihu.com\/question.*"/gi,
        '<a style="dispaly:none"'
      )
      .replace(/<a.*hidden/gi, '<a style="display:none"')
      .replace(/<section/g, "<div")
      .replace(/\/section>/g, "div>")
  },

  fetchDetailsData(detailsId, idIndex) {
    if (!this.canFetch) return
    this.canFetch = false
    wx.request({
      url: "https://news-at.zhihu.com/api/4/news/" + detailsId,
      success: res => {
        if (res.statusCode === 200) {
          const { image, title, body, image_source } = <any>res.data
          this.setData(
            {
              article: {
                image,
                title,
                image_source,
                body: this.replaceHtml(body)
              },
              detailsId: String(detailsId),
              duration: 0,
              scrollTop: 0
            },
            () => {
              // swiper滑动时间300ms, 定时器不精确, 再加100ms
              let t: number = setTimeout(() => {
                this.canFetch = true
                if (typeof idIndex === "number") {
                  this.switchSwiperCurrent(idIndex)
                }
                clearTimeout(t)
              }, 400)
            }
          )
        }
      },
      fail: err => {
        this.canFetch = true
        console.log(err)
      }
    })

    wx.request({
      url: "https://news-at.zhihu.com/api/4/story-extra/" + detailsId,
      success: res => {
        if (res.statusCode === 200) {
          const { comments, popularity } = <any>res.data
          this.setData({
            comments,
            popularity
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  switchSwiperCurrent(index) {
    const maxIndex = APP.globalData.detailsSlideIds.length - 1
    let slideIndex
    if (index === 0) {
      slideIndex = 0
    } else if (index === maxIndex) {
      slideIndex = 2
    } else {
      slideIndex = 1
    }
    this.setData({
      slideIndex,
      duration: 300
    })
  }
})
