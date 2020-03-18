const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us19.api.mailchimp.com/3.0/lists/7f7149b57f",
        method: "POST",
        headers: {
            "Authorization": "yassine1 5d87dec7fcf5fac31878fd17d0f29gg7-us17"
        },
        body: jsonData
    };

    request(options, function(error, response, body){
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });

});

app.post("/failure.html", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT, function(){
    console.log("server is running on port 3000");
});