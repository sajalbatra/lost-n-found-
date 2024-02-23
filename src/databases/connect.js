import mongoose from "mongoose";
import 'dotenv/config'

const mongodburl=process.env.MONGOURL

const mongodbconnection=async ()=>{
    try{
        // const connectionParams = {
        //     useNewUrlParser: true,
        //     useCreateIndex: true,
        //     useUnifiedTopology: true,
        // };
        //await mongoose.connect(`${mongodburl}`,connectionParams)
        await mongoose.connect(`${mongodburl}`)
        console.log("Mongo DB is connected")
    }catch(error){
        console.log("Error while connecting to Mongo DB")
    }
}

export default mongodbconnection