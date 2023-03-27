import { nanoid } from 'nanoid';

export type Term = 'fa' | 'wi' | 'sp' | 'su';

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

export interface IQuarter {
  year: number;
  term: Term;
  courses: ICourse[];
}

export interface IAcademicYear {
  year: number;
  quarters: IQuarter[];
}

export const terms: Term[] = ['fa', 'wi', 'sp', 'su'];

export class AcademicYear implements IAcademicYear {
  private _year: number;
  private _quarters: IQuarter[];

  public constructor(year: number) {
    this._year = year;
    this._quarters = terms.map((term) => new Quarter(this._year, term as Term));
  }

  public get year() {
    return this._year;
  }

  public get quarters() {
    return this._quarters;
  }

  public set quarters(newQuarter) {
    this._quarters = newQuarter;
  }

  public toJSON() {
    return {
      year: this._year,
      quarters: this._quarters,
    };
  }
}

export class Quarter implements IQuarter {
  public courses: ICourse[] = [];

  private _year: number;
  private _term: Term;

  public constructor(year: number, term: Term) {
    this._year = year;
    this._term = term;
  }

  public get year() {
    return this._year;
  }

  public get term() {
    return this._term;
  }

  public toJSON() {
    return {
      year: this._year,
      term: this._term,
      courses: this.courses,
    };
  }
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

  constructor(courseResponse: CourseResponseModel, isCustomCreated = false) {
    this._id = `course-${nanoid()}`;
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

  public set id(id) {
    this._id = id;
  }

  public toJSON() {
    return {
      id: this._id,
      deptCode: this.deptCode,
      num: this.num,
      title: this.title,
      unit: this.unit,
      isVariableUnit: this.isVariableUnit,
      minUnit: this.minUnit,
      maxUnit: this.maxUnit,
      isCustomCreated: this.isCustomCreated,
      color: this.color,
    };
  }
}

export interface CourseResponseModel {
  [key: string]: string | number | null | boolean | string[];
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
}
