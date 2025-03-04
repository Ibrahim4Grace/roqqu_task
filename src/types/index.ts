import { User, Address } from '../entities';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  address: Address;
  post: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterUserto {
  name: string;
  email: string;
  password: string;
}

export interface RegistrationResponse {
  user: Partial<IUser>;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role?: string;
}

export interface loginResponse {
  user: Partial<IUser>;
  token: string;
}

export interface JwtPayload {
  userId: string;
}

export interface IPaginationResponse {
  currentPage: number;
  totalPages: number;
  limit: number;
}

export interface IPaginatedEntityResponse<T> {
  results: T[];
  pagination: IPaginationResponse;
}

declare global {
  namespace Express {
    interface Response {
      paginatedResults?: {
        results: unknown[];
        pagination: IPaginationResponse;
      };
    }

    interface Request {
      user?: {
        user_id: string;
        role: string;
        email: string;
        name: string;
      };
      currentUser?: User;
    }
  }
}
