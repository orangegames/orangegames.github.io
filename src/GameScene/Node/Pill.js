/**
 * Created by linhao on 15/4/2.
 */

var Pill = BaseActor.extend({

    ctor : function(speed){
        this._speed = speed;
        this._super(res.pill_png);
        return true;
    },
    update:function(dt){
        var position = this.getPosition();
        position = cc.p(position.x, position.y + dt * this._speed);
        this.setPosition(position);
    }
});