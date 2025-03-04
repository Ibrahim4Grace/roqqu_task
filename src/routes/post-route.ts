import { Router } from 'express';
import { PostController } from '../controllers';
import validate from '../schemas/user-validation';
import { authentication, authorization, validateData } from '../middlewares';

const postRoute = Router();
const postController = new PostController();

postRoute.get(
  '/',
  authentication,
  authorization(['user']),
  postController.getPosts
);
postRoute.post(
  '/',
  authentication,
  authorization(['user']),
  validateData(validate.postSchema),
  postController.createPost
);
postRoute.delete(
  '/:postId',
  authentication,
  authorization(['user']),
  postController.deletePost
);

export default postRoute;
