interface PlayerParams {
  scene: Phaser.Scene
  x: number
  y: number
}

export class Player extends Phaser.GameObjects.Sprite {
  private keys: Record<string, Phaser.Input.Keyboard.Key>

  constructor({ scene, x, y }: PlayerParams) {
    super(scene, x, y, 'player', 1)

    this.setScale(2)

    this.setupAnim()
    this.setupKey()

    scene.physics.world.enable(this)
    scene.add.existing(this)
  }

  update() {
    if (this.body instanceof Phaser.Physics.Arcade.Body) {
      this.body.setVelocity(0)
      if (this.keys.up.isDown) {
        this.body.setVelocityY(-100)
        this.anims.play('playerWalk')
      } else if (this.keys.down.isDown) {
        this.body.setVelocityY(100)
        this.anims.stop()
        this.setFrame(1)
      }
      if (this.keys.left.isDown) {
        this.body.setVelocityX(-100)
      } else if (this.keys.right.isDown) {
        this.body.setVelocityX(100)
      }
    }
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
