import { ICourse } from '@entities/course';

export interface IAcademicYear {
  year: number;
  quarters: IQuarter[];
}

export type Term = 'fa' | 'wi' | 'sp' | 'su';

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

export interface IQuarter {
  year: number;
  term: Term;
  courses: ICourse[];
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
