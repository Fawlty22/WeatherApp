
var getWeather = function () {
    var cityName = $('#input-bar').val()
    // format the url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=075971209128ea7c235a0302d27bd564&units=imperial";
    // make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            //request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    console.log('getWeather', data)
                    showWeatherBox(data);
                    displayForecast(data);
                    getCoords(data);
                    buttonFilter(data);
                });
            } else {
                console.log(response)
                alert('Error: Please Enter A Valid City Name')
            };
        })
        .catch(function (error) {
            alert("Unable to connect to GitHub");
        });
};

var showWeatherBox = function (data) {
    //change display from none 
    $('#current-location-display').addClass('d-block')
    $('#current-header').text(data.city.name + " (" + moment().format('MM/DD/YYYY') + ")")
}

var displayWeather = function (data) {
    var currentTemp = data.current.temp
    var currentWind = data.current.wind_speed
    var currentHumidity = data.current.humidity

    $('#cur-temp').text('Temp: ' + currentTemp + '˚')
    $('#cur-wind').text('Wind: ' + currentWind + 'mph')
    $('#cur-humidity').text('Humidity: ' + currentHumidity + '%')


}

var getCoords = function (data) {
    //set coordinates
    let coords = {
        Lattitude: data.city.coord.lat,
        Longitude: data.city.coord.lat,
    }
    //send it to getUVI
    getUVI(coords);

}

var getUVI = function (coords) {
    var uviUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coords.Lattitude + "&lon=" + coords.Longitude + "&appid=075971209128ea7c235a0302d27bd564&units=imperial";

    fetch(uviUrl)
        .then(function (response) {
            //request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    console.log('uvi get', data)
                    //display UVI
                    $('#UV-box').text(data.current.uvi);
                    if (data.current.uvi >= .7) {
                        $('#UV-box').addClass('bg-danger')
                    } else if (data.current.uvi < .7 && data.current.uvi >= .3) {
                        $('#UV-box').addClass('bg-warning')
                    } else {
                        $('#UV-box').addClass('bg-success')
                    }

                    displayWeather(data)
                });
            }

        })

}

var displayForecast = function (data) {
    var now = moment()
    //change display from none
    $('#forecast-display').addClass('d-block')


    for (i = 4; i < 40; i += 8) {
        //variable for moment dates to handle weird iterating
        k = ((i + 4) / 8) + 3

        //make the card
        var newCard = $('<div>')
            .addClass('forecast-item bg-dark p-3');
        //make the h3
        var preDay = moment().day(k)
        var newHeader = $('<h3>')
            .text(moment(preDay).format('MM/DD/YYYY'))
        //make img
        var iconCode = data.list[i].weather[0].icon
        var iconURL = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png'
        var newImage = $('<img>')
            .attr('src', iconURL)
        //make ul
        var newList = $('<ul>')
            .addClass('forecast-list fs-5 list-group')
        //make li's
        var newTemp = $('<li>')
            .addClass('current-text p-2')
            .text('Temp: ' + data.list[i].main.temp + '˚')
        var parseWind = Math.floor(data.list[i].wind.speed)
        var newWind = $('<li>')
            .addClass('current-text p-2')
            .text('Wind: ' + parseWind + 'mph')
        var newHumidity = $('<li>')
            .addClass('current-text p-2')
            .text('Humidity: ' + data.list[i].main.humidity + '%')


        //append header to div
        newCard.append(newHeader)
        //append img
        newCard.append(newImage)
        //append ul
        newCard.append(newList)
        //append li's to ul
        newList.append(newTemp)
        newList.append(newWind)
        newList.append(newHumidity)

        //append card to display
        $('#forecast-container').append(newCard)
    }
}

var createPastLocation = function (data) {

    // make the new button
    var newPastLocationButton = $('<button>')
        .addClass('btn past-btn btn-secondary mb-3')
        .text(data.city.name)
    //append it to sidebar
    $('#past-searches').append(newPastLocationButton)
}

var reloadWeather = function (locationToLoad) {

    locationToLoad.replace(' ', '%20')
    // format the url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + locationToLoad + "&appid=075971209128ea7c235a0302d27bd564&units=imperial";
    // make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            //request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    console.log('reload', data)
                    showWeatherBox(data);
                    reloadForecast(data);
                    getCoords(data);
                });
            } else {
                console.log(response)
                alert('Error: Please Enter A Valid City Name')
            };
        })
        .catch(function (error) {
            alert("Unable to connect to GitHub");
        });


};

var reloadForecast = function (data) {
    var now = moment()
    //change display from none
    $('#forecast-display').addClass('d-block')


    for (i = 4; i < 40; i += 8) {
        //variable for moment dates to handle weird iterating
        k = ((i + 4) / 8) + 3

        //make the card
        var newCard = $('<div>')
            .addClass('forecast-item bg-dark p-3');
        //make the h3
        var preDay = moment().day(k)
        var newHeader = $('<h3>')
            .text(moment(preDay).format('MM/DD/YYYY'))
        //make img
        var iconCode = data.list[i].weather[0].icon
        var iconURL = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png'
        var newImage = $('<img>')
            .attr('src', iconURL)
        //make ul
        var newList = $('<ul>')
            .addClass('forecast-list fs-5 list-group')
        //make li's
        var newTemp = $('<li>')
            .addClass('current-text p-2')
            .text('Temp: ' + data.list[i].main.temp + '˚')
        var parseWind = Math.floor(data.list[i].wind.speed)
        var newWind = $('<li>')
            .addClass('current-text p-2')
            .text('Wind: ' + parseWind + 'mph')
        var newHumidity = $('<li>')
            .addClass('current-text p-2')
            .text('Humidity: ' + data.list[i].main.humidity + '%')

        //append header to div
        newCard.append(newHeader)
        //append img
        newCard.append(newImage)
        //append ul
        newCard.append(newList)
        //append li's to ul
        newList.append(newTemp)
        newList.append(newWind)
        newList.append(newHumidity)

        //append card to display
        $('#forecast-container').append(newCard)
    }
}

var buttonFilter = function (data) {
    var pastButtonsObjArray = $('#past-searches').children()
    var pastButtonsArray = []
    var inputCity = data.city.name
    //add previously searched city names to array
    for (i = 0; i < pastButtonsObjArray.length; i++) {
        var newCityName = pastButtonsObjArray[i].textContent
        pastButtonsArray.push(newCityName)
    }
    //if button doesnt yet exist, make it
    if(pastButtonsArray.indexOf(inputCity) === -1){
    createPastLocation(data);
    }
    saveWeather();
}

var saveWeather = function() {
    var citiesArray = []
    var pastButtonsObjArray = $('#past-searches').children()

    //add previously searched city names to array
    for (i = 0; i < pastButtonsObjArray.length; i++) {
        var newCityName = pastButtonsObjArray[i].textContent
        citiesArray.push(newCityName)
    }
    localStorage.setItem('cities', JSON.stringify(citiesArray))
}

var loadWeather = function(){
    var loadedCities = JSON.parse(localStorage.getItem('cities'))
    for (i=0;i<loadedCities.length;i++){
    // make the new button
    var newPastLocationButton = $('<button>')
        .addClass('btn past-btn btn-secondary mb-3')
        .text(loadedCities[i])
    //append it to sidebar
    $('#past-searches').append(newPastLocationButton)
    }
}

loadWeather();

                                                                


                                                        //event listeners
$('#input-area').on('click', 'button', function () {
    //run getWeather
    getWeather();
    //clear input bar
    $('#input-bar').val('')
    $('#forecast-container').empty()
    
})

$('#past-searches').on('click', 'button', function () {
    var locationToLoad = $(this).text()
    // console.log(locationToLoad)
    reloadWeather(locationToLoad);
    $('#forecast-container').empty();



})