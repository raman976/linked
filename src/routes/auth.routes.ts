import { Router } from "express";
import AuthController from "../controllers/Auth.controller";

class AuthRoutes {
  public path = "/auth";
  public router = Router();
  private controller = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/register", this.controller.register);
    this.router.post("/login", this.controller.login);
  }
}

export default AuthRoutes;
