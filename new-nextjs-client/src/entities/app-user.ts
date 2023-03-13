import { immerable } from 'immer';
import { Course, ICourse } from '@entities/course';
import { IAcademicYear, AcademicYear, Term } from './academic-year';

interface IAppUser {
  addToCourseBag: (courses: ICourse[]) => void;
  addYear: (year: number) => void;
  clearCourseBag: () => void;
  courseBag: ICourse[];
  degreePlan: IAcademicYear[];
  getQuarterCourses: (year: number, term: Term) => ICourse[];
  setQuarterCourses: (year: number, term: Term, courses: ICourse[]) => void;
  removeYear: (year: number) => void;
  removeCourse: (
    courseId: string,
    isInCourseBag: boolean
  ) => ICourse | undefined;
  updateCourseColor: (
    courseId: string,
    isInCourseBag: boolean,
    newColor: number
  ) => void;
  years: number[];
}

class AppUser implements IAppUser {
  [immerable] = true;

  private _authToken: string | null = null;
  private _degreePlan: IAcademicYear[] = [];
  private _courseBag: ICourse[] = [];

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

  public set degreePlan(newDegreePlan: IAcademicYear[]) {
    this._degreePlan = newDegreePlan;
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

  public removeCourse(
    courseId: string,
    isInCourseBag: boolean
  ): ICourse | undefined {
    let removedCourse: ICourse | undefined;

    if (isInCourseBag) {
      removedCourse = this._courseBag.find((course) => course.id === courseId);

      if (removedCourse) {
        this._courseBag = this._courseBag.filter(
          (course) => course.id !== courseId
        );
      }
    } else {
      const { course, year, term } = this._findCourseInDegreePlan(courseId);

      if (course) {
        removedCourse = course;
        this.setQuarterCourses(
          year!,
          term!,
          this.getQuarterCourses(year!, term!).filter(
            (course) => course.id !== removedCourse!.id
          )
        );
      }

      this._updateDegreePlan();
    }

    return removedCourse;
  }

  public addToCourseBag(courses: ICourse[]) {
    for (const course of courses) {
      this._courseBag.push(course);
    }
  }

  public clearCourseBag() {
    this._courseBag = [];
  }

  public updateCourseColor(
    courseId: string,
    isInCourseBag: boolean,
    newColor: number
  ) {
    let courseToUpdate: ICourse | undefined;

    if (isInCourseBag) {
      courseToUpdate = this._courseBag.find((course) => course.id === courseId);
    } else {
      const { course } = this._findCourseInDegreePlan(courseId);
      courseToUpdate = course;
    }

    if (courseToUpdate) {
      courseToUpdate.color = newColor;
    }
  }

  public getQuarterCourses(year: number, term: Term): ICourse[] {
    const quarter = this._getQuarter(year, term);
    return quarter.courses;
  }
  public setQuarterCourses(year: number, term: Term, courses: ICourse[]): void {
    const quarter = this._getQuarter(year, term);
    quarter.courses = courses;
    this._updateDegreePlan();
  }

  private _updateDegreePlan() {
    this._degreePlan = [...this._degreePlan];
  }

  private _getQuarter(year: number, term: Term) {
    const years = this._degreePlan.map((academicYear) => academicYear.year);
    const yearIndex = years.indexOf(year);

    if (yearIndex === -1) {
      throw new Error(`Can't find the academic year of ${year}`);
    }

    const terms = this._degreePlan[yearIndex].quarters.map(
      (quarter) => quarter.term
    );
    const quarterIndex = terms.indexOf(term);

    return this._degreePlan[yearIndex].quarters[quarterIndex];
  }

  private _addCurrentYear() {
    const currentMonth = new Date().getMonth();
    let twoDigitCurrentYear = new Date().getFullYear() - 2000;

    if (currentMonth < 8) {
      twoDigitCurrentYear--;
    }

    this.addYear(twoDigitCurrentYear);
  }

  private _findCourseInDegreePlan(courseId: string) {
    let course: ICourse | undefined;
    let year: number | undefined;
    let term: Term | undefined;

    for (const academicYear of this._degreePlan) {
      for (const quarter of academicYear.quarters) {
        const result = quarter.courses.find((course) => course.id === courseId);
        if (result) {
          course = result;
          year = quarter.year;
          term = quarter.term;
          break;
        }
      }
    }

    return { course, year, term };
  }
}

export { type IAppUser, AppUser };
