/****************************************************************************
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
/**
 * <p>cc.LoaderScene is a scene that you can load it when you loading files</p>
 * <p>cc.LoaderScene can present thedownload progress </p>
 * @class
 * @extends cc.Scene
 * @example
 * var lc = new cc.LoaderScene();
 */
cc.LoadingScene = cc.Scene.extend({
    _interval : null,
    _dudu : null,
    _className:"LoadingScene",
    cb: null,
    target: null,
    /**
     * Contructor of cc.LoaderScene
     * @returns {boolean}
     */
    init : function(){
        var self = this;

        // bg
        var bgLayer = self._bgLayer = new cc.LayerColor(cc.color(32, 32, 32, 255));
        self.addChild(bgLayer, 0);

        //image move to CCSceneFile.js
        var bg = new cc.Sprite(res.loading_bg_png);
        bg.setPosition(ScreenSize.width / 2, ScreenSize.height/2);
        bgLayer.addChild(bg, 4);

        //loading percent
        var dudu = self._dudu = new cc.Sprite(res.loading_dudu_png);
        dudu.setPosition(ScreenSize.width*0.15, ScreenSize.height *0.46);
        bgLayer.addChild(this._dudu, 10);
        return true;
    },

    _initStage: function (img, centerPos) {
        var self = this;
        var texture2d = self._texture2d = new cc.Texture2D();
        texture2d.initWithElement(img);
        texture2d.handleLoadedTexture();
        var logo = self._logo = new cc.Sprite(texture2d);
        logo.setScale(cc.contentScaleFactor());
        logo.x = centerPos.x;
        logo.y = centerPos.y;
        self._bgLayer.addChild(logo, 10);
    },
    /**
     * custom onEnter
     */
    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.3);
    },
    /**
     * custom onExit
     */
    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        //var tmpStr = "Loading... 0%";
        //this._label.setString(tmpStr);
        this.requestData();
    },

    initWithResources: function (resources, cb, target) {
        if(cc.isString(resources))
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
        this.target = target;
    },

    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        cc.loader.load(res,
            function (result, count, loadedCount) {
                var percent = loadedCount / count;
                percent = Math.min(percent, 100);
                self._dudu.setPosition(ScreenSize.width*(1.5 + 5.5 * percent)/10, self._dudu.getPosition().y);
            }, function () {
                if (self.cb)
                    self.cb.call(self.target);
            });
    },

    requestData : function(){
        var returnUrl = window.location.href;
        returnUrl = encodeURIComponent(returnUrl);

        //alert(location.href.split('#')[0]);
        var requesturl = "http://www.yinshuiyu.com/api/wx_share?id=1&return_url=" + returnUrl;
        var jsonp=document.createElement("script");
        jsonp.type="text/javascript";
        jsonp.src=requesturl;
        document.getElementsByTagName("head")[0].appendChild(jsonp);//跨域调用JSON数据
    }
});

cc.LoadingScene.preload = function(resources, cb, target){
    var _cc = cc;
    if(!_cc.loaderScene) {
        _cc.loaderScene = new cc.LoadingScene();
        _cc.loaderScene.init();
    }
    _cc.loaderScene.initWithResources(resources, cb, target);

    cc.director.runScene(_cc.loaderScene);
    return _cc.loaderScene;
};

sharejson = function(o) {
    //o=eval(’(’+o+’)’);

    wx.config({
        debug:  o["result"], // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId:  o["app_id"], // 必填，公众号的唯一标识
        timestamp:  o["timestamp"], // 必填，生成签名的时间戳
        nonceStr: o["noncestr"], // 必填，生成签名的随机串
        signature: o["signature"],// 必填，签名，见附录1
        jsApiList: ['onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function(){

        //alert("weichart ready");

// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });


    wx.error(function(res){
        //alert("weichart error:"+res);

// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });

};