
var ScreenSize = {
    width : 960,
    height : 1440
};

var DANGER_LINE_HEIGHT = 1282;

var ACTOR_TOUCH_ADD = 30;

var DANGER_LINE_HEIGHT = 1282;

var START_SPEED = 752;

var MAX_SPEED = 920;

var WeChartData = {
    "appId": "wx735041db0b1acfa8", // 服务号可以填写appId
    "imgUrl": "http://upyun.cocimg.com/cocoachina/cocos_logo.png",
    "link": "http://orangegames.github.io",
    "desc": "hi",
    "title": "嘟嘟打病毒"
};

// 分享的回调
var WeChartCallbacks = {
    // 收藏操作是否触发回调，默认是开启的
    favorite : false,

    // 分享操作开始之前
    ready : function() {
        // 你可以在这里对分享的数据进行重组
        alert("准备分享");
    },
    // 分享被用户自动取消
    cancel : function(resp) {
        // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
        alert("分享被取消，msg=" + resp.err_msg);
    },
    // 分享失败了
    fail : function(resp) {
        // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
        alert("分享失败，msg=" + resp.err_msg);
    },
    // 分享成功
    confirm : function(resp) {
        // 分享成功了，我们是不是可以做一些分享统计呢？
        alert("分享成功，msg=" + resp.err_msg);
    },
    // 整个分享过程结束
    all : function(resp,shareTo) {
        // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
        alert("分享" + (shareTo ? "到" + shareTo : "") + "结束，msg=" + resp.err_msg);
    }
};

