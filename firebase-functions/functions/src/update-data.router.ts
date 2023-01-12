import * as express from 'express';
import { Request, Response } from 'express';
import { updateDepartments } from './update-data/update-departments';
import { updateCourses } from './update-data/update-course-info';

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
  '/courses/offered',
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);
