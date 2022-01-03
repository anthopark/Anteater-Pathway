export class Course {
  constructor(courseItem) {
    // id for draggerable
    this._id = this._generateGuid();
    this._departmentCode = courseItem.departmentCode.trim();
    this._number = courseItem.number.trim();
    this._unit = courseItem.unit.trim();
    this._title = courseItem.title.trim();
    this._isCustomCreated = false;
    this._isCustomUnit = this._unit.includes("-");
    this._color = "color1";
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
    return `${this._departmentCode} ${this._number}`;
  }

  get unit() {
    return this._unit;
  }

  set unit(newUnit) {
    this._unit = newUnit;
  }

  get title() {
    return this._title;
  }

  get isCustomCreated() {
    return this._isCustomCreated;
  }

  set isCustomCreated(newValue) {
    if (typeof newValue !== "boolean") {
      throw new TypeError("The type must be boolean");
    }
    this._isCustomCreated = newValue;
  }

  get isCustomUnit() {
    return this._isCustomUnit;
  }

  get color() {
    return this._color;
  }

  set color(newValue) {
    this._color = newValue;
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
