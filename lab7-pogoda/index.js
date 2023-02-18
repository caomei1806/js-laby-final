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
	} catch (err) {
		console.log('Error: ' + err)
	} finally {
		query.value = ''
	}
}

const buildWeatherDOM = (weatherDetails) => {
	const cityWeatherBox = document.createElement('div')
	cityWeatherBox.classList.add('weather-city')

	const deleteButton = document.createElement('button')
	deleteButton.classList.add('btn', 'btn-delete')
	deleteButton.textContent = 'X'

	cityWeatherBox.appendChild(deleteButton)

	const cityName = document.createElement('p')
	cityName.textContent = weatherDetails.city
	cityName.classList.add('weather-city-name')

	cityWeatherBox.appendChild(cityName)

	Object.keys(weatherDetails).forEach(async (detail) => {
		const simpleWeather = weatherDetails['simpleWeather']
		const weatherId = weatherDetails['weatherId']

		if (
			detail !== 'city' &&
			detail !== 'simpleWeather' &&
			detail !== 'weatherId'
		) {
			const detailBox = document.createElement('div')
			detailBox.classList.add(`weather-city-${detail}`)
			const detailIcon = await matchWeatherDetailIcon(detail)
			detailBox.textContent = `${detail} `
			if (detailIcon) {
				detailBox.innerHTML += `${detailIcon} <br />`
			}
			if (detail !== 'wind') {
				const detailNo = document.createElement('span')
				if (detail !== 'weather') {
					let unit = ''
					switch (detail) {
						case 'temp':
							unit = '°C'
							break
						case 'feels_like':
							unit = '°C'
							break
						case 'humidity':
							unit = '%'
							break
						case 'presure':
							unit = 'hPa'
							break
						case 'presure':
							unit = 'hPa'
							break
						default:
							break
					}
					if (detail !== 'sunrise' && detail !== 'sunset')
						detailNo.textContent = `${weatherDetails[detail]}${unit}`
					else detailNo.textContent = time_convert(weatherDetails[detail])
				} else {
					const icon = await matchWeatherIcon(simpleWeather, weatherId)
					if (icon) {
						detailNo.innerHTML = `${icon} \n ${weatherDetails[detail]}`
					}
				}
				detailNo.classList.add(`weather-city-${detail}No`)

				detailBox.appendChild(detailNo)
			} else {
				detailBox.textContent = `${detail} `
				detailBox.innerHTML += detailIcon

				const windSpeed = document.createElement('div')
				windSpeed.classList.add(`weather-city-wind`)
				windSpeed.textContent = `Speed: ${weatherDetails[detail].speed}km/h`

				const windDeg = document.createElement('div')
				windDeg.classList.add(`weather-city-wind`)
				windDeg.innerHTML = `Deg: ${weatherDetails[detail].deg}°`

				detailBox.appendChild(windSpeed)
				detailBox.appendChild(windDeg)
			}

			cityWeatherBox.appendChild(detailBox)
		}
	})

	weatherBox.appendChild(cityWeatherBox)
}

const addCityWeather = (currentCityWeather) => {
	const { name, main, sys, weather, wind } = currentCityWeather
	const { temp, humidity, pressure, feels_like } = main
	const { country, sunrise, sunset } = sys
	const { description, id: weatherId } = weather[0]
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
		weather: description,
		wind,
		simpleWeather,
		weatherId,
	}

	const isAbleToAddNewElement = saveLocal(weatherDetails)
	if (isAbleToAddNewElement) buildWeatherDOM(weatherDetails)
}

const matchWeatherDetailIcon = async (weatherDetail) => {
	try {
		const res = await fetch('./titleIcons.json')
		const titleWeatherIcons = await res.json()

		const iconByName = titleWeatherIcons.find(
			(weather) => weather.name === weatherDetail
		)
		if (iconByName) return iconByName.icon
		else return ''
	} catch (err) {
		console.log(err)
	}
}

const matchWeatherIcon = async (weatherDesc, weatherId = 0) => {
	try {
		const res = await fetch('./weatherIcons.json')
		const weatherIcons = await res.json()

		const iconById = weatherIcons.find((weather) => weather.id === weatherId)
		if (iconById) {
			return iconById.icon
		} else {
			const iconByName = weatherIcons.filter(
				(weather) => weather.name === weatherDesc
			)

			return iconByName[0].icon
		}
	} catch (err) {
		console.log(err)
	}
}

const saveLocal = (weather) => {
	let weatherList
	if (localStorage.getItem('weatherList') == null) {
		weatherList = []
	} else {
		weatherList = JSON.parse(localStorage.getItem('weatherList'))
	}
	if (weatherList.length < 10) {
		weatherList.push(weather)
		localStorage.setItem('weatherList', JSON.stringify(weatherList))
		return 1
	} else {
		const errorMessage = document.createElement('p')
		errorMessage.classList.add('error')
		errorMessage.textContent =
			'You could only search up to 10 weather elements! Please delete weather element to be able to get a new one.'

		const deleteButton = document.createElement('button')
		deleteButton.classList.add('btn', 'btn-delete', 'btn-light')
		deleteButton.textContent = 'X'

		errorMessage.appendChild(deleteButton)

		query.parentElement.appendChild(errorMessage)
		return 0
	}
}

const showWeather = () => {
	weatherBox.replaceChildren()

	let weatherList
	if (localStorage.getItem('weatherList') == null) {
		weatherList = []
	} else {
		weatherList = JSON.parse(localStorage.getItem('weatherList'))
	}

	weatherList.forEach((weather) => {
		console.log(weather)
		buildWeatherDOM(weather)
	})
}
document.addEventListener('DOMContentLoaded', showWeather)

const removeWeather = (weather) => {
	let weatherList
	if (localStorage.getItem('weatherList') == null) {
		weatherList = []
	} else {
		weatherList = JSON.parse(localStorage.getItem('weatherList'))
	}
	//console.log(weather.children[1].textContent)
	const weatherToDelete = weatherList.find(
		(currentWeather) => currentWeather.city === weather.children[1].textContent
	)
	//weatherList.forEach((weather) => console.log(weather.city))
	const newWeatherList = weatherList.filter(
		(weather) => weather !== weatherToDelete
	)
	localStorage.setItem('weatherList', JSON.stringify(newWeatherList))
}

const deleteWeather = (event) => {
	const item = event.target
	if (item.classList[1] == 'btn-delete') {
		const weatherToDelete = item.parentElement
		console.log(weatherToDelete)
		weatherToDelete.classList.add('deleted')
		removeWeather(weatherToDelete)
		weatherToDelete.addEventListener('transitionend', function () {
			weatherToDelete.remove()
		})
		showWeather()
	}
}
const deleteElement = (event) => {
	const item = event.target
	if (item.classList[1] == 'btn-delete') {
		console.log(item.classList)

		const elementToDelete = item.parentElement
		elementToDelete.classList.add('deleted')

		elementToDelete.addEventListener('transitionend', function () {
			elementToDelete.remove()
		})
	}
}
weatherBox.addEventListener('click', deleteWeather)
query.parentElement.addEventListener('click', deleteElement)

function time_convert(num) {
	var date = new Date(num)
	var timestr = date.toLocaleTimeString()
	return timestr
}
