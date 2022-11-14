import * as express from 'express';
import { Request, Response } from 'express';
import { repository } from './firestore.service';
import { updateDepartments } from './update-data/update-departments';

export const courseRouter = express.Router();

courseRouter.get('/department/all', async (req: Request, res: Response) => {
  const departments = await repository
    .departments!.orderByAscending('name')
    .find();

  const result = departments.map((dept) => ({
    name: dept.name,
    code: dept.code,
  }));

  return res.send(result);
});

courseRouter.patch(
  '/update/departments',
  async (req: Request, res: Response) => {
    await updateDepartments();
    res.sendStatus(200);
  }
);
