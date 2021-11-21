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

  deleteCourse(courseId) {
    let foundIndex = this._leftCourseItems.findIndex(
      (course) => course.id === courseId
    );

    if (foundIndex !== -1) {
      this._leftCourseItems.splice(foundIndex, 1);
    } else {
      foundIndex = this._rightCourseItems.findIndex(
        (course) => course.id === courseId
      );

      if (foundIndex !== -1) {
        this._rightCourseItems.splice(foundIndex, 1);
      }
    }
  }

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
