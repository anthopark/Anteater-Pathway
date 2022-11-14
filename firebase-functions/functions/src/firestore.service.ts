import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';
import { getRepository, Collection, BaseFirestoreRepository } from 'fireorm';

@Collection()
export class DepartmentCollection {
  id: string;
  name: string;
  code: string;
}

interface Repository {
  departments?: BaseFirestoreRepository<DepartmentCollection>;
}

export const repository: Repository = {};

export const initializeFirestore = () => {
  fireorm.initialize(admin.firestore());

  repository.departments = getRepository(DepartmentCollection);
};
