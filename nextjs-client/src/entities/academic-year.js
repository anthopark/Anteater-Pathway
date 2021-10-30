import { Quarter } from "./quarter";
const QUARTER_SEASONS = ["fall", "winter", "spring", "summer"];

export class AcademicYear {
  constructor(year) {
    this._year = year;
    this._quarters = QUARTER_SEASONS.map((season) => new Quarter(season));
  }

  get year() {
    return this._year;
  }

  get quarters() {
    return this._quarters;
  }
}
