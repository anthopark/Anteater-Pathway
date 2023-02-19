import { nanoid } from 'nanoid';

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

  constructor(courseResponse: ResponseModel.Course, isCustomCreated: boolean) {
    this._id = nanoid();
    this.deptCode = courseResponse.deptCode;
    this.num = courseResponse.num;
    this.title = courseResponse.title;
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
