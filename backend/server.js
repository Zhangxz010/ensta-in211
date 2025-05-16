import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import usersRouter from './routes/users.js';
import { routeNotFoundJsonHandler } from './services/routeNotFoundJsonHandler.js';
import { jsonErrorHandler } from './services/jsonErrorHandler.js';
import { appDataSource } from './datasource.js';
import moviesRouter from './routes/movies.js'; 
import commentsRouter from './routes/comments.js';


const apiRouter = express.Router();

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    const app = express();

    app.use(logger('dev'));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    apiRouter.use('/comments', commentsRouter);
    // Register routes

    apiRouter.use('/movies', moviesRouter); 


    apiRouter.get('/', (req, res) => {
      res.send('Hello from Express!');
    });
    apiRouter.use('/users', usersRouter);

    // Register API router
    app.use('/api', apiRouter);

    // Register frontend
    const publicPath = new URL("./public", import.meta.url).pathname;
    app.use(express.static(publicPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(publicPath, "index.html"));
    });


    // Register 404 middleware and error handler
    app.use(routeNotFoundJsonHandler); // this middleware must be registered after all routes to handle 404 correctly
    app.use(jsonErrorHandler); // this error handler must be registered after all middleware to catch all errors

    const port = parseInt(process.env.PORT || '8000');

    app.listen(port, '0.0.0.0', () => {
      console.log(`Server listening at http://0.0.0.0:${port}`);
    });
    
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
