import { Course } from 'src/models/course';

export interface IDegreePlan {}

export class DegreePlan implements IDegreePlan {
  private _courseBag: Course[] = [];

  public addToCourseBag(course: Course) {
    this._courseBag.push(course);
  }

  public get courseBag() {
    return this._courseBag;
  }
}
