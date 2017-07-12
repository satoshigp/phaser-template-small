// インスタンス変数、関数の定義
MyGame.Game = function (game) {
    // Starのグループ
    this.stars = null;
    // カーソルオブジェクト
    this.cursors = null;
    // スペースキーの取得
    this.spaceKey = null;
    // 文字の移動速度
    this.speed = 200;
    //dudeの追加
    this.dude=null;
    //敵の追加
    this.tekis=null;
    //残りの星の数
    this.starCount=0;
    //

};

// タイトル処理
MyGame.Game.prototype = {
    // ゲームの作成
    create: function() {

        // 物理エンジンを起動
        this.physics.startSystem(Phaser.Physics.ARCADE);


        this.stars=this.add.group();
        this.tekis=this.add.group();

        //星を数える
        this.starCount=0;
        //グループ内のオブジェクトの物理挙動を有効にする
            this.stars.enableBody=true;
            this.tekis.enableBody=true;

            for(let i=0;i<100;i++)
            {
                this.starCount++;

                let star=this.stars.create(this.rnd.integerInRange(80,560),this.rnd.integerInRange(80,280),'star');

                star.body.collideWorldBounds=true;
                star.body.bounce.x=1;
                star.body.bounce.y=1;

                star.inputEnabled=true;

                star.body.velocity.x=this.rnd.realInRange(-200,200);
                star.body.velocity.y=this.rnd.realInRange(-200,200);
            }
            for(let s=0;s<4;s++)
  {
      let teki=this.tekis.create(this.rnd.integerInRange(0,80),this.rnd.integerInRange(0,80),'teki');

      teki.body.collideWorldBounds=true;
      teki.body.bounce.x=1;
      teki.body.bounce.y=1;

      teki.inputEnabled=true;

      teki.body.velocity.x=this.rnd.realInRange(-200,200);
      teki.body.velocity.y=this.rnd.realInRange(-200,200);

      teki.frame=4;
      teki.animations.add('left',[0,1],10,true);
      teki.animations.add('right',[2,3],10,true);
      teki.animations.play('left');
  }

        this.dude=this.add.sprite(this.world.centerX, this.world.centerY, 'dude');
        this.dude.frame=4;
        this.dude.animations.add("left",[0,1,2,3],10,true);
        this.dude.animations.add("riight",[5,6,7,8],10,true);

        this.dude.animations.play('left');

        //アンカー＝いかり＝基準点
        this.dude.anchor.setTo(0.5);
        //物理エンジンをdudeに使う
        //arcade物理エンジン＝簡易なもの、速度が早い
        this.physics.arcade.enable(this.dude);
        //物理エンジンを使用するとbodyというプロパティーが使える
        // velocity=速度
        //dude.body.velocity.x=200;
        //dude.body.velocity.y=200;

        this.dude.body.collideWorldBounds=true;
        this.dude.body.bounce.x=1;
        this.dude.body.bounce.y=1;

        // カーソルキーの作成
        this.cursors = this.input.keyboard.createCursorKeys();
        // スペースキーの作成
        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // スコアを初期化
        MyGame.gameParams.score = 0;


    },

    pickstar:function(dude,star){
        star.kill();
MyGame.gameParams.AddScore(100);

        this.starCount--;
    if(this.starCount<=0)
    {
        this.physics.arcade.isPaused=true;
        this.state.start("Clear!",false);
    }
},
kamada:function(dude,teki)
{
    dude.kill();

    this.state.start("GameOver",false);
},
    // 更新処理
    update: function() {
        this.physics.arcade.overlap(this.dude,this.stars,this.pickstar,null,this);
        this.physics.arcade.overlap(this.dude,this.tekis,this.kamada,null,this);

        // 移動
        let newvel = new Phaser.Point(0,0);
        // 上
        if (this.cursors.up.isDown) {
            newvel.y = -1;
        }
        // 下
        if (this.cursors.down.isDown) {
            newvel.y = 1;
        }
        // 左
        if (this.cursors.left.isDown) {
            newvel.x = -1;
        }
        // 右
        if (this.cursors.right.isDown) {
            newvel.x = 1;
        }
        // 速度設定
        if (!newvel.isZero()) {
            // 速度が設定されていたら、速度をthis.speedに設定する
            newvel.setMagnitude(this.speed);
        }
        this.dude.body.velocity = newvel;



        // Oキーでゲームオーバー
        if (this.input.keyboard.isDown(Phaser.KeyCode.O)){
            this.state.start("GameOver", false);
        }

        // Cキーでクリア
        if (this.input.keyboard.isDown(Phaser.KeyCode.C)) {
            this.state.start("Clear", false);
        }

        // Aキーで点数加算
        if (this.input.keyboard.isDown(Phaser.KeyCode.A)) {
            MyGame.gameParams.AddScore(100);
        }
    },

    // 描画
    render: function() {

    },

    // 終了処理
    shutdown: function() {

    }

}
