import mongoose from "mongoose"

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected', ()=>{
            console.log('MongoDB connected');
        })
        connection.on('error', (error)=>{
            console.log('MongoDB connection is error, the original error is ',error );
            process.exit()
        })
    } catch (error) {
        console.log("something went wrong while connecting to db, the error is", error);
        
    }
}