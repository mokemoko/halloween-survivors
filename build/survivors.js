/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constant.ts":
/*!*************************!*\
  !*** ./src/constant.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DEPTH = void 0;\nvar DEPTH;\n(function (DEPTH) {\n    DEPTH[DEPTH[\"MAP\"] = 0] = \"MAP\";\n    DEPTH[DEPTH[\"PLAYER\"] = 1] = \"PLAYER\";\n    DEPTH[DEPTH[\"ENEMY\"] = 2] = \"ENEMY\";\n    DEPTH[DEPTH[\"GUI\"] = 3] = \"GUI\";\n})(DEPTH = exports.DEPTH || (exports.DEPTH = {}));\n\n\n//# sourceURL=webpack://survivors/./src/constant.ts?");

/***/ }),

/***/ "./src/game.ts":
/*!*********************!*\
  !*** ./src/game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Game = void 0;\n__webpack_require__(/*! phaser */ \"./node_modules/phaser/dist/phaser.js\");\nconst bootScene_1 = __webpack_require__(/*! ./scenes/bootScene */ \"./src/scenes/bootScene.ts\");\nconst mainMenuScene_1 = __webpack_require__(/*! ./scenes/mainMenuScene */ \"./src/scenes/mainMenuScene.ts\");\nconst gameScene_1 = __webpack_require__(/*! ./scenes/gameScene */ \"./src/scenes/gameScene.ts\");\nconst config = {\n    title: 'Survivors',\n    version: '1.0',\n    width: 960,\n    height: 540,\n    zoom: 1,\n    type: Phaser.AUTO,\n    parent: 'game',\n    scene: [bootScene_1.BootScene, mainMenuScene_1.MainMenuScene, gameScene_1.GameScene],\n    input: {\n        keyboard: true,\n        mouse: true,\n        touch: true,\n        gamepad: false\n    },\n    physics: {\n        default: 'arcade',\n        arcade: {\n        // gravity: { y: 300 },\n        // debug: true\n        }\n    },\n    backgroundColor: '#98d687',\n    render: { pixelArt: true, antialias: false }\n};\nclass Game extends Phaser.Game {\n    constructor(config) {\n        super(config);\n    }\n}\nexports.Game = Game;\nwindow.addEventListener('load', () => {\n    const game = new Game(config);\n});\n\n\n//# sourceURL=webpack://survivors/./src/game.ts?");

/***/ }),

/***/ "./src/objects/enemy/index.ts":
/*!************************************!*\
  !*** ./src/objects/enemy/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Enemy = void 0;\nconst constant_1 = __webpack_require__(/*! ../../constant */ \"./src/constant.ts\");\nclass Enemy extends Phaser.GameObjects.Sprite {\n    constructor({ scene, gameState, x, y }) {\n        super(scene, x, y, 'bat');\n        this.setScale(2).setDepth(constant_1.DEPTH.ENEMY);\n        this.gameState = gameState;\n        this.setupAnim();\n        scene.physics.world.enable(this);\n        scene.add.existing(this);\n        this.body.setCircle(10, 6);\n    }\n    update() {\n        const [x, y] = this.gameState.position;\n        const body = this.body;\n        body.setVelocity(body.position.x > x ? -50 : 50, body.position.y > y ? -50 : 50);\n    }\n    endGame() {\n        this.body.stop();\n        this.anims.stop();\n    }\n    setupAnim() {\n        this.scene.anims.create({\n            key: 'bat',\n            frames: this.anims.generateFrameNumbers('bat', { start: 0, end: 1 }),\n            frameRate: 6,\n            repeat: -1,\n        });\n        this.anims.play('bat');\n    }\n}\nexports.Enemy = Enemy;\n\n\n//# sourceURL=webpack://survivors/./src/objects/enemy/index.ts?");

/***/ }),

/***/ "./src/objects/gui/gauge.ts":
/*!**********************************!*\
  !*** ./src/objects/gui/gauge.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Gauge = void 0;\nclass Gauge extends Phaser.GameObjects.Line {\n    constructor({ scene, gameState, x, y, lineWidth }) {\n        super(scene, x, y, x, y, x + 1, y, 0xff0000);\n        this.setLineWidth(20);\n        this.gameState = gameState;\n    }\n    update() {\n        this.displayWidth = this.scene.sys.canvas.width * this.gameState.exp / 100 * 2;\n    }\n}\nexports.Gauge = Gauge;\n\n\n//# sourceURL=webpack://survivors/./src/objects/gui/gauge.ts?");

/***/ }),

/***/ "./src/objects/gui/index.ts":
/*!**********************************!*\
  !*** ./src/objects/gui/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GUI = void 0;\nconst gauge_1 = __webpack_require__(/*! ./gauge */ \"./src/objects/gui/gauge.ts\");\nconst timeText_1 = __webpack_require__(/*! ./timeText */ \"./src/objects/gui/timeText.ts\");\nconst resetButton_1 = __webpack_require__(/*! ./resetButton */ \"./src/objects/gui/resetButton.ts\");\nconst constant_1 = __webpack_require__(/*! ../../constant */ \"./src/constant.ts\");\nclass GUI extends Phaser.GameObjects.Container {\n    constructor({ scene, x, y, gameState }) {\n        super(scene, x, y);\n        this.setScrollFactor(0).setDepth(constant_1.DEPTH.GUI);\n        this.gameState = gameState;\n        this.gauge = new gauge_1.Gauge({ scene, gameState, x: 0, y: 0, lineWidth: 100 });\n        this.add(this.gauge);\n        this.timeText = new timeText_1.TimeText({ scene, x: scene.sys.canvas.width / 2, y: 20 });\n        this.add(this.timeText);\n        scene.add.existing(this);\n    }\n    update() {\n        this.gauge.update();\n        this.timeText.update(this.gameState.duration);\n    }\n    endGame() {\n        this.add(new resetButton_1.ResetButton({\n            scene: this.scene,\n            x: this.scene.sys.canvas.width / 2,\n            y: this.scene.sys.canvas.height - 100,\n        }));\n    }\n}\nexports.GUI = GUI;\n\n\n//# sourceURL=webpack://survivors/./src/objects/gui/index.ts?");

/***/ }),

/***/ "./src/objects/gui/resetButton.ts":
/*!****************************************!*\
  !*** ./src/objects/gui/resetButton.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ResetButton = void 0;\nclass ResetButton extends Phaser.GameObjects.Text {\n    constructor({ scene, x, y }) {\n        const config = {\n            fontFamily: 'Connection',\n            fontSize: '40px',\n            fill: '#fff',\n            strokeThickness: 5,\n            stroke: '#000',\n        };\n        super(scene, x, y, 'PRESS SPACE TO RESTART', config);\n        this.setOrigin(0.5);\n        scene.input.keyboard.addKey('SPACE').once('down', () => {\n            scene.scene.start('GameScene');\n        });\n    }\n}\nexports.ResetButton = ResetButton;\n\n\n//# sourceURL=webpack://survivors/./src/objects/gui/resetButton.ts?");

/***/ }),

/***/ "./src/objects/gui/timeText.ts":
/*!*************************************!*\
  !*** ./src/objects/gui/timeText.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.TimeText = void 0;\nfunction time2text(time) {\n    const min = Math.min(Math.floor(time / 60), 99);\n    const sec = time % 60;\n    return `${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}`;\n}\nclass TimeText extends Phaser.GameObjects.Text {\n    constructor({ scene, x, y }) {\n        super(scene, x, y, time2text(0), {\n            fontSize: '40px',\n            color: '#fff',\n            strokeThickness: 5,\n            stroke: '#000',\n        });\n        this.setOrigin(0.5, 0);\n    }\n    update(time) {\n        this.setText(time2text(time));\n    }\n}\nexports.TimeText = TimeText;\n\n\n//# sourceURL=webpack://survivors/./src/objects/gui/timeText.ts?");

/***/ }),

/***/ "./src/objects/map.ts":
/*!****************************!*\
  !*** ./src/objects/map.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Map = void 0;\nconst constant_1 = __webpack_require__(/*! ../constant */ \"./src/constant.ts\");\nconst CHUNK_WIDTH = 2000;\nclass Map extends Phaser.GameObjects.Container {\n    constructor({ scene, gameState }) {\n        super(scene);\n        this.gameState = gameState;\n        this.currentChunk = [0, 0];\n        this.chunks = {};\n        this.loadChunks(this.currentChunk);\n    }\n    update() {\n        const pos = this.calcPos();\n        if (pos[0] !== this.currentChunk[0] || pos[1] !== this.currentChunk[1]) {\n            this.loadChunks(pos);\n            this.currentChunk = pos;\n        }\n    }\n    calcPos() {\n        const [x, y] = this.gameState.position;\n        const posX = Math.floor(x / CHUNK_WIDTH + 0.5);\n        const posY = Math.floor(y / CHUNK_WIDTH + 0.5);\n        return [posX, posY];\n    }\n    loadChunks([x, y]) {\n        Object.keys(this.chunks).forEach(k => {\n            const [xx, yy] = k.split(',').map(v => parseInt(v));\n            if (Math.max(Math.abs(y - yy), Math.abs(x - xx)) > 1) {\n                this.chunks[k].destroy();\n                delete this.chunks[k];\n            }\n        });\n        for (let i = x - 1; i <= x + 1; i++) {\n            for (let j = y - 1; j <= y + 1; j++) {\n                const k = [i, j].join(',');\n                if (k in this.chunks) {\n                    continue;\n                }\n                this.chunks[k] = this.loadChunk([i, j]);\n            }\n        }\n        console.log('chunk loaded', Object.keys(this.chunks));\n    }\n    loadChunk([x, y]) {\n        return this.scene.add\n            .image(CHUNK_WIDTH * x, CHUNK_WIDTH * y, 'map')\n            .setScale(2)\n            .setDepth(constant_1.DEPTH.MAP);\n    }\n}\nexports.Map = Map;\n\n\n//# sourceURL=webpack://survivors/./src/objects/map.ts?");

/***/ }),

/***/ "./src/objects/player.ts":
/*!*******************************!*\
  !*** ./src/objects/player.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Player = void 0;\nconst constant_1 = __webpack_require__(/*! ../constant */ \"./src/constant.ts\");\nclass Player extends Phaser.GameObjects.Sprite {\n    constructor({ scene, gameState, x, y }) {\n        super(scene, x, y, 'player', 1);\n        this.setScale(2).setDepth(constant_1.DEPTH.PLAYER);\n        this.gameState = gameState;\n        this.setupAnim();\n        this.setupKey();\n        scene.physics.world.enable(this);\n        scene.add.existing(this);\n        this.body.setCircle(10, 6, 6);\n    }\n    update() {\n        const velocity = [0, 0];\n        const body = this.body;\n        if (this.keys.up.isDown) {\n            velocity[1] = -100;\n        }\n        else if (this.keys.down.isDown) {\n            velocity[1] = 100;\n        }\n        if (this.keys.left.isDown) {\n            velocity[0] = -100;\n        }\n        else if (this.keys.right.isDown) {\n            velocity[0] = 100;\n        }\n        body.setVelocity(...velocity);\n        if (velocity[0] === 0 && velocity[1] === 0) {\n            this.anims.stop();\n            this.setFrame(1);\n        }\n        else if (!this.anims.isPlaying) {\n            this.anims.play('playerWalk');\n        }\n        this.gameState.position = [body.position.x, body.position.y];\n    }\n    endGame() {\n        this.body.stop();\n        this.anims.stop();\n    }\n    setupAnim() {\n        this.scene.anims.create({\n            key: 'playerWalk',\n            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),\n            frameRate: 6,\n            repeat: -1,\n        });\n    }\n    setupKey() {\n        this.keys = this.scene.input.keyboard.addKeys({\n            up: 'w',\n            down: 's',\n            left: 'a',\n            right: 'd',\n        });\n    }\n}\nexports.Player = Player;\n\n\n//# sourceURL=webpack://survivors/./src/objects/player.ts?");

/***/ }),

/***/ "./src/scenes/bootScene.ts":
/*!*********************************!*\
  !*** ./src/scenes/bootScene.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.BootScene = void 0;\nclass BootScene extends Phaser.Scene {\n    constructor() {\n        super({\n            key: 'BootScene'\n        });\n    }\n    preload() {\n        // set the background and create loading bar\n        this.cameras.main.setBackgroundColor(0x98d687);\n        this.createLoadingbar();\n        // pass value to change the loading bar fill\n        this.load.on('progress', function (value) {\n            this.progressBar.clear();\n            this.progressBar.fillStyle(0xfff6d3, 1);\n            this.progressBar.fillRect(this.cameras.main.width / 4, this.cameras.main.height / 2 - 16, (this.cameras.main.width / 2) * value, 16);\n        }, this);\n        // delete bar graphics, when loading complete\n        this.load.on('complete', function () {\n            this.progressBar.destroy();\n            this.loadingBar.destroy();\n        }, this);\n        // load out package\n        this.load.pack('preload', '/src/assets/pack.json', 'preload');\n    }\n    update() {\n        this.scene.start('MainMenuScene');\n    }\n    createLoadingbar() {\n        this.loadingBar = this.add.graphics();\n        this.loadingBar.fillStyle(0x5dae47, 1);\n        this.loadingBar.fillRect(this.cameras.main.width / 4 - 2, this.cameras.main.height / 2 - 18, this.cameras.main.width / 2 + 4, 20);\n        this.progressBar = this.add.graphics();\n    }\n}\nexports.BootScene = BootScene;\n\n\n//# sourceURL=webpack://survivors/./src/scenes/bootScene.ts?");

/***/ }),

/***/ "./src/scenes/gameScene.ts":
/*!*********************************!*\
  !*** ./src/scenes/gameScene.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GameScene = void 0;\nconst gui_1 = __webpack_require__(/*! ../objects/gui */ \"./src/objects/gui/index.ts\");\nconst map_1 = __webpack_require__(/*! ../objects/map */ \"./src/objects/map.ts\");\nconst state_1 = __webpack_require__(/*! ../state */ \"./src/state.ts\");\nconst player_1 = __webpack_require__(/*! ../objects/player */ \"./src/objects/player.ts\");\nconst enemy_1 = __webpack_require__(/*! ../objects/enemy */ \"./src/objects/enemy/index.ts\");\nclass GameScene extends Phaser.Scene {\n    constructor() {\n        super({\n            key: 'GameScene',\n        });\n    }\n    create() {\n        this.gameState = (0, state_1.defaultGameState)();\n        this.map = new map_1.Map({\n            scene: this,\n            gameState: this.gameState,\n        });\n        this.player = new player_1.Player({\n            scene: this,\n            gameState: this.gameState,\n            x: 0,\n            y: 0,\n        });\n        this.sys.cameras.main.startFollow(this.player);\n        this.enemies = this.add.group({ classType: enemy_1.Enemy });\n        this.time.addEvent({\n            delay: 500,\n            callback: () => {\n                const rad = Math.PI * 2 * Math.random();\n                this.enemies.add(new enemy_1.Enemy({\n                    scene: this,\n                    gameState: this.gameState,\n                    x: this.gameState.position[0] + 500 * Math.cos(rad),\n                    y: this.gameState.position[1] + 500 * Math.sin(rad),\n                }));\n            },\n            callbackScope: this,\n            loop: true,\n        });\n        this.physics.add.collider(this.enemies, this.enemies);\n        this.time.addEvent({\n            delay: 1000,\n            callback: () => {\n                this.gameState.duration += 1;\n                this.gameState.exp += 1;\n            },\n            callbackScope: this,\n            loop: true,\n        });\n        this.gui = new gui_1.GUI({\n            scene: this,\n            gameState: this.gameState,\n            x: 0,\n            y: 0,\n        });\n    }\n    update() {\n        if (this.gameState.isDead) {\n            return;\n        }\n        this.gui.update();\n        this.map.update();\n        this.player.update();\n        this.enemies.getChildren().forEach(enemy => enemy.update());\n        this.physics.overlap(this.player, this.enemies, this.gameOver, null, this);\n    }\n    gameOver() {\n        this.gameState.isDead = true;\n        this.time.removeAllEvents();\n        this.player.endGame();\n        this.enemies.getChildren().forEach(enemy => enemy.endGame());\n        this.gui.endGame();\n    }\n}\nexports.GameScene = GameScene;\n\n\n//# sourceURL=webpack://survivors/./src/scenes/gameScene.ts?");

/***/ }),

/***/ "./src/scenes/mainMenuScene.ts":
/*!*************************************!*\
  !*** ./src/scenes/mainMenuScene.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.MainMenuScene = void 0;\nclass MainMenuScene extends Phaser.Scene {\n    constructor() {\n        super({\n            key: 'MainMenuScene',\n        });\n    }\n    create() {\n        this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'top').setScale(0.6);\n        this.add.bitmapText(this.sys.canvas.width / 2, 100, 'dotFont', 'HALLOWEEN SURVIVORS', 40).setOrigin(0.5);\n        this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'player').setScale(2);\n        this.add.bitmapText(this.sys.canvas.width / 2, this.sys.canvas.height - 100, 'dotFont', 'PRESS SPACE TO PLAY', 30).setOrigin(0.5);\n        this.input.keyboard.addKey('SPACE').once('down', () => {\n            this.scene.start('GameScene');\n        });\n    }\n}\nexports.MainMenuScene = MainMenuScene;\n\n\n//# sourceURL=webpack://survivors/./src/scenes/mainMenuScene.ts?");

/***/ }),

/***/ "./src/state.ts":
/*!**********************!*\
  !*** ./src/state.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.defaultGameState = void 0;\nconst defaultGameState = () => ({\n    isDead: false,\n    duration: 0,\n    position: [0, 0],\n    exp: 0,\n    skills: [],\n});\nexports.defaultGameState = defaultGameState;\n\n\n//# sourceURL=webpack://survivors/./src/state.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"survivors": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunksurvivors"] = self["webpackChunksurvivors"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["common"], () => (__webpack_require__("./src/game.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;