from mongodb.models import Course, MONGO_CONNECTION_STRING
from webreg_scraper.webreg_scraper import WebRegScraper
import pymongo


class OfferHistoryUpdater:
    def __init__(self, scraper: WebRegScraper):
        self._scraper = scraper

    def update(self):
        # use the scraper to get offer history data and use MongoDB Models(Mongoengine) to save/update to the backend DB
        # Only updates the history with the most recent quarter from webreg
        html_pages = self._scraper.retrieve_pages()
        course_list = []
        # Scrap all the pages that was retrieved for courses information
        for page in html_pages:
            courses_in_page = self._scraper.scrap_offered_courses(page)
            if(courses_in_page):
                course_list.extend(courses_in_page)

        # Connect to database
        client = pymongo.MongoClient(MONGO_CONNECTION_STRING)
        mydatabase = client["AnteaterPathwayDB"]
        coursesDB = mydatabase['courses']

        # Utilize departments and courses that are already in the DB
        for course_offered in course_list:
            # DB update: only existing course document should be updated
            # If an offered course is not found in DB, just ignore.

            # Find the courses offered in current term in the DB
            courses = coursesDB.find(
                {'dept_code': course_offered["dept_code"], 'num': course_offered["num"]})

            # # Find the corresponding course
            # correct_course = False
            # for course in courses:
            #     if course["title"].lower() == course_offered["course_title"].lower():
            #         print("course found")
            #         correct_course = True
            #         break
            # # No corresponding courses
            # if not correct_course:
            #     continue

            # Check all the current offered course and update database accordingly.
            for course in courses:
                # Retrieve the history of the course and check if current term is in it
                offer_history = course["offered_terms"]
                current_term = course_offered["term"]
                abbreviated_term = current_term[-4:]+"-"+current_term[:2]
                if abbreviated_term not in offer_history:
                    # Insert current term to the top of the list and update DB
                    offer_history.insert(0, abbreviated_term)
                    coursesDB.update_one({'dept_code': course_offered["dept_code"], 'num': course_offered["num"]}, {
                        "$set": {"offered_terms": offer_history}})
                    # #To check if course is successfully updated.
                    # x = coursesDB.find(
                    #     {'dept_code': course_offered["dept_code"], 'num': course_offered["num"]})
                    # for data in x:
                    #     print(data)
                    print("updated a course")
                else:
                    print("Current Term Exists on the DB!")
        print("successfully updated database")


y = WebRegScraper()
x = OfferHistoryUpdater(y)

x.update()
