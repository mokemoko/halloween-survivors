interface TimeTextParams {
  scene: Phaser.Scene
  x: number
  y: number
}

function time2text(time: number): string {
  const min = Math.min(Math.floor(time / 60), 99)
  const sec = time % 60
  return `${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}`
}

export class TimeText extends Phaser.GameObjects.Text {
  constructor({ scene, x, y }: TimeTextParams) {
    super(scene, x, y, time2text(0), {
      fontSize: '40px',
      color: '#fff',
      strokeThickness: 5,
      stroke: '#000',
    })
    this.setOrigin(0.5, 0)
  }

  update(time: number) {
    this.setText(time2text(time))
  }
}
