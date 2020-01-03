"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../utils/util");
Page({
    fetchDateRef: "",
    data: {
        fetchDate: "",
        topStories: [],
        listStories: []
    },
    onLoad: function () {
        this.firstFetchStories();
    },
    onUnload: function () {
        wx.clearStorageSync();
    },
    loadNextPageData: function () {
        this.fetchMoreStories(this.fetchDateRef);
    },
    firstFetchStories: function () {
        var _this = this;
        wx.request({
            url: "http://news-at.zhihu.com/api/4/news/latest",
            success: function (res) {
                if (res.statusCode === 200) {
                    var STORIES = res.data;
                    _this.setData({
                        fetchDate: STORIES.date,
                        topStories: STORIES.top_stories,
                        listStories: [
                            {
                                data: STORIES.stories,
                                date: "今日热闻"
                            }
                        ]
                    });
                    _this.fetchDateRef = STORIES.date;
                    var ids = STORIES.stories.map(function (item) { return item.id; });
                    util_1.APP.globalData.detailsSlideIds = ids;
                    wx.setStorage({
                        key: "storiesIds",
                        data: ids
                    });
                    _this.fetchMoreStories(STORIES.date);
                }
            }
        });
    },
    fetchMoreStories: function (fetchDate) {
        var _this = this;
        wx.request({
            url: "https://news-at.zhihu.com/api/4/news/before/" + fetchDate,
            success: function (res) {
                if (res.statusCode === 200) {
                    var STORIES = res.data;
                    _this.setData({
                        fetchDate: STORIES.date,
                        listStories: _this.data.listStories.concat([
                            {
                                data: STORIES.stories,
                                date: util_1.formatDate(STORIES.date)
                            }
                        ])
                    });
                    _this.fetchDateRef = STORIES.date;
                    var ids = STORIES.stories.map(function (item) { return item.id; });
                    util_1.APP.globalData.detailsSlideIds = util_1.APP.globalData.detailsSlideIds.concat(ids);
                    var storiesIds = wx.getStorageSync("storiesIds") || [];
                    wx.setStorage({
                        key: "storiesIds",
                        data: storiesIds.concat(ids)
                    });
                }
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Rvcmllcy1saXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3Rvcmllcy1saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBQWtEO0FBNkJsRCxJQUFJLENBQXlCO0lBQzNCLFlBQVksRUFBRSxFQUFFO0lBRWhCLElBQUksRUFBRTtRQUNKLFNBQVMsRUFBRSxFQUFFO1FBQ2IsVUFBVSxFQUFFLEVBQUU7UUFDZCxXQUFXLEVBQUUsRUFBRTtLQUNoQjtJQUVELE1BQU07UUFDSixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBRUQsUUFBUTtRQUNOLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFFRCxpQkFBaUI7UUFBakIsaUJBNEJDO1FBM0JDLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDVCxHQUFHLEVBQUUsNENBQTRDO1lBQ2pELE9BQU8sRUFBRSxVQUFBLEdBQUc7Z0JBQ1YsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtvQkFDMUIsSUFBTSxPQUFPLEdBQVEsR0FBRyxDQUFDLElBQUksQ0FBQTtvQkFDN0IsS0FBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDWCxTQUFTLEVBQUUsT0FBTyxDQUFDLElBQUk7d0JBQ3ZCLFVBQVUsRUFBRSxPQUFPLENBQUMsV0FBVzt3QkFDL0IsV0FBVyxFQUFFOzRCQUNYO2dDQUNFLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTztnQ0FDckIsSUFBSSxFQUFFLE1BQU07NkJBQ2I7eUJBQ0Y7cUJBQ0YsQ0FBQyxDQUFBO29CQUVGLEtBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQTtvQkFDaEMsSUFBTSxHQUFHLEdBQWEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFZLElBQUssT0FBQSxJQUFJLENBQUMsRUFBRSxFQUFQLENBQU8sQ0FBQyxDQUFBO29CQUNwRSxVQUFHLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUE7b0JBQ3BDLEVBQUUsQ0FBQyxVQUFVLENBQUM7d0JBQ1osR0FBRyxFQUFFLFlBQVk7d0JBQ2pCLElBQUksRUFBRSxHQUFHO3FCQUNWLENBQUMsQ0FBQTtvQkFDRixLQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO2lCQUNwQztZQUNILENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsZ0JBQWdCLFlBQUMsU0FBUztRQUExQixpQkFnQ0M7UUEvQkMsRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNULEdBQUcsRUFBRSw4Q0FBOEMsR0FBRyxTQUFTO1lBQy9ELE9BQU8sRUFBRSxVQUFBLEdBQUc7Z0JBQ1YsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtvQkFDMUIsSUFBTSxPQUFPLEdBQVEsR0FBRyxDQUFDLElBQUksQ0FBQTtvQkFDN0IsS0FBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDWCxTQUFTLEVBQUUsT0FBTyxDQUFDLElBQUk7d0JBQ3ZCLFdBQVcsRUFDTixLQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7NEJBQ3hCO2dDQUNFLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTztnQ0FDckIsSUFBSSxFQUFFLGlCQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzs2QkFDL0I7MEJBQ0Y7cUJBQ0YsQ0FBQyxDQUFBO29CQUVGLEtBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQTtvQkFDaEMsSUFBTSxHQUFHLEdBQWEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxJQUFZLElBQUssT0FBQSxJQUFJLENBQUMsRUFBRSxFQUFQLENBQU8sQ0FBQyxDQUFBO29CQUNwRSxVQUFHLENBQUMsVUFBVSxDQUFDLGVBQWUsR0FDekIsVUFBRyxDQUFDLFVBQVUsQ0FBQyxlQUFlLFFBQzlCLEdBQUcsQ0FDUCxDQUFBO29CQUVELElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFBO29CQUN0RCxFQUFFLENBQUMsVUFBVSxDQUFDO3dCQUNaLEdBQUcsRUFBRSxZQUFZO3dCQUNqQixJQUFJLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUM7cUJBQzdCLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcclxuaW1wb3J0IHsgZm9ybWF0RGF0ZSwgQVBQIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3V0aWxcIlxyXG5cclxuaW50ZXJmYWNlIFN0b3JpZSB7XHJcbiAgdGl0bGU6IHN0cmluZ1xyXG4gIGdhX3ByZWZpeDogc3RyaW5nXHJcbiAgaWQ6IG51bWJlclxyXG4gIHR5cGU6IG51bWJlclxyXG4gIGltYWdlPzogc3RyaW5nXHJcbiAgaW1hZ2VzPzogc3RyaW5nW11cclxufVxyXG5cclxudHlwZSBMaXN0SXRlbSA9IHtcclxuICBkYXRlOiBzdHJpbmdcclxuICBkYXRhOiBTdG9yaWVbXVxyXG59XHJcblxyXG5pbnRlcmZhY2UgUGFnZURhdGEge1xyXG4gIGZldGNoRGF0ZTogc3RyaW5nXHJcbiAgdG9wU3RvcmllczogU3RvcmllW11cclxuICBsaXN0U3RvcmllczogTGlzdEl0ZW1bXVxyXG59XHJcblxyXG5pbnRlcmZhY2UgUGFnZUluc3RhbmNlIHtcclxuICBmZXRjaERhdGVSZWY6IHN0cmluZ1xyXG4gIGxvYWROZXh0UGFnZURhdGEoKTogdm9pZFxyXG4gIGZpcnN0RmV0Y2hTdG9yaWVzKCk6IHZvaWRcclxuICBmZXRjaE1vcmVTdG9yaWVzKGZldGNoRGF0ZTogc3RyaW5nKTogdm9pZFxyXG59XHJcblxyXG5QYWdlPFBhZ2VEYXRhLCBQYWdlSW5zdGFuY2U+KHtcclxuICBmZXRjaERhdGVSZWY6IFwiXCIsXHJcblxyXG4gIGRhdGE6IHtcclxuICAgIGZldGNoRGF0ZTogXCJcIixcclxuICAgIHRvcFN0b3JpZXM6IFtdLFxyXG4gICAgbGlzdFN0b3JpZXM6IFtdXHJcbiAgfSxcclxuXHJcbiAgb25Mb2FkKCkge1xyXG4gICAgdGhpcy5maXJzdEZldGNoU3RvcmllcygpXHJcbiAgfSxcclxuXHJcbiAgb25VbmxvYWQoKSB7XHJcbiAgICB3eC5jbGVhclN0b3JhZ2VTeW5jKClcclxuICB9LFxyXG5cclxuICBsb2FkTmV4dFBhZ2VEYXRhKCkge1xyXG4gICAgdGhpcy5mZXRjaE1vcmVTdG9yaWVzKHRoaXMuZmV0Y2hEYXRlUmVmKVxyXG4gIH0sXHJcblxyXG4gIGZpcnN0RmV0Y2hTdG9yaWVzKCkge1xyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogXCJodHRwOi8vbmV3cy1hdC56aGlodS5jb20vYXBpLzQvbmV3cy9sYXRlc3RcIixcclxuICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgY29uc3QgU1RPUklFUyA9IDxhbnk+cmVzLmRhdGFcclxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGZldGNoRGF0ZTogU1RPUklFUy5kYXRlLFxyXG4gICAgICAgICAgICB0b3BTdG9yaWVzOiBTVE9SSUVTLnRvcF9zdG9yaWVzLFxyXG4gICAgICAgICAgICBsaXN0U3RvcmllczogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IFNUT1JJRVMuc3RvcmllcyxcclxuICAgICAgICAgICAgICAgIGRhdGU6IFwi5LuK5pel54Ot6Ze7XCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgdGhpcy5mZXRjaERhdGVSZWYgPSBTVE9SSUVTLmRhdGVcclxuICAgICAgICAgIGNvbnN0IGlkczogbnVtYmVyW10gPSBTVE9SSUVTLnN0b3JpZXMubWFwKChpdGVtOiBTdG9yaWUpID0+IGl0ZW0uaWQpXHJcbiAgICAgICAgICBBUFAuZ2xvYmFsRGF0YS5kZXRhaWxzU2xpZGVJZHMgPSBpZHNcclxuICAgICAgICAgIHd4LnNldFN0b3JhZ2Uoe1xyXG4gICAgICAgICAgICBrZXk6IFwic3Rvcmllc0lkc1wiLFxyXG4gICAgICAgICAgICBkYXRhOiBpZHNcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICB0aGlzLmZldGNoTW9yZVN0b3JpZXMoU1RPUklFUy5kYXRlKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBmZXRjaE1vcmVTdG9yaWVzKGZldGNoRGF0ZSkge1xyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogXCJodHRwczovL25ld3MtYXQuemhpaHUuY29tL2FwaS80L25ld3MvYmVmb3JlL1wiICsgZmV0Y2hEYXRlLFxyXG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICBjb25zdCBTVE9SSUVTID0gPGFueT5yZXMuZGF0YVxyXG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgZmV0Y2hEYXRlOiBTVE9SSUVTLmRhdGUsXHJcbiAgICAgICAgICAgIGxpc3RTdG9yaWVzOiBbXHJcbiAgICAgICAgICAgICAgLi4udGhpcy5kYXRhLmxpc3RTdG9yaWVzLFxyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhdGE6IFNUT1JJRVMuc3RvcmllcyxcclxuICAgICAgICAgICAgICAgIGRhdGU6IGZvcm1hdERhdGUoU1RPUklFUy5kYXRlKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICB0aGlzLmZldGNoRGF0ZVJlZiA9IFNUT1JJRVMuZGF0ZVxyXG4gICAgICAgICAgY29uc3QgaWRzOiBudW1iZXJbXSA9IFNUT1JJRVMuc3Rvcmllcy5tYXAoKGl0ZW06IFN0b3JpZSkgPT4gaXRlbS5pZClcclxuICAgICAgICAgIEFQUC5nbG9iYWxEYXRhLmRldGFpbHNTbGlkZUlkcyA9IFtcclxuICAgICAgICAgICAgLi4uQVBQLmdsb2JhbERhdGEuZGV0YWlsc1NsaWRlSWRzLFxyXG4gICAgICAgICAgICAuLi5pZHNcclxuICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICBsZXQgc3Rvcmllc0lkcyA9IHd4LmdldFN0b3JhZ2VTeW5jKFwic3Rvcmllc0lkc1wiKSB8fCBbXVxyXG4gICAgICAgICAgd3guc2V0U3RvcmFnZSh7XHJcbiAgICAgICAgICAgIGtleTogXCJzdG9yaWVzSWRzXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHN0b3JpZXNJZHMuY29uY2F0KGlkcylcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufSlcclxuIl19