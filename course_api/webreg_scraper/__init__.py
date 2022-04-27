import requests
from bs4 import BeautifulSoup
from pydantic import BaseModel
import re

class WebRegScraper:
    def scrap_offered_courses(page_content: str) -> [dict]:
        # Can be parsed either using html.parser or lxml.
        soup  = BeautifulSoup(page_content,"html.parser")
        # Check the school
        find_title = soup.findAll('tr',attrs = {'class':'college-title'})
        # Check if there is any search
        if(find_title == []):
            return
        college_title = find_title[0].find('td').text
        # The department name
        dept_title = soup.findAll('tr',attrs = {'class':'dept-title'})[0].find('td').text
        # List of all the courses in html form.
        courses = soup.findAll('td',attrs = {'class':'CourseTitle'})
        # Check the current term 
        current_term = soup.findAll('h3')[2].text.replace('Quarter, ','')

        # Create a list of dictionaries
        # Each dictionary is a course information and data
        course_list = list()
        
        # Iterate through the course list and obtain class code and name.
        for course in courses:
            # Remove escape sequences (\n ,\t,\xa0) from obtaied text
            regex = re.compile(r'[\n\r\t]')
            text = course.text
            text = regex.sub("",text).split(' \xa0 ')

            # Key = Course Information Header
            # Value = Corresponding Course Data
            course_info = {}  
            course_info["dept_code"] = text[0].replace('\xa0 ','')
            course_info["num"]=text[1]
            course_info["dept"] = dept_title
            course_info["course_title"] = course.find('b').text
            course_info["offer_history"] = list()
            course_info["offer_history"].append(current_term)

            # Append dictionary to list
            course_list.append(course_info)
        
        return course_list