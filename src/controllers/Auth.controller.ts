import { Request, Response, NextFunction } from "express";
import AuthService from "../services/Auth.service";

class AuthController {
  private authService = new AuthService();

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.register(email, password);

      res.status(201).json({
        message: "User registered successfully",
        userId: user._id
      });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
