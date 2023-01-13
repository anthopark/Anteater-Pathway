import { immerable } from 'immer';

interface IAppUser {
  years: number[];
  addYear: (year: number) => void;
  sortYear: () => void;
}

class AppUser implements IAppUser {
  [immerable] = true;

  private _years: number[] = [];

  public get years(): number[] {
    return this._years;
  }

  public addYear(year: number) {
    this._years.push(year);
  }

  public sortYear() {
    this._years.sort((a, b) => a - b);
  }
}

export { type IAppUser, AppUser };
