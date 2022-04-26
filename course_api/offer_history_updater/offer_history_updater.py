from mongodb.models import Course


class OfferHistoryUpdater:
    def __init__(self, scraper: WebRegScraper):
        self._scraper = scraper

    def update(self):
        pass
