/**
 * Created by linhao on 15/12/11.
 */

var GameOverScene = cc.Scene.extend({
    _gameOverLayer : null,
    _score: 0,
    ctor: function (score) {
        this._score = score;
        this._super();

    },
    onEnter:function () {
        this._super();

        this._gameOverLayer = new GameOverLayer(this._score);
        this.addChild(this._gameOverLayer, 0);

    }

});

