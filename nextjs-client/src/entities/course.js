export class Course {
  constructor(courseItem) {
    // id for draggerable
    this._id = this._generateGuid();
    this._departmentCode = courseItem.departmentCode.trim();
    this._number = courseItem.number.trim();
    this._unit = courseItem.unit.trim();
    this._title = courseItem.title.trim();
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
