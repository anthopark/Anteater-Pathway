import { Planner } from "./planner";

export class AppUser {
  constructor() {
    this._isAuthenticated = false;
    this._planner = new Planner();
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  set isAuthenticated(newValue) {
    if (typeof newValue !== "boolean") {
      throw new TypeError("The type must be boolean");
    }
    this._isAuthenticated = newValue;
  }

  get planner() {
    return this._planner;
  }
}
