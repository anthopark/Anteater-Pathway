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
  corequisite: string | null;
  prereqOrCoreq: string | null;
  sameAs: string | null;
  concurrentWith: string | null;
  overlapsWith: string | null;
  gradingOption: string | null;
  repeatability: string | null;
  restriction: string | null;
  offered: string[] = [];
}

@Collection('courseAttributes')
export class CourseAttributeDocument {
  id: string;
  name: string;
  value: string;
  ordinal: number;
}

@Collection('users')
export class UserDocument {
  id: string;
  uid: string;
}

interface Repository {
  departments?: BaseFirestoreRepository<DepartmentDocument>;
  courses?: BaseFirestoreRepository<CourseDocument>;
  courseAttributes?: BaseFirestoreRepository<CourseAttributeDocument>;
  users?: BaseFirestoreRepository<UserDocument>;
}

export const repository: Repository = {};

export const initializeFirestore = () => {
  fireorm.initialize(admin.firestore());

  repository.departments = getRepository(DepartmentDocument);
  repository.courses = getRepository(CourseDocument);
  repository.courseAttributes = getRepository(CourseAttributeDocument);
  repository.users = getRepository(UserDocument);
};
