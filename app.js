//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req , res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req , res){

  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_field: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  url= "https://us21.api.mailchimp.com/3.0/lists/5241cd15d2";

  const option = {
    method: "POST",
    auth: "nirbhay:0445f67884f5c0e796543098d499bad5-us21"
  }
  const request = https.request(url, option, function(response){

    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html")
    } else{
      res.sendFile(__dirname+"/failure.html")
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));

    })
  })

  request.write(jsonData);
  request.end();
})

app.post("/failure",function(req , res){
  // res.sendFile(__dirname+"/signup.html")
  res.redirect("/");
});


app.listen(3000,function(){
  console.log("Server is running in port 3000");
});


// api key
// 0445f67884f5c0e796543098d499bad5-us21

// list id
//5241cd15d2.
