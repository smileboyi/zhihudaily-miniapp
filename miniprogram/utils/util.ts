export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  )
}

export const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : "0" + s
}

const day = ["日", "一", "二", "三", "四", "五", "六"]
export const formatDate = (dateStr: string) => {
  let d = new Date()
  d.setFullYear(parseInt(dateStr.substr(0, 4)))
  d.setMonth(parseInt(dateStr.substr(4, 2)) - 1)
  d.setDate(parseInt(dateStr.substr(6, 2)))
  return d.getMonth() + 1 + "月" + d.getDate() + "日 星期" + day[d.getDay()]
}

// 获取应用实例
export const APP = getApp<IAppOption>()
