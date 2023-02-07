let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

let windowHeight = window.innerHeight
let windowWidth = window.innerWidth

canvas.width = windowWidth
canvas.height = windowHeight

let idCounter = 0
class Circle {
	constructor(xposition, yposition, radius, color, speed) {
		this.id = idCounter++
		this.xposition = xposition
		this.yposition = yposition
		this.radius = radius
		this.color = color
		this.speed = speed
		this.dx = 1 * this.speed
		this.dy = 1 * this.speed
		idCounter++
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
	let radius = Math.random() * (windowWidth / 10) + 20

	let xpos = Math.random() * (windowWidth - 2 * radius - radius) + (radius + 1)
	let ypos = Math.random() * (windowHeight - 2 * radius - radius) + (radius + 1)
	let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
	return { xpos, ypos, radius, color }
}

let drawCircle = (circle) => {
	circle.draw(context)
}

let circlesOnBoard = []

// let createXCircles = () => {
// 	let amount = Math.random() * 20 - 1

// 	for (let i = 1; i < amount; i++) {
// 		// xposition, yposition, radius, color, speed, dx, dy
// 		let { xpos, ypos, radius, color } = decorateCircle()
// 		let newCircle = new Circle(xpos, ypos, radius, color, 1)
// 		circlesOnBoard.push(newCircle)
// 		newCircle.draw(context)
// 	}
// }
// createXCircles()

// let moveCircles = () => {
// 	requestAnimationFrame(moveCircles)
// 	circlesOnBoard.forEach((circle) => circle.move())
// }
// moveCircles()
let { xpos, ypos, radius, color } = decorateCircle()
console.log(xpos, ypos, radius, color)
let newCircle = new Circle(xpos, ypos, radius, color, 1)
console.log(newCircle)
newCircle.draw(context)
