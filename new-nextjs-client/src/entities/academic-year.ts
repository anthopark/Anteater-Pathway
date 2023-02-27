import { Course, ICourse } from '@entities/course';

export interface IAcademicYear {
  year: number;
  quarters: IQuarter[];
}

export class AcademicYear implements IAcademicYear {
  private _year: number;
  private _quarters: IQuarter[];

  public constructor(year: number) {
    this._year = year;
    this._quarters = ['fa', 'wi', 'sp', 'su'].map(
      (term) => new Quarter(this._year, term as Term)
    );
  }

  public get year() {
    return this._year;
  }

  public get quarters() {
    return this._quarters;
  }
}

enum Term {
  FALL = 'fa',
  WINTER = 'wi',
  SPRING = 'sp',
  SUMMER = 'su',
}

interface IQuarter {
  year: number;
  term: Term;
  courses: ICourse[];
}

class Quarter implements IQuarter {
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
}
