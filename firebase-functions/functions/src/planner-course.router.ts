import * as functions from 'firebase-functions/v2';
import * as express from 'express';
import { Request, Response } from 'express';
import { repository } from './firestore.service';
import * as apicache from 'apicache';

export const plannerCourseRouter = express.Router();

interface Department {
  name: string;
  code: string;
}

interface Course {
  deptCode: string;
  num: string;
  title: string;
  unit: number | null;
  isVariableUnit: boolean;
  isWorkloadCredit: boolean;
  minUnit: number | null;
  maxUnit: number | null;
  geCode: string | null;
  offered: string[];
  prerequisite: string | null;
  corequisite: string | null;
  prereqOrCoreq: string | null;
  sameAs: string | null;
  concurrentWith: string | null;
  overlapsWith: string | null;
  gradingOption: string | null;
  repeatability: string | null;
  restriction: string | null;
  description: string | null;
}

interface Attribute {
  name: string;
  value: string;
  ordinal: number;
}

const cache = apicache.middleware;
const onlyStatus200 = (req: Request, res: Response) => res.statusCode === 200;
const cacheSuccesses = cache('1 day', onlyStatus200);

plannerCourseRouter.get(
  '/all-departments',
  cacheSuccesses,
  async (req: Request, res: Response<Department[]>) => {
    const departments = await repository
      .departments!.orderByAscending('name')
      .find();

    const result = departments.map((dept) => ({
      name: dept.name,
      code: dept.code,
    }));

    if (result.length === 0) {
      return res.status(404).send([]);
    }

    return res.status(200).send(result);
  }
);

plannerCourseRouter.get(
  '/all-attributes',
  cacheSuccesses,
  async (req: Request, res: Response<Attribute[]>) => {
    const attributes = await repository
      .courseAttributes!.orderByAscending('ordinal')
      .find();

    const result = attributes.map((attr) => ({
      name: attr.name,
      value: attr.value,
      ordinal: attr.ordinal,
    }));

    if (result.length === 0) {
      return res.status(404).send([]);
    }

    return res.status(200).send(result);
  }
);

plannerCourseRouter.get(
  '/:deptCode',
  async (req: Request, res: Response<Course[]>) => {
    const deptCode = req.params.deptCode;

    const courses = await repository.courses
      ?.whereEqualTo('deptCode', deptCode as string)
      .orderByAscending('num')
      .find();

    const result = courses?.map(({ id, ...rest }) => rest);

    if (result!.length === 0) {
      return res.status(404).send([]);
    }

    return res.status(200).send(result);
  }
);

plannerCourseRouter.get(
  '/:deptCode/:num',
  async (req: Request, res: Response<Course[] | string>) => {
    const deptCode = req.params.deptCode;
    const num = req.params.num;

    const courses = await repository.courses
      ?.whereEqualTo('deptCode', deptCode)
      .whereGreaterOrEqualThan('num', num)
      .whereLessOrEqualThan('num', num + '\uf8ff')
      .orderByAscending('num')
      .find();

    const result = courses?.map(({ id, ...rest }) => rest);

    if (result!.length === 0) {
      return res.status(404).send([]);
    }

    return res.status(200).send(result);
  }
);
