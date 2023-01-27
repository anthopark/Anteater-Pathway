import { v4 as uuidv4 } from 'uuid';

export interface CourseInfo {
  deptCode: string;
  num: string;
  title: string;
  unit: number | null;
  isVariableUnit: boolean;
  isWorkloadCredit: boolean;
  minUnit: number | null;
  maxUnit: number | null;
  geCode: string | null;
  offered: string[];
  prerequisite: string | null;
  corequisite: string | null;
  prereqOrCoreq: string | null;
  sameAs: string | null;
  concurrentWith: string | null;
  overlapsWith: string | null;
  gradingOption: string | null;
  repeatability: string | null;
  restriction: string | null;
}

export class Course {
  private _id: string;
  public isCustomCreated: boolean = false;
  public color = 1;
  public courseInfo: CourseInfo;

  constructor(courseInfo: CourseInfo, isCustomCreated: boolean) {
    this._id = uuidv4();
    this.courseInfo = courseInfo;
    this.isCustomCreated = isCustomCreated;
  }

  public get id() {
    return this._id;
  }
}