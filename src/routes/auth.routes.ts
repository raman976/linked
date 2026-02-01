import { Router } from "express";
import AuthController from "../controllers/Auth.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

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
    this.router.get("/users", this.controller.getAllUsers);
    this.router.get("/users/:userId", this.controller.getUserById);
    this.router.put("/update-password", AuthMiddleware.protect, this.controller.updatePassword);
    this.router.delete("/delete", AuthMiddleware.protect, this.controller.deleteUser);
  }
}

export default AuthRoutes;
