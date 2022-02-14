import { GUI } from '../objects/gui'
import { Map } from '../objects/map'
import { defaultGameState, GameState } from '../state'
import { Player } from '../objects/player'
import { Enemy } from '../objects/enemy'

export class GameScene extends Phaser.Scene {
  private gui: GUI
  private map: Map
  private player: Player
  private enemies: Phaser.GameObjects.Group

  private gameState: GameState

  constructor() {
    super({
      key: 'GameScene',
    })
  }

  create(): void {
    this.gameState = defaultGameState()

    this.map = new Map({
      scene: this,
      gameState: this.gameState,
    })

    this.player = new Player({
      scene: this,
      gameState: this.gameState,
      x: 0,
      y: 0,
    })
    this.sys.cameras.main.startFollow(this.player)

    this.enemies = this.add.group({ classType: Enemy })
    this.time.addEvent({
      delay: 500,
      callback: () => {
        const rad = Math.PI * 2 * Math.random()
        this.enemies.add(new Enemy({
          scene: this,
          gameState: this.gameState,
          x: this.gameState.position[0] + 500 * Math.cos(rad),
          y: this.gameState.position[1] + 500 * Math.sin(rad),
        }))
      },
      callbackScope: this,
      loop: true,
    })
    this.physics.add.collider(this.enemies, this.enemies)

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.gameState.duration += 1
        this.gameState.exp += 1
      },
      callbackScope: this,
      loop: true,
    })

    this.gui = new GUI({
      scene: this,
      gameState: this.gameState,
      x: 0,
      y: 0,
    })
  }

  update(): void {
    if (this.gameState.isDead) {
      return
    }
    this.gui.update()
    this.map.update()
    this.player.update()
    this.enemies.getChildren().forEach(enemy => enemy.update())
    this.physics.overlap(
      this.player,
      this.enemies,
      this.gameOver,
      null,
      this,
    )
  }

  gameOver() {
    this.gameState.isDead = true
    this.time.removeAllEvents()
    this.player.endGame()
    this.enemies.getChildren().forEach(enemy => (enemy as Enemy).endGame())
    this.gui.endGame()
  }
}
