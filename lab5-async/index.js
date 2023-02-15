let sum = 0
let asyncInvokeCounter = 0

const asyncAdd = async (a, b) => {
	if (typeof a !== 'number' || typeof b !== 'number') {
		return Promise.reject('Argumenty muszą mieć typ number!')
	}
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(a + b)
		}, 100)
	})
}

const fetchArguments = (numbers) => {
	const numbers = [...numbers]
	numbers.forEach(async (number) => {
		const newSum = await asyncAdd(sum, number).then(() => asyncInvokeCounter++)
		sum = newSum
	})
}
