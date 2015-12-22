/**
 * Created by linhao on 15/12/11.
 */

var StartLayer = cc.Layer.extend({
    _bg : null,
    _startText : null,
    _ship : null,
    _virus1 : null,
    _virus2 : null,
    _virus3 : null,
    _wind : null,
    _leap : null,
    ctor:function () {
        this._super();
        this.loadBackground();
        return true;
    },
    loadBackground : function(){

        //ground
        this._bg = new cc.Sprite(res.start_bg_png);
        this._bg.setPosition(ScreenSize.width / 2, ScreenSize.height / 2);
        this.addChild(this._bg, 0);
    },
    onEnter:function () {
        this._super();

        //0
        this._ship = new cc.Sprite(res.ship_png);
        this._ship.setPosition(0, ScreenSize.height+this._ship.getContentSize().height / 2);
        this.addChild(this._ship, 10);

        this._ship.setScale(0.01);


        var shipPos = cc.p(ScreenSize.width*0.40, ScreenSize.height*0.65);
        var move = cc.moveTo(2, shipPos);
        move.easing(cc.easeInOut(2.0));

        var rotate = cc.rotateBy(2, 360 * 2);
        rotate.easing(cc.easeInOut(2.0));

        var scale = cc.scaleTo(2, 1);
        scale.easing(cc.easeInOut(2.0));

        var ac = cc.spawn(move, rotate, scale);

        var scale1 = cc.scaleTo(0.2, 1.3);
        var scale2 = cc.scaleTo(0.2, 1.0);

        var shipDelayTime = cc.delayTime(3);
        var shipFadeOut = cc.fadeOut(1.5);

        ac = cc.sequence(ac, scale1, scale2,shipDelayTime,shipFadeOut);
        this._ship.runAction(ac);


        //2.4
        this._wind = new cc.Sprite(res.wind_png);
        this._wind.setPosition(ScreenSize.width*0.85, ScreenSize.height*0.74);
        this.addChild(this._wind, 2);

        this._wind.setOpacity(0);

        var delayTime = cc.delayTime(2.4);
        var fadeIn = cc.fadeIn(2);
        var windac = cc.sequence(delayTime, fadeIn);
        this._wind.runAction(windac);

        this._leap = new cc.Sprite(res.leap_png);
        this._leap.setPosition(ScreenSize.width*0.79, ScreenSize.height*0.67);
        this.addChild(this._leap, 2);

        this._leap.setOpacity(0);
        var delayTime1 = cc.delayTime(2.4);
        var fadeIn1 = cc.fadeIn(2);
        var leapAc = cc.sequence(delayTime1, fadeIn1);
        this._leap.runAction(leapAc);


        //2.4
        var pos = this._ship.getPosition();
        this._virus1 = new cc.Sprite(res.virus_1_png);
        this._virus1.setPosition(shipPos);
        this.addChild(this._virus1, 5);
        this._virus1.setScale(0.5);
        this._virus1.setOpacity(0);
        var v1DelayTime = cc.delayTime(2.4);
        var v1FadeIn = cc.fadeIn(0);
        var v1moveTo = cc.moveTo(1, ScreenSize.width*0.26, ScreenSize.height*0.35);//371 , 556
        var v1scale = cc.scaleTo(1, 1);
        var v1ac = cc.spawn(v1moveTo, v1scale);
        v1ac = cc.sequence(v1DelayTime, v1FadeIn, v1ac);
        this._virus1.runAction(v1ac);


        this._virus2 = new cc.Sprite(res.virus_2_png);
        this._virus2.setPosition(shipPos);
        this.addChild(this._virus2, 5);
        this._virus2.setScale(0.5);
        this._virus2.setOpacity(0);
        var v2DelayTime = cc.delayTime(2.4);
        var v2FadeIn = cc.fadeIn(0);
        var v2moveTo = cc.moveTo(1, ScreenSize.width*0.54, ScreenSize.height*0.37);//371 , 556
        var v2scale = cc.scaleTo(1, 1);
        var v2ac = cc.spawn(v2moveTo, v2scale);
        v2ac = cc.sequence(v2DelayTime, v2FadeIn, v2ac);
        this._virus2.runAction(v2ac);

        this._virus3 = new cc.Sprite(res.virus_3_png);
        this._virus3.setPosition(shipPos);
        this.addChild(this._virus3, 5);
        this._virus3.setScale(0.5);
        this._virus3.setOpacity(0);
        var v3DelayTime = cc.delayTime(2.4);
        var v3FadeIn = cc.fadeIn(0);
        var v3moveTo = cc.moveTo(1, ScreenSize.width*0.82, ScreenSize.height*0.38);//371 , 556
        var v3scale = cc.scaleTo(1, 1);
        var v3ac = cc.spawn(v3moveTo, v3scale);
        v3ac = cc.sequence(v3DelayTime, v3FadeIn, v3ac);
        this._virus3.runAction(v3ac);

        //6.9
        this._startText = new cc.Sprite(res.start_text_png);
        this._startText.setPosition(ScreenSize.width*0.5, ScreenSize.height*0.70);
        this.addChild(this._startText, 10);
        this._startText.setOpacity(0);

        var textDelayTime = cc.delayTime(7);
        var textFadeIn = cc.fadeIn(3);
        var textac = cc.sequence(textDelayTime, textFadeIn);
        this._startText.runAction(textac);

        //9.9
        var button = new cc.MenuItemImage(res.btn_startbattle_png,res.btn_startbattle_png,res.btn_startbattle_png, this.startBattle, this);

        var menu = new cc.Menu(button);
        menu.setPosition(ScreenSize.width*0.5, ScreenSize.height*0.16);
        this.addChild(menu);
        //button.setOpacity(0);
        button.setScale(0.1);

        var buttonDelayTime = cc.delayTime(9.9);
        var buttonFadeIn = cc.fadeIn(0);
        var buttonScale1 = cc.scaleTo(0.25, 1.3);
        buttonScale1.easing(cc.easeOut(3.0));

        var buttonScale2 = cc.scaleTo(0.07, 1);
        var buttonac = cc.sequence(buttonDelayTime, buttonFadeIn, buttonScale1, buttonScale2);
        button.runAction(buttonac);
    },
    startBattle: function (sender) {

        cc.director.runScene(new GameScene());
    }
});