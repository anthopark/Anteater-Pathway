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

  findDroppable(droppableId) {
    const quarter = this._findQuarter(droppableId);
    return quarter.plannedCourses;
  }

  updateDroppable(droppableId, newCourseItems) {
    const quarter = this._findQuarter(droppableId);
    quarter.plannedCourses = newCourseItems;
  }

  updateCourseColor(courseId, newColor) {
    const foundCourse = this._findCourse(courseId);
    if (foundCourse) {
      foundCourse.color = newColor;
    }
  }

  _findQuarter(droppableId) {
    const [year, season] = droppableId.split("-").slice(1);

    const academicYearFoundIndex = this._academicYears.findIndex(
      (academicYear) => academicYear.year === parseInt(year)
    );

    if (academicYearFoundIndex === -1) {
      throw new Error(`Academic year not found: ${year}`);
    }

    const quarters = this._academicYears[academicYearFoundIndex].quarters;

    const quarterFoundIndex = quarters.findIndex(
      (quarter) => quarter.season === season
    );

    if (quarterFoundIndex === -1) {
      throw new Error(`Season not found: ${year} ${saeson}`);
    }

    return quarters[quarterFoundIndex];
  }

  _findCourse(courseId) {
    for (const academicYear of this._academicYears) {
      for (const quarter of academicYear.quarters) {
        for (const course of quarter.plannedCourses) {
          if (course.id === courseId) {
            return course;
          }
        }
      }
    }

    return null;
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
