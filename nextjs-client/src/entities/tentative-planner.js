export class TentativePlanner {
  constructor() {
    this._leftCourseItems = [];
    this._rightCourseItems = [];
  }

  get droppables() {
    return [
      { droppableId: "tp-left", courseItems: this._leftCourseItems },
      { droppableId: "tp-right", courseItems: this._rightCourseItems },
    ];
  }

  findDroppable(droppableId) {
    if (droppableId === "tp-left") return this._leftCourseItems;
    else if (droppableId === "tp-right") return this._rightCourseItems;
  }

  updateDroppable(droppableId, newCourseItems) {
    if (droppableId === "tp-left") {
      this._leftCourseItems = newCourseItems;
    } else if (droppableId === "tp-right") {
      this._rightCourseItems = newCourseItems;
    }
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

    this.balanceCourseItems();
  }

  updateCourseColor(courseId, newColor) {
    const foundCourse = this._findCourse(courseId);
    if (foundCourse) {
      foundCourse.color = newColor;
    }
  }

  balanceCourseItems() {
    let imbalanceCourses = [];

    if (this._leftCourseItems.length > this._rightCourseItems.length) {
      imbalanceCourses = this._leftCourseItems.splice(
        this._rightCourseItems.length
      );
    } else if (this._leftCourseItems.length < this._rightCourseItems.length) {
      imbalanceCourses = this._rightCourseItems.splice(
        this._leftCourseItems.length
      );
    }

    for (const course of imbalanceCourses) {
      this.addCourse(course);
    }
  }

  updateCustomUnit(courseId, newUnit) {
    const foundCourse = this._findCourse(courseId);
    if (foundCourse) {
      foundCourse.unit = newUnit.trim();
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

  _findCourse(courseId) {
    let result;

    for (const course of this._leftCourseItems) {
      if (course.id === courseId) {
        result = course;
        break;
      }
    }

    for (const course of this._rightCourseItems) {
      if (course.id === courseId) {
        result = course;
        break;
      }
    }

    return result;
  }
}
