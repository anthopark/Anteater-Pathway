import { immerable } from 'immer';
import { DegreePlan, IDegreePlan } from './degree-plan';

interface IAppUser {
  degreePlan: IDegreePlan;
  years: number[];
  addYear: (year: number) => void;
  removeYear: (year: number) => void;
}

class AppUser implements IAppUser {
  [immerable] = true;

  private _years: number[] = [];
  private _authToken: string | null = null;
  private _degreePlan = new DegreePlan();

  public get degreePlan() {
    return this._degreePlan;
  }

  public constructor() {
    this._addCurrentYear();
  }

  public get years(): number[] {
    return this._years;
  }

  public addYear(year: number) {
    this._years.push(year);
    this._years.sort((a, b) => a - b);
  }

  public removeYear(year: number) {
    if (this._years.includes(year)) {
      const removeIndex = this._years.indexOf(year);
      this._years.splice(removeIndex, 1);
    }
  }

  private _addCurrentYear() {
    const currentMonth = new Date().getMonth();
    let twoDigitCurrentYear = new Date().getFullYear() - 2000;

    if (currentMonth < 8) {
      twoDigitCurrentYear--;
    }

    this._years.push(twoDigitCurrentYear);
  }
}

export { type IAppUser, AppUser };
