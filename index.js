//Libraries Start
const express=require('express');
const path=require('path');
const bodyParser = require("body-parser")
const app=express();
const port=80;
//Libraries End




//Property Start
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));
//Property End




//Route Start

app.get('/',(req,res)=>{
    res.render('index',{
        admin_message:"Hello"
    })
});

app.post('/submit_form',(req,res)=>{
    res.render('sayhello',{
        name:req.body.name,
        family:req.body.family
    })
});

//Route End






//Port Start
app.listen(port,()=>{
    console.log("Salam");
});
//Port End