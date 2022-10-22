/**
 * Required External Modules
 */

 import * as dotenv from "dotenv";
 import express from "express";
 import cors from "cors";
 import helmet from "helmet";
 import { itemsRouter } from "./items/items.router";
 import { errorHandler } from "./middleware/error.middleware";
 import { notFoundHandler } from "./middleware/not-found.middleware";

 dotenv.config();


/**
 * App Variables
 */

if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string, 10);
 const MYSQL_HOST: string = process.env.MYSQL_HOST || 'localhost';
 const MYSQL_DB: string = process.env.MYSQL_DB || 'node';
 const MYSQL_USER: string = process.env.MYSQL_USER || 'user';
 const MYSQL_PASSWORD: string = process.env.MYSQL_PASSWORD || 'pw123';

 const app = express();


/**
 *  App Configuration
 */

 app.use(helmet());
 app.use(cors());
 app.use(express.json());

 app.use("/api/items", itemsRouter);
 // handle undefinded routes
 app.use("*", (req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.send(`No endpoint at "${fullUrl}".`);
});

 app.use(errorHandler);
 app.use(notFoundHandler);

/**
 * Server Activation
 */

 app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });