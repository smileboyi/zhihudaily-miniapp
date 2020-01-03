"use strict";
Page({
    data: {
        longComments: [],
        shortComments: [],
        detailsId: "",
        comments: "0",
        open: false,
        fromSwiper: ""
    },
    onLoad: function (options) {
        var id = options.id, comments = options.comments, fromSwiper = options.fromSwiper;
        this.setData({
            detailsId: id,
            comments: comments,
            fromSwiper: fromSwiper
        });
        this.fetchCommentsData(id);
    },
    handleFoldClick: function () {
        this.setData({
            open: !this.data.open
        });
    },
    fetchCommentsData: function (id) {
        var _this = this;
        wx.request({
            url: "https://news-at.zhihu.com/api/4/story/" + id + "/long-comments",
            success: function (res) {
                if (res.statusCode === 200) {
                    _this.setData({
                        longComments: res.data.comments
                    });
                }
            },
            fail: function (err) {
                console.log(err);
            }
        });
        wx.request({
            url: "https://news-at.zhihu.com/api/4/story/" + id + "/short-comments",
            success: function (res) {
                if (res.statusCode === 200) {
                    _this.setData({
                        shortComments: res.data.comments
                    });
                }
            },
            fail: function (err) {
                console.log(err);
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmllLWNvbW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9yaWUtY29tbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBd0JBLElBQUksQ0FBeUI7SUFDM0IsSUFBSSxFQUFFO1FBQ0osWUFBWSxFQUFFLEVBQUU7UUFDaEIsYUFBYSxFQUFFLEVBQUU7UUFDakIsU0FBUyxFQUFFLEVBQUU7UUFDYixRQUFRLEVBQUUsR0FBRztRQUNiLElBQUksRUFBRSxLQUFLO1FBQ1gsVUFBVSxFQUFFLEVBQUU7S0FDZjtJQUVELE1BQU0sWUFBQyxPQUE2RDtRQUMxRCxJQUFBLGVBQUUsRUFBRSwyQkFBUSxFQUFFLCtCQUFVLENBQVk7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFNBQVMsRUFBRSxFQUFFO1lBQ2IsUUFBUSxVQUFBO1lBQ1IsVUFBVSxZQUFBO1NBQ1gsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtTQUN0QixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsaUJBQWlCLFlBQUMsRUFBRTtRQUFwQixpQkEyQkM7UUExQkMsRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNULEdBQUcsRUFBRSwyQ0FBeUMsRUFBRSxtQkFBZ0I7WUFDaEUsT0FBTyxFQUFFLFVBQUEsR0FBRztnQkFDVixJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFO29CQUMxQixLQUFJLENBQUMsT0FBTyxDQUFDO3dCQUNYLFlBQVksRUFBUSxHQUFHLENBQUMsSUFBSyxDQUFDLFFBQVE7cUJBQ3ZDLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUM7WUFDRCxJQUFJLEVBQUUsVUFBQSxHQUFHO2dCQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDbEIsQ0FBQztTQUNGLENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDVCxHQUFHLEVBQUUsMkNBQXlDLEVBQUUsb0JBQWlCO1lBQ2pFLE9BQU8sRUFBRSxVQUFBLEdBQUc7Z0JBQ1YsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtvQkFDMUIsS0FBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDWCxhQUFhLEVBQVEsR0FBRyxDQUFDLElBQUssQ0FBQyxRQUFRO3FCQUN4QyxDQUFDLENBQUE7aUJBQ0g7WUFDSCxDQUFDO1lBQ0QsSUFBSSxFQUFFLFVBQUEsR0FBRztnQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2xCLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcclxuXHJcbmludGVyZmFjZSBDb21tZW50IHtcclxuICBhdXRob3I6IHN0cmluZ1xyXG4gIGNvbnRlbnQ6IHN0cmluZ1xyXG4gIGF2YXRhcjogc3RyaW5nXHJcbiAgdGltZTogbnVtYmVyXHJcbiAgaWQ6IG51bWJlclxyXG4gIGxpa2VzOiBudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIFBhZ2VEYXRhIHtcclxuICBsb25nQ29tbWVudHM6IENvbW1lbnRbXVxyXG4gIHNob3J0Q29tbWVudHM6IENvbW1lbnRbXVxyXG4gIGRldGFpbHNJZDogc3RyaW5nXHJcbiAgY29tbWVudHM6IHN0cmluZ1xyXG4gIG9wZW46IGJvb2xlYW5cclxuICBmcm9tU3dpcGVyOiBzdHJpbmdcclxufVxyXG5pbnRlcmZhY2UgUGFnZUluc3RhbmNlIHtcclxuICBoYW5kbGVGb2xkQ2xpY2soKTogdm9pZFxyXG4gIGZldGNoQ29tbWVudHNEYXRhKGlkOiBzdHJpbmcpOiB2b2lkXHJcbn1cclxuXHJcblBhZ2U8UGFnZURhdGEsIFBhZ2VJbnN0YW5jZT4oe1xyXG4gIGRhdGE6IHtcclxuICAgIGxvbmdDb21tZW50czogW10sXHJcbiAgICBzaG9ydENvbW1lbnRzOiBbXSxcclxuICAgIGRldGFpbHNJZDogXCJcIixcclxuICAgIGNvbW1lbnRzOiBcIjBcIixcclxuICAgIG9wZW46IGZhbHNlLFxyXG4gICAgZnJvbVN3aXBlcjogXCJcIlxyXG4gIH0sXHJcblxyXG4gIG9uTG9hZChvcHRpb25zOiB7IGlkOiBzdHJpbmc7IGNvbW1lbnRzOiBzdHJpbmc7IGZyb21Td2lwZXI6IHN0cmluZyB9KSB7XHJcbiAgICBjb25zdCB7IGlkLCBjb21tZW50cywgZnJvbVN3aXBlciB9ID0gb3B0aW9uc1xyXG4gICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgZGV0YWlsc0lkOiBpZCxcclxuICAgICAgY29tbWVudHMsXHJcbiAgICAgIGZyb21Td2lwZXJcclxuICAgIH0pXHJcbiAgICB0aGlzLmZldGNoQ29tbWVudHNEYXRhKGlkKVxyXG4gIH0sXHJcblxyXG4gIGhhbmRsZUZvbGRDbGljaygpIHtcclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIG9wZW46ICF0aGlzLmRhdGEub3BlblxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBmZXRjaENvbW1lbnRzRGF0YShpZCkge1xyXG4gICAgd3gucmVxdWVzdCh7XHJcbiAgICAgIHVybDogYGh0dHBzOi8vbmV3cy1hdC56aGlodS5jb20vYXBpLzQvc3RvcnkvJHtpZH0vbG9uZy1jb21tZW50c2AsXHJcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcclxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGxvbmdDb21tZW50czogKDxhbnk+cmVzLmRhdGEpLmNvbW1lbnRzXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZmFpbDogZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgdXJsOiBgaHR0cHM6Ly9uZXdzLWF0LnpoaWh1LmNvbS9hcGkvNC9zdG9yeS8ke2lkfS9zaG9ydC1jb21tZW50c2AsXHJcbiAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcclxuICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHNob3J0Q29tbWVudHM6ICg8YW55PnJlcy5kYXRhKS5jb21tZW50c1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxufSlcclxuIl19