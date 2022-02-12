import { GameState } from '../../state'

interface GaugeParams {
  scene: Phaser.Scene
  gameState: GameState
  x: number
  y: number
  lineWidth: number
}

export class Gauge extends Phaser.GameObjects.Line {
  private gameState: GameState

  constructor({ scene, gameState, x, y, lineWidth }: GaugeParams) {
    super(scene, x, y, x, y, x + 1, y, 0xff0000)
    this.setLineWidth(20)
    this.gameState = gameState
  }

  update() {
    this.displayWidth = this.scene.sys.canvas.width * this.gameState.exp / 100 * 2
  }
}
