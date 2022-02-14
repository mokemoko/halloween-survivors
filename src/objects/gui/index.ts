import { Gauge } from './gauge'
import { GameState } from '../../state'
import { TimeText } from './timeText'
import { ResetButton } from './resetButton'
import { DEPTH } from '../../constant'

export class GUI extends Phaser.GameObjects.Container {
  private readonly gauge: Gauge
  private readonly timeText: TimeText
  private readonly gameState: GameState

  constructor({ scene, x, y, gameState }: { scene: Phaser.Scene, gameState: GameState, x: number, y: number }) {
    super(scene, x, y)
    this.setScrollFactor(0).setDepth(DEPTH.GUI)

    this.gameState = gameState

    this.gauge = new Gauge({ scene, gameState, x: 0, y: 0, lineWidth: 100 })
    this.add(this.gauge)

    this.timeText = new TimeText({ scene, x: scene.sys.canvas.width / 2, y: 20 })
    this.add(this.timeText)

    scene.add.existing(this)
  }

  update() {
    this.gauge.update()
    this.timeText.update(this.gameState.duration)
  }

  endGame() {
    this.add(new ResetButton({
      scene: this.scene,
      x: this.scene.sys.canvas.width / 2,
      y: this.scene.sys.canvas.height - 100,
    }))
  }
}
