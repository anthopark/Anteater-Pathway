import { immerable } from 'immer';
import { Course, ICourse } from '@entities/course';
import { IAcademicYear, AcademicYear } from './academic-year';

interface UpdateCourseColorParam {
  courseId: string;
  newColor: number;
  isInCourseBag: boolean;
}

interface IAppUser {
  addToCourseBag: (courses: ICourse[]) => void;
  addYear: (year: number) => void;
  clearCourseBag: () => void;
  courseBag: ICourse[];
  degreePlan: IAcademicYear[];
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

  private _authToken: string | null = null;
  private _degreePlan: AcademicYear[] = [];
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
    return this._degreePlan.map((academicYear) => academicYear.year);
  }

  public addYear(year: number) {
    this._degreePlan.push(new AcademicYear(year));
    this._degreePlan.sort((a, b) => a.year - b.year);
  }

  public removeYear(year: number) {
    const years = this._degreePlan.map((academicYear) => academicYear.year);
    if (years.includes(year)) {
      const removeIndex = years.indexOf(year);
      this._degreePlan.splice(removeIndex, 1);
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

    this.addYear(twoDigitCurrentYear);
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
