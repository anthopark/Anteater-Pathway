import { Planner } from "./planner";
import { TentativePlanner } from "./tentative-planner";

export class AppUser {
  constructor() {
    this._isAuthenticated = false;
    this._planner = new Planner();
    this._tentativePlanner = new TentativePlanner();
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

  set planner(newPlanner) {
    this._planner = newPlanner;
  }

  get tentativePlanner() {
    return this._tentativePlanner;
  }

  set tentativePlanner(newTentativePlanner) {
    this._tentativePlanner = newTentativePlanner;
  }
}
