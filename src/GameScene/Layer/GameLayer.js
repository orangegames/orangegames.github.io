/**
 * Created by linhao on 15/12/11.
 */

var GameLayer = cc.LayerColor.extend({
    _viruses : [],
    _pills : [],
    _scoreLabel : null,
    _score : 0,
    _isRevived : false,
    _pause : false,
    _time : 0,
    _generateTimes : 0,
    _generatePillTimes : 0,

    _addVirusTime : 0,
    _addPillTime : 3,
    ctor:function () {
        this._super(cc.color(255 ,255, 2555, 255), ScreenSize.width, ScreenSize.height);;
        this.loadConfig();
        this.loadBackground();
        this.bindTouchListener();
        return true;
    },
    loadConfig : function() {
        this._viruses = [];
        this._pills = [];
        this._score = 0;
        this._isRevived = false;
        this._pause = false;
        this._time = 0;
        this._generateTimes = 0;
        this._generatePillTimes = 0;
    },
    loadBackground : function(){
        //ground
        this._bg = new cc.Sprite(res.play_bg_png);
        this._bg.setPosition(ScreenSize.width / 2, ScreenSize.height / 2);
        this.addChild(this._bg, 0);

    },
    onEnter:function () {
        this._super();

        var text = new cc.LabelTTF("得分", "Arial", 50);
        text.setPosition(ScreenSize.width*0.50, ScreenSize.height * 0.95);
        text.setColor(cc.color.BLACK);
        this.addChild(text, 1);

        this._scoreLabel = new cc.LabelTTF("0", "Arial", 50);
        this._scoreLabel.setPosition(ScreenSize.width*0.60, ScreenSize.height * 0.95);
        this._scoreLabel.setColor(cc.color.BLACK);
        this._scoreLabel.setAnchorPoint(0, 0.5);
        this.addChild(this._scoreLabel, 1);

        this.scheduleUpdate();
    },
    update:function(dt) {
        if(this._pause){
            return;
        }

        //remove virus and pill
        for(var idx = 0; idx < this._pills.length; idx++){
            var pill = this._pills[idx];
            var topy = pill.getPosition().y + pill.getContentSize().height/2;
            if(topy >= DANGER_LINE_HEIGHT){
                pill.clear();
                this._pills.splice(idx, 1);
                idx--;
            }
        }

        for(var idx = 0; idx < this._viruses.length; idx++){
            var virus = this._viruses[idx];
            var topy = virus.getPosition().y + virus.getContentSize().height/2;
            if(topy >= DANGER_LINE_HEIGHT){
                this._pause = true;
                virus.clear(this, this.gameOver);
                this._viruses.splice(idx, 1);

                return;
            }
        }

        //update virus and pill
        for(var idx = 0; idx < this._pills.length; idx++) {
            var pill = this._pills[idx];
            pill.update(dt);
        }

        for(var idx = 0; idx < this._viruses.length; idx++) {
            var virus = this._viruses[idx];
            virus.update(dt);
        }

        //add new  virus and pill
        this._time += dt;

        this._addVirusTime -= dt;
        if(this._addVirusTime <= 0){
            var addTime = 0.08;
            if(this._time > 20){
                addTime = 1.2 - this._time/80;
            }else{
                addTime = 0.95 - (this._time - 20)/70;
            }

            addTime += util.getRandomFloat(-0.2, 0.2);

            if(addTime < 0.08){
                addTime = 0.08;
            }
            this._addVirusTime = addTime;

            this._addPillTime--;
            if(this._addPillTime <= 0){
                this.addPill();
                this._generatePillTimes++;
            }else{
                var addCount = 1;
                if(this._time >= 20){
                    addCount = util.getRandomNumber(1, 3);
                }else if(this._time >= 5){
                    addCount = util.getRandomNumber(1,2);
                }

                if(addCount === 1){
                    this.addVirus();
                }else if(addCount === 2){
                    this.addVirus(0, ScreenSize.width*0.5);
                    this.addVirus(ScreenSize.width*0.5, ScreenSize.width);
                }else{
                    this.addVirus(0, ScreenSize.width*0.5);
                    this.addVirus(ScreenSize.width*0.33, ScreenSize.width);
                    this.addVirus(ScreenSize.width*0.67, ScreenSize.width);
                }

            }
            this._generateTimes++;
        }

        this._scoreLabel.setString(this._score);
    },
    addPill:function() {
        var speed = START_SPEED + this._time * 8;
        if(speed > MAX_SPEED){
            speed = MAX_SPEED;
        }
        var pill = new Pill(speed);
        var x = util.getRandomFloat(pill.getContentSize().width/2, ScreenSize.width - pill.getContentSize().width/2);
        var y = -pill.getContentSize().height/2;
        pill.setPosition(x , y);
        this.addChild(pill, 1);
        this._pills.push(pill);

        var min = 5 - Math.floor(this._time / 60);
        if(min < 2){
            min = 2;
        }
        var max = 10 - Math.floor(this._time / 36);
        if(max < 5){
            max  = 5;
        }
        this._addPillTime = util.getRandomNumber(min, max);

        if((this._generatePillTimes % 2) === 0){
            var minX = 0;
            var maxX = ScreenSize.width;
            if(x <= ScreenSize.width/2){
                minX = x + pill.getContentSize().width/2;
            }else{
                maxX = x - pill.getContentSize().width/2;
            }
            this.addVirus(minX, maxX);
        }
    },
    addVirus:function(minX, maxX) {
        var score = Math.ceil(this._time / 10);
        if(score > 10){
            score = 10;
        }
        var speed = START_SPEED + this._time * 8;
        if(speed > MAX_SPEED){
            speed = MAX_SPEED;
        }
        var virus = new Virus(speed, score);
        var x = 0;
        if(minX === undefined || maxX === undefined){
            x = util.getRandomFloat(virus.getContentSize().width/2, ScreenSize.width - virus.getContentSize().width/2);
        }else{
            x = util.getRandomFloat(minX + virus.getContentSize().width/2, maxX - virus.getContentSize().width/2);
        }

        var y = -virus.getContentSize().height/2;
        virus.setPosition(x , y);
        this.addChild(virus, 1);
        this._viruses.push(virus);
    },
    gameOver:function(sender) {
        this._pause = true;

        if(this._isRevived){
            cc.sys.localStorage.setItem("my_score", String(this._score));
            this.requestData();
        }else{
            this._isRevived = true;

            var reviveLayer = new ReviveLayer(this);
            this.addChild(reviveLayer, 100);
        }
    },
    revive:function() {
        //remove virus and pill
        for(var idx = 0; idx < this._pills.length; idx++){
            var pill = this._pills[idx];
            this._pills.splice(idx, 1);
            pill.clear();
            idx--;
        }

        for(var idx = 0; idx < this._viruses.length; idx++){
            var virus = this._viruses[idx];
            this._viruses.splice(idx, 1);
            virus.clear();
            idx--;
        }
        this._pause = false;
    },
    bindTouchListener : function(){
        var listener = cc.EventListener.create({
            event           : cc.EventListener.TOUCH_ONE_BY_ONE,
            target          : this,
            swallowTouches  : true,
            onTouchBegan    : this.onTouchBegan,
            onTouchMoved    : this.onTouchMoved,
            onTouchEnded    : this.onTouchEnded
        });
        cc.eventManager.addListener(listener, this);
    },
    requestData : function(){
        var fuid = cc.sys.localStorage.getItem("fid_key");

        //fuid = "111";
        //var returnUrl = "http://orangegames.github.io/index.html";
        var returnUrl = window.location.href;

        var returnUrl = encodeURIComponent(returnUrl);
        //var requesturl = "http://www.yinshuiyu.com/api/wx_rank?fuid=" + fuid + "&return_url=" + returnUrl + "&score=" + this._score;
        var requesturl = "http://www.yinshuiyu.com/api/wx_rank?fuid=" + fuid + "&score=" + this._score;



        var jsonp=document.createElement("script");
        jsonp.type="text/javascript";
        jsonp.src=requesturl;

        //if(document.getElementsByTagName("head")[0].hasChildNodes()){
        //    document.getElementsByTagName("head")[0].removeChild(jsonp);
        //}

        document.getElementsByTagName("head")[0].appendChild(jsonp);//跨域调用JSON数据
    },
    // 事件[触摸开始]
    onTouchBegan: function (touch, event) {
        //cc.log("onTouchBegan");
        var target = event.getCurrentTarget();

        if(target._pause === true){
            return false;
        }

        cc.director.drawScene();

        var location = touch._point;

        for(var idx = 0; idx < target._pills.length; idx++) {
            var pill = target._pills[idx];
            var rect = pill.getBoundingBox();
            rect = util.increaseTouchArea(rect);

            if(cc.rectContainsPoint(rect, location)){
                target._pause = true;
                pill.clear(target, target.gameOver);
                return true;
            }
        }

        for(var idx = 0; idx < target._viruses.length; idx++) {
            var virus = target._viruses[idx];
            var rect = virus.getBoundingBox();
            rect = util.increaseTouchArea(rect);
            if(cc.rectContainsPoint(rect, location)){
                virus.clear();
                target._viruses.splice(idx, 1);
                target._score += virus._score;
                return true;
            }
        }


        return true;
    },
    // 事件[触摸移动]
    onTouchMoved: function (touch, event) {
        //var target = this.target;
        //cc.log("onTouchMoved");
    },
    // 事件[触摸结束]
    onTouchEnded: function (touch, event) {
        //var target = this.target;
        //cc.log("onTouchEnded");
    }
});

urljson = function(o) {
    //o=eval(’(’+o+’)’);

    cc.sys.localStorage.setItem("rank_mine", o["rank"]);
    cc.sys.localStorage.setItem("rank1_img", o["top_score"][0]["icon"]);
    cc.sys.localStorage.setItem("rank1_score", o["top_score"][0]["score"]);
    cc.sys.localStorage.setItem("rank1_name", o["top_score"][0]["username"]);
    cc.sys.localStorage.setItem("rank2_img", o["top_score"][1]["icon"]);
    cc.sys.localStorage.setItem("rank2_score", o["top_score"][1]["score"]);
    cc.sys.localStorage.setItem("rank2_name", o["top_score"][1]["username"]);
    cc.sys.localStorage.setItem("rank3_img", o["top_score"][2]["icon"]);
    cc.sys.localStorage.setItem("rank3_score", o["top_score"][2]["score"]);
    cc.sys.localStorage.setItem("rank3_name", o["top_score"][2]["username"]);

    var score = parseInt(cc.sys.localStorage.getItem("my_score"));
    cc.director.runScene(new GameOverScene(score));

};