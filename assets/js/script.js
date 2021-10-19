var cityName = $('#input-bar').val().trim()
// var storedWeather = JSON.parse(localStorage.getItem('weather')) || [];

var getWeather = function() {
    //city name from input
    console.log(cityName)
    
    // format the url
    var apiUrl = `https'://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=075971209128ea7c235a0302d27bd564`;

    // make a request to the url
    fetch(apiUrl)
    .then(function(response) {  
        //request was successful
        // if (response.ok) {
        //     console.log('success', response)
        //     response.json().then(function(data) {
        //         // displayWeather(data);
        // });
        // } else {
        // console.log(response)
        // alert('Error: Please Enter A Valid City Name');
        })

        
    // })
    // .catch(function(error) {
    //     // Notice this `.catch()` getting chained onto the end of the `.then()` method
    //     alert("Unable to connect to GitHub");
    // });
  };

//   var displayWeather = function(){
//     var weatherObj = {
//         city:'',
//         days:'',
//         uvIndex:{},
//         forecast: {}
//     }

//     weatherObj.city = cityName;
//     weatherObj.days = 'days',
//     weatherObj.uvIndex = 'uvIndex',
//     weatherObj.forecast = 'forecast'

//     storedWeather.push(weatherObj);

//     localStorage.setItem('weather', JSON.stringify(weather))
//   }


$('#input-area').on('click', 'button', console.log(cityName))