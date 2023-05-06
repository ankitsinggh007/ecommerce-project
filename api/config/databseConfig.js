const mongoose  = require("mongoose")

const Connect=async(url)=>{
    try {
        await mongoose.connect(url);
    } catch (error) {
        throw error;        
    }
}
module.exports=Connect;