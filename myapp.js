let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
absolutePath = __dirname + "/views/index.html"

app.get("/", function (req, res) {
    res.sendFile(absolutePath);
})

app.use('/public', express.static(__dirname + '/public'))

let msg = "Hello json"

app.get("/json", (req, res) => process.env.MESSAGE_STYLE === "uppercase" ? (res.json({ message: msg.toUpperCase() })) : res.json({ message: msg }));


app.use(function (req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next()
})

app.get('/now', function (req, res, next) {
    req.time = new Date().toString();
    next();
}, function (req, res) {
    res.send({ time: req.time });
});


app.get("/:word/:echo", (req, res) => {
    // Access the corresponding key in the req.params
    // object as defined in the endpoint
    // OR use destructuring to get multiple parameters
    var word = req.params.word;
    // Send the req.params object as a JSON Response
    res.json({ echo: word });
});



app.post('/name', (req, res) => {
    var firstName = req.body.first;
    var lastName = req.body.last;
    res.json({ name: firstName + " " + lastName })
})