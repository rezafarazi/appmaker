//Libraries Start
const express=require('express');
const path=require('path');
const bodyParser = require("body-parser")
const mongoClient=require('mongodb').MongoClient;
const mongodb_url="mongodb://127.0.0.1:27017/OAK";
const app=express();
const port=80;

var database;
//Libraries End




//Property Start
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));
app.use(bodyParser.urlencoded({
    extended:true
}));
//Property End




//Route Start


//Home Start
app.get('/',(req,res)=>{
    res.render('index',{
        message:""
    })
});
//Home End



//Login Start
app.get('/Login',(req,res)=>{

    res.render('login',{});

});

app.post('/Login',(req,res)=>{

    var Get_Check=async ()=>{
        var status=await Get_User_Check(req.body.username,req.body.password);
        if(status)
        {
            res.cookie("username",req.body.username);
            res.cookie("password",req.body.password);
            res.redirect('/User/Dashboard');
        }
        else
        {
            res.redirect('/login');
        }
    };

    Get_Check();
    
});
//Login End






//Dashbard Start

app.get('/User/Dashboard',function(req,res){

    res.end("salam");
   
});

//Dashbard End





//Route End






//Port Start
app.listen(port,()=>{
    console.log("Server Is Ready");
    GetMongoDB_Init();
});
//Port End




//MongoDB Start
function GetMongoDB_Init() 
{
    mongoClient.connect(mongodb_url,function(err, db)
    {

        //Connetction Start
        if(err)
        {
            console.log(err.message);
            throw err;
        }
        console.log("Mongo Db Connected");
        database = db.db("OAK");
        //Connetction End

        //Create Collection Start
        database.createCollection("users",function(err, res){
         
            if(err)
            {
            }

        });
        console.log("Collection started");
        //Create Collection End


    });
}

async function Get_User_Check(username,password)
{
    var crypto=require('crypto');
    var hash=crypto.createHash("sha256");
    ps=hash.update(password,"utf-8").digest('hex');
    var resu=false;

    var data=await database.collection('users').findOne({username:username.toLowerCase(),password:ps}).then(function(result){
        if(result!=null)
        {
            resu=true;
        }
    });

    console.log(resu);
    return resu;
}
//MongoDB End