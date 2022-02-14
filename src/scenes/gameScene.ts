import { GUI } from '../objects/gui'
import { Map } from '../objects/map'
import { defaultGameState, GameState } from '../state'
import { Player } from '../objects/player'

export class GameScene extends Phaser.Scene {
  private gui: GUI
  private map: Map
  private player: Player

  private timer: Phaser.Time.TimerEvent
  private gameState: GameState

  constructor() {
    super({
      key: 'GameScene',
    })
  }

  init(): void {
    this.player = null

    this.timer = undefined
    this.gameState = defaultGameState
  }

  create(): void {
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

    this.timer = this.time.addEvent({
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
    this.gui.update()
    this.map.update()
    this.player.update()
    // this.physics.overlap(this.player, [], () => {}, null, this)
  }
}
