import { Router } from "express";
import PostController from "../controllers/Post.controller";
import AuthMiddleware from "../middlewares/auth.middleware";

class PostRoutes {
  public path = "/posts";
  public router = Router();
  private controller = new PostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post("/", AuthMiddleware.protect, this.controller.createPost);
    this.router.get("/", this.controller.getAllPosts);
    this.router.get("/user/:userId", this.controller.getPostsByUser);
    this.router.get("/:postId", this.controller.getPostById);
    this.router.put("/:postId", AuthMiddleware.protect, this.controller.updatePost);
    this.router.delete("/:postId", AuthMiddleware.protect, this.controller.deletePost);
  }
}

export default PostRoutes;
