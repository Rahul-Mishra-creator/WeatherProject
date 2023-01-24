const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

    const query = req.body.cityName;
    const apikey = "b430cb073dbf04e40c1f281275c899ad";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apikey +"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);
    
    response.on("data",function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const temp1 =weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<h1>The temperature in "+query+" is " + temp +" degree Celsius.</h1>");
        res.write("<h3>The weather is currently "+temp1+"</h3>");
        res.write("<img src="+imageURL+">");
        res.send();
   
             });
    
    });


});


    
const port = process.env.PORT || 3000;

app.listen(port,function(){
    console.log("Server is running on port "+port);
});

