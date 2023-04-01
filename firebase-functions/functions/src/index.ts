import * as functions from 'firebase-functions/v2';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import { updateDataRouter } from './update-data.router';
import { initializeFirestore } from './firestore.service';
import { plannerCourseRouter } from './planner-course.router';
import { userRouter } from './user.router';
import * as dotenv from 'dotenv';
import { migrateToFirestore } from './migrate-data/migrate-to-firestore';

dotenv.config();
admin.initializeApp();
initializeFirestore();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/update', updateDataRouter);
app.use('/planner/course', plannerCourseRouter);

app.get('/migrate', async (req, res) => {
  await migrateToFirestore();

  return res.status(200).send();
});

functions.setGlobalOptions({
  region: 'us-west2',
  timeoutSeconds: 3600,
  memory: '2GiB',
});

exports.app = functions.https.onRequest(app);
