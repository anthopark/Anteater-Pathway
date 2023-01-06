import * as functions from 'firebase-functions';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { repository, CourseDocument } from '../firestore.service';

const ALL_DEPARTMENT_URL = 'https://catalogue.uci.edu/allcourses/';
const CATALOGUE_BASE_URL = 'https://catalogue.uci.edu';
const COURSE_DESCRIPTIONS_MAP = new Map([
  ['prerequisite', 'Prerequisite:'],
  ['restriction', 'Restriction:'],
  ['sameAs', 'Same as'],
  ['gradingOption', 'Grading Option:'],
  ['overlapsWith', 'Overlaps with'],
  ['repeatability', 'Repeatability:'],
  ['concurrentWith', 'Concurrent with'],
  ['corequisite', 'Corequisite:'],
  ['prereqOrCoreq', 'Prerequisite or corequisite:'],
]);

interface CrawledCourse {
  deptCode: string;
  num: string;
  title: string;
  unit: string | null;
  geCode: string | null;
  description: string;
  prerequisite: string | null;
  restriction: string | null;
  sameAs: string | null;
  gradingOption: string | null;
  overlapsWith: string | null;
  repeatability: string | null;
  concurrentWith: string | null;
  corequisite: string | null;
  prereqOrCoreq: string | null;
}

export const updateCourses = async () => {
  functions.logger.info('Start crawling urls for all course pages.');
  const urls = await crawlAllCourseUrls();
  functions.logger.info(
    `Finished crawling urls. Total crawled: ${urls.length}`
  );

  functions.logger.info('Start crawling courses.');
  const allCrawledCourses: CrawledCourse[][] = [];
  for (const url of urls) {
    const pageUrl = CATALOGUE_BASE_URL + url;
    functions.logger.info(`Crawling course page: ${pageUrl}`);

    allCrawledCourses.push(await crawlCourses(pageUrl));
  }
  functions.logger.info('Finished crawling courses.');

  functions.logger.info('Start updating Course collection');

  let totalCreatedCourses = 0;
  for (const deptCourses of allCrawledCourses) {
    if (deptCourses.length > 0) {
      functions.logger.info(
        `Updating ${deptCourses.length} ${deptCourses[0].deptCode} courses`
      );

      let deptCreatedCourses = 0;
      const batch = repository.courses!.createBatch();

      for (const course of deptCourses) {
        const foundCourse = await repository.courses
          ?.whereEqualTo('deptCode', course.deptCode)
          .whereEqualTo('num', course.num)
          .findOne();

        if (foundCourse === null) {
          const newCourse = new CourseDocument();
          updateCourseDocumentProperties(newCourse, course);
          batch.create(newCourse);
          deptCreatedCourses++;
        }
      }

      if (deptCreatedCourses > 0) {
        await batch.commit();
        totalCreatedCourses += deptCreatedCourses;
        functions.logger.info(
          `New ${deptCreatedCourses} ${deptCourses[0].deptCode} courses added`
        );
      }
    }
  }
  functions.logger.info(
    `Finished updating. Total ${totalCreatedCourses} new courses.`
  );
};

const crawlAllCourseUrls = async (): Promise<string[]> => {
  const result: string[] = [];

  const pageHTML = await downloadPage(ALL_DEPARTMENT_URL);

  const $ = cheerio.load(pageHTML);

  $('#atozindex li a').each((_, elem) => {
    result.push($(elem).attr('href')!.trim());
  });

  return Promise.resolve(result);
};

const crawlCourses = async (url: string): Promise<CrawledCourse[]> => {
  const result: CrawledCourse[] = [];
  const pageHTML = await downloadPage(url);

  const $ = cheerio.load(pageHTML);

  $('.courses .courseblock').each((_, elem) => {
    const titleBlock = $(elem).find('.courseblocktitle strong');

    const parsedTitleBlock = parseTitleBlock(
      titleBlock.text().replace(/\u00A0/g, ' ')
    );

    const descBlock = $(elem)
      .find('.courseblockdesc p')
      .map((_, elem) =>
        $(elem)
          .text()
          .replace(/\u00A0/g, ' ')
          .trim()
      );

    const parsedDescBlock = parseDescBlock(descBlock.toArray());

    result.push({
      deptCode: parsedTitleBlock.deptCode,
      num: parsedTitleBlock.num,
      title: parsedTitleBlock.title,
      unit: parsedTitleBlock.unit,
      description: parsedDescBlock.description!,
      geCode: parsedDescBlock.geCode,
      prerequisite: parsedDescBlock.prerequisite,
      restriction: parsedDescBlock.restriction,
      sameAs: parsedDescBlock.sameAs,
      gradingOption: parsedDescBlock.gradingOption,
      overlapsWith: parsedDescBlock.overlapsWith,
      repeatability: parsedDescBlock.repeatability,
      concurrentWith: parsedDescBlock.concurrentWith,
      corequisite: parsedDescBlock.corequisite,
      prereqOrCoreq: parsedDescBlock.prereqOrCoreq,
    });
  });

  return Promise.resolve(result);
};

const parseTitleBlock = (titleBlock: string) => {
  const firstPeriodIndex = titleBlock.indexOf('.');
  const secondPeriodIndex = titleBlock.indexOf('.', firstPeriodIndex + 1);

  // extract deptCode and num
  const courseNumPart = titleBlock.substring(0, firstPeriodIndex).trim();
  const deptCode = courseNumPart.substring(0, courseNumPart.lastIndexOf(' '));
  const num = courseNumPart.substring(courseNumPart.lastIndexOf(' ') + 1);

  // extract title
  const title = titleBlock
    .substring(firstPeriodIndex + 1, secondPeriodIndex)
    .trim();

  // extract unit
  let unit = null;
  const unitPart = titleBlock.substring(secondPeriodIndex + 1).trim();
  if (unitPart !== '') {
    unit = unitPart.substring(0, unitPart.lastIndexOf(' '));
  }

  return {
    deptCode,
    num,
    title,
    unit,
  };
};

const parseDescBlock = (descBlocks: string[]) => {
  descBlocks = descBlocks.filter((desc) => desc !== '');
  const description = descBlocks[0];

  const result: { [key: string]: string | null } = {
    description,
    geCode: null,
    prerequisite: null,
    restriction: null,
    sameAs: null,
    gradingOption: null,
    overlapsWith: null,
    repeatability: null,
    concurrentWith: null,
    corequisite: null,
    prereqOrCoreq: null,
  };

  descBlocks.slice(1).forEach((block) => {
    // extract GE
    if (block.startsWith('(') && !block.startsWith('(Design')) {
      result.geCode = block.replace(/^[(]|[.)]+$/g, '').trim();
    }

    for (const [attributeName, attrInText] of COURSE_DESCRIPTIONS_MAP) {
      if (block.startsWith(attrInText)) {
        // extract the attribute content
        result[attributeName] = block.slice(attrInText.length).trim();
      }
    }
  });

  return result;
};

const updateCourseDocumentProperties = (
  document: CourseDocument,
  crawled: CrawledCourse
) => {
  document.deptCode = crawled.deptCode;
  document.num = crawled.num;
  document.title = crawled.title;

  if (crawled.unit === null) {
    document.unit = null;
  } else if (crawled.unit.includes('-')) {
    document.isVariableUnit = true;
    document.minUnit = parseFloat(crawled.unit.split('-')[0]);
    document.maxUnit = parseFloat(crawled.unit.split('-')[1]);
    document.unit = document.minUnit;
  } else if (crawled.unit.includes('Workload')) {
    document.isWorkloadCredit = true;
    document.unit = parseFloat(crawled.unit);
  } else {
    // regular unit value
    document.unit = parseFloat(crawled.unit);
  }

  document.description = crawled.description;
  document.geCode = crawled.geCode;
  document.prerequisite = crawled.prerequisite;
  document.restriction = crawled.restriction;
  document.sameAs = crawled.sameAs;
  document.gradingOption = crawled.gradingOption;
  document.overlapsWith = crawled.overlapsWith;
  document.repeatability = crawled.repeatability;
  document.concurrentWith = crawled.concurrentWith;
  document.corequisite = crawled.corequisite;
  document.prereqOrCoreq = crawled.prereqOrCoreq;
};

const downloadPage = async (url: string): Promise<string> => {
  let response;

  try {
    response = await axios.get(url);
  } catch (e) {
    functions.logger.error(`Error while requesting ${url}`);
    functions.logger.error((e as Error).message);
    return Promise.reject(e);
  }

  return Promise.resolve(response.data);
};
