var util = util || {};

//随机病毒
util.getRandomVirus = function(x)
{
    var result = null;
    var Rand = Math.random();
    var idx =  Math.floor(Rand * 3);
    if(idx === 0) {
        result = res.virus_1_png;
    }else if(idx === 1){
        result = res.virus_2_png;
    }else{
        result = res.virus_3_png;
    }

    return result;
};

util.getRandomFloat = function(Min,Max)
{
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Rand * Range);
};

//获取Min到Max之间的随机数
util.getRandomNumber = function(Min,Max)
{
    var Range = Max - Min + 1;
    var Rand = Math.random();
    return(Min + Math.floor(Rand * Range));
};

util.increaseTouchArea = function(rect) {
    var result = cc.rect(rect.x - ACTOR_TOUCH_ADD, rect.y - ACTOR_TOUCH_ADD, rect.width + 2 * ACTOR_TOUCH_ADD, rect.height + 2 * ACTOR_TOUCH_ADD);
    return result;

};
