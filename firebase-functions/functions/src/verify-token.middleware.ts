import * as functions from 'firebase-functions/v2';
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers?.authorization?.startsWith('Bearer')) {
    const idToken = req.headers.authorization.split(' ')[1].trim();
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.body.decodedToken = decodedToken;
      return next();
    } catch (e) {
      functions.logger.error(`Error while authenticating the request:\n${e}`);
      return res.status(401).send({ error: 'Unauthorized access' });
    }
  } else {
    functions.logger.error(
      `Error parsing Authorization in request header:\n${req.headers?.authorization}`
    );
    return res.status(401).send({ error: 'Unauthorized access' });
  }
};
