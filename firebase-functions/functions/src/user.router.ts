import * as functions from 'firebase-functions/v2';
import * as express from 'express';
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { authenticate } from './verify-token.middleware';
import { DecodedIdToken } from 'firebase-admin/auth';
import { repository, UserDocument } from './firestore.service';

export const userRouter = express.Router();

userRouter.use(authenticate);

userRouter.post('/sign-in', async (req, res) => {
  const decodedToken: DecodedIdToken = req.body.decodedToken;

  const result = await repository.users
    ?.whereEqualTo('uid', decodedToken.uid)
    .findOne();

  if (!result) {
    const user = new UserDocument();
    user.uid = decodedToken.uid;
    await repository.users?.create(user);
    return res.status(200).send({ isFirstSignIn: true });
  }

  return res.status(200).send({ isFirstSignIn: false });
});
