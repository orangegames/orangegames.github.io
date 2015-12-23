/**
 * Created by linhao on 15/12/11.
 */

var GameOverLayer = cc.Layer.extend({
    _score: 0,
    ctor:function (score) {
        this._score = score;
        this._super();
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

        var LeaderboardInfo = [{"name": "喵的鱼", "score": "987654321"},{"name": "远方的霾", "score": "66554433"},{"name": "王子的拉轰", "score": "63651"}];
        //Leaderboard
        for(var idx = 0; idx < 3; idx++){
            var avatar = new cc.Sprite(res.avatar_png);
            avatar.setPosition(ScreenSize.width*0.21, ScreenSize.height *( 0.56 - idx*0.078));
            this.addChild(avatar, 1);

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

        var rangeLabel = new cc.LabelTTF("您排在 第213581名", "Arial", 60);
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
    }
});