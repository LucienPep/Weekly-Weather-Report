


function cityID() {
    var city = document.location.search.split('=').pop()
    console.log(city)

    cityCoordinates(city)
}

function cityCoordinates(cityValue){
    console.log(cityValue)
    var geoAPI = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityValue + '&limit=1&appid=b3c1efcd09381a0214b3577ec13e218b'
    console.log(geoAPI)

}

//function searchAPI(){
//    var weatherAPI = 'api.openweathermap.org/data/2.5/forecast?'
//}

cityID()