var express=require("express");
var stripe=require("stripe")("sk_test_bngkXFml6MVosf8PdeDGwHJP");
var hbs=require("hbs");
var bodyParser=require("body-parser");

var app=express();

app.set('view engine','hbs');
app.set('views', __dirname+'/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req,res){
    res.render('index',{

    });
});
app.get('/paysuccess',function(req,res){
    res.render('paysuccess',{

    });
});
app.post('/charge',function(req,res){
    var token=req.body.stripeToken;
    var chargeAmount=req.body.chargeAmount;
    var charge=stripe.charges.create({
        amount:chargeAmount,
        currency:"usd",
        source:token

    },function(err,charge){
        if(err&err.type==="StripeCardError"){
            console.log("card declared");
        }
       
    });
    console.log("payment process succeeded!");
    res.redirect('/paysuccess');

});
app.listen(3000,function(){
    console.log("stripe is running");
});
