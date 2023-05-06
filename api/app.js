// Warning
// const { creatInBulk, json, deleteInBulk } = require('./Fakedata');

const express=require('express');
const cookieParser=require('cookie-parser');
const errorMidlleware=require('./middleware/error');
const mainRoute=require('./routes');
const fileUpload = require('express-fileupload');
const path = require('path');
const app=express();
app.use(fileUpload({
    useTempFiles:true
}));
if(process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config({path:"api/config/Config.env"});

}
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use('/api',mainRoute);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*",(req,res)=>{
res.sendFile(path.join(__dirname, "../client/build/index.html"))
})


app.use(errorMidlleware);

module.exports=app;