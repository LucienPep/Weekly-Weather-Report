var searchForm = document.getElementById('searchForm')
var h2 = document.getElementById('subTitle')
var storeLength = ''
var previousSearches = document.getElementById('prevSearches')
var pastButton = document.getElementsByClassName('pastButton')
var searchInputArea = document.getElementById('searchInput')
var city = searchInputArea.value

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
        //console.log(i)
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

previousSearchList()

searchForm.addEventListener('submit', citySelector)

var storeLength = localStorage.length
if (storeLength > 0){
    for (var i = 0; i < storeLength; i++){
        //console.log(i)
    pastButton[i].addEventListener('click', previousSearchRequest)
    }
}