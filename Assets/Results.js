var previousSearches = document.getElementById('prevSearches')
var pastButton = document.getElementsByClassName('pastButton')
var searchInputArea = document.getElementById('searchInput')
var resJsn = ''
var lat = ''
var long = ''
var locationData = ''


async function cityID() {
    //console.log(document.location.search)
    var city = document.location.search.split('=').pop()
    //console.log(city)

    await cityCoordinates(city)
    searchAPI()
}

async function cityCoordinates(cityValue){
    console.log(cityValue)
    var geoAPI = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityValue + '&limit=1&appid=d6e1171ad1f67f3bb738c55832ae9542'
    console.log(geoAPI)


    let response = await fetch(geoAPI)
    
    //console.log(response.ok)
    if(!response.ok){
        console.log(response)
        return   
    }else{

        response = await response.json()
        console.log(response)

        response = response[0]


        lat = (response.lat)
        long = (response.lon)
        locationData = (response.name + ' ' + response.country)
        console.log(lat)
        console.log(long)
        console.log(locationData)
    }
}

async function searchAPI(){
    var weatherAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&units=metric&appid=b3c1efcd09381a0214b3577ec13e218b'
    console.log(weatherAPI)

    let response = await fetch(weatherAPI)

    console.log(response.ok)
    if(!response.ok){
        console.log(response)
        return
    }else{

        response = await response.json()
        console.log(response)

        var dateCal = response.list[2].dt_txt
        var temperature = response.list[2].main.temp
        var feelsLike = response.list[2].main.feels_like
        var weather = response.list[2].weather[0].main
        var humidity = response.list[2].main.humidity
        var wind = response.list[2].wind.speed

        var dateOnly = dateCal.slice(0, 10)
        var tempRound = Math.round(temperature)
        var feelRound = Math.round(feelsLike)
        var windRound = Math.round(wind)
        var weatherCap = weather.charAt(0).toUpperCase() + weather.slice(1);

        //console.log(dateOnly)
        //console.log(tempRound)
        //console.log(feelRound)
        //console.log(weatherCap)
        //console.log(humidity)
        //console.log(windRound)

        var warning = ['Mist','Smoke','Haze','Dust','Fog','Sand','Dust','Ash','Squall','Tornado']

        if(warning.includes(weatherCap)){
            weatherCap = 'Warning'
        }

        var informationMain1 = (dateOnly)
        var informationMain2 = ('Temperature: '+ tempRound + 'c<br>' + 'Feels like: ' + feelRound + "c<br>Weather: " + weatherCap + '<br>Humidity: ' + humidity + '% <br>Wind: ' + windRound + ' Km/h')

        var icon = document.createElement('figure')
            icon.innerHTML = "<img src='./Assets/Weather Icons/" + weatherCap + ".png'>"

        var heading2 = document.createElement('h2')
        heading2.innerHTML = locationData
        var body1 = document.createElement('p')
        body1.innerHTML = informationMain1
        var body2 = document.createElement('p')
        body2.innerHTML = informationMain2

        document.getElementById('mainArea').appendChild(heading2)
        document.getElementById('mainArea').appendChild(body1)
        document.getElementById('mainArea').appendChild(icon)
        document.getElementById('mainArea').appendChild(body2)



        var listNo = [10, 18, 26, 34, 39]

        for (var i = 0; i <= 4; i++){
            var n = listNo[i]

            var dateCal = response.list[n].dt_txt
            var temperature = response.list[n].main.temp
            var weather = response.list[n].weather[0].main
            var humidity = response.list[n].main.humidity
            var wind = response.list[n].wind.speed

            var dateOnly = dateCal.slice(0, 10)
            var tempRound = Math.round(temperature)
            var windRound = Math.round(wind)
            var weatherCap = weather.charAt(0).toUpperCase() + weather.slice(1);

            console.log(i + 1)

            var dateDiv = document.getElementById(i + 1)

            var warning = ['Mist','Smoke','Haze','Dust','Fog','Sand','Dust','Ash','Squall','Tornado']

            if(warning.includes(weatherCap)){
                weatherCap = 'Warning'
            }

            //console.log(resultArea)
            var dateData = document.createElement('h4')
            dateData.innerHTML = dateOnly
            dateDiv.appendChild(dateData)

            var icon = document.createElement('figure')
            icon.innerHTML = "<img src='./Assets/Weather Icons/" + weatherCap + ".png'>"
            dateDiv.appendChild(icon)

            var tempData = document.createElement('p')
            tempData.innerHTML = ('Temperature<br>' + tempRound + 'c')
            dateDiv.appendChild(tempData)

            var WeatherData = document.createElement('p')
            WeatherData.innerHTML = ('Weather<br>' + weatherCap)
            dateDiv.appendChild(WeatherData)

            var HumidityData = document.createElement('p')
            HumidityData.innerHTML = ('Humidity<br>' + humidity + '%')
            dateDiv.appendChild(HumidityData)

            var WindData = document.createElement('p')
            WindData.innerHTML = ('Wind<br>' + windRound + ' Km/h')
            dateDiv.appendChild(WindData)

            document.getElementById('fiveDay').appendChild(dateDiv)
            
        }
    }
}

function citySelector(){
    var city = searchInputArea.value
    submitForm(city)
}

function submitForm(city){
    event.preventDefault()

    console.log(city)
    if (city == '') {
        h2.innerHTML = 'Please Enter Valid City';
        return
    }


    storeLength = localStorage.length
    console.log(storeLength)

    if (storeLength > 0){
            for (var i = 1; i <= storeLength; i++){
                //console.log(i)
                if (localStorage.getItem(i) == city){
                    locationAssign2(city)
                    return
                }
            }
    }

    locationAssign1(city) 
}  

function locationAssign1(city){
    localStorage.setItem(storeLength + 1 , city)
    var resultsPage = './results.html?q=' + city
    location.assign(resultsPage)
}

function locationAssign2(city){
    var resultsPage = './results.html?q=' + city
    location.assign(resultsPage)
}

function previousSearchList(){
    storeLength = localStorage.length
    for (var i = 1; i <= storeLength; i++){
        console.log(i)
        var prevSDiv = document.createElement('button')
        prevSDiv.classList.add('pastButton')
        var localSearch = localStorage.getItem(i)
        prevSDiv.innerHTML = localSearch
        previousSearches.appendChild(prevSDiv)
    }
}

function previousSearchRequest(event){
    var requestedName = event.target
    city = requestedName.innerText
    console.log(city)
    submitForm(city)
}

cityID()
previousSearchList()

searchForm.addEventListener('submit', citySelector)

var storeLength = localStorage.length
if (storeLength > 0){
    for (var i = 0; i < storeLength; i++){
        //console.log(i)
    pastButton[i].addEventListener('click', previousSearchRequest)
    }
}