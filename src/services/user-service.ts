import { User } from '../entities';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { IUser } from '../types';
import { UserHelper } from '../helper';
import { ResourceNotFound } from '../middlewares';

export class UserService {
  private userRepo: Repository<User>;
  private userHelper: UserHelper;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
    this.userHelper = new UserHelper(this.userRepo);
  }

  public async getCurrentUser(userId: string) {
    const user = await this.userHelper.findUserById(userId);
    if (!user) {
      throw new ResourceNotFound('User not found');
    }

    return {
      user: this.userHelper.sanitizeUser(user),
    };
  }

  public async getUser() {
    const users = await this.userHelper.getAllUsers();
    if (!users) {
      throw new ResourceNotFound('Users not found');
    }

    return {
      users: users.map((user) => this.userHelper.sanitizeUser(user)),
    };
  }

  public async updateCurrentUser(userId: string, userData: Partial<User>) {
    const user = await this.userHelper.findUserById(userId);
    if (!user) {
      throw new ResourceNotFound('User not found');
    }

    Object.assign(user, userData);

    const updatedUser = await this.userRepo.save(user);

    return {
      user: this.userHelper.sanitizeUser(updatedUser),
    };
  }

  public async getUsersCount(): Promise<number> {
    return await this.userRepo.count();
  }

  public async createUser(userData: Partial<User>) {
    const user = this.userRepo.create(userData);
    return await this.userRepo.save(user);
  }
}
