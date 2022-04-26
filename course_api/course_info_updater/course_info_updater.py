from mongodb.models import Department
from mongodb.models import Course


class CourseInfoUpdater:
    def __init__(self, scraper: CatalogueScraper):
        self._scraper = scraper

    def update(self):
        pass
