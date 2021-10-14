export class Course {
  constructor(searchedCourse) {
    // id for draggerable
    this._id = this._generateGuid();
    this._departmentCode = searchedCourse.departmentCode;
    this._number = searchedCourse.number;
    this._courseCode = searchedCourse.courseCode;
    this._title = searchedCourse.title;
    this._unit = searchedCourse.unit;
  }

  get id() {
    return this._id;
  }

  get departmentCode() {
    return this._departmentCode;
  }

  get number() {
    return this._number;
  }

  get courseCode() {
    return this._courseCode;
  }

  get unit() {
    return this._unit;
  }

  _generateGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
