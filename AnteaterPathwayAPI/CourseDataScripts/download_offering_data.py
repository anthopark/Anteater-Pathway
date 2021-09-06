from os import sched_getscheduler
from selenium import webdriver
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
from bs4 import BeautifulSoup
from unidecode import unidecode
import requests
from pathlib import Path
from datetime import date
import csv
import re
import time
import random


DATA_SAVE_DIR = Path(f'./course-offering-data/')
DATA_SAVE_DIR.mkdir(parents=True, exist_ok=True)


def get_all_dept() -> [str]:
    '''
    returns a list containing all dept from catalogue page
    ['AC ENG', 'AFAM', ...]
    '''
    catalogue_allcourses_page = requests.get(
        'http://catalogue.uci.edu/allcourses/')
    assert catalogue_allcourses_page.status_code == 200

    soup = BeautifulSoup(catalogue_allcourses_page.content, 'html.parser')
    a_tags = soup.select('div#atozindex ul li a')

    return [a_tag.text.split('(')[-1].strip(' )') for a_tag in a_tags]


def get_recent_term() -> str:
    '''
    returns the most recent term from web reg schedule of page
    '2021 Fall Quarter'
    '''
    
    schedule_of_classes_page = requests.get('https://www.reg.uci.edu/perl/WebSoc')
    assert schedule_of_classes_page.status_code == 200
    
    soup = BeautifulSoup(schedule_of_classes_page.content, 'html.parser')
    recent_term = unidecode(soup.find('select', {'name': 'YearTerm'}).find('option', {'selected': 'selected'}).text)
    
    return recent_term.replace('  ', ' ')
    
    
    
    

if __name__ == "__main__":

    DEPTS = get_all_dept()
    options = webdriver.ChromeOptions()
    options.headless = True
    driver = webdriver.Chrome("/usr/local/bin/chromedriver", options=options)
    
    
    driver.get('https://www.reg.uci.edu/perl/WebSoc')


    with open(DATA_SAVE_DIR / f'{"-".join(get_recent_term().split(" "))}-offerings.csv', 'w') as write_file:
        csv_writer = csv.writer(write_file)
        csv_writer.writerow(['dept', 'num'])

        for dept in DEPTS:
            
            try:
                selectDept = Select(driver.find_element_by_name('Dept'))
                selectDept.select_by_value(dept)
            except NoSuchElementException:
                print(f"!!Couldn't find {dept} in Department Name")
                continue

            driver.find_element_by_name("Submit").click()
            print(f'{dept} page!')
            soup = BeautifulSoup(driver.page_source, 'html.parser')
            course_titles = [unidecode(tr.text).strip() for tr in soup.select(
                'div.course-list table tbody tr td.CourseTitle')]
            
            dept_num_list = [ title.split('     ')[0] for title in course_titles ]
            dept_num_set = set([ (dept_num.split('   ')[0].upper(), dept_num.split('   ')[1].upper())for dept_num in dept_num_list ])
            print(dept_num_list)

            for dept, num in dept_num_set:
                csv_writer.writerow([dept, num])

            driver.execute_script("window.history.go(-1)")
            time.sleep(random.randint(3, 8))