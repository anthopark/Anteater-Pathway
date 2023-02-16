import { immerable } from 'immer';
import { DegreePlan, IDegreePlan } from './degree-plan';
import { Course, ICourse } from '@entities/course';
import { CourseResponse } from 'src/models/course-response';

interface UpdateCourseColorParam {
  courseId: string;
  newColor: number;
  isInCourseBag: boolean;
}
interface IAppUser {
  addYear: (year: number) => void;
  courseBag: ICourse[];
  degreePlan: IDegreePlan;
  removeYear: (year: number) => void;
  updateCourseColor: ({
    courseId,
    isInCourseBag,
    newColor,
  }: UpdateCourseColorParam) => void;
  years: number[];
}

class AppUser implements IAppUser {
  [immerable] = true;

  private _years: number[] = [];
  private _authToken: string | null = null;
  private _degreePlan = new DegreePlan();
  private _courseBag: ICourse[] = [
    new Course({ deptCode: 'IN4MATX', num: '121' } as CourseResponse, true),
    new Course({ deptCode: 'COMPSCI', num: '171' } as CourseResponse, true),
    new Course({ deptCode: 'ECON', num: '1A' } as CourseResponse, true),
    new Course({ deptCode: 'HISTORY', num: '7C' } as CourseResponse, true),
  ];

  public constructor() {
    this._addCurrentYear();
  }

  public get courseBag() {
    return this._courseBag;
  }

  public set courseBag(newBag: ICourse[]) {
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

  public addToCourseBag(courses: ICourse[]) {
    for (const course of courses) {
      this._courseBag.push(course);
    }
  }

  public updateCourseColor({
    courseId,
    isInCourseBag,
    newColor,
  }: UpdateCourseColorParam) {
    if (isInCourseBag) {
      this._updateColorInCourseBag(courseId, newColor);
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

  private _updateColorInCourseBag(courseId: string, newColor: number) {
    const indexToUpdate = this._courseBag.findIndex(
      (course) => course.id === courseId
    );

    if (indexToUpdate !== -1) {
      this._courseBag[indexToUpdate].color = newColor;
    }
  }
}

export { type IAppUser, AppUser };
