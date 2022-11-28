import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';
import { getRepository, Collection, BaseFirestoreRepository } from 'fireorm';

@Collection('Departments')
export class DepartmentDocument {
  id: string;
  name: string;
  code: string;
}

@Collection('Courses')
export class CourseDocument {
  id: string;
  deptCode: string;
  num: string;
  title: string;
  unit: number | null;
  isVariableUnit: boolean;
  isWorkloadCredit: boolean;
  maxUnit: number | null;
  minUnit: number | null;
  geCode: string | null;
}

interface Repository {
  departments?: BaseFirestoreRepository<DepartmentDocument>;
}

export const repository: Repository = {};

export const initializeFirestore = () => {
  fireorm.initialize(admin.firestore());

  repository.departments = getRepository(DepartmentDocument);
};
