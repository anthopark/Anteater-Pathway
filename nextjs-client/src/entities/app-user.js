export class AppUser {
  constructor() {
    // years are two-digit number. ex. 21, 22
    this._academicYears = [];
    // courses just added from seacrh bar
    this._tentativelyPlannedCourses = [];
  }

  get academicYears() {
    return [...this._academicYears];
  }

  get tentativelyPlannedCourses() {
    return [...this._tentativelyPlannedCourses];
  }

  addAcademicYear(year) {
    if (!this._academicYears.includes(year)) {
      this._academicYears.push(year);
      this._academicYears.sort((prev, next) => prev - next);
    }
  }

  removeAcademicYear(year) {
    if (this._academicYears.includes(year)) {
      this._academicYears.splice(index, 1);
    }
  }

  planTentatively(course) {
    this._tentativelyPlannedCourses.push(course);
  }
}
