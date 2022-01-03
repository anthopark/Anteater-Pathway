export class Quarter {
  constructor(year, season) {
    this._year = year;
    this._season = season;
    this._plannedCourses = [];
    this._totalUnit = 0;
  }

  get droppableId() {
    return `p-${this._year}-${this._season}`;
  }

  get header() {
    let yearForHeader = this._year;

    if (this._season !== "fall") {
      yearForHeader += 1;
    }

    return `${
      this._season[0].toUpperCase() + this._season.slice(1)
    } 20${yearForHeader}`;
  }

  get season() {
    return this._season;
  }

  get plannedCourses() {
    return this._plannedCourses;
  }

  set plannedCourses(newPlannedCourses) {
    this._plannedCourses = newPlannedCourses;
  }

  get totalUnit() {
    this._calculateTotalUnit();

    return this._totalUnit;
  }

  _calculateTotalUnit() {
    let result = 0;
    for (const course of this._plannedCourses) {
      if (!isNaN(parseFloat(course.unit))) {
        result += parseFloat(course.unit);
      }
    }

    this._totalUnit = result;
  }
}
