//Libraries Start
const express=require('express');
const crypto=require('crypto');
const hash=crypto.createHash("sha256");
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

    if(Get_User_Check(req.body.username,req.body.password))
    {
        res.redirect('/User/Dashboard');
    }
    else
    {
        res.redirect('/login');
    }

});
//Login End




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

function Get_User_Check(username,password)
{
    ps=hash.update(password,"utf-8").digest('hex');
    database.collection('users').findOne({username:username.toLowerCase(),password:ps},function(err,result){
        console.log(result);
        return true;
    });
    return false;
}
//MongoDB End