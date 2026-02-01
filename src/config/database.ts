import mongoose from "mongoose";

const connectDB=async (): Promise<void>=>{
    try{
        const mongoURI=process.env.URI as string
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
        })
        console.log("database connected successfully")
    }catch(err){
        console.log(err)
    }
}


export default connectDB