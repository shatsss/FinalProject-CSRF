var express = require('express');
var passport = require('passport');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const config = require('config')

var path = require('path');
var url = require("url");
fs = require('fs');
// view engine setup
var filePath = __dirname + '/public/data.txt';
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/Form.html");
});

app.post('/write', function (req, res) {
    req.on('data', function (data) {
        var body = data.toString();
        console.log(body);
        var response = "<p>" + body + "</p>";
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(response);
    });
});
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});

////////////////////////////////////////////////////////////////////////////////////////////
app.use(session({
    store: new RedisStore({
        url: config.redisStore.url
    }),
    secret: config.redisStore.secret,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
