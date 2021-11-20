export class TentativePlanner {
  constructor() {
    this._leftCourseItems = [];
    this._rightCourseItems = [];
  }

  addCourse(course) {
    if (this._leftCourseItems.length <= this._rightCourseItems.length) {
      this._leftCourseItems.push(course);
    } else {
      this._rightCourseItems.push(course);
    }
  }

  deleteCourse() {}

  get leftCourseItems() {
    return this._leftCourseItems;
  }

  get rightCourseItems() {
    return this._rightCourseItems;
  }

  get bothCourseItems() {
    return [this._leftCourseItems, this._rightCourseItems];
  }
}
