namespace ResponseModel {
  export interface Course {
    [key: string]: string | number | null | boolean | string[];
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

  export interface Department {
    name: string;
    code: string;
  }

  export interface CourseAttribute {
    name: string;
    value: string;
    ordinal: number;
  }
}
