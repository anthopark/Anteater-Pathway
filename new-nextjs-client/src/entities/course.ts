import { nanoid } from 'nanoid';

export interface CourseInfo {
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

export interface ICourse {
  id: string;
  deptCode: string;
  num: string;
  color: number;
  unit: number | null;
}

export class Course implements ICourse {
  private _id: string;
  public deptCode: string;
  public num: string;
  public title: string;
  public unit: number | null;
  public isVariableUnit: boolean;
  public minUnit: number | null;
  public maxUnit: number | null;
  public isCustomCreated: boolean = false;
  public color = 1;

  constructor(courseInfo: CourseInfo, isCustomCreated: boolean) {
    this._id = nanoid();
    this.deptCode = courseInfo.deptCode;
    this.num = courseInfo.num;
    this.title = courseInfo.title;
    this.unit = courseInfo.unit;
    this.isVariableUnit = courseInfo.isVariableUnit;
    this.minUnit = courseInfo.minUnit;
    this.maxUnit = courseInfo.maxUnit;
    this.isCustomCreated = isCustomCreated;
  }

  public get id() {
    return this._id;
  }
}
