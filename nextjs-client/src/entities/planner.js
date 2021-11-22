import { AcademicYear } from "./academic-year";

export class Planner {
  constructor() {
    // years are two-digit number. ex. 21, 22
    this._academicYears = [];
  }

  get academicYears() {
    return this._academicYears;
  }

  set academicYears(newAcademicYears) {
    this._academicYears = newAcademicYears;
  }

  addAcademicYear(year) {
    if (!this._academicYears.some((item) => item.year === year)) {
      this._academicYears.push(new AcademicYear(year));
      this._academicYears.sort((prev, next) => prev.year - next.year);
    }
  }

  updateCourseColor(courseId, newColor) {}
}
