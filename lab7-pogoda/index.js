const query = document.querySelector('.search-bar')
const weatherBox = document.querySelector('.weather')
const api = {
	key: '3e81eb49d3ead8997fd68eee40d8904c',
	base: 'https://api.openweathermap.org/data/2.5/',
}

let weather = []
let searched = ''

query.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') search()
	else searched = query.value
})

const search = async () => {
	const city = query.value
	try {
		const currentWeather = await fetch(
			`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`
		)
			.then((res) => res.json())
			.then((result) => {
				return result
			})
		weather.push(currentWeather)
		addCityWeather(currentWeather)
		console.log(weather)
	} catch (err) {
		console.log('Error: ' + err)
	}
}

const addCityWeather = (currentCityWeather) => {
	const { name, main, sys, weather, wind } = currentCityWeather
	const { temp, humidity, pressure, feels_like } = main
	const { country, sunrise, sunset } = sys
	const { description } = weather[0]
	const simpleWeather = weather[0].main
	const { deg, speed } = wind

	const weatherDetails = {
		city: name,
		temp,
		humidity,
		pressure,
		feels_like,
		country,
		sunrise,
		sunset,
		description,
	}

	const cityWeatherBox = document.createElement('div')
	cityWeatherBox.classList.add('weather-city')

	const cityName = document.createElement('p')
	cityName.textContent = weatherDetails.city
	cityName.classList.add('weather-city-name')

	cityWeatherBox.appendChild(cityName)

	Object.keys(weatherDetails).forEach((detail) => {
		if (detail !== 'city') {
			const detailBox = document.createElement('div')
			detailBox.classList.add(`weather-city-${detail}`)
			detailBox.textContent = `${detail}: `

			const detailNo = document.createElement('span')
			detailNo.textContent = weatherDetails[detail]
			console.log(weatherDetails[detail])
			detailNo.classList.add(`weather-city-${detail}No`)

			detailBox.appendChild(detailNo)

			cityWeatherBox.appendChild(detailBox)
		}
	})

	const windBox = document.createElement('div')
	windBox.classList.add(`weather-city-wind`)
	windBox.textContent = 'Wind: '

	const windSpeed = document.createElement('div')
	windSpeed.classList.add(`weather-city-wind`)
	windSpeed.textContent = `Speed: ${speed}`

	const windDeg = document.createElement('div')
	windDeg.classList.add(`weather-city-wind`)
	windDeg.textContent = `Deg: ${deg}`

	windBox.appendChild(windSpeed)
	windBox.appendChild(windDeg)

	cityWeatherBox.appendChild(windBox)

	weatherBox.appendChild(cityWeatherBox)
}

const matchWeatherIcon = (weatherDesc) => {
	try {
		const weatherIcons = []
	} catch (err) {
		console.log(err)
	}
}

const dateBuilder = (today) => {
	let date = String(new window.Date())
	date = date.slice(3, 15)
	let days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	]
	let day = days[today.getDay()]

	return `${day}, ${date}`
}
