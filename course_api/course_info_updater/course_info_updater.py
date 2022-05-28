
from mongodb.models import Department, Course
from course_info_updater.catalogue_scrapper.catalogue_scrapper import CatalogueScraper
from bs4 import BeautifulSoup
import requests
import urllib.request as urllib2
import re


class CourseInfoUpdater:

    def __init__(self, scraper: CatalogueScraper):
        self._scraper = scraper

    def update(self):
        URL = "https://catalogue.uci.edu/allcourses/"
        r = requests.get(URL)

        soup = BeautifulSoup(r.content, 'html.parser')

        quotes = []  # a list to store link

        dept_Name = []
        dept_Code = []

        table = soup.find('div', attrs={'id': 'atozindex'})

        for row in table.findAll('li'):
            deptName = row.a.text
            temp = re.sub(r"\([^()]*\)", "", deptName)
            dept_Name.append(temp)
            deptCode = re.findall(r'\(.*?\)', deptName)
            deptCode = deptCode[0].replace("(", "").replace(")", "")
            dept_Code.append(deptCode)
            quotes.append(row.a['href'])

        for i in range(len(dept_Name)):
            Department(name=dept_Name[i], code=dept_Code[i]).save()

        courseLink = []

        for link in quotes:
            courseLink.append('https://catalogue.uci.edu/'+link)
        coursePage = []

        for link in courseLink:
            URL = link
            response = urllib2.urlopen(URL)
            html = response.read()
            coursePage.append(html.decode("utf-8"))

        for k, v in enumerate(coursePage):
            courses = self._scraper.scrap_course_items(v)
            for i in range(len(courses)):
                Course(
                    dept_code=courses[i]['dept_code'],
                    num=courses[i]['num'],
                    title=courses[i]['title'],
                    unit=courses[i]['unit'],
                    desc=courses[i]['desc'],
                    is_custom_unit=courses[i]['is_custom_unit'],
                    custom_min_unit=courses[i]['custom_min_unit'],
                    custom_max_unit=courses[i]['custom_max_unit'],
                    ge=courses[i]['ge'],
                    prereq=courses[i]['prereq'],
                    coreq=courses[i]['coreq'],
                    concurrent_with=courses[i]['concurrent'],
                    overlaps_with=courses[i]['overlaps_with'],
                    same_as=courses[i]['same_as'],
                    gr_option=courses[i]['gr_option'],
                    repeatability=courses[i]['repeatability'],
                    restriction=courses[i]['restriction']
                    >> >>>> > 5-1--implement-web-api
                ).save()
