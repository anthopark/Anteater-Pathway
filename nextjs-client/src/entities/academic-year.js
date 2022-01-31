import { Quarter } from "./quarter";
const QUARTER_SEASONS = ["fall", "winter", "spring", "summer"];

export class AcademicYear {
  constructor(year) {
    this._year = year;
    this._quarters = QUARTER_SEASONS.map((season) => new Quarter(year, season));
  }

  get year() {
    return this._year;
  }

  set year(newValue) {
    this._year = newValue;
  }

  get quarters() {
    return this._quarters;
  }

  set qauraters(newValue) {
    this._quarters = newValue;
  }
}
