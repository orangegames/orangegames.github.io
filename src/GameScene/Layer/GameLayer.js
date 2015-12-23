/**
 * Created by linhao on 15/12/11.
 */

var GameLayer = cc.Layer.extend({
    _viruses : [],
    _pills : [],
    _scoreLabel : null,
    _score : 0,
    _isRevived : false,
    _pause : false,
    _time : 0,

    _addVirusTime : 0,
    _addPillTime : 3,
    ctor:function () {
        this._super();
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
            var addTime = 1.2 - this._time/80;
            addTime += util.getRandomFloat(-0.2, 0.2);
            if(addTime < 0.05){
                addTime = 0.05;
            }
            this._addVirusTime = addTime;

            this._addPillTime--;
            if(this._addPillTime <= 0){
                this.addPill();
            }else{
                this.addVirus();
            }
        }


        this._scoreLabel.setString(this._score);
    },
    addPill:function() {
        var speed = DANGER_LINE_HEIGHT/2.5 + this._time * 20;
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
    },
    addVirus:function() {
        var score = Math.ceil(this._time / 10);
        if(score > 10){
            score = 10;
        }
        var speed = DANGER_LINE_HEIGHT/2.5 + this._time * 20;
        var virus = new Virus(speed, score);
        var x = util.getRandomFloat(virus.getContentSize().width/2, ScreenSize.width - virus.getContentSize().width/2);
        var y = -virus.getContentSize().height/2;
        virus.setPosition(x , y);
        this.addChild(virus, 1);
        this._viruses.push(virus);
    },
    gameOver:function(sender) {
        this._pause = true;

        if(this._isRevived){
            cc.director.runScene(new GameOverScene(this._score));
        }else{
            this._isRevived = true;

            var reviveLayer = new ReviveLayer(this);
            this.addChild(reviveLayer, 100);
        }
    },
    revive:function() {
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