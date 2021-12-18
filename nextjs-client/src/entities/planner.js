import { AcademicYear } from "./academic-year";

export class Planner {
  constructor() {
    this._academicYears = [];
    this._addDefaultAcademicYear();
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
      this._sortAcademicYears();
    }
  }

  removeAcademicYear(year) {
    if (this._academicYears.some((item) => item.year === year)) {
      this._academicYears.splice(
        this._academicYears.findIndex((item) => item.year === year),
        1
      );
      this._sortAcademicYears();
    }
  }

  _addDefaultAcademicYear() {
    let currentAcademicYear = new Date().getFullYear() - 2000;

    // before september
    if (new Date().getMonth() < 8) {
      currentAcademicYear -= 1;
    }

    this._academicYears.push(new AcademicYear(currentAcademicYear));
  }

  _sortAcademicYears() {
    this._academicYears.sort((prev, next) => prev.year - next.year);
  }
}
