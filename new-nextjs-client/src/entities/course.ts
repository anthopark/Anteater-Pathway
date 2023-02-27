import { nanoid } from 'nanoid';

export interface ICourse {
  id: string;
  deptCode: string;
  num: string;
  title: string | null;
  unit: number | null;
  isVariableUnit: boolean;
  minUnit: number | null;
  maxUnit: number | null;
  isCustomCreated: boolean;
  color: number;
}

export class Course implements ICourse {
  private _id: string;
  public deptCode: string;
  public num: string;
  public title: string | null;
  public unit: number | null;
  public isVariableUnit: boolean;
  public minUnit: number | null;
  public maxUnit: number | null;
  public isCustomCreated: boolean;
  public color = 1;

  constructor(
    courseResponse: ResponseModel.Course,
    isCustomCreated: boolean = false
  ) {
    this._id = nanoid();
    this.deptCode = courseResponse.deptCode;
    this.num = courseResponse.num;
    this.title = courseResponse.title ?? null;
    this.unit = courseResponse.unit;
    this.isVariableUnit = courseResponse.isVariableUnit ?? false;
    this.minUnit = courseResponse.minUnit ?? null;
    this.maxUnit = courseResponse.maxUnit ?? null;
    this.isCustomCreated = isCustomCreated;
  }

  public get id() {
    return this._id;
  }
}
