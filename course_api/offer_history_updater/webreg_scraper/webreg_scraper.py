import requests
from bs4 import BeautifulSoup
import re
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.options import Options


class WebRegScraper:
    def scrap_offered_courses(self, page_content: str) -> [dict]:
        # Can be parsed either using html.parser or lxml.
        soup = BeautifulSoup(page_content, "html.parser")
        # Check the school
        find_title = soup.findAll('tr', attrs={'class': 'college-title'})
        # Check if there is any result
        if(find_title == []):
            return
        college_title = find_title[0].find('td').text
        # The department name
        dept_title = soup.findAll(
            'tr', attrs={'class': 'dept-title'})[0].find('td').text
        # List of all the courses in html form.
        courses = soup.findAll('td', attrs={'class': 'CourseTitle'})
        # Check the current term
        current_term = soup.findAll('h3')[2].text.replace('Quarter, ', '')

        # Create a list of dictionaries
        # Each dictionary is a course information and data
        course_list = list()

        # Iterate through the course list and obtain class code and name.
        for course in courses:
            # Remove escape sequences (\n ,\t,\xa0) from obtaied text
            regex = re.compile(r'[\n\r\t]')
            text = course.text
            text = regex.sub("", text).split(' \xa0 ')

            # Key = Course Information Header
            # Value = Corresponding Course Data
            course_info = {}
            course_info["dept_code"] = text[0].replace('\xa0 ', '').upper()
            course_info["num"] = text[1]
            course_info["dept"] = dept_title
            course_info["course_title"] = course.find('b').text
            course_info["term"] = current_term.lower()

            # Append dictionary to list
            course_list.append(course_info)

        return course_list

    def retrieve_pages(self):
        # Scrape Webreg using requests and BeautifulSoup
        WEBREG_URL = "https://www.reg.uci.edu/perl/WebSoc"
        page = requests.get(WEBREG_URL)
        soup = BeautifulSoup(page.content, "html.parser")

        # Retrieve datas from the url
        # Source : https://stackoverflow.com/questions/31511333/parsing-all-options-under-select-in-beautifulsoup

        # Retrieve Terms
        term_options = soup.findAll('select', attrs={'name': 'YearTerm'})[
            0].findAll("option")
        terms_value = [t["value"] for t in term_options]
        terms_string = [t.text for t in term_options]

        # # Retrieve General Education
        # general_education_options = soup.findAll('select', attrs={'name': 'Breadth'})[
        #     0].findAll("option")
        # ge_value = [ge["value"] for ge in general_education_options]
        # ge_string = [ge.text for ge in general_education_options]

        # Retrieve Departments
        department_options = soup.findAll('select', attrs={'name': 'Dept'})[
            0].findAll("option")
        department_value = [department["value"]
                            for department in department_options]
        department_value.remove(department_value[0])
        department_string = [
            department.text for department in department_options]
        department_string.remove(department_string[0])

        # Selenium Automation Headless
        html_list = list()
        options = Options()
        options.headless = True
        driver = webdriver.Chrome(
            options=options, executable_path=r'./chromedriver.exe')
        # for terms in terms_value:
        # Use selenium to direct to the search page
        # Select the most recent term
        driver.get("https://www.reg.uci.edu/perl/WebSoc")
        drpTerm = Select(driver.find_element_by_name('YearTerm'))
        drpTerm.select_by_value(terms_value[0])
        # Get all the pages for different departments
        for department in department_value:
            drpDept = Select(driver.find_element_by_name('Dept'))
            drpDept.select_by_value(department)
            driver.find_element_by_xpath(
                "/html/body/form/p[1]/input[1]").click()
            # html_list.append(driver.page_source)
            html_list.append(driver.page_source)
            driver.get("https://www.reg.uci.edu/perl/WebSoc")
            print("retrieved current page")
        driver.quit()
        print("successfully retrieved all pages")
        return html_list
