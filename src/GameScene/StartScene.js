/**
 * Created by linhao on 15/12/11.
 */

var StartScene = cc.Scene.extend({
    backgroundLayer : null,
    startLayer : null,

    ctor: function () {
        this._super();

    },
    onEnter:function () {
        this._super();
        this.startLayer = new StartLayer();
        this.addChild(this.startLayer, 0);
    }
});

