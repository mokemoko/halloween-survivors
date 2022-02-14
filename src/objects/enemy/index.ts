import { DEPTH } from '../../constant'
import { GameState } from '../../state'

interface EnemyParams {
  scene: Phaser.Scene
  gameState: GameState
  x: number
  y: number
}

export class Enemy extends Phaser.GameObjects.Sprite {
  private readonly gameState: GameState

  constructor({ scene, gameState, x, y }: EnemyParams) {
    super(scene, x, y, 'bat')
    this.setScale(2).setDepth(DEPTH.ENEMY)

    this.gameState = gameState
    this.setupAnim()

    scene.physics.world.enable(this)
    scene.add.existing(this)

    ;(this.body as Phaser.Physics.Arcade.Body).setCircle(10, 6)
  }

  update() {
    const [x, y] = this.gameState.position
    const body = this.body as Phaser.Physics.Arcade.Body
    body.setVelocity(
      body.position.x > x ? -50 : 50,
      body.position.y > y ? -50 : 50,
    )
  }

  public endGame() {
    (this.body as Phaser.Physics.Arcade.Body).stop()
    this.anims.stop()
  }

  setupAnim() {
    this.scene.anims.create({
      key: 'bat',
      frames: this.anims.generateFrameNumbers('bat', { start: 0, end: 1 }),
      frameRate: 6,
      repeat: -1,
    })
    this.anims.play('bat')
  }
}
