import * as functions from 'firebase-functions/v2';
import * as express from 'express';
import { Request, Response } from 'express';
import { repository } from './firestore.service';

export const plannerCourseRouter = express.Router();

interface AllDepartmentsResponse {
  departmentCount: number;
  departments: {
    name: string;
    code: string;
  }[];
}

interface CourseResponse {
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
}

interface AllAttributesResponse {
  attributeCount: number;
  attributes: {
    name: string;
    value: string;
    ordinal: number;
  }[];
}

plannerCourseRouter.get(
  '/all-departments',
  async (req: Request, res: Response<AllDepartmentsResponse>) => {
    const departments = await repository
      .departments!.orderByAscending('name')
      .find();

    const result = departments.map((dept) => ({
      name: dept.name,
      code: dept.code,
    }));

    return res.send({
      departmentCount: result.length,
      departments: result,
    });
  }
);

plannerCourseRouter.get(
  '/all-attributes',
  async (req: Request, res: Response<AllAttributesResponse>) => {
    const attributes = await repository
      .courseAttributes!.orderByAscending('ordinal')
      .find();

    const result = attributes.map((attr) => ({
      name: attr.name,
      value: attr.value,
      ordinal: attr.ordinal,
    }));

    return res.send({
      attributeCount: result.length,
      attributes: result,
    });
  }
);

plannerCourseRouter.get(
  '/:deptCode',
  async (req: Request, res: Response<CourseResponse[]>) => {
    const deptCode = req.params.deptCode;

    const courses = await repository.courses
      ?.whereEqualTo('deptCode', deptCode as string)
      .orderByAscending('num')
      .find();

    const result = courses?.map(({ id, ...rest }) => rest);

    return res.send(result);
  }
);

plannerCourseRouter.get(
  '/:deptCode/:num',
  async (req: Request, res: Response<CourseResponse[] | string>) => {
    const deptCode = req.params.deptCode;
    const num = req.params.num;

    const courses = await repository.courses
      ?.whereEqualTo('deptCode', deptCode)
      .whereGreaterOrEqualThan('num', num)
      .whereLessOrEqualThan('num', num + '\uf8ff')
      .orderByAscending('num')
      .find();

    const result = courses?.map(({ id, ...rest }) => rest);

    return res.send(result);
  }
);
