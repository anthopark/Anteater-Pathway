import * as functions from 'firebase-functions';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { repository, CourseCollection } from '../firestore.service';

const ALL_DEPARTMENT_URL = 'https://catalogue.uci.edu/allcourses/';
const CATALOGUE_BASE_URL = 'https://catalogue.uci.edu';

interface CrawledCourse {
  deptCode: string;
  num: string;
  title: string;
  unit: string | null;
  geCode: string | null;
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
    await crawlCourses(pageUrl);
  }

  // await crawlCourses('https://catalogue.uci.edu/allcourses/inno/');
  // await crawlCourses('https://catalogue.uci.edu/allcourses/uni_stu/');

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

const crawlCourses = async (url: string): Promise<CrawledCourse[]> => {
  const result: CrawledCourse[] = [];
  const pageHTML = await downloadPage(url);

  const $ = cheerio.load(pageHTML);

  $('.courses .courseblock').each((_, elem) => {
    const titleBlock = $(elem).find('.courseblocktitle strong');

    processTitleBlock(titleBlock.text().replace(/\u00A0/g, ' '));

    const descBlock = $(elem).find('.courseblockdesc');
  });

  return Promise.resolve(result);
};

const processTitleBlock = (titleBlock: string) => {
  const firstPeriodIndex = titleBlock.indexOf('.');
  const secondPeriodIndex = titleBlock.indexOf('.', firstPeriodIndex + 1);

  // extract deptCode and num
  const courseNumPart = titleBlock.substring(0, firstPeriodIndex).trim();
  console.log(courseNumPart.lastIndexOf(' '));
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

  console.log(
    `deptCode: ##${deptCode}##\tnum: ##${num}##\tunit: ##${unit}##\ntitle:##${title}##`
  );
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
