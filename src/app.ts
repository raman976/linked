import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";

dotenv.config();

class App{
    public app:express.Application
    public port:number|string 

    constructor(){
        this.app=express() 
        this.port=process.env.PORT||3000
    }
    public start(): void{
        this.connectDatabase();
        this.app.listen(this.port,()=>{
            console.log("server started")
        })
    }
  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
    private async connectDatabase(): Promise<void> {
    await connectDB();
  }

}
export default App;