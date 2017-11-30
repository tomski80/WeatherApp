
var lat = 51.5074,
    lon = 0.1278;

var temp = 0;

const updateWeather = function(){
    var httpPos = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon;
    console.log(httpPos);
    $.getJSON(httpPos, function( data ) {
        var weather = data.weather[0];
        temp = data.main.temp;
        var wind = data.wind;
        var station = data.base;
        var icon = data.weather[0].icon;

        $("#temp").html("<strong>"+Math.round(temp)+ "°C"+"</strong>");
        $("#sky").html(weather["main"]);
        $("#icon").attr("src",icon);
        $("#wind").html("Wind: "+wind["speed"]+"mph");
       // $("#station").html(station);

       //update picture
       if(temp > 20){
        $("body").css("background-image",'url("images/love-maldives-57551.jpg")');
       }else if(temp > 15 ){
        $("body").css("background-image",'url("images/ales-krivec-1881.jpg")');   
       }else if(temp > 0){
        $("body").css("background-image",'url("images/ana-pavlyuk-420824.jpg")');      
       }else if(temp > -30){
        $("body").css("background-image",'url("images/ian-schneider-40781.jpg")');         
       }else{
        $("body").css("background-image",'url("images/ales-krivec-1881.jpg")');
       }
       //only one picture for rain
       if(weather["main"].toLowerCase() == "rain"){
        $("body").css("background-image",'url("images/freddie-marriage-199100.jpg")');
       }

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