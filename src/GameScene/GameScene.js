/**
 * Created by linhao on 15/12/11.
 */

var GameScene = cc.Scene.extend({
    _gameLayer : null,
    _reviveLayer : null,

    ctor: function () {

        this._super();
        // 加载资源
        this.loadResource();
    },
    loadResource : function(){
        cc.spriteFrameCache.addSpriteFrames(res.clear_ac_plist);
    },
    onEnter:function () {
        this._super();

        this._gameLayer = new GameLayer();
        this.addChild(this._gameLayer, 0);
    }
});

