import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';
import * as express from 'express';
import * as cors from 'cors';
import { connectToDatabase } from './database.service';
import { courseRouter } from './courses.router';

admin.initializeApp();
const firestore = admin.firestore();
fireorm.initialize(firestore);

const app = express();

app.use(express.json());
app.use(cors());

connectToDatabase()
  .then(() => {
    functions.logger.info(
      `Successfully connected to database: ${process.env.DB_NAME}`
    );

    app.use('/course', courseRouter);
  })

  .catch((error: Error) => {
    functions.logger.error('Database connection failed', error);
  });

exports.app = functions.https.onRequest(app);
