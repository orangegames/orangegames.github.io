/**
 * Created by linhao on 15/4/2.
 */

var BaseActor = cc.Sprite.extend({
    _speed : 0,

    ctor : function(speed){
        this._super(res.pill_png);
        return true;
    },
    update:function(dt){
        var position = this.getPosition();
        position = cc.p(position.x, position.y + dt * this._speed);
        this.setPosition(position);
    },
    clear : function(target,callback){
        var animFrames = [];
        for (var i = 0; i <= 2; i++) {
            var str = "#clear_ac"+ i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = new cc.Animation(animFrames, 0.1);
        var ac1 = new cc.Animate(animation);
        var ac2 = cc.callFunc(callback, target);
        var action = new cc.sequence(ac1, ac2);

        this.runAction(action);
    }
});