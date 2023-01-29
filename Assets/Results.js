var previousSearches = document.getElementById('prevSearches')
var pastButton = document.getElementsByClassName('pastButton')
var searchInputArea = document.getElementById('searchInput')
var resJsn = ''
var lat = ''
var long = ''
var locationData = ''

//check html path from index.html and get city value assigned 
async function cityID() {
    //console.log(document.location.search)
    var city = document.location.search.split('=').pop()
    //console.log(city)

    //wait until value is assigned and run function with city value
    await cityCoordinates(city)
    searchAPI()
}

//search API using cityValue to find coordinates for inputted city
async function cityCoordinates(cityValue){
    console.log(cityValue)
    var geoAPI = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityValue + '&limit=1&appid=d6e1171ad1f67f3bb738c55832ae9542'
    console.log(geoAPI)

    //wait for api call to be completed
    let response = await fetch(geoAPI)
    
    //console.log(response.ok)
    //if response is not okay cancel function
    if(!response.ok){
        console.log(response)
        return   
    }else{

        //wait for response to complete then json
        response = await response.json()
        console.log(response)

        response = response[0]

        //get values from response needed for weather API call
        lat = (response.lat)
        long = (response.lon)
        locationData = (response.name + ' ' + response.country)
        console.log(lat)
        console.log(long)
        console.log(locationData)
    }
}

//use values of lat and long to search API for weather details on desired city
async function searchAPI(){
    var weatherAPI = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&units=metric&appid=b3c1efcd09381a0214b3577ec13e218b'
    console.log(weatherAPI)

    let response = await fetch(weatherAPI)

    //if response is not okay cancel function
    console.log(response.ok)
    if(!response.ok){
        console.log(response)
        return
    }else{

        //wait for response to complete then json
        response = await response.json()
        console.log(response)

        //create variables for individual data inputs from API call for main weather forecast
        var dateCal = response.list[2].dt_txt
        var temperature = response.list[2].main.temp
        var feelsLike = response.list[2].main.feels_like
        var weather = response.list[2].weather[0].main
        var humidity = response.list[2].main.humidity
        var wind = response.list[2].wind.speed

        //Edit data to be in correct format for use on webpage
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

        //Check weather status for unusual weather and assign 'warning' if present
        const warning = ['Mist','Smoke','Haze','Dust','Fog','Sand','Dust','Ash','Squall','Tornado']

        if(warning.includes(weatherCap)){
            weatherCap = 'Warning'
        }

        //Assign data in right order with correct spacing and values, create elements where data will be stored in HTML and weather Icon will be shown and then append into HTML
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

        //Five Day forecast

        //const of folders to collect data from in API call
        const listNo = [10, 18, 26, 34, 39]

        //for each list item in above array collect certain data elements 
        for (var i = 0; i <= 4; i++){
            var n = listNo[i]

            //required data elements
            var dateCal = response.list[n].dt_txt
            var temperature = response.list[n].main.temp
            var weather = response.list[n].weather[0].main
            var humidity = response.list[n].main.humidity
            var wind = response.list[n].wind.speed

            //Edit data to be in correct format for use on webpage
            var dateOnly = dateCal.slice(0, 10)
            var tempRound = Math.round(temperature)
            var windRound = Math.round(wind)
            var weatherCap = weather.charAt(0).toUpperCase() + weather.slice(1);

            console.log(i + 1)

            //select which div to input information
            var dateDiv = document.getElementById(i + 1)

            if(warning.includes(weatherCap)){
                weatherCap = 'Warning'
            }

            //console.log(resultArea)
            //create elements for data inputs for 5 day forecast and append into HTML element 'fiveDay'
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

// gets city name from either local storage or input
function citySelector(){
    var city = searchInputArea.value
    submitForm(city)
}

// Function to check for city value and check if value is already present in local storage
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

//function to assign to local storage and continue to next page with city value
function locationAssign1(city){
    localStorage.setItem(storeLength + 1 , city)
    var resultsPage = './results.html?q=' + city
    location.assign(resultsPage)
}

//function to continue to next page with city value without setting local storage
function locationAssign2(city){
    var resultsPage = './results.html?q=' + city
    location.assign(resultsPage)
}

//check for local storage elements and create buttons for each one present
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

//get value from button pressed from local storage and submit
function previousSearchRequest(event){
    var requestedName = event.target
    city = requestedName.innerText
    console.log(city)
    submitForm(city)
}
cityID()
previousSearchList()

searchForm.addEventListener('submit', citySelector)

//if local storage contains any items listen for click on button
var storeLength = localStorage.length
if (storeLength > 0){
    for (var i = 0; i < storeLength; i++){
        //console.log(i)
    pastButton[i].addEventListener('click', previousSearchRequest)
    }
}