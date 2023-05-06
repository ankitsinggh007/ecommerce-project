const Connect = require('./config/databseConfig');
const cloudinary=require('cloudinary').v2;



if(process.env.NODE_ENV !== 'PRODUCTION'){
    require('dotenv').config({path:"api/config/Config.env"});

}
const app=require('./app');


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

  