import { User } from '../entities';
import { AppDataSource } from '../data-source';
import { TokenService, encrypt } from '../utils';
import { UserHelper } from '../helper';
import { Repository } from 'typeorm';
import {
  RegisterUserto,
  RegistrationResponse,
  LoginCredentials,
  loginResponse,
} from '../types';
import {
  Conflict,
  ResourceNotFound,
  Forbidden,
  Unauthorized,
} from '../middlewares';

export class AuthService {
  private userRepo: Repository<User>;
  private userHelper: UserHelper;

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
    this.userHelper = new UserHelper(this.userRepo);
  }

  public async register(
    payload: RegisterUserto
  ): Promise<RegistrationResponse> {
    const { email, name, password } = payload;

    const existingUser = await this.userHelper.findUserByEmail(email);
    if (existingUser) {
      throw new Conflict('User with this email already exists');
    }

    const encryptedPassword = await encrypt.encryptpass(password);

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = encryptedPassword;
    await this.userRepo.save(user);

    return {
      user: this.userHelper.sanitizeUser(user),
    };
  }

  public async login(payload: LoginCredentials): Promise<loginResponse> {
    const { email, password } = payload;

    const user = await this.userHelper.findUserByEmail(email);
    if (!user) {
      throw new ResourceNotFound('Invalid email or password');
    }

    const isValid = encrypt.comparepassword(user.password, password);
    if (!isValid) {
      throw new Unauthorized('Invalid email or passwords');
    }
    await this.userRepo.save(user);

    const requestedRole = payload.role || 'user';
    if (!user.role.includes(requestedRole)) {
      throw new Forbidden(
        `You do not have permission to sign in as ${requestedRole}`
      );
    }

    const token = TokenService.createAuthToken({
      userId: user.id,
      role: user.role,
    });

    return {
      user: this.userHelper.sanitizeUser(user),
      token,
    };
  }
}
