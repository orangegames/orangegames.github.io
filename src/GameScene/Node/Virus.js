/**
 * Created by linhao on 15/4/2.
 */


var Virus = cc.Sprite.extend({
    _speed: 0,
    _score: 0,
    ctor : function(speed, score){
        this._speed = speed;
        this._score = score;

        var virus = util.getRandomVirus();
        this._super(virus);
        return true;
    },
    update:function(dt) {
        var position = this.getPosition();
        position = cc.p(position.x, position.y + dt * this._speed);

        this.setPosition(position);
    }
});