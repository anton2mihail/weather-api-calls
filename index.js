function buttonSwap() {
  $("#currentC").toggle();
  $("#currentF").toggle();
}
$("document").ready(function () {
  setTimeout(function () {
    $("#loading").fadeOut();
    $("#prompt").toggle();
    $("body").css({
      "background-color": "white",
      "background-size": "100%",
      "font-size": "none",
      "text-transform": "none",
      "margin": "0",
      "font-family": "'Eczar', serif;"
    });
    $("head").append('<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">');
    $("body").append('<div id="prompt" class="jumbotron"><center> <h1 id="promptTitle" class="display-4" > Check Out This Weather! </h1> <div id="promptDescription" class="lead"> This is a simple weather app that will query the OpenWeather Api for weather data in your current location. </div> <hr id="brk" class="my-4"><p id="promptWarning"> If location services are off, or disabled, then you will get weather from a random city in the world. </p>  <a class="btn btn-info" type="submit" href="#" id="query" role="button"> Show Me!</a></center></div>');
    $("body").css({
      "background-image": "url('https://st2.depositphotos.com/1000487/7225/v/950/depositphotos_72257605-stock-illustration-abstract-light-blue-background-vector.jpg')"
    });
    $("#query").click(function (e) {
    e.preventDefault();
    console.log("Button Was clicked");
    $.ajax({
      url: url,
      method: "GET",
      crossDomain: true,
      dataType: 'jsonp',
      success: function (data) {
        console.log(data);
        setUpPage(data);
      },
      error: function () {
        console.log("Api call failed!");
      }
    });
  });

  }, 3500);

  
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(success, fail);
  } else {
    /* geolocation IS NOT available */

  }
  var url = "";
  var city = "";
  var cities = {
    "Madrid": [40.40002626, -3.683351686],
    "London": [51.49999473, -0.116721844],
    "Toronto": [43.69997988, -79.42002079],
    "Washington": [38.89954938, -77.00941858],
    "Paris": [48.86669293, 2.333335326],
    "Budapest": [47.50000633, 19.08332068],
    "Bucharest": [44.4333718, 26.09994665],
    "Amsterdam": [52.34996869, 4.916640176],
    "Rome": [41.89595563, 12.48325842],
    "Moscow": [55.75216412, 37.6155228],
    "Miami": [25.7876107, -80.22410608]
  };

  function kelvinToC(temp) {
    temp -= 273.15;
    return Math.floor(temp);
  }
  function kelvinToF(temp){
   var F = 1.8*(temp - 273) + 32;
   return Math.floor(F);
  }
  

  function fail() {
    console.log("Unable to retieve your location");
    console.log("Revert to default");
    var api = "1f8995d8d2f8c4fe5aa012fa5d484543";
    cityNames = ["Madrid", "London", "Toronto", "Washington", "Paris", "Budapest", "Bucharest", "Amsterdam", "Rome", "Moscow", "Miami"];
    var num = Math.floor(Math.random() * 10);
    city = cityNames[num];
    var latitude = cities[cityNames[num]][0];
    var longitude = cities[cityNames[num]][1];
    url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + api;
  }

  function success(position) {
    var api = "1f8995d8d2f8c4fe5aa012fa5d484543";
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=" + api;
  }
  function setUpPage(data) {
    var max = data.main.temp_max;
    var min = data.main.temp_min;
    var current = Math.floor(data.main.temp);
    min = kelvinToC(min);
    max = kelvinToC(max);
    currentC = kelvinToC(current);
    currentF = kelvinToF(current);
    if (city !== "") {
      $("#promptTitle").text(city);
    } else {
      $("#promptTitle").text(data.name + "," + data.sys.country);
    }
    $("#promptDescription").text(data.weather[0].description);
    $("#promptDescription").append($('<div>', {
      id: "temps"
    }));
    $("#temps").append($('<p>', {
      id : "currentF"
    }));
    $("#currentF").html("Min temp: " + currentF + " <button class='btn btn-info' type='button' onclick='javascript:buttonSwap()'><sup>o</sup>F</button> ");
    $("#currentF").hide();
    $("#temps").append($('<p>', {
      id: "currentC"
    }));
    $("#currentC").html("Min temp: " + currentC + " <button class='btn btn-info' type='button' onclick='javascript:buttonSwap()'><sup>o</sup>C</button>");
    
    $("#promptWarning").text("");
    $('#promptWarning').append($('<img>', {
      id: "",
      src: "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
    }));
    $("#query").hide();
  }

  







});