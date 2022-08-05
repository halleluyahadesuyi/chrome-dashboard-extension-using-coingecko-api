// fetch photos from unsplash api randomly
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
		document.getElementById("author").textContent = `By: Dodi Achmad`
    })


// fetch values of coins from coingecko api
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        // if appropriate response is not returned, throw error message 
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        // otherwise, return fetched data
        return res.json()
    })
    .then(data => {
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `

        // display values of coins on the page
        document.getElementById("crypto").innerHTML += `
            <p>CurrentPrice 🎯: $${data.market_data.current_price.usd}</p>
            <p>HighPrice 👆: $${data.market_data.high_24h.usd}</p>
            <p>LowPrice 👇: $${data.market_data.low_24h.usd}</p>
        `
    })
    .catch(err => console.error(err))

// function to get current internet time
function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

// display local time after 1ms of loading the page
setInterval(getCurrentTime, 1000)

// get the coordinates of the device's current location
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            // if a result is not returned as expected, throw this error
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            //otherwise, return the appropriate result
            return res.json()
        })
        .then(data => {
            // initialize the url leading to the current weather's icon
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            
            // display weather's icon
            // display value of location's temperature
            // display name of location (city)
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        // if an error occurs, diaplay it in the console
        .catch(err => console.error(err))
});
