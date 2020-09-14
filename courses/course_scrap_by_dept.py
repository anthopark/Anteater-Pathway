import requests
from bs4 import BeautifulSoup
from unidecode import unidecode
from pathlib import Path
from datetime import date
import csv
import re

CSV_HEADERS = [
    'department',
    'number',
    'title',
    'unit',
    'description',
    'prerequisite',
    'restriction',
    'same as',
    'overlaps with',
    'concurrent with',
    'grading option',
    'repeatability',
    'corequisite',
    'prerequisite or corequisite'
]

EXTRA_DESCRIPTIONS = [
    'Prerequisite:',
    'Restriction:',
    'Same as',
    'Overlaps with',
    'Concurrent with',
    'Grading Option:',
    'Repeatability:',
    'Corequisite:',
    'Prerequisite or corequisite:'
]

DATA_SAVE_DIR = Path(f'./course-data-by-dept-{str(date.today())}/')
DATA_SAVE_DIR.mkdir(parents=True, exist_ok=True)

def break_title_line(title_line: str)-> ('dept', 'number', 'title', 'unit'):
    title_line = unidecode(title_line)
    line_parsed = [token.strip() for token in title_line.split('.') if token.strip() != '']

    dept = ' '.join(line_parsed[0].split(' ')[:-1])
    num = line_parsed[0].split(' ')[-1]
    title = line_parsed[1]
    unit = line_parsed[-1].split(' ')[0]

    return dept, num, title, unit

def extract_desc(descriptions: ['p tag']) -> str:
    return unidecode(descriptions[0].text.strip())

def handle_not_separated_by_p_tag_issue(descriptions: ['p tag']) -> [str]:
    result = []
    for desc in descriptions:
        if desc.find('br'):
            corrected = [fix.strip() for fix in unidecode(desc.text).split('\n') if fix != '']
            for fix in corrected:
                result.append(fix)
        else:
            result.append(unidecode(desc.text).strip())
    return result


def extract_extra_desc(descriptions: [str], target_info: str) -> str:
    for desc in descriptions:
        if desc.startswith(target_info):
            return desc.split(target_info)[1].strip()
    return ""



def build_dept_url_dict() -> {str: str}:

    result = {}

    base_url = 'http://catalogue.uci.edu'
    page = requests.get('http://catalogue.uci.edu/allcourses/')
    assert page.status_code == 200

    soup = BeautifulSoup(page.content, 'html.parser')
    all_dept = soup.select('div#atozindex ul li a')

    for dept in all_dept:
        result[unidecode(dept.text).strip()] = base_url + dept['href']
    
    return result



if __name__ == "__main__":
    dept_url_dict = build_dept_url_dict()

    for dept, url in dept_url_dict.items():

        page = requests.get(url)
        assert page.status_code == 200

        soup = BeautifulSoup(page.content, 'html.parser')
        course_divs = soup.find_all('div', class_='courseblock')

        dept = dept.replace('/', '-')
        with open(DATA_SAVE_DIR / f'{dept}-courses.csv', 'w') as write_file:
            csv_writer = csv.writer(write_file, delimiter=',')
            csv_writer.writerow(CSV_HEADERS)

            for course_div in course_divs:
                title_line = course_div.select('p.courseblocktitle strong')[0].text
                course_data = list(break_title_line(title_line))

                descriptions = course_div.select('div.courseblockdesc p')
                course_data.append(extract_desc(descriptions))
                
                descriptions = handle_not_separated_by_p_tag_issue(descriptions[1:])

                for extra_desc in EXTRA_DESCRIPTIONS:
                    course_data.append(extract_extra_desc(descriptions, extra_desc))
                
                csv_writer.writerow(course_data)


