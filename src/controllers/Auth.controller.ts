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

  public getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.authService.getAllUsers();
      res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId as string;
      const user = await this.authService.getUserById(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  };

  public updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).userId;
      const { oldPassword, newPassword } = req.body;

      await this.authService.updatePassword(userId, oldPassword, newPassword);

      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).userId;
      const { password } = req.body;

      await this.authService.deleteUser(userId, password);

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
