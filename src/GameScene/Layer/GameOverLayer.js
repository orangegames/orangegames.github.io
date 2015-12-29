/**
 * Created by linhao on 15/12/11.
 */

var GameOverLayer = cc.LayerColor.extend({
    _score: 0,
    _rankIdx: 0,
    ctor:function (score) {
        this._score = score;
        this._super(cc.color(255 ,255, 2555, 255), ScreenSize.width, ScreenSize.height);
        this.loadConfig();
        this.loadUI();
        return true;
    },
    loadConfig : function() {
    },
    loadUI : function(){
        //ground
        this._bg1 = new cc.Sprite(res.gameover_bg_png);
        this._bg1.setPosition(ScreenSize.width / 2, ScreenSize.height / 2);
        this.addChild(this._bg1, 0);


        //score
        var text = "" + this._score;
        var scoreLabel = new cc.LabelTTF(text, "Arial", 90);
        scoreLabel.setPosition(ScreenSize.width*0.50, ScreenSize.height * 0.72);
        scoreLabel.setColor(cc.color.BLACK);
        this.addChild(scoreLabel, 1);

        var rank = cc.sys.localStorage.getItem("rank_mine");
        var rank1Img = cc.sys.localStorage.getItem("rank1_img");
        var rank1Score = cc.sys.localStorage.getItem("rank1_score");
        var rank1Name = cc.sys.localStorage.getItem("rank1_name");
        var rank2Img = cc.sys.localStorage.getItem("rank2_img");
        var rank2Score = cc.sys.localStorage.getItem("rank2_score");
        var rank2Name = cc.sys.localStorage.getItem("rank2_name");
        var rank3Img = cc.sys.localStorage.getItem("rank3_img");
        var rank3Score = cc.sys.localStorage.getItem("rank3_score");
        var rank3Name = cc.sys.localStorage.getItem("rank3_name");

        var LeaderboardInfo = [{"name": rank1Name, "score": rank1Score, "img": rank1Img},{"name": rank2Name, "score": rank2Score, "img": rank2Img},{"name": rank3Name, "score": rank3Score, "img": rank3Img}];
        //Leaderboard

        var self = this;


        for(var idx = 0; idx < 3; idx++){
            self._rankIdx = idx;

            if(idx === 0){
                cc.loader.loadImg(LeaderboardInfo[idx]["img"],{isCrossOrigin : false },function(res,tex){
                    self.loadImg(tex, 0);
                });
            }else if(idx === 1){
                cc.loader.loadImg(LeaderboardInfo[idx]["img"],{isCrossOrigin : false },function(res,tex){
                    self.loadImg(tex, 1);
                });
            }else{
                cc.loader.loadImg(LeaderboardInfo[idx]["img"],{isCrossOrigin : false },function(res,tex){
                    self.loadImg(tex, 2);
                });
            }

            //var avatar = new cc.Sprite(rank1Img);
            //avatar.setPosition(ScreenSize.width*0.21, ScreenSize.height *( 0.56 - idx*0.078));
            //this.addChild(avatar, 1);

            var nameLabel = new cc.LabelTTF(LeaderboardInfo[idx]["name"], "Arial", 60);
            nameLabel.setPosition(ScreenSize.width*0.28, ScreenSize.height * ( 0.56 - idx*0.078));
            nameLabel.setAnchorPoint(0, 0.5);
            nameLabel.setColor(cc.color.BLACK);
            this.addChild(nameLabel, 1);

            var scoreLabel = new cc.LabelTTF(LeaderboardInfo[idx]["score"], "Arial", 60);
            scoreLabel.setPosition(ScreenSize.width*0.92, ScreenSize.height *( 0.56 - idx*0.078));
            scoreLabel.setAnchorPoint(1, 0.5);
            scoreLabel.setColor(cc.color.BLACK);
            this.addChild(scoreLabel, 1);
        }
        //this.addRank("喵的鱼", "987654321", ScreenSize.height * )

        var rangeLabel = new cc.LabelTTF("您排在 第"+rank+"名", "Arial", 60);
        rangeLabel.setPosition(ScreenSize.width*0.50, ScreenSize.height * 0.33);
        rangeLabel.setColor(cc.color.BLACK);
        this.addChild(rangeLabel, 1);

        var buttonAgain = new cc.MenuItemImage(res.btn_playagain_png,res.btn_playagain_png,res.btn_playagain_png, this.retry, this);
        var menu1 = new cc.Menu(buttonAgain);
        menu1.setPosition(ScreenSize.width*0.5, ScreenSize.height*0.25);
        this.addChild(menu1, 1);


        var buttonDownload = new cc.MenuItemImage(res.btn_download_png,res.btn_download_png,res.btn_download_png, this.download, this);
        var menu2 = new cc.Menu(buttonDownload);
        menu2.setPosition(ScreenSize.width*0.25, ScreenSize.height*0.12);
        this.addChild(menu2,1);


        var buttonShare = new cc.MenuItemImage(res.btn_share_png,res.btn_share_png,res.btn_share_png, this.shareGame, this);
        var menu3 = new cc.Menu(buttonShare);
        menu3.setPosition(ScreenSize.width*0.75, ScreenSize.height*0.12);
        this.addChild(menu3, 1);

    },
    loadImg: function (img, idx) {
        var self = this;
        var texture2d  = new cc.Texture2D();
        texture2d.initWithElement(img);
        texture2d.handleLoadedTexture();
        var logoWidth = img.width;
        var logoHeight = img.height;
        var avatar = new cc.Sprite(texture2d);
        avatar.setScaleX(96/logoWidth);
        avatar.setScaleY(96/logoHeight);
        avatar.setPosition(ScreenSize.width*0.21, ScreenSize.height *( 0.56 - idx*0.078));
        self.addChild(avatar, 1);
    },
    addRank: function (name, score, y) {

        var avatar = new cc.Sprite(res.avatar_png);
        avatar.setPosition(ScreenSize.width*0.21, y);
        this.addChild(avatar, 1);

        var nameLabel = new cc.LabelTTF(name, "Arial", 60);
        nameLabel.setPosition(ScreenSize.width*0.28, y);
        nameLabel.setAnchorPoint(0, 0.5);
        nameLabel.setColor(cc.color.BLACK);
        this.addChild(nameLabel, 1);

        var scoreLabel = new cc.LabelTTF(score, "Arial", 60);
        scoreLabel.setPosition(ScreenSize.width*0.92, y);
        scoreLabel.setAnchorPoint(1, 0.5);
        scoreLabel.setColor(cc.color.BLACK);
        this.addChild(scoreLabel, 1);
    },

    retry: function (sender) {

        cc.director.runScene(new GameScene());
    },
    download: function (sender) {

    },
    shareGame: function (sender) {

        //WeixinApi.shareToTimeline(WeChartData,WeChartCallbacks);

        var title = "我在对抗病毒的战斗中得到了"+this._score+"分  你行你试试？";
        var returnUrl = window.location.href;
        returnUrl = encodeURIComponent(returnUrl);

        var imgURL = "http://a2.mzstatic.com/us/r30/Purple69/v4/5b/42/12/5b4212b5-43e8-795f-905f-b94d8f6e0566/icon175x175.png";
        imgURL = encodeURIComponent(imgURL);
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: returnUrl, // 分享链接
            imgUrl: imgURL, // 分享图标
            success: function () {
// 用户确认分享后执行的回调函数
            },
            cancel: function () {
// 用户取消分享后执行的回调函数
            }
        });
    }
});


