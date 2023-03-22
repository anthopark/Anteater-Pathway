import * as functions from 'firebase-functions/v2';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import { updateDataRouter } from './update-data.router';
import { initializeFirestore } from './firestore.service';
import { plannerCourseRouter } from './planner-course.router';
import { userRouter } from './user.router';

admin.initializeApp();
initializeFirestore();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/update', updateDataRouter);
app.use('/planner/course', plannerCourseRouter);

functions.setGlobalOptions({
  region: 'us-west1',
  timeoutSeconds: 3600,
  memory: '2GiB',
});

exports.app = functions.https.onRequest(app);
