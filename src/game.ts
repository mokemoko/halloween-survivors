import 'phaser'
import { BootScene } from './scenes/bootScene'
import { MainMenuScene } from './scenes/mainMenuScene'
import { GameScene } from './scenes/gameScene'

const config: Phaser.Types.Core.GameConfig = {
  title: 'Survivors',
  version: '1.0',
  width: 960,
  height: 540,
  zoom: 1,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene, MainMenuScene, GameScene],
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
    gamepad: false
  },
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 300 },
      // debug: true
    }
  },
  backgroundColor: '#98d687',
  render: { pixelArt: true, antialias: false }
}

export class Game extends Phaser.Game {
  constructor (config: Phaser.Types.Core.GameConfig) {
    super(config)
  }
}

window.addEventListener('load', () => {
  const game = new Game(config)
})
