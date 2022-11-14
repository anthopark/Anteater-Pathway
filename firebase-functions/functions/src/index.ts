import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import { courseRouter } from './courses.router';
import { initializeFirestore } from './firestore.service';

admin.initializeApp();
initializeFirestore();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/course', courseRouter);
exports.app = functions.https.onRequest(app);
