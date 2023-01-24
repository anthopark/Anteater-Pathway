import * as functions from 'firebase-functions/v2';
import * as express from 'express';
import { Request, Response } from 'express';
import { updateDepartments } from './update-data/update-departments';
import { updateCourses } from './update-data/update-course-info';
import { updateCourseAttributes } from './update-data/update-course-attributes';
import {
  isValidQuarterCode,
  updateCourseOfferHistory,
} from './update-data/update-course-offer-history';

export const updateDataRouter = express.Router();

updateDataRouter.patch('/departments', async (req: Request, res: Response) => {
  await updateDepartments();
  res.sendStatus(200);
});

updateDataRouter.patch('/courses/info', async (req: Request, res: Response) => {
  await updateCourses();
  res.sendStatus(200);
});

updateDataRouter.patch(
  '/course/attributes',
  async (req: Request, res: Response) => {
    await updateCourseAttributes();
    res.sendStatus(200);
  }
);

interface OfferHistoryRequest extends Request {
  body: {
    optionCode: string;
    quarterCode: string;
  };
}

updateDataRouter.patch(
  '/courses/offer-history',
  async (req: OfferHistoryRequest, res: Response) => {
    const { optionCode, quarterCode } = req.body;

    functions.logger.info(
      `PATCH request to Offer History, optionCode: ${optionCode}, quarterCode: ${quarterCode}`
    );

    if (!isValidQuarterCode(quarterCode)) {
      functions.logger.error(`Invalid quarter code: ${quarterCode}`);
      res.sendStatus(400);
    }

    await updateCourseOfferHistory(optionCode, quarterCode);
    res.sendStatus(200);
  }
);
