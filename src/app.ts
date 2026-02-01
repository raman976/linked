import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";

dotenv.config();

class App{
    public app:express.Application
    public port:number|string 

    constructor(routes: any[]){
        this.app=express() 
        this.port=process.env.PORT||3000
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }
    public start(): void{
        this.connectDatabase();
        this.app.listen(this.port,()=>{
            console.log("server started on port "+this.port)
        })
    }
  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  private initializeRoutes(routes: any[]): void {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }
  private initializeErrorHandling(): void {
    this.app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log("Error:", err.message);
      res.status(500).json({ message: err.message });
    });
  }
    private async connectDatabase(): Promise<void> {
    await connectDB();
  }

}
export default App;