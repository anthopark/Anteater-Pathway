import { MongoClient } from 'mongodb';
import * as serialize from 'serialize-javascript';
import {
  PlannerDocument,
  repository,
  UserDocument,
} from '../firestore.service';
import {
  AcademicYear,
  Course,
  CourseResponseModel,
  IAcademicYear,
  ICourse,
  IQuarter,
  Quarter,
  Term,
} from '../models/planner';

interface IMongoCourse {
  courseId: string;
  departmentCode: string;
  number: string;
  unit: string;
  title: string;
  isCustomCreated: boolean;
  isCustomUnit: boolean;
  customMinUnit: string | null;
  customMaxUnit: string | null;
  color: string;
}

interface IMongoQuarter {
  year: number;
  season: 'fall' | 'winter' | 'spring' | 'summer';
  courseItems: IMongoCourse[];
}

interface IMongoAcademicYear {
  year: number;
  quarters: IMongoQuarter[];
}

interface PlannerToMigrate {
  uid: string;
  mainPlanner: IMongoAcademicYear[] | null;
  tentativeLeft: IMongoCourse[] | null;
  tentativeRight: IMongoCourse[] | null;
}

export const migrateToFirestore = async () => {
  const connectionString = process.env.ATLAS_URI || '';
  const client = new MongoClient(connectionString);
  const db = await (await client.connect()).db('AnteaterPathwayDB');

  const plannerCollection = db.collection('planners');

  const allPlanners = await plannerCollection.find({}).toArray();

  // @ts-ignore
  for (const plannerToMigrate of allPlanners as PlannerToMigrate[]) {
    const user = new UserDocument();
    user.id = plannerToMigrate.uid;
    await repository.users?.create(user);

    const planner = new PlannerDocument();

    const plan = serializePlan(plannerToMigrate);
    const courseBag = serializeCourseBag(plannerToMigrate);
    planner.uid = plannerToMigrate.uid;
    planner.plan = plan;
    planner.courseBag = courseBag;

    await repository.planners?.create(planner);
  }
};

const seasonToTerm = {
  fall: 'fa' as Term,
  winter: 'wi' as Term,
  spring: 'sp' as Term,
  summer: 'su' as Term,
};

const serializePlan = (plannerToMigrate: PlannerToMigrate): IAcademicYear[] => {
  const plan: IAcademicYear[] = [];

  if (!plannerToMigrate.mainPlanner) {
    return [];
  }

  for (const academicYearMongo of plannerToMigrate.mainPlanner) {
    const academicYear = new AcademicYear(academicYearMongo.year);

    const quarters: IQuarter[] = [];
    for (const quarterMongo of academicYearMongo.quarters) {
      const quarter = new Quarter(
        quarterMongo.year,
        seasonToTerm[quarterMongo.season]
      );

      const courses: ICourse[] = [];
      for (const courseMongo of quarterMongo.courseItems) {
        const course = new Course(
          {
            deptCode: courseMongo.departmentCode,
            num: courseMongo.number,
            title: courseMongo.title,
            unit: parseFloat(courseMongo.unit),
            isVariableUnit: courseMongo.isCustomUnit,
            minUnit:
              courseMongo.customMinUnit !== null
                ? parseFloat(courseMongo.customMinUnit)
                : null,
            maxUnit:
              courseMongo.customMaxUnit !== null
                ? parseFloat(courseMongo.customMaxUnit)
                : null,
          } as CourseResponseModel,
          courseMongo.isCustomCreated
        );

        const courseColor = parseInt(courseMongo.color.replace('color', ''));
        if (courseColor < 1 || courseColor > 12) {
          throw new Error(`Invalid color value from MongoDB: ${courseColor}`);
        }

        course.color = courseColor;

        courses.push(course);
      }

      quarter.courses = courses;
      quarters.push(quarter);
    }

    academicYear.quarters = quarters;
    plan.push(academicYear);
  }

  const planInJSON = serialize(plan);

  return JSON.parse(planInJSON);
};

const serializeCourseBag = (plannerToMigrate: PlannerToMigrate): ICourse[] => {
  const courseBag: ICourse[] = [];

  if (plannerToMigrate.tentativeLeft) {
    for (const courseMongo of plannerToMigrate.tentativeLeft) {
      const course = new Course(
        {
          deptCode: courseMongo.departmentCode,
          num: courseMongo.number,
          title: courseMongo.title,
          unit: parseFloat(courseMongo.unit),
          isVariableUnit: courseMongo.isCustomUnit,
          minUnit:
            courseMongo.customMinUnit !== null
              ? parseFloat(courseMongo.customMinUnit)
              : null,
          maxUnit:
            courseMongo.customMaxUnit !== null
              ? parseFloat(courseMongo.customMaxUnit)
              : null,
        } as CourseResponseModel,
        courseMongo.isCustomCreated
      );

      const courseColor = parseInt(courseMongo.color.replace('color', ''));
      if (courseColor < 1 || courseColor > 12) {
        throw new Error(`Invalid color value from MongoDB: ${courseColor}`);
      }

      course.color = courseColor;
      courseBag.push(course);
    }
  }

  if (plannerToMigrate.tentativeRight) {
    for (const courseMongo of plannerToMigrate.tentativeRight) {
      const course = new Course(
        {
          deptCode: courseMongo.departmentCode,
          num: courseMongo.number,
          title: courseMongo.title,
          unit: parseFloat(courseMongo.unit),
          isVariableUnit: courseMongo.isCustomUnit,
          minUnit:
            courseMongo.customMinUnit !== null
              ? parseFloat(courseMongo.customMinUnit)
              : null,
          maxUnit:
            courseMongo.customMaxUnit !== null
              ? parseFloat(courseMongo.customMaxUnit)
              : null,
        } as CourseResponseModel,
        courseMongo.isCustomCreated
      );

      const courseColor = parseInt(courseMongo.color.replace('color', ''));
      if (courseColor < 1 || courseColor > 12) {
        throw new Error(`Invalid color value from MongoDB: ${courseColor}`);
      }

      course.color = courseColor;
      courseBag.push(course);
    }
  }

  const courseBagInJSON = serialize(courseBag);

  return JSON.parse(courseBagInJSON);
};
