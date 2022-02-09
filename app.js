const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https=require("https");
const e = require("express");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
    city = req.body.cityName;
    apikey = "acb1b7a34fab9d5710b492ca362698bc";
    units = "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+ apikey +"&units=" + units;

    https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const des = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        
        console.log(temp);
        console.log(des);
        console.log(req.body.cityName);
        
        locationName=req.body.cityName;

        res.write("<h1>the temp in " + locationName + " is: " + temp + " degree celcius </h1>");
        res.write("<p>with description as: " + des +"</p>");
        res.write("<img src ="+ imageUrl+ ">");
        res.send();
     });
  });
})

app.listen(3000,function(req,res){
    console.log("server is running in 3000");
});