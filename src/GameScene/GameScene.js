/**
 * Created by linhao on 15/12/11.
 */

var GameScene = cc.Scene.extend({
    _gameLayer : null,
    _reviveLayer : null,

    ctor: function () {

        this._super();

    },
    onEnter:function () {
        this._super();

        this._gameLayer = new GameLayer();
        this.addChild(this._gameLayer, 0);

    }

});

