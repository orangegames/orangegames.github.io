/**
 * Created by linhao on 15/12/11.
 */

var ShareLayer = cc.Layer.extend({
    ctor:function (score) {
        this._super();
        this.loadConfig();
        this.loadUI();
        this.bindTouchListener();
        return true;
    },
    loadConfig : function() {
    },
    loadUI : function() {
        //ground
        var bg = new cc.Sprite(res.share_bg_png);
        bg.setPosition(ScreenSize.width / 2, ScreenSize.height / 2);
        bg.setScale(ScreenSize.width/bg.getContentSize().width);
        this.addChild(bg, 0);
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
        var target = event.getCurrentTarget();
        target.removeFromParent();
        return true;
    },
    // 事件[触摸移动]
    onTouchMoved: function (touch, event) {
    },
    // 事件[触摸结束]
    onTouchEnded: function (touch, event) {
    }

});


