import * as functions from 'firebase-functions/v2';
import * as express from 'express';
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { authenticate } from './verify-token.middleware';
import { DecodedIdToken } from 'firebase-admin/auth';
import { PlannerDocument, repository, UserDocument } from './firestore.service';
import { IAcademicYear, ICourse } from './models/planner';

export const userRouter = express.Router();

userRouter.use(authenticate);

userRouter.post('/sign-in', async (req, res) => {
  const decodedToken: DecodedIdToken = req.body.decodedToken;

  const result = await repository.users
    ?.whereEqualTo('id', decodedToken.uid)
    .findOne();

  if (!result) {
    const newUser = new UserDocument();
    newUser.id = decodedToken.uid;
    await repository.users?.create(newUser);

    const newPlanner = new PlannerDocument();
    newPlanner.uid = decodedToken.uid;
    newPlanner.plan = [];
    newPlanner.courseBag = [];
    await repository.planners?.create(newPlanner);

    return res.status(200).send({ isFirstSignIn: true });
  }

  return res.status(200).send({ isFirstSignIn: false });
});

userRouter.post('/planner/save', async (req, res) => {
  const decodedToken: DecodedIdToken = req.body.decodedToken;
  const plannerFromFE: { plan: IAcademicYear[]; courseBag: ICourse[] } =
    JSON.parse(req.body.planner);

  const planner = await repository.planners
    ?.whereEqualTo('uid', decodedToken.uid)
    .findOne();

  if (!planner) {
    return res
      .status(404)
      .send(`No planner found with uid: ${decodedToken.uid}`);
  }

  planner.plan = plannerFromFE.plan;
  planner.courseBag = plannerFromFE.courseBag;
  await repository.planners?.update(planner);

  return res.status(200).send();
});

userRouter.get('/planner/load', async (req, res) => {
  const decodedToken: DecodedIdToken = req.body.decodedToken;

  const planner = await repository.planners
    ?.whereEqualTo('uid', decodedToken.uid)
    .findOne();

  if (!planner) {
    return res
      .status(404)
      .send(`No planner found with uid: ${decodedToken.uid}`);
  }

  return res.status(200).send({
    plan: planner.plan,
    courseBag: planner.courseBag,
  });
});
