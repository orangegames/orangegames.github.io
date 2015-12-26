

cc.game.onStart = function(){

    var logintagStr = cc.sys.localStorage.getItem("login_tag");
    var logintag = logintagStr ? parseInt(logintagStr) : 0;

    if(logintag === 0){
        cc.sys.localStorage.setItem("login_tag", 1);

        var fid = cc.sys.localStorage.getItem("fid_key");

        if(fid){

        }else{
            var myDate = new Date();
            var time = myDate.getTime();
            var end = Math.floor(Math.random()*10000);
            fid = String(time) + String(end);
            var len = fid.length;
            var start = len - 10;
            fid = fid.substr(start, 10);
            cc.sys.localStorage.setItem("fid_key", fid);
        }

        //fid = "111";

        var returnUrl = window.location.href;
        //var returnUrl = "http://orangegames.github.io/index.html";

        returnUrl = encodeURIComponent(returnUrl);
        window.location.href = "http://www.yinshuiyu.com/api/wx_login?fuid=" + fid + "&id=2&return_url=" + returnUrl;
    }else{
        cc.sys.localStorage.setItem("login_tag", 0);
        if(!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
            document.body.removeChild(document.getElementById("cocosLoading"));

        // Pass true to enable retina display, disabled by default to improve performance
        cc.view.enableRetina(false);
        // Adjust viewport meta
        cc.view.adjustViewPort(true);
        // Setup the resolution policy and design resolution size
        cc.view.setDesignResolutionSize(ScreenSize.width, ScreenSize.height, cc.ResolutionPolicy.SHOW_ALL);
        // The game will be resized when browser size change
        cc.view.resizeWithBrowserSize(true);
        //load resources
        cc.LoadingScene.preload(g_resources, function () {
            cc.director.runScene(new StartScene());
        }, this);
    }
};
cc.game.run();

//"external/WeixinApi.js"