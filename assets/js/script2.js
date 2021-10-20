
var getWeather = function() {
    var cityName = $('#input-bar').val()
    // format the url
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=075971209128ea7c235a0302d27bd564&units=imperial";
    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {   
        //request was successful
        if (response.ok) {
            response.json().then(function(data) {
                console.log('success', data)
                displayWeather(data);
                displayForecast(data);
        });
        } else {
        console.log(response)
        alert('Error: Please Enter A Valid City Name')
        };
    })
    .catch(function(error) {
        alert("Unable to connect to GitHub");
    });
    
    
};  

var displayWeather = function(data) {
    //change display from none 
    $('#current-location-display').addClass('d-block')

    $('#current-header').text(data.city.name + " (" + moment().format('MM/DD/YYYY') +")")
    var currentTemp = data.list[0].main.temp
    var currentWind = data.list[0].wind.speed
    var currentHumidity = data.list[0].main.humidity
    
    $('#cur-temp').text('Temp: ' + currentTemp + '˚')
    $('#cur-wind').text('Wind: ' + currentWind + 'mph')
    $('#cur-humidity').text('Humidity: ' + currentHumidity +'%')

    //set coordinates
    let coords = {
        Lattitude: data.city.coord.lat,
        Longitude: data.city.coord.lat,
    }
    //send it to getforecast
    getUVI(coords);
}

var getUVI = function(coords) {
    var uviUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coords.Lattitude + "&lon=" + coords.Longitude +"&appid=075971209128ea7c235a0302d27bd564&units=imperial";

    fetch(uviUrl)
    .then(function(response) {   
        //request was successful
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data)
                //display UVI
                $('#UV-box').text(data.current.uvi);
                if (data.current.uvi > 10) {
                    $('#UV-box').addClass('bg-danger')
                } else if (data.current.uvi < 10 && data.current.uvi > 5) {
                    $('#UV-box').addClass('bg-warning')
                } else {
                    $('#UV-box').addClass('bg-success')
                }
            });
        }
        
    })
   
}

var displayForecast = function(data) {
    var now = moment()
    //change display from none
    $('#forecast-display').addClass('d-block')
    
    
    for (i = 4; i <40; i += 8) {
    k = ((i+4)/8)+3

        //make the card
    var newCard = $('<div>')
    .addClass('forecast-item bg-dark p-3');
    //make the h3
    var preDay = moment().day(k)
    var newHeader = $('<h3>')
    .text(moment(preDay).format('MM/DD/YYYY'))
        //make img
    var iconCode = data.list[i].weather[0].icon
    var iconURL = 'http://openweathermap.org/img/wn/' + iconCode +'@2x.png'
    var newImage = $('<img>')
    .attr('src', iconURL)
    //make ul
    var newList = $('<ul>')
    .addClass('forecast-list fs-5 list-group')
    //make li's
    var newTemp = $('<li>')
    .addClass('current-text p-2')
    .text('Temp: ' + data.list[i].main.temp)
    var newWind = $('<li>')
    .addClass('current-text p-2')
    .text('Wind: ' + data.list[i].wind.speed)
    var newHumidity = $('<li>')
    .addClass('current-text p-2')
    .text('Humidity: ' + data.list[i].main.humidity)
    
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


$('#input-area').on('click', 'button', function(){
    getWeather();
    $('#forecast-container').empty()
})
