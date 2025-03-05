import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import { errorHandler, routeNotFound } from './middlewares';
import { corsOptions, specs } from './configs';
import { router } from './routes';
import { AppDataSource } from './data-source';
import { log } from './utils';

dotenv.config();

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    this.app.use(cors(corsOptions));
    this.app.use(express.json({ limit: '15mb' }));
    this.app.use(express.urlencoded({ limit: '15mb', extended: true }));
    this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private configureRoutes(): void {
    this.app.use('/api/v1', router);
    this.app.get('/', (req: Request, res: Response) => {
      res.send('roqqu Typeorm task');
    });
  }

  private configureErrorHandling(): void {
    this.app.use(errorHandler);
    this.app.use(routeNotFound);
  }

  public async start(): Promise<void> {
    const port = process.env.PORT || 3000;
    await AppDataSource.initialize();

    this.app.listen(port, () => log.info(`App listening on port ${port}!`));
  }
}

const app = new App();
app.start();
