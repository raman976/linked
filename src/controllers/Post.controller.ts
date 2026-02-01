import { Request, Response, NextFunction } from "express";
import PostService from "../services/Post.service";

class PostController {
  private postService = new PostService();

  public createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { content } = req.body;
      const userId = (req as any).userId;

      const post = await this.postService.createPost(userId, content);

      res.status(201).json({
        message: "Post created successfully",
        post
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.postService.getAllPosts();
      res.status(200).json({ posts });
    } catch (error) {
      next(error);
    }
  };

  public getPostsByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId as string;
      const posts = await this.postService.getPostsByUser(userId);
      res.status(200).json({ posts });
    } catch (error) {
      next(error);
    }
  };

  public getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.postId as string;
      const post = await this.postService.getPostById(postId);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.status(200).json({ post });
    } catch (error) {
      next(error);
    }
  };

  public updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.postId as string;
      const { content } = req.body;
      const userId = (req as any).userId;

      const post = await this.postService.updatePost(postId, userId, content);

      res.status(200).json({
        message: "Post updated successfully",
        post
      });
    } catch (error) {
      next(error);
    }
  };

  public deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.postId as string;
      const userId = (req as any).userId;

      await this.postService.deletePost(postId, userId);

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;
