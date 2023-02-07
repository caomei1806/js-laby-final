let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

let windowHeight = window.innerHeight
let windowWidth = window.innerWidth

canvas.width = windowWidth
canvas.hight = windowHeight

class Circle {
	constructor(id, xposition, yposition, radius, size, color, speed) {
		this.id = id
		this.xposition = xposition
		this.yposition = yposition
		this.radius = radius
		this.size = size
		this.color = color
		this.speed = speed
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
	}
}
