import * as express from 'express';
import { Request, Response } from 'express';
import { collections } from './database.service';

export const courseRouter = express.Router();

const simplifiedProjection = {
  _id: 0,
  deptCode: 1,
  num: 1,
  title: 1,
  unit: 1,
};

courseRouter.get('/:dept_code/all', async (req: Request, res: Response) => {
  const courses = await collections
    .courses!.find({
      deptCode: req.params.dept_code.toUpperCase(),
    })
    .project(simplifiedProjection)
    .toArray();

  return res.send(courses);
});

courseRouter.get('/:dept_code/:num', async (req: Request, res: Response) => {
  const course = await collections.courses!.findOne({
    deptCode: req.params.dept_code.toUpperCase(),
    num: req.params.num.toUpperCase(),
  });

  return res.send(course);
});
