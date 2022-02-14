import { GameState } from '../state'
import { DEPTH } from '../constant'

interface PlayerParams {
  scene: Phaser.Scene
  gameState: GameState
  x: number
  y: number
}

export class Player extends Phaser.GameObjects.Sprite {
  private keys: Record<string, Phaser.Input.Keyboard.Key>
  private gameState: GameState

  constructor({ scene, gameState, x, y }: PlayerParams) {
    super(scene, x, y, 'player', 1)
    this.setScale(2).setDepth(DEPTH.PLAYER)


    this.gameState = gameState

    this.setupAnim()
    this.setupKey()

    scene.physics.world.enable(this)
    scene.add.existing(this)

    ;(this.body as Phaser.Physics.Arcade.Body).setCircle(10, 6, 6)
  }

  update() {
    const velocity: [number, number] = [0, 0]
    const body = this.body as Phaser.Physics.Arcade.Body
    if (this.keys.up.isDown) {
      velocity[1] = -100
    } else if (this.keys.down.isDown) {
      velocity[1] = 100
    }
    if (this.keys.left.isDown) {
      velocity[0] = -100
    } else if (this.keys.right.isDown) {
      velocity[0] = 100
    }
    body.setVelocity(...velocity)

    if (velocity[0] === 0 && velocity[1] === 0) {
      this.anims.stop()
      this.setFrame(1)
    } else if (!this.anims.isPlaying) {
      this.anims.play('playerWalk')
    }

    this.gameState.position = [body.position.x, body.position.y]
  }

  endGame() {
    (this.body as Phaser.Physics.Arcade.Body).stop()
    this.anims.stop()
  }

  setupAnim() {
    this.scene.anims.create({
      key: 'playerWalk',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
      frameRate: 6,
      repeat: -1,
    })
  }

  setupKey() {
    this.keys = this.scene.input.keyboard.addKeys({
      up: 'w',
      down: 's',
      left: 'a',
      right: 'd',
    }) as Record<string, Phaser.Input.Keyboard.Key>
  }
}
