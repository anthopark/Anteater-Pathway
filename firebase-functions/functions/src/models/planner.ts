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
