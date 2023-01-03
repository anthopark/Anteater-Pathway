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
  for (const url of urls) {
    const pageUrl = CATALOGUE_BASE_URL + url;
    functions.logger.info(`Crawling course page: ${pageUrl}`);
    const someSet = new Set<string>();
    await crawlCourses(pageUrl, someSet);

    // console.log(someSet);
  }

  // await crawlCourses('https://catalogue.uci.edu/allcourses/i_c_sci/');
  // await crawlCourses('https://catalogue.uci.edu/allcourses/uni_stu/');
  // await crawlCourses('https://catalogue.uci.edu/allcourses/rotc/', new Set());

  functions.logger.info('Finished crawling courses.');

  functions.logger.info('Start updating Course collection');

  functions.logger.info('Finished updating.');
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

const crawlCourses = async (
  url: string,
  someSet: Set<string>
): Promise<CrawledCourse[]> => {
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

    const parsedDescBlock = parseDescBlock(descBlock.toArray(), someSet);
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

const parseDescBlock = (descBlocks: string[], someSet: Set<string>) => {
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
