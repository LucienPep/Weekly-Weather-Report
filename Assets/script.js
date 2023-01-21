var searchForm = document.getElementById('searchForm')
var h2 = document.getElementById('subTitle')
var storeLength = ''

//function Autofill(){
//    var search = document.getElementById('searchInput')
//
//    search.onkeydown = function(){
//        console.log('Banana')
//        var citySearch = search.value
//
//        if(citySearch.length>2){
//            var fillSpace = document.getElementById('autofill')
//            var div = document.createElement("div")
//            div.innerHTML = "banana"
//            fillSpace.appendChild(div)
//        }
//
//        var APIData = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearch + '&limit=1&appid=b3c1efcd09381a0214b3577ec13e218b'
//
//        APIData.onload = function(){
//            var call = JSON.parse(this.response)
//            console.log(call)
//        }
//    }
//}

function submitForm(event){
    event.preventDefault()
    
    var city = document.getElementById('searchInput').value
    console.log(city)
    if (city == '') {
        h2.innerHTML = 'Please Enter Valid City';
        return
    }

    storeLength = localStorage.length

    for (var i = 0; i < storeLength; i++){
        console.log(i)
    }


    localStorage.setItem(storeLength + 1 , city)

    var resultsPage = './Results.html?q=' + city

    location.assign(resultsPage)
}

//Autofill()
searchForm.addEventListener('submit', submitForm)