(()=>{"use strict";var e,t={309:(e,t)=>{var s;Object.defineProperty(t,"__esModule",{value:!0}),t.DEPTH=void 0,(s=t.DEPTH||(t.DEPTH={}))[s.MAP=0]="MAP",s[s.PLAYER=1]="PLAYER",s[s.ENEMY=2]="ENEMY",s[s.GUI=3]="GUI"},769:(e,t,s)=>{s(260);const a=s(369),i=s(888),n=s(695),r={title:"Survivors",version:"1.0",width:960,height:540,zoom:1,type:Phaser.AUTO,parent:"game",scene:[a.BootScene,i.MainMenuScene,n.GameScene],input:{keyboard:!0,mouse:!0,touch:!0,gamepad:!1},physics:{default:"arcade",arcade:{}},backgroundColor:"#98d687",render:{pixelArt:!0,antialias:!1}};class h extends Phaser.Game{constructor(e){super(e)}}window.addEventListener("load",(()=>{new h(r)}))},848:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Enemy=void 0;const a=s(309);class i extends Phaser.GameObjects.Sprite{constructor({scene:e,gameState:t,x:s,y:i}){super(e,s,i,"bat"),this.setScale(2).setDepth(a.DEPTH.ENEMY),this.gameState=t,this.setupAnim(),e.physics.world.enable(this),e.add.existing(this),this.body.setCircle(10,6)}update(){const[e,t]=this.gameState.position,s=this.body;s.setVelocity(s.position.x>e?-50:50,s.position.y>t?-50:50)}endGame(){this.body.stop(),this.anims.stop()}setupAnim(){this.scene.anims.create({key:"bat",frames:this.anims.generateFrameNumbers("bat",{start:0,end:1}),frameRate:6,repeat:-1}),this.anims.play("bat")}}t.Enemy=i},242:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Gauge=void 0;class s extends Phaser.GameObjects.Line{constructor({scene:e,gameState:t,x:s,y:a,lineWidth:i}){super(e,s,a,s,a,s+1,a,16711680),this.setLineWidth(20),this.gameState=t}update(){this.displayWidth=this.scene.sys.canvas.width*this.gameState.exp/100*2}}t.Gauge=s},714:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GUI=void 0;const a=s(242),i=s(879),n=s(569),r=s(309);class h extends Phaser.GameObjects.Container{constructor({scene:e,x:t,y:s,gameState:n}){super(e,t,s),this.setScrollFactor(0).setDepth(r.DEPTH.GUI),this.gameState=n,this.gauge=new a.Gauge({scene:e,gameState:n,x:0,y:0,lineWidth:100}),this.add(this.gauge),this.timeText=new i.TimeText({scene:e,x:e.sys.canvas.width/2,y:20}),this.add(this.timeText),e.add.existing(this)}update(){this.gauge.update(),this.timeText.update(this.gameState.duration)}endGame(){this.add(new n.ResetButton({scene:this.scene,x:this.scene.sys.canvas.width/2,y:this.scene.sys.canvas.height-100}))}}t.GUI=h},569:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ResetButton=void 0;class s extends Phaser.GameObjects.Text{constructor({scene:e,x:t,y:s}){super(e,t,s,"PRESS SPACE TO RESTART",{fontFamily:"Connection",fontSize:"40px",fill:"#fff",strokeThickness:5,stroke:"#000"}),this.setOrigin(.5),e.input.keyboard.addKey("SPACE").once("down",(()=>{e.scene.start("GameScene")}))}}t.ResetButton=s},879:(e,t)=>{function s(e){const t=e%60;return`${("0"+Math.min(Math.floor(e/60),99)).slice(-2)}:${("0"+t).slice(-2)}`}Object.defineProperty(t,"__esModule",{value:!0}),t.TimeText=void 0;class a extends Phaser.GameObjects.Text{constructor({scene:e,x:t,y:a}){super(e,t,a,s(0),{fontSize:"40px",color:"#fff",strokeThickness:5,stroke:"#000"}),this.setOrigin(.5,0)}update(e){this.setText(s(e))}}t.TimeText=a},372:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Map=void 0;const a=s(309),i=2e3;class n extends Phaser.GameObjects.Container{constructor({scene:e,gameState:t}){super(e),this.gameState=t,this.currentChunk=[0,0],this.chunks={},this.loadChunks(this.currentChunk)}update(){const e=this.calcPos();e[0]===this.currentChunk[0]&&e[1]===this.currentChunk[1]||(this.loadChunks(e),this.currentChunk=e)}calcPos(){const[e,t]=this.gameState.position;return[Math.floor(e/i+.5),Math.floor(t/i+.5)]}loadChunks([e,t]){Object.keys(this.chunks).forEach((s=>{const[a,i]=s.split(",").map((e=>parseInt(e)));Math.max(Math.abs(t-i),Math.abs(e-a))>1&&(this.chunks[s].destroy(),delete this.chunks[s])}));for(let s=e-1;s<=e+1;s++)for(let e=t-1;e<=t+1;e++){const t=[s,e].join(",");t in this.chunks||(this.chunks[t]=this.loadChunk([s,e]))}console.log("chunk loaded",Object.keys(this.chunks))}loadChunk([e,t]){return this.scene.add.image(i*e,i*t,"map").setScale(2).setDepth(a.DEPTH.MAP)}}t.Map=n},821:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Player=void 0;const a=s(309);class i extends Phaser.GameObjects.Sprite{constructor({scene:e,gameState:t,x:s,y:i}){super(e,s,i,"player",1),this.setScale(2).setDepth(a.DEPTH.PLAYER),this.gameState=t,this.setupAnim(),this.setupKey(),e.physics.world.enable(this),e.add.existing(this),this.body.setCircle(10,6,6)}update(){const e=[0,0],t=this.body;this.keys.up.isDown?e[1]=-100:this.keys.down.isDown&&(e[1]=100),this.keys.left.isDown?e[0]=-100:this.keys.right.isDown&&(e[0]=100),t.setVelocity(...e),0===e[0]&&0===e[1]?(this.anims.stop(),this.setFrame(1)):this.anims.isPlaying||this.anims.play("playerWalk"),this.gameState.position=[t.position.x,t.position.y]}endGame(){this.body.stop(),this.anims.stop()}setupAnim(){this.scene.anims.create({key:"playerWalk",frames:this.anims.generateFrameNumbers("player",{start:0,end:2}),frameRate:6,repeat:-1})}setupKey(){this.keys=this.scene.input.keyboard.addKeys({up:"w",down:"s",left:"a",right:"d"})}}t.Player=i},369:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BootScene=void 0;class s extends Phaser.Scene{constructor(){super({key:"BootScene"})}preload(){this.cameras.main.setBackgroundColor(10016391),this.createLoadingbar(),this.load.on("progress",(function(e){this.progressBar.clear(),this.progressBar.fillStyle(16774867,1),this.progressBar.fillRect(this.cameras.main.width/4,this.cameras.main.height/2-16,this.cameras.main.width/2*e,16)}),this),this.load.on("complete",(function(){this.progressBar.destroy(),this.loadingBar.destroy()}),this),this.load.pack("preload","/src/assets/pack.json","preload")}update(){this.scene.start("MainMenuScene")}createLoadingbar(){this.loadingBar=this.add.graphics(),this.loadingBar.fillStyle(6139463,1),this.loadingBar.fillRect(this.cameras.main.width/4-2,this.cameras.main.height/2-18,this.cameras.main.width/2+4,20),this.progressBar=this.add.graphics()}}t.BootScene=s},695:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.GameScene=void 0;const a=s(714),i=s(372),n=s(367),r=s(821),h=s(848);class o extends Phaser.Scene{constructor(){super({key:"GameScene"})}create(){this.gameState=(0,n.defaultGameState)(),this.map=new i.Map({scene:this,gameState:this.gameState}),this.player=new r.Player({scene:this,gameState:this.gameState,x:0,y:0}),this.sys.cameras.main.startFollow(this.player),this.enemies=this.add.group({classType:h.Enemy}),this.time.addEvent({delay:500,callback:()=>{const e=2*Math.PI*Math.random();this.enemies.add(new h.Enemy({scene:this,gameState:this.gameState,x:this.gameState.position[0]+500*Math.cos(e),y:this.gameState.position[1]+500*Math.sin(e)}))},callbackScope:this,loop:!0}),this.physics.add.collider(this.enemies,this.enemies),this.time.addEvent({delay:1e3,callback:()=>{this.gameState.duration+=1,this.gameState.exp+=1},callbackScope:this,loop:!0}),this.gui=new a.GUI({scene:this,gameState:this.gameState,x:0,y:0})}update(){this.gameState.isDead||(this.gui.update(),this.map.update(),this.player.update(),this.enemies.getChildren().forEach((e=>e.update())),this.physics.overlap(this.player,this.enemies,this.gameOver,null,this))}gameOver(){this.gameState.isDead=!0,this.time.removeAllEvents(),this.player.endGame(),this.enemies.getChildren().forEach((e=>e.endGame())),this.gui.endGame()}}t.GameScene=o},888:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MainMenuScene=void 0;class s extends Phaser.Scene{constructor(){super({key:"MainMenuScene"})}create(){this.add.image(this.sys.canvas.width/2,this.sys.canvas.height/2,"top").setScale(.6),this.add.bitmapText(this.sys.canvas.width/2,100,"dotFont","HALLOWEEN SURVIVORS",40).setOrigin(.5),this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"player").setScale(2),this.add.bitmapText(this.sys.canvas.width/2,this.sys.canvas.height-100,"dotFont","PRESS SPACE TO PLAY",30).setOrigin(.5),this.input.keyboard.addKey("SPACE").once("down",(()=>{this.scene.start("GameScene")}))}}t.MainMenuScene=s},367:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.defaultGameState=void 0,t.defaultGameState=()=>({isDead:!1,duration:0,position:[0,0],exp:0,skills:[]})}},s={};function a(e){var i=s[e];if(void 0!==i)return i.exports;var n=s[e]={exports:{}};return t[e].call(n.exports,n,n.exports,a),n.exports}a.m=t,e=[],a.O=(t,s,i,n)=>{if(!s){var r=1/0;for(d=0;d<e.length;d++){for(var[s,i,n]=e[d],h=!0,o=0;o<s.length;o++)(!1&n||r>=n)&&Object.keys(a.O).every((e=>a.O[e](s[o])))?s.splice(o--,1):(h=!1,n<r&&(r=n));if(h){e.splice(d--,1);var c=i();void 0!==c&&(t=c)}}return t}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[s,i,n]},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={466:0};a.O.j=t=>0===e[t];var t=(t,s)=>{var i,n,[r,h,o]=s,c=0;if(r.some((t=>0!==e[t]))){for(i in h)a.o(h,i)&&(a.m[i]=h[i]);if(o)var d=o(a)}for(t&&t(s);c<r.length;c++)n=r[c],a.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return a.O(d)},s=self.webpackChunksurvivors=self.webpackChunksurvivors||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))})();var i=a.O(void 0,[592],(()=>a(769)));i=a.O(i)})();