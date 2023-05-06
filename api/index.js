// Warning
// const { creatInBulk, json, deleteInBulk } = require('./Fakedata');
const Connect = require('./config/databseConfig');
const cloudinary=require('cloudinary').v2;
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

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.use(errorMidlleware);


const connect=async()=>{
  try {
      await Connect(process.env.Mongo_URI);
      app.listen(process.env.PORT,()=>{
          console.log(`development server started on ${process.env.PORT}`);
      });
  } catch (error) {
      throw error;
  }
}
cloudinary.config({ 
  cloud_name: 'df9ovzwh6',
  api_key: 959872715293163,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});    
connect();
