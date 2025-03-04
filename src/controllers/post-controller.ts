import { Request, Response } from 'express';
import {
  asyncHandler,
  sendJsonResponse,
  ResourceNotFound,
} from '../middlewares';
import { PostService } from '../services';

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  public getPosts = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = req.currentUser.id;
      if (!userId) {
        throw new ResourceNotFound('User not found');
      }
      const posts = await this.postService.getPosts(userId);
      sendJsonResponse(res, 200, 'Posts retrieved successfully', posts);
    }
  );

  public createPost = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = req.currentUser.id;
      if (!userId) {
        throw new ResourceNotFound('User not found');
      }
      const postData = req.body;
      const post = await this.postService.createPost(userId, postData);
      sendJsonResponse(res, 201, 'Post created successfully', post);
    }
  );

  public deletePost = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const postId = req.params.postId;
      await this.postService.deletePost(postId);
      sendJsonResponse(res, 200, 'Post deleted successfully');
    }
  );
}
