import * as functions from 'firebase-functions';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { repository, DepartmentDocument } from '../firestore.service';

const ALL_DEPARTMENT_URL = 'https://catalogue.uci.edu/allcourses/';

interface CrawledDepartment {
  name: string;
  code: string;
}

export const updateDepartments = async () => {
  functions.logger.info(`Start crawling departments at ${ALL_DEPARTMENT_URL}`);
  const crawledDepartments = await crawlAllDepartments();
  functions.logger.info(
    `Finished crawling. Total departments crawled: ${crawledDepartments.length}`
  );

  const batch = repository.departments!.createBatch();

  let createdNum = 0;

  functions.logger.info('Start updating Department collection');
  for (const crawledDept of crawledDepartments) {
    const foundDept = await repository.departments
      ?.whereEqualTo('code', crawledDept.code)
      .findOne();

    if (foundDept === null) {
      const newDept = new DepartmentDocument();
      newDept.code = crawledDept.code;
      newDept.name = crawledDept.name;
      batch.create(newDept);
      createdNum++;
      functions.logger.info(
        `New Department: ${newDept.name} (${newDept.code})`
      );
    }
  }
  if (createdNum > 0) {
    await batch.commit();
  }

  functions.logger.info(
    `Finished updating. Newly added documents: ${createdNum}`
  );
};

const crawlAllDepartments = async (): Promise<CrawledDepartment[]> => {
  const result: CrawledDepartment[] = [];
  let response;

  try {
    response = await axios.get(ALL_DEPARTMENT_URL);
  } catch (e) {
    functions.logger.error(`Error while requesting ${ALL_DEPARTMENT_URL}`);
    functions.logger.error((e as Error).message);
    return Promise.reject(e);
  }

  const $ = cheerio.load(response.data);

  $('#atozindex li a').each((_, elem) => {
    const text = $(elem).text();
    const name = text.substring(0, text.indexOf('(')).trim();
    const code = text
      .substring(text.indexOf('(') + 1, text.indexOf(')'))
      .trim();

    result.push({ name, code });
  });

  return Promise.resolve(result);
};
