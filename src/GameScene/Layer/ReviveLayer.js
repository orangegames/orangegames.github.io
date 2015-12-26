/**
 * Created by linhao on 15/12/11.
 */

var ReviveLayer = cc.LayerColor.extend({
    _bg1 : null,
    _bg2 : null,
    _target : null,
    ctor:function (target) {
        this._target = target;
        this._super(cc.color(255 ,255, 2555, 255), ScreenSize.width, ScreenSize.height);
        this.loadBackground();
        return true;
    },
    loadBackground : function(){

        //ground
        this._bg1 = new cc.Sprite(res.revive_bg_1_png);
        this._bg1.setPosition(ScreenSize.width / 2, ScreenSize.height / 2);
        this.addChild(this._bg1, 0);

        this._bg2 = new cc.Sprite(res.revive_bg_2_png);
        this._bg2.setPosition(ScreenSize.width / 2, ScreenSize.height / 2);
        this.addChild(this._bg2, 1);
        this._bg2.setOpacity(0);

        var button = new cc.MenuItemImage(res.btn_revive_png,res.btn_revive_png,res.btn_revive_png, this.reviveAction, this);
        var menu = new cc.Menu(button);
        menu.setPosition(ScreenSize.width*0.51, ScreenSize.height*0.179);
        this.addChild(menu, 3);
    },
    onEnter:function () {
        this._super();

    },
    reviveAction: function (sender) {
        this._bg2.setOpacity(255);

        var ac1 = cc.delayTime(0.1);
        var ac2 = cc.fadeOut(0);
        var ac3 = cc.delayTime(0.1);
        var ac4 = cc.fadeIn(0);
        var ac5 = cc.delayTime(0.1);
        var ac6 = cc.fadeOut(0);
        var ac7 = cc.delayTime(0.2);

        var bl = cc.blink(0.5, 2);

        var callBack = cc.callFunc(this.revive, this);
        var ac = cc.sequence(ac1, ac2, ac3, ac4, ac5, ac6, ac7, callBack);
        this._bg2.runAction(ac);
    },
    revive: function (sender) {
        this._target.revive();
        this.removeFromParent();
    }
});