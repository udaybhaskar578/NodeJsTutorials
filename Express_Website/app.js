var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

// Tells the app to look for view in Views directory
app.set('views',path.join(__dirname,'views'))
// Tells the app to use jade engine for rendering the views
app.set('view engine','jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));


app.get('/', function(req, res){
	res.render('index',{title:'Welcome'});
});

app.get('/about', function(req, res){
	res.render('about');
});

app.get('/contact', function(req, res){
	res.render('contact');
});

app.post('/contact/send', function(req, res){
	var transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'enter your email id',
            pass:'Enter your password here'
        }
    });

    var mailOptions = {
        from: 'Uday Bhaskar',
        to: 'udaybhaskar578@gmail.com',
        subject:'Mail from Udays website',
        text: 'You have a submission with the following details... Name: '
        +req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
		html: '<p>You have a submission with the following details...</p><ul>'+
        '<li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+
        '</li><li>Message: '+req.body.message+'</li></ul>'
    }

    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error);
            res.redirect('/');
        }else{
            console.log('Message Sent:'+info);
            res.redirect('/');
        }
    });
});

app.listen(1337);
console.log('Server is running on port 3000...');