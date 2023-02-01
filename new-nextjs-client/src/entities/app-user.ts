import { immerable } from 'immer';
import { DegreePlan, IDegreePlan } from './degree-plan';
import { Course, CourseInfo } from 'src/models/course';

interface IAppUser {
  addYear: (year: number) => void;
  courseBag: Course[];
  degreePlan: IDegreePlan;
  removeYear: (year: number) => void;
  years: number[];
}

class AppUser implements IAppUser {
  [immerable] = true;

  private _years: number[] = [];
  private _authToken: string | null = null;
  private _degreePlan = new DegreePlan();
  private _courseBag: Course[] = [
    new Course({ deptCode: 'IN4MATX', num: '121' } as CourseInfo, true),
    new Course({ deptCode: 'COMPSCI', num: '171' } as CourseInfo, true),
    new Course({ deptCode: 'ECON', num: '1A' } as CourseInfo, true),
    new Course({ deptCode: 'HISTORY', num: '7C' } as CourseInfo, true),
  ];

  public constructor() {
    this._addCurrentYear();
  }

  public get courseBag() {
    return this._courseBag;
  }

  public set courseBag(newBag: Course[]) {
    this._courseBag = newBag;
  }

  public get degreePlan() {
    return this._degreePlan;
  }

  public get years(): number[] {
    return this._years;
  }

  public addYear(year: number) {
    this._years.push(year);
    this._years.sort((a, b) => a - b);
  }

  public removeYear(year: number) {
    if (this._years.includes(year)) {
      const removeIndex = this._years.indexOf(year);
      this._years.splice(removeIndex, 1);
    }
  }

  public addToCourseBag(courses: Course[]) {
    for (const course of courses) {
      this._courseBag.push(course);
    }
  }

  private _addCurrentYear() {
    const currentMonth = new Date().getMonth();
    let twoDigitCurrentYear = new Date().getFullYear() - 2000;

    if (currentMonth < 8) {
      twoDigitCurrentYear--;
    }

    this._years.push(twoDigitCurrentYear);
  }
}

export { type IAppUser, AppUser };
