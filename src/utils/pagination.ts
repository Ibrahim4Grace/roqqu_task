import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../middlewares';
import { IPaginatedEntityResponse } from '../types';
import { Repository, FindOptionsWhere, FindOptionsOrder } from 'typeorm';

export const paginatedResults = <T>(
  repository: Repository<T>,
  getFilter: (req: Request) => FindOptionsWhere<T> = () => ({}),
  sort: FindOptionsOrder<T> = {
    createdAt: 'DESC',
  } as unknown as FindOptionsOrder<T>
) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const page = parseInt(req.query.page as string) || 1;
      const perPage = parseInt(req.query.limit as string) || 10;

      const filter = getFilter(req);

      const [results, totalItems] = await repository.findAndCount({
        where: filter,
        order: sort,
        skip: (page - 1) * perPage,
        take: perPage,
      });

      const totalPages = Math.ceil(totalItems / perPage);

      const paginatedResults: IPaginatedEntityResponse<T> = {
        results,
        pagination: {
          currentPage: page,
          totalPages,
          limit: perPage,
        },
      };

      res.paginatedResults = paginatedResults;
      next();
    }
  );
};
