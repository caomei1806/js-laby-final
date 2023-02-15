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
const fetchArguments = (args) => {
	console.log(args)

	const numbers = [...args]
	numbers.forEach(async (number) => {
		const newSum = await asyncAdd(sum, number).then(() => asyncInvokeCounter++)
		sum = newSum
	})
}
const fetchRandomData = async (dataFile) => {
	const data = await fetch(`./${dataFile}`)
	const result = await data.json()
	console.log(result)
	return result
}

const performDataCalculation = async () => {
	const randomData = fetchRandomData('data.json')
		.then((data) => data)
		.then((data) => {
			let start = performance.now()
			fetchArguments(data)
			let end = performance.now()
			let timestamp = end - start
			console.log('Exec time: ' + timestamp)
		})
}
performDataCalculation()
