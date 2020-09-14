import requests
from bs4 import BeautifulSoup
from unidecode import unidecode
from pathlib import Path
from datetime import date
import csv

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

SCHOOL_CATALOGUE_URLS = {
    'Claire Trevor School of the Arts': 'http://catalogue.uci.edu/clairetrevorschoolofthearts/#courseinventory',
    'School of Biological Sciences': 'http://catalogue.uci.edu/schoolofbiologicalsciences/#courseinventory',
    'The Paul Merage School of Business': 'http://catalogue.uci.edu/thepaulmerageschoolofbusiness/#courseinventory',
    'School of Education': 'http://catalogue.uci.edu/schoolofeducation/#courseinventory',
    'The Henry Samueli School of Engineering': 'http://catalogue.uci.edu/thehenrysamuelischoolofengineering/',
    'School of Humanities': 'http://catalogue.uci.edu/schoolofhumanities/#courseinventory',
    'Donald Bren School of Information and Computer Sciences': 'http://catalogue.uci.edu/donaldbrenschoolofinformationandcomputersciences/#courseinventory',
    'Sue and Bill Gross School of Nursing': 'http://catalogue.uci.edu/sueandbillgrossschoolofnursing/#courseinventory',
    'Department of Pharmaceutical Sciences': 'http://catalogue.uci.edu/departmentofpharmaceuticalsciences/#courseinventory',
    'School of Physical Sciences': 'http://catalogue.uci.edu/schoolofphysicalsciences/#courseinventory',
    'Program in Public Health': 'http://catalogue.uci.edu/programinpublichealth/#courseinventory',
    'School of Social Ecology': 'http://catalogue.uci.edu/schoolofsocialecology/#courseinventory',
    'School of Social Sciences': 'http://catalogue.uci.edu/schoolofsocialsciences/#courseinventory'
}

DATA_SAVE_DIR = Path(f'./course-data-by-school-{str(date.today())}/')
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



for school, url in SCHOOL_CATALOGUE_URLS.items():

    page = requests.get(url)
    assert page.status_code == 200

    soup = BeautifulSoup(page.content, 'html.parser')
    course_divs = soup.find_all('div', class_='courseblock')


    with open(DATA_SAVE_DIR / f'{"-".join(school.split("of ")[-1].strip().split(" "))}-courses.csv', 'w') as write_file:
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




