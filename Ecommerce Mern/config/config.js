const dotenv=require('dotenv')
const path=require('path')
dotenv.config({ path: path.join(__dirname, '../../.env') });
module.exports={

    // Database
    MONGODB_URL: "mongodb://127.0.0.1/MyData",
   
// //     // mongodb://localhost:27017
     
}