
var lat = 51.5074,
    lon = 0.1278;

var temp = 0;

var idIcons = { "200":"thunder-storm-icon.png",
              "201":"thunder-storm-icon.png",
              "202":"thunder-storm-icon.png",
              "210":"thunder-storm-icon.png",
              "211":"thunder-storm-icon.png",
              "212":"thunder-storm-icon.png",
              "221":"thunder-storm-icon.png",
              "230":"thunder-storm-icon.png",
              "231":"thunder-storm-icon.png",
              "232":"thunder-storm-icon.png",
              "300":"shower-icon.png",
              "301":"shower-icon.png",
              "302":"shower-icon.png",
              "310":"shower-icon.png",
              "311":"shower-icon.png",
              "312":"shower-icon.png",
              "313":"shower-icon.png",
              "314":"shower-icon.png",
              "321":"shower-icon.png",
              "500":"raining-icon.png",
              "501":"raining-icon.png",
              "502":"raining-icon.png",
              "503":"raining-icon.png",
              "504":"raining-icon.png",
              "511":"snowing-icon1.png",
              "520":"shower-icon.png",
              "521":"shower-icon.png",
              "522":"shower-icon.png",
              "531":"shower-icon.png",
              "600":"snowing-icon1.png",
              "601":"snowing-icon1.png",
              "602":"snowing-icon1.png",
              "611":"snowing-icon1.png",
              "612":"snowing-icon1.png",
              "615":"snowing-icon1.png",
              "616":"snowing-icon1.png",
              "620":"snowing-icon1.png",
              "621":"snowing-icon1.png",
              "622":"snowing-icon1.png",
              "701":"misty-icon.png",
              "711":"misty-icon.png",
              "721":"misty-icon.png",
              "731":"misty-icon.png",
              "741":"misty-icon.png",
              "751":"misty-icon.png",
              "761":"misty-icon.png",
              "762":"misty-icon.png",
              "771":"misty-icon.png",
              "781":"misty-icon.png",
              "800":"sunny-icon.png",
              "801":"mostly-sunny-icon.png",
              "802":"mostly-cloudy-icon.png",
              "803":"cloudy-icon.png",
              "804":"cloudy-icon.png",
}


const updateWeather = function(){
    var httpPos = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon;
    console.log(httpPos);
    $.getJSON(httpPos, function( data ) {
        var weather = data.weather[0];
        temp = data.main.temp;
        var wind = data.wind;
        var station = data.base;
        var id = data.weather[0].id;
        var icon = "./images/"+idIcons[id];
        var windDeg = parseInt(wind["deg"]);

        $("#temp").html("<strong>"+Math.round(temp)+ "°C"+"</strong>");
        $("#sky").html(weather["description"]);
        $("#icon").attr("src",icon);
        $("#icon").attr("width","120px");
        $("#wind").html("Wind: "+wind["speed"]+"mph");
       // $("#station").html(station);

       //update picture
       if(temp > 20){
        $("body").css("background-image",'url("images/love-maldives-57551.jpg")');
        $("body").css("background-size","cover");
       }else if(temp > 15 ){
        $("body").css("background-image",'url("images/ales-krivec-1881.jpg")');   
        $("body").css("background-size","cover");
       }else if(temp > 0){
        $("body").css("background-image",'url("images/ana-pavlyuk-420824.jpg")');      
        $("body").css("background-size","cover");
       }else if(temp > -30){
        $("body").css("background-image",'url("images/ian-schneider-40781.jpg")');         
        $("body").css("background-size","cover");
       }else{
        $("body").css("background-image",'url("images/ales-krivec-1881.jpg")');
        $("body").css("background-size","cover");
       }
       //only one picture for rain
       if(weather["main"].toLowerCase() == "rain"){
        $("body").css("background-image",'url("images/freddie-marriage-199100.jpg")');
        $("body").css("background-size","cover");
       }

       $("#arrow").css("transform","rotate("+(windDeg+90)+"deg)");
       $("#arrow").css("-webkit-transform","rotate("+(windDeg+90)+"deg)");
       $("#arrow").css("-ms-transform","rotate("+(windDeg+90)+"deg)");

    }).fail(function() {
        alert( "Error fetching weather station data!");
    });

}

const showCity = function(lat,lon){


   var httpPos = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&result_type=locality&key=AIzaSyAr_c-SICjrMA9eJmsWW4-S3G29FqS7Z7g";

   $.getJSON(httpPos, function( data ){

         var address = data["results"][0]["formatted_address"];
        $("#station").html(address);

   }).fail( function(){
    alert( "Error fetching geolocation!");
   });
}

function FahrenheitToCelsius(temp){

    var celsius = (temp-32)/(1.8);
    return celsius;
}

function CelsiusToFahrenheit(temp){
    
    var fahrenheit = (temp)*(1.8)+32;
    return fahrenheit;
}
    

$().ready( function(){

        //default position;
        updateWeather();

        temp = parseInt(temp);
        var degrees = "celsius";

        showCity(lat,lon);

        //get real position
        navigator.geolocation.getCurrentPosition( function(pos){
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;

        //and update again!
        updateWeather();
        showCity(lat,lon);
    });



    $('.btn').on("click", function(){
        if(degrees == "celsius"){
            $(this).html("Switch to °C");
            degrees = "fahrenheit";
            temp = CelsiusToFahrenheit(temp);
            $("#temp").html("<strong>"+Math.round(temp)+ "°F"+"</strong>");
        }else{
            $(this).html("Switch to °F");
            degrees = "celsius";
            temp = FahrenheitToCelsius(temp);
            $("#temp").html("<strong>"+Math.round(temp)+ "°C"+"</strong>");
        }
    });
});