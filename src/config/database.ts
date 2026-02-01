import mongoose from "mongoose";

const connectDB=async (): Promise<void>=>{
    try{
        const mongoURI=process.env.URI as string
        await mongoose.connect(mongoURI)
        console.log("database connected")
    }catch(err){
        console.log(err)
    }
}


export default connectDB