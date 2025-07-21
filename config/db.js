import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        const connect = mongoose.connect(process.env.MONGO_URI)
     
        console.log(`mongodb connect successfully`)
        return connect
        
    } catch (error) {
        console.log("error while connecting", error)
        process.exit(1)
    }
}

export default connectDB