import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';
import { getRepository, Collection, BaseFirestoreRepository } from 'fireorm';

@Collection('departments')
export class DepartmentDocument {
  id: string;
  name: string;
  code: string;
}

@Collection('courses')
export class CourseDocument {
  id: string;
  deptCode: string;
  num: string;
  title: string;
  unit: number | null;
  isVariableUnit = false;
  isWorkloadCredit = false;
  maxUnit: number | null = null;
  minUnit: number | null = null;
  description: string;
  geCode: string | null;
  prerequisite: string | null;
  restriction: string | null;
  sameAs: string | null;
  gradingOption: string | null;
  overlapsWith: string | null;
  repeatability: string | null;
  concurrentWith: string | null;
  corequisite: string | null;
  prereqOrCoreq: string | null;
  offered: string[] = [];
}

interface Repository {
  departments?: BaseFirestoreRepository<DepartmentDocument>;
  courses?: BaseFirestoreRepository<CourseDocument>;
}

export const repository: Repository = {};

export const initializeFirestore = () => {
  fireorm.initialize(admin.firestore());

  repository.departments = getRepository(DepartmentDocument);
  repository.courses = getRepository(CourseDocument);
};
