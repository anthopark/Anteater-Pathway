import { immerable } from 'immer';
import { DegreePlan, IDegreePlan } from './degree-plan';
import { Course, ICourse } from '@entities/course';

interface UpdateCourseColorParam {
  courseId: string;
  newColor: number;
  isInCourseBag: boolean;
}
interface IAppUser {
  addYear: (year: number) => void;
  courseBag: ICourse[];
  clearCourseBag: () => void;
  addToCourseBag: (courses: ICourse[]) => void;
  degreePlan: IDegreePlan;
  removeYear: (year: number) => void;
  removeCourseItem: (courseId: string, isInCourseBag: boolean) => void;
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
    new Course(
      {
        deptCode: 'IN4MATX',
        num: '121',
        unit: 4,
      } as ResponseModel.Course,
      false
    ),
    new Course(
      { deptCode: 'COMPSCI', num: '171', unit: 4 } as ResponseModel.Course,
      false
    ),
    new Course(
      { deptCode: 'ECON', num: '1A', unit: 4 } as ResponseModel.Course,
      false
    ),
    new Course(
      { deptCode: 'HISTORY', num: '7C', unit: 4 } as ResponseModel.Course,
      false
    ),
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

  public clearCourseBag() {
    this._courseBag = [];
  }

  public removeCourseItem(courseId: string, isInCourseBag: boolean) {
    if (isInCourseBag) {
      this._courseBag = this.courseBag.filter(
        (course) => course.id !== courseId
      );
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
