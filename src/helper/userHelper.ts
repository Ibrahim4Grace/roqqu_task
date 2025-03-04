import { Repository } from 'typeorm';
import { User } from '../entities';
import { IUser } from '../types';

export class UserHelper {
  constructor(private userRepo: Repository<User>) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { id } });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepo.find();
  }

  sanitizeUser(user: Partial<IUser>): Partial<IUser> {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
