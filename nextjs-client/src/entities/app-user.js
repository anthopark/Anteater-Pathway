import { Planner } from "./planner";
import { TentativePlanner } from "./tentative-planner";

export class AppUser {
  constructor() {
    this._uid = null;
    this._isAuthenticated = false;
    this._accessToken = null;
    this._planner = new Planner();
    this._tentativePlanner = new TentativePlanner();
  }

  get uid() {
    return this._uid;
  }

  set uid(newValue) {
    this._uid = newValue;
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  get accessToken() {
    return this._accessToken;
  }

  set accessToken(newValue) {
    this._accessToken = newValue;
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
