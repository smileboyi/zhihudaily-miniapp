"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../utils/util");
Page({
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
    onLoad: function (options) {
        var index = util_1.APP.globalData.detailsSlideIds.indexOf(Number(options.id));
        this.switchSwiperCurrent(index);
        this.setData({
            detailsId: options.id,
            fromSwiper: options.fromSwiper
        });
        if (this.data.fromSwiper === "1") {
            this.fetchDetailsData(options.id);
        }
        else {
            this.fetchDetailsData(options.id, index);
        }
    },
    handleSwiperChange: function (e) {
        var newSlideIndex = e.detail.current;
        var oldSlideIndex = this.data.slideIndex;
        if (oldSlideIndex !== newSlideIndex) {
            var idIndex = util_1.APP.globalData.detailsSlideIds.indexOf(Number(this.data.detailsId));
            idIndex = idIndex - oldSlideIndex + newSlideIndex;
            var detailsId = util_1.APP.globalData.detailsSlideIds[idIndex];
            this.setData({ detailsId: String(detailsId) });
            this.fetchDetailsData(detailsId, idIndex);
        }
    },
    replaceHtml: function (html) {
        return html
            .replace(/<img/gi, '<img style="display:block;max-width:100%;height:auto;margin:10px auto" ')
            .replace(/<img.*class="avatar"/gi, '<img style="display:inline-block;width:20px;height:20px;border-radius:2px;margin: 5px 5px -5px 0" ')
            .replace(/<a href="http:\/\/www.zhihu.com\/question.*"/gi, '<a style="dispaly:none"')
            .replace(/<a.*hidden/gi, '<a style="display:none"')
            .replace(/<section/g, "<div")
            .replace(/\/section>/g, "div>");
    },
    fetchDetailsData: function (detailsId, idIndex) {
        var _this = this;
        if (!this.canFetch)
            return;
        this.canFetch = false;
        wx.request({
            url: "https://news-at.zhihu.com/api/4/news/" + detailsId,
            success: function (res) {
                if (res.statusCode === 200) {
                    var _a = res.data, image = _a.image, title = _a.title, body = _a.body, image_source = _a.image_source;
                    _this.setData({
                        article: {
                            image: image,
                            title: title,
                            image_source: image_source,
                            body: _this.replaceHtml(body)
                        },
                        detailsId: String(detailsId),
                        duration: 0,
                        scrollTop: 0
                    }, function () {
                        var t = setTimeout(function () {
                            _this.canFetch = true;
                            if (typeof idIndex === "number") {
                                _this.switchSwiperCurrent(idIndex);
                            }
                            clearTimeout(t);
                        }, 400);
                    });
                }
            },
            fail: function (err) {
                _this.canFetch = true;
                console.log(err);
            }
        });
        wx.request({
            url: "https://news-at.zhihu.com/api/4/story-extra/" + detailsId,
            success: function (res) {
                if (res.statusCode === 200) {
                    var _a = res.data, comments = _a.comments, popularity = _a.popularity;
                    _this.setData({
                        comments: comments,
                        popularity: popularity
                    });
                }
            },
            fail: function (err) {
                console.log(err);
            }
        });
    },
    switchSwiperCurrent: function (index) {
        var maxIndex = util_1.APP.globalData.detailsSlideIds.length - 1;
        var slideIndex;
        if (index === 0) {
            slideIndex = 0;
        }
        else if (index === maxIndex) {
            slideIndex = 2;
        }
        else {
            slideIndex = 1;
        }
        this.setData({
            slideIndex: slideIndex,
            duration: 300
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmllLWRldGFpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9yaWUtZGV0YWlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlDQUFzQztBQTRCdEMsSUFBSSxDQUF5QjtJQUMzQixRQUFRLEVBQUUsSUFBSTtJQUVkLElBQUksRUFBRTtRQUNKLE9BQU8sRUFBRTtZQUNQLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxZQUFZLEVBQUUsRUFBRTtZQUNoQixJQUFJLEVBQUUsRUFBRTtTQUNUO1FBQ0QsVUFBVSxFQUFFLENBQUM7UUFDYixTQUFTLEVBQUUsRUFBRTtRQUNiLFFBQVEsRUFBRSxHQUFHO1FBQ2IsU0FBUyxFQUFFLENBQUM7UUFDWixRQUFRLEVBQUUsQ0FBQztRQUNYLFVBQVUsRUFBRSxDQUFDO1FBQ2IsVUFBVSxFQUFFLEVBQUU7S0FDZjtJQUVELE1BQU0sWUFBQyxPQUE4QztRQUNuRCxJQUFNLEtBQUssR0FBRyxVQUFHLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3hFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsU0FBUyxFQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ3JCLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVTtTQUMvQixDQUFDLENBQUE7UUFDRixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtZQUNoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQ2xDO2FBQU07WUFDTCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQTtTQUN6QztJQUNILENBQUM7SUFFRCxrQkFBa0IsWUFB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LEdBQUc7Z0JBQ1YsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtvQkFDcEIsSUFBQSxhQUF3QyxFQUF0QyxzQkFBUSxFQUFFLDBCQUE0QixDQUFBO29CQUM5QyxLQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNYLFFBQVEsVUFBQTt3QkFDUixVQUFVLFlBQUE7cUJBQ1gsQ0FBQyxDQUFBO2lCQUNIO1lBQ0gsQ0FBQztZQUNELElBQUksRUFBRSxVQUFBLEdBQUc7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNsQixDQUFDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELG1CQUFtQixZQUFDLEtBQUs7UUFDdkIsSUFBTSxRQUFRLEdBQUcsVUFBRyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUMxRCxJQUFJLFVBQVUsQ0FBQTtRQUNkLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtZQUNmLFVBQVUsR0FBRyxDQUFDLENBQUE7U0FDZjthQUFNLElBQUksS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixVQUFVLEdBQUcsQ0FBQyxDQUFBO1NBQ2Y7YUFBTTtZQUNMLFVBQVUsR0FBRyxDQUFDLENBQUE7U0FDZjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxVQUFVLFlBQUE7WUFDVixRQUFRLEVBQUUsR0FBRztTQUNkLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xyXG5pbXBvcnQgeyBBUFAgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdXRpbFwiXHJcblxyXG5pbnRlcmZhY2UgQXJ0aWNsZSB7XHJcbiAgaW1hZ2U6IHN0cmluZ1xyXG4gIHRpdGxlOiBzdHJpbmdcclxuICBib2R5OiBzdHJpbmdcclxuICBpbWFnZV9zb3VyY2U6IHN0cmluZ1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUGFnZURhdGEge1xyXG4gIGFydGljbGU6IEFydGljbGVcclxuICBzbGlkZUluZGV4OiBudW1iZXJcclxuICBkZXRhaWxzSWQ6IHN0cmluZ1xyXG4gIGR1cmF0aW9uOiBudW1iZXJcclxuICBzY3JvbGxUb3A6IG51bWJlclxyXG4gIGZyb21Td2lwZXI6IHN0cmluZ1xyXG4gIGNvbW1lbnRzOiBudW1iZXJcclxuICBwb3B1bGFyaXR5OiBudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIFBhZ2VJbnN0YW5jZSB7XHJcbiAgY2FuRmV0Y2g6IGJvb2xlYW5cclxuICBoYW5kbGVTd2lwZXJDaGFuZ2UoZTogYW55KTogdm9pZFxyXG4gIHJlcGxhY2VIdG1sKGh0bWw6IHN0cmluZyk6IHN0cmluZ1xyXG4gIGZldGNoRGV0YWlsc0RhdGEoZGV0YWlsc0lkOiBzdHJpbmcgfCBudW1iZXIsIGlkSW5kZXg/OiBudW1iZXIpOiB2b2lkXHJcbiAgc3dpdGNoU3dpcGVyQ3VycmVudChpbmRleDogbnVtYmVyKTogdm9pZFxyXG59XHJcblxyXG5QYWdlPFBhZ2VEYXRhLCBQYWdlSW5zdGFuY2U+KHtcclxuICBjYW5GZXRjaDogdHJ1ZSxcclxuXHJcbiAgZGF0YToge1xyXG4gICAgYXJ0aWNsZToge1xyXG4gICAgICBpbWFnZTogXCJcIixcclxuICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgIGltYWdlX3NvdXJjZTogXCJcIixcclxuICAgICAgYm9keTogXCJcIlxyXG4gICAgfSxcclxuICAgIHNsaWRlSW5kZXg6IDEsXHJcbiAgICBkZXRhaWxzSWQ6IFwiXCIsXHJcbiAgICBkdXJhdGlvbjogMzAwLFxyXG4gICAgc2Nyb2xsVG9wOiAwLFxyXG4gICAgY29tbWVudHM6IDAsXHJcbiAgICBwb3B1bGFyaXR5OiAwLFxyXG4gICAgZnJvbVN3aXBlcjogXCJcIlxyXG4gIH0sXHJcblxyXG4gIG9uTG9hZChvcHRpb25zOiB7IGlkOiBzdHJpbmc7IGZyb21Td2lwZXI6IFwiMFwiIHwgXCIxXCIgfSkge1xyXG4gICAgY29uc3QgaW5kZXggPSBBUFAuZ2xvYmFsRGF0YS5kZXRhaWxzU2xpZGVJZHMuaW5kZXhPZihOdW1iZXIob3B0aW9ucy5pZCkpXHJcbiAgICB0aGlzLnN3aXRjaFN3aXBlckN1cnJlbnQoaW5kZXgpXHJcbiAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICBkZXRhaWxzSWQ6IG9wdGlvbnMuaWQsXHJcbiAgICAgIGZyb21Td2lwZXI6IG9wdGlvbnMuZnJvbVN3aXBlclxyXG4gICAgfSlcclxuICAgIGlmICh0aGlzLmRhdGEuZnJvbVN3aXBlciA9PT0gXCIxXCIpIHtcclxuICAgICAgdGhpcy5mZXRjaERldGFpbHNEYXRhKG9wdGlvbnMuaWQpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmZldGNoRGV0YWlsc0RhdGEob3B0aW9ucy5pZCwgaW5kZXgpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgaGFuZGxlU3dpcGVyQ2hhbmdlKGUpIHtcclxuICAgIGNvbnN0IG5ld1NsaWRlSW5kZXg6IG51bWJlciA9IGUuZGV0YWlsLmN1cnJlbnRcclxuICAgIGNvbnN0IG9sZFNsaWRlSW5kZXg6IG51bWJlciA9IHRoaXMuZGF0YS5zbGlkZUluZGV4XHJcblxyXG4gICAgaWYgKG9sZFNsaWRlSW5kZXggIT09IG5ld1NsaWRlSW5kZXgpIHtcclxuICAgICAgbGV0IGlkSW5kZXggPSBBUFAuZ2xvYmFsRGF0YS5kZXRhaWxzU2xpZGVJZHMuaW5kZXhPZihcclxuICAgICAgICBOdW1iZXIodGhpcy5kYXRhLmRldGFpbHNJZClcclxuICAgICAgKVxyXG4gICAgICBpZEluZGV4ID0gaWRJbmRleCAtIG9sZFNsaWRlSW5kZXggKyBuZXdTbGlkZUluZGV4XHJcbiAgICAgIGNvbnN0IGRldGFpbHNJZCA9IEFQUC5nbG9iYWxEYXRhLmRldGFpbHNTbGlkZUlkc1tpZEluZGV4XVxyXG4gICAgICB0aGlzLnNldERhdGEoeyBkZXRhaWxzSWQ6IFN0cmluZyhkZXRhaWxzSWQpIH0pXHJcbiAgICAgIHRoaXMuZmV0Y2hEZXRhaWxzRGF0YShkZXRhaWxzSWQsIGlkSW5kZXgpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLy8gcmljaC10ZXh05a+5aHRtbOagh+etvuaUr+aMgeW6puS4jeWkn++8jOmAmui/h+ato+WImeino+aekOabv+aNolxyXG4gIHJlcGxhY2VIdG1sKGh0bWwpIHtcclxuICAgIHJldHVybiBodG1sXHJcbiAgICAgIC5yZXBsYWNlKFxyXG4gICAgICAgIC88aW1nL2dpLFxyXG4gICAgICAgICc8aW1nIHN0eWxlPVwiZGlzcGxheTpibG9jazttYXgtd2lkdGg6MTAwJTtoZWlnaHQ6YXV0bzttYXJnaW46MTBweCBhdXRvXCIgJ1xyXG4gICAgICApXHJcbiAgICAgIC5yZXBsYWNlKFxyXG4gICAgICAgIC88aW1nLipjbGFzcz1cImF2YXRhclwiL2dpLFxyXG4gICAgICAgICc8aW1nIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MjBweDtoZWlnaHQ6MjBweDtib3JkZXItcmFkaXVzOjJweDttYXJnaW46IDVweCA1cHggLTVweCAwXCIgJ1xyXG4gICAgICApXHJcbiAgICAgIC5yZXBsYWNlKFxyXG4gICAgICAgIC88YSBocmVmPVwiaHR0cDpcXC9cXC93d3cuemhpaHUuY29tXFwvcXVlc3Rpb24uKlwiL2dpLFxyXG4gICAgICAgICc8YSBzdHlsZT1cImRpc3BhbHk6bm9uZVwiJ1xyXG4gICAgICApXHJcbiAgICAgIC5yZXBsYWNlKC88YS4qaGlkZGVuL2dpLCAnPGEgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIicpXHJcbiAgICAgIC5yZXBsYWNlKC88c2VjdGlvbi9nLCBcIjxkaXZcIilcclxuICAgICAgLnJlcGxhY2UoL1xcL3NlY3Rpb24+L2csIFwiZGl2PlwiKVxyXG4gIH0sXHJcblxyXG4gIGZldGNoRGV0YWlsc0RhdGEoZGV0YWlsc0lkLCBpZEluZGV4KSB7XHJcbiAgICBpZiAoIXRoaXMuY2FuRmV0Y2gpIHJldHVyblxyXG4gICAgdGhpcy5jYW5GZXRjaCA9IGZhbHNlXHJcbiAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiBcImh0dHBzOi8vbmV3cy1hdC56aGlodS5jb20vYXBpLzQvbmV3cy9cIiArIGRldGFpbHNJZCxcclxuICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgY29uc3QgeyBpbWFnZSwgdGl0bGUsIGJvZHksIGltYWdlX3NvdXJjZSB9ID0gPGFueT5yZXMuZGF0YVxyXG4gICAgICAgICAgdGhpcy5zZXREYXRhKFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgYXJ0aWNsZToge1xyXG4gICAgICAgICAgICAgICAgaW1hZ2UsXHJcbiAgICAgICAgICAgICAgICB0aXRsZSxcclxuICAgICAgICAgICAgICAgIGltYWdlX3NvdXJjZSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IHRoaXMucmVwbGFjZUh0bWwoYm9keSlcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGRldGFpbHNJZDogU3RyaW5nKGRldGFpbHNJZCksXHJcbiAgICAgICAgICAgICAgZHVyYXRpb246IDAsXHJcbiAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgICAvLyBzd2lwZXLmu5Hliqjml7bpl7QzMDBtcywg5a6a5pe25Zmo5LiN57K+56GuLCDlho3liqAxMDBtc1xyXG4gICAgICAgICAgICAgIGxldCB0OiBudW1iZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuRmV0Y2ggPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGlkSW5kZXggPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5zd2l0Y2hTd2lwZXJDdXJyZW50KGlkSW5kZXgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodClcclxuICAgICAgICAgICAgICB9LCA0MDApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgdGhpcy5jYW5GZXRjaCA9IHRydWVcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogXCJodHRwczovL25ld3MtYXQuemhpaHUuY29tL2FwaS80L3N0b3J5LWV4dHJhL1wiICsgZGV0YWlsc0lkLFxyXG4gICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICBjb25zdCB7IGNvbW1lbnRzLCBwb3B1bGFyaXR5IH0gPSA8YW55PnJlcy5kYXRhXHJcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBjb21tZW50cyxcclxuICAgICAgICAgICAgcG9wdWxhcml0eVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIHN3aXRjaFN3aXBlckN1cnJlbnQoaW5kZXgpIHtcclxuICAgIGNvbnN0IG1heEluZGV4ID0gQVBQLmdsb2JhbERhdGEuZGV0YWlsc1NsaWRlSWRzLmxlbmd0aCAtIDFcclxuICAgIGxldCBzbGlkZUluZGV4XHJcbiAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgc2xpZGVJbmRleCA9IDBcclxuICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IG1heEluZGV4KSB7XHJcbiAgICAgIHNsaWRlSW5kZXggPSAyXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzbGlkZUluZGV4ID0gMVxyXG4gICAgfVxyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgc2xpZGVJbmRleCxcclxuICAgICAgZHVyYXRpb246IDMwMFxyXG4gICAgfSlcclxuICB9XHJcbn0pXHJcbiJdfQ==