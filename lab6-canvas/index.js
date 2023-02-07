let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

let windowHeight = window.innerHeight
let windowWidth = window.innerWidth

canvas.width = windowWidth
canvas.hight = windowHeight

class Circle {
	constructor(id, xposition, yposition, radius, color, speed, dx, dy) {
		this.id = id
		this.xposition = xposition
		this.yposition = yposition
		this.radius = radius
		this.color = color
		this.speed = speed
		this.dx = dx
		this.dy = dy
	}
	draw(context) {
		context.beginPath()
		context.arc(
			this.xposition,
			this.yposition,
			this.radius,
			0,
			Math.PI * 2,
			false
		)
		context.stroke()
		context.closePath()
	}
	move() {
		this.draw(context)

		this.xposition += this.dx
		this.yposition += this.dy
	}
}

let decorateCircle = () => {
	let xpos = Math.random() * windowWidth
	let ypos = Math.random() * windowHeight
	let radius = (Math.random() * windowWidth) / 5
	let color = Math.floor(Math.random() * 16777215).toString(16)
}

let drawCircle = (circle) => {
	circle.draw(context)
}
