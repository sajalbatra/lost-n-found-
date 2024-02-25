import mongoose from 'mongoose';

const connect = async ( MONGODB_STRING, DB_NAME )=>{
    try {
        console.log("Connecting to database...");
        await mongoose.connect( MONGODB_STRING, {
            dbName: DB_NAME
        })
        console.log("Connected to mongoDB...");
    } catch (error) {
        console.log(error.message);
    }
}

export default connect;