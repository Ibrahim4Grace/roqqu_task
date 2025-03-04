import { Post } from '../entities';
import { AppDataSource } from '../data-source';

export class PostService {
  private postRepo = AppDataSource.getRepository(Post);

  public async getPosts(userId: string) {
    return await this.postRepo.find({ where: { user: { id: userId } } });
  }

  public async createPost(userId: string, postData: Partial<Post>) {
    const post = this.postRepo.create({
      ...postData,
      user: { id: userId },
    });

    return await this.postRepo.save(post);
  }

  public async deletePost(postId: string) {
    await this.postRepo.delete(postId);
  }
}
