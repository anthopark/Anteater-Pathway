import * as functions from 'firebase-functions/v2';
import puppeteer from 'puppeteer';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { repository } from '../firestore.service';

const SOC_URL = 'https://www.reg.uci.edu/perl/WebSoc';

interface CrawledCourse {
  deptCode: string;
  num: string;
}

const quarterOrderMap = new Map([
  ['wi', 0],
  ['sp', 1],
  ['su1', 2],
  ['su2', 3],
  ['su10w', 4],
  ['fa', 5],
]);

export const isValidQuarterCode = (quarterCode: string) => {
  const [year, quarter] = quarterCode.split('-');

  if (parseInt(year) > 2040 || parseInt(year) < 2015) {
    return false;
  } else if (!quarterOrderMap.has(quarter)) {
    return false;
  }

  return true;
};

export const updateCourseOfferHistory = async (
  optionCode: string,
  quarterCode: string
) => {
  const deptCodes = await loadDeptOptions();
  functions.logger.info(`${deptCodes.length} Department Options Loaded`);

  functions.logger.info('Launching headless browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(SOC_URL, { waitUntil: 'networkidle2' });
  functions.logger.info(`Page at ${SOC_URL}`);

  // select term
  await page.select('select[name="YearTerm"]', optionCode);

  for (const deptCode of deptCodes) {
    await page.select('select[name="Dept"]', deptCode);
    await Promise.all([
      page.waitForNavigation(),
      page.click('input[value="Display Web Results"]'),
    ]);

    functions.logger.info(`Page at ${deptCode} SOC`);

    const html = await page.content();

    const courses = crawlOfferedCourses(html);

    functions.logger.info(`${courses.length} courses crawled from ${deptCode}`);

    await updateOfferedHistory(courses, quarterCode);

    functions.logger.info(`${deptCode} courses update finished`);
    await page.goBack();
    await new Promise((r) => setTimeout(r, 1000));
  }

  functions.logger.info(`Course offer history update finished: ${quarterCode}`);

  await browser.close();
};

const updateOfferedHistory = async (
  courses: CrawledCourse[],
  quarterCode: string
) => {
  let numOfUpdated = 0;
  for (const course of courses) {
    const courseToUpdate = await repository
      .courses!.whereEqualTo('deptCode', course.deptCode)
      .whereEqualTo('num', course.num)
      .findOne();

    if (courseToUpdate && !courseToUpdate.offered.includes(quarterCode)) {
      courseToUpdate.offered.push(quarterCode);

      courseToUpdate.offered.sort((a, b) => {
        const [aYear, aQuarter] = a.split('-');
        const [bYear, bQuarter] = b.split('-');

        if (aYear !== bYear) {
          return parseInt(bYear) - parseInt(aYear);
        } else {
          return (
            quarterOrderMap.get(bQuarter)! - quarterOrderMap.get(aQuarter)!
          );
        }
      });

      await repository.courses!.update(courseToUpdate);
      numOfUpdated++;
    }
  }

  functions.logger.info(`${numOfUpdated} courses' offered updated`);
};

const crawlOfferedCourses = (html: string): CrawledCourse[] => {
  const result: { deptCode: string; num: string }[] = [];
  const crawledCoursesSet = new Set<string>();

  const $ = cheerio.load(html);
  $('td.CourseTitle').each((_, elem) => {
    let [deptCode, num] = $(elem)
      .text()
      .replace(/\u00A0/g, ' ')
      .trim()
      .split('   ');
    deptCode = deptCode.trim().toUpperCase();
    num = num.trim();

    if (!crawledCoursesSet.has(`${deptCode} ${num}`)) {
      result.push({
        deptCode,
        num,
      });
      crawledCoursesSet.add(`${deptCode} ${num}`);
    }
  });

  return result;
};

const loadDeptOptions = async (): Promise<string[]> => {
  const availableDeptCode = new Set(
    (await repository.departments!.find()).map((dept) => dept.code)
  );

  const result: string[] = [];
  const pageHTML = await downloadPage(SOC_URL);

  const $ = cheerio.load(pageHTML);
  $('select[name="Dept"] option').each((i, elem) => {
    if (i === 0) return;

    const deptCode = $(elem).attr('value');
    if (isValidDeptCode(deptCode, availableDeptCode)) {
      result.push(deptCode!);
    }
  });

  return result;
};

const isValidDeptCode = (
  deptCode: string | undefined,
  availableDeptCode: Set<string>
) => {
  if (typeof deptCode !== 'string') return false;
  if (!availableDeptCode.has(deptCode)) return false;

  return true;
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
