from FastAPI.model import Course, Department
from mongodb.models import MONGO_CONNECTION_STRING
import motor.motor_asyncio
from offer_history_updater.webreg_scraper.webreg_scraper import WebRegScraper
from offer_history_updater.offer_history_updater import OfferHistoryUpdater
from course_info_updater.catalogue_scrapper.catalogue_scrapper import CatalogueScraper
from course_info_updater.course_info_updater import CourseInfoUpdater
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_CONNECTION_STRING)

mydatabase = client.AnteaterPathwayDB
coursesDB = mydatabase.courses
departmentDB = mydatabase.departments


async def getAllCourse():
    document = coursesDB.find({})
    courses = []
    async for docs in document:
        courses.append(Course(**docs))
    return courses


async def getCourseDept(deptCode):
    document = coursesDB.find({"dept_code": deptCode.upper()})
    courses = []
    async for docs in document:
        courses.append(Course(**docs))
    return courses


async def getSpecificCourse(deptCode, num):

    document = coursesDB.find(
        {"dept_code": deptCode.upper(), "num": num.upper()})
    async for docs in document:
        return Course(**docs)


async def getAllDepartment():
    departments = []
    document = departmentDB.find({})
    async for docs in document:
        departments.append(Department(**docs))

    return departments


async def putCourseHistory():
    scraper = WebRegScraper()
    updater = OfferHistoryUpdater(scraper)
    updater.update()
    return True


async def putCatalogue():
    scraper = CatalogueScraper()
    updater = CourseInfoUpdater(scraper)
    updater.update()
    return True
