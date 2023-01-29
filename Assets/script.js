var searchForm = document.getElementById('searchForm')
var h2 = document.getElementById('subTitle')
var storeLength = ''
var previousSearches = document.getElementById('prevSearches')
var pastButton = document.getElementsByClassName('pastButton')
var searchInputArea = document.getElementById('searchInput')
var city = searchInputArea.value

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
        //console.log(i)
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



