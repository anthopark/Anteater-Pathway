export class Course {
  constructor(addedCourse) {
    // id for draggerable
    this._id = this._generateGuid();
    this._departmentCode = addedCourse.departmentCode.trim();
    this._number = addedCourse.number.trim();
    this._unit = addedCourse.unit.trim();
    this._title = addedCourse.title.trim();
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
