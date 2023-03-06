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
  id: string;
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

interface RequestBody<T> extends Request {
  body: T;
}

type SingleCourseRequest = RequestBody<{ deptCode: string; num: string }>;

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
  '/one/:deptCode/:num',
  async (req: SingleCourseRequest, res: Response<Course>) => {
    const deptCode = req.params.deptCode.toUpperCase();
    const num = req.params.num.toUpperCase();

    const result = await repository.courses
      ?.whereEqualTo('deptCode', deptCode)
      .whereEqualTo('num', num)
      .findOne();

    if (!result) {
      return res.status(404).send();
    }

    return res.status(200).send(result);
  }
);

plannerCourseRouter.get(
  '/department/:deptCode',
  async (req: Request, res: Response<Course[]>) => {
    const deptCode = req.params.deptCode;

    const result = await repository.courses
      ?.whereEqualTo('deptCode', deptCode as string)
      .orderByAscending('num')
      .find();

    if (!result || result!.length === 0) {
      return res.status(404).send([]);
    }

    return res.status(200).send(result);
  }
);
