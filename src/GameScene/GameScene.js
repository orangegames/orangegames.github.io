

var GameScene = cc.Scene.extend({
    backgroundLayer : null,
    startLayer : null,
    uiLayer : null,
    _gameSceneController: null,
    ctor: function () {
        this._super();
        this._gameSceneController = GameSceneController.getInstance();

    },
    onEnter:function () {
        this._super();


        //var particleSystem = new cc.ParticleSystem(res.pt_leap_plist);
        //this.addChild(particleSystem, 10000);

        //DataHandler.getInstance().reset();

        this.startLayer = new StartLayer();
        this.addChild(this.startLayer, 0);

        //this.gamePlayLayer = new GamePlayLayer();
        //this.addChild(this.gamePlayLayer, 1);

        //this.uiLayer = new UILayer();
        //this.addChild(this.uiLayer, 2);

        //this.scheduleUpdate();

        //ccs.armatureDataManager.addArmatureFileInfo
    },
    update:function(dt) {
        //if(this._gameSceneController.getStatus() === GameStatus.GameOver){
        //    this.unscheduleUpdate();
        //    return;
        //}
        //
        //this.gamePlayLayer.update(dt);
        //
        //if(this._gameSceneController.getStatus() === GameStatus.Move ||
        //    this._gameSceneController.getStatus() === GameStatus.Battle) {
        //    this.backgroundLayer.updateCloud(dt);
        //}
        //
        //if(this._gameSceneController.getStatus() === GameStatus.Move){
        //    this.backgroundLayer.update(dt);
        //}

    }

});

