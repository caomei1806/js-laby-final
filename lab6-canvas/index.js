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
		context.lineWidth = 0
		context.arc(
			this.xposition,
			this.yposition,
			this.radius,
			0,
			Math.PI * 2,
			false
		)
		context.strokeStyle = this.color
		context.stroke()
		context.fillStyle = this.color
		context.fill()
		context.closePath()
	}
	move() {
		this.draw(context)

		if (this.xposition + this.radius > windowWidth) {
			this.dx = -this.dx
		}
		if (this.xposition - this.radius < 0) {
			this.dx = -this.dx
		}
		if (this.yposition + this.radius > windowHeight) {
			this.dy = -this.dy
		}
		if (this.yposition - this.radius < 0) {
			this.dy = -this.dy
		}

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

let createXCircles = () => {
	let amount = Math.random() * 20 + 2

	for (let i = 1; i < amount; i++) {
		// xposition, yposition, radius, color, speed, dx, dy
		let { xpos, ypos, radius, color } = decorateCircle()
		let newCircle = new Circle(xpos, ypos, radius, color, 5)
		circlesOnBoard.push(newCircle)
		newCircle.draw(context)
	}
}
createXCircles()

let calculateDistance = (xpos1, xpos2, ypos1, ypos2) => {
	let distance = Math.sqrt(
		Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2)
	)
	return distance
}

let handleCircleCollision = (circ1, circ2) => {
	if (
		calculateDistance(
			circ1.xposition,
			circ2.xposition,
			circ1.yposition,
			circ2.yposition
		) <
		circ2.radius + circ1.radius
	) {
		let absorbsionPower
		let eatenCircle
		if (circ1.radius > circ2.radius) {
			eatenCircle = circ2
		} else {
			eatenCircle = circ1
		}
		absorbsionPower = eatenCircle.radius * 0.0005
		if (eatenCircle.radius - absorbsionPower <= 10) {
			circlesOnBoard.pop(eatenCircle)
		}
		eatenCircle.strokeStyle = 'red'
		eatenCircle.radius -= absorbsionPower
		eatenCircle === circ1
			? (circ2.radius += absorbsionPower)
			: (circ1.radius += absorbsionPower)
	} else {
		circ2.strokeStyle = circ2.color
		circ1.strokeStyle = circ1.color
	}
}

let moveCircles = () => {
	requestAnimationFrame(moveCircles)
	context.clearRect(0, 0, windowWidth, windowHeight)
	circlesOnBoard.forEach((circle) => {
		circle.move()
		let enemyCircles = circlesOnBoard.filter((other) => other !== circle)
		enemyCircles.forEach((enemy) => handleCircleCollision(circle, enemy))
	})
}
moveCircles()
