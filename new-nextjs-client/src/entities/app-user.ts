import { immerable } from 'immer';
import { Course, ICourse } from '@entities/course';
import {
  IAcademicYear,
  AcademicYear,
  Term,
  Quarter,
  IQuarter,
} from './academic-year';
import serialize from 'serialize-javascript';

interface IAppUser {
  addToCourseBag: (courses: ICourse[]) => void;
  addYear: (year: number) => void;
  authToken: string | undefined;
  clearCourseBag: () => void;
  courseBag: ICourse[];
  plan: IAcademicYear[];
  getQuarterCourses: (year: number, term: Term) => ICourse[];
  plannerLoaded: boolean;
  setQuarterCourses: (year: number, term: Term, courses: ICourse[]) => void;
  setPlannerFromBE: (planFromBE: {
    plan: IAcademicYear[];
    courseBag: ICourse[];
  }) => void;
  getPlannerInJSON: () => string;
  removeYear: (year: number) => void;
  removeCourse: (
    courseId: string,
    isInCourseBag: boolean
  ) => ICourse | undefined;
  reset: () => void;
  updatePlanner: () => void;
  updateCourseColor: (
    courseId: string,
    isInCourseBag: boolean,
    newColor: number
  ) => void;
  years: number[];
}

class AppUser implements IAppUser {
  [immerable] = true;

  public plannerLoaded: boolean = false;

  private _authToken: string | undefined = undefined;
  private _plan: IAcademicYear[] = [];
  private _courseBag: ICourse[] = [];

  public constructor() {
    this._addCurrentYear();
  }

  public reset(): void {
    this._authToken = undefined;
    this._plan = [];
    this._courseBag = [];
    this.plannerLoaded = false;

    this._addCurrentYear();
  }

  public get courseBag() {
    return this._courseBag;
  }

  public set courseBag(newBag: ICourse[]) {
    this._courseBag = newBag;
  }

  public get authToken() {
    return this._authToken;
  }

  public set authToken(token: string | undefined) {
    this._authToken = token;
  }

  public get plan() {
    return this._plan;
  }

  public set plan(newPlan: IAcademicYear[]) {
    this._plan = newPlan;
  }

  public get years(): number[] {
    return this._plan.map((academicYear) => academicYear.year);
  }

  public addYear(year: number) {
    this._plan.push(new AcademicYear(year));
    this._plan.sort((a, b) => a.year - b.year);
  }

  public removeYear(year: number) {
    const years = this._plan.map((academicYear) => academicYear.year);
    if (years.includes(year)) {
      const removeIndex = years.indexOf(year);
      this._plan.splice(removeIndex, 1);
    }
  }

  public setPlannerFromBE(planFromBE: {
    plan: IAcademicYear[];
    courseBag: ICourse[];
  }): void {
    this._plan = this._deserializePlan(planFromBE.plan);
    this._courseBag = this._deserializeCourseBag(planFromBE.courseBag);
  }

  public getPlannerInJSON(): string {
    return serialize(
      {
        plan: this._plan,
        courseBag: this._courseBag,
      },
      {
        isJSON: true,
        ignoreFunction: true,
      }
    );
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

      this.updatePlanner();
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

    this.updatePlanner();
  }

  public getQuarterCourses(year: number, term: Term): ICourse[] {
    const quarter = this._getQuarter(year, term);
    return quarter.courses;
  }
  public setQuarterCourses(year: number, term: Term, courses: ICourse[]): void {
    const quarter = this._getQuarter(year, term);
    quarter.courses = courses;
    this.updatePlanner();
  }

  public updatePlanner() {
    this._plan = [...this._plan];
    this._courseBag = [...this._courseBag];
  }

  private _getQuarter(year: number, term: Term) {
    const years = this._plan.map((academicYear) => academicYear.year);
    const yearIndex = years.indexOf(year);

    if (yearIndex === -1) {
      throw new Error(`Can't find the academic year of ${year}`);
    }

    const terms = this._plan[yearIndex].quarters.map((quarter) => quarter.term);
    const quarterIndex = terms.indexOf(term);

    return this._plan[yearIndex].quarters[quarterIndex];
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

    for (const academicYear of this._plan) {
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

  private _deserializePlan(planFromBE: IAcademicYear[]): IAcademicYear[] {
    if (!planFromBE) {
      return [];
    }

    const result: IAcademicYear[] = [];

    for (const academicYearObject of planFromBE) {
      const academicYear = new AcademicYear(academicYearObject.year);

      const quarters: IQuarter[] = [];
      for (const quarterObject of academicYearObject.quarters) {
        const quarter = new Quarter(quarterObject.year, quarterObject.term);

        const courses: ICourse[] = [];
        for (const courseObject of quarterObject.courses) {
          const course = new Course(
            {
              deptCode: courseObject.deptCode,
              num: courseObject.num,
              title: courseObject.title,
              unit: courseObject.unit,
              isVariableUnit: courseObject.isVariableUnit,
              minUnit: courseObject.minUnit,
              maxUnit: courseObject.maxUnit,
            } as ResponseModel.Course,
            courseObject.isCustomCreated
          );
          course.id = courseObject.id;
          course.color = courseObject.color;

          courses.push(course);
        }

        quarter.courses = courses;
        quarters.push(quarter);
      }

      academicYear.quarters = quarters;
      result.push(academicYear);
    }

    return result;
  }

  private _deserializeCourseBag(courseBagFromBE: ICourse[]): ICourse[] {
    if (!courseBagFromBE) {
      return [];
    }

    const result: ICourse[] = [];

    for (const courseObject of courseBagFromBE) {
      const course = new Course(
        {
          deptCode: courseObject.deptCode,
          num: courseObject.num,
          title: courseObject.title,
          unit: courseObject.unit,
          isVariableUnit: courseObject.isVariableUnit,
          minUnit: courseObject.minUnit,
          maxUnit: courseObject.maxUnit,
        } as ResponseModel.Course,
        courseObject.isCustomCreated
      );
      course.id = courseObject.id;
      course.color = courseObject.color;

      result.push(course);
    }

    return result;
  }
}

export { type IAppUser, AppUser };
