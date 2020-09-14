from mongoengine import *
from pathlib import Path
import csv
from dotenv import load_dotenv
import os

load_dotenv('./.env')
course_data_dir = Path('./course-data-by-dept-2020-09-09/')

SCHOOL_DEPT = {
    'Claire Trevor School of the Arts': set(['ARTS', 'ART', 'DANCE', 'DRAMA', 'MUSIC']),
    'School of Biological Sciences': set(['BIO SCI', 'DEV BIO', 'ECO EVO', 'MOL BIO', 'NEURBIO']),
    'The Paul Merage School of Business': set(['MPAC', 'BANA', 'MGMT EP', 'MGMT FE', 'MGMT HC', 'INNO', 'MGMTMBA', 'MGMTPHD', 'MGMT']),
    'School of Education': set(['EDUC']),
    'The Henry Samueli School of Engineering': set(['BME', 'CBE', 'ENGRCEE', 'CSE', 'EECS', 'ENGR', 'MSE', 'ENGRMAE']),
    'School of Humanities': set(['AC ENG', 'AFAM', 'ARABIC', 'ARMN', 'ART HIS', 'ASIANAM', 'CHINESE', 'CLASSIC', 'COM LIT', 'CRITISM', 'CLT&THY', 'EAS', 'ENGLISH', 'EURO ST', 'FLM&MDA', 'FRENCH', 'GEN&SEX', 'GERMAN', 'GLBLCLT', 'GLBL ME', 'GREEK', 'HEBREW', 'HUMAN', 'IRAN', 'ITALIAN', 'JAPANSE', 'KOREAN', 'LATIN', 'LIT JRN', 'MED HUM', 'PERSIAN', 'PHILOS', 'REL STD', 'RUSSIAN', 'SPANISH', 'VIETMSE', 'WRITING']),
    'Donald Bren School of Information and Computer Sciences': set(['COMPSCI', 'IN4MATX', 'I&C SCI', 'SWE', 'STATS']),
    'Sue and Bill Gross School of Nursing': set(['NUR SCI']),
    'Department of Pharmaceutical Sciences': set(['PHARM', 'PHRMSCI']),
    'School of Physical Sciences': set(['CHEM', 'EARTHSS', 'MATH', 'PHY SCI', 'PHYSICS']),
    'Program in Public Health': set(['PUBHLTH']),
    'School of Social Ecology': set(['CRM/LAW', 'PP&D', 'PSCI', 'PUB POL', 'SOCECOL', 'UPPP']),
    'School of Social Sciences': set(['ANTHRO', 'CHC/LAT', 'COGS', 'ECON', 'INTL ST', 'LINGUIS', 'LPS', 'POL SCI', 'PSYCH', 'SOC SCI', 'SOCIOL'])
}


class Course(Document):
    school = StringField(max_length=100)
    dept = StringField(required=True, max_length=50)
    num = StringField(required=True, max_length=10)
    title = StringField(required=True, max_length=200)
    unit = StringField(required=True, max_length=20)
    level = StringField(required=True, max_length=20)
    desc = StringField(require=True, max_length=1000)
    prerequisite = StringField(max_length=1000)
    restriction = StringField(max_length=1000)
    sameAs = StringField(max_length=1000)
    overlapsWith = StringField(max_length=1000)
    concurrentWith = StringField(max_length=1000)
    gradingOption = StringField(max_length=1000)
    repeatability = StringField(max_length=1000)
    corequisite = StringField(max_length=1000)
    preOrCorequisite = StringField(max_length=1500)


db = connect(os.environ.get('DB_NAME'), host=os.environ.get('ATLAS_URI'))


def get_school(dept):
    for school_name, department_set in SCHOOL_DEPT.items():
        if dept in department_set:
            return school_name
    return ''


def determine_level(course_num) -> str:
    result = ''
    for ch in course_num:
        if ch.isdigit():
            result += ch

    if 1 <= int(result) <= 99:
        return 'Lower Division'
    elif 100 <= int(result) <= 199:
        return 'Upper Division'
    elif 200 <= int(result) <= 299:
        return 'Graduate'
    else:
        return 'Other'


if __name__ == "__main__":

    for data_file in course_data_dir.iterdir():
        if not data_file.name.endswith('.csv'):
            continue
        with open(data_file, 'r') as read_file:
            csv_reader = csv.DictReader(read_file)
            for row in csv_reader:
                course = Course(dept=row['department'].strip(),
                                num=row['number'].strip(),
                                title=row['title'].strip(),
                                desc=row['description'].strip(),
                                unit=row['unit'].strip(),
                                level=determine_level(row['number']).strip())
                
                school = get_school(row['department'].strip())
                if school:
                    course.school = school
                if row['prerequisite']:
                    course.prerequisite = row['prerequisite'].strip()
                if row['restriction']:
                    course.restriction = row['restriction'].strip()
                if row['same as']:
                    course.sameAs = row['same as'].strip()
                if row['overlaps with']:
                    course.overlapsWith = row['overlaps with'].strip()
                if row['concurrent with']:
                    course.concurrentWith = row['concurrent with'].strip()
                if row['grading option']:
                    course.gradingOption = row['grading option'].strip()
                if row['repeatability']:
                    course.repeatability = row['repeatability'].strip()
                if row['corequisite']:
                    course.corequisite = row['corequisite'].strip()
                if row['prerequisite or corequisite']:
                    course.preOrCorequisite = row['prerequisite or corequisite'].strip(
                    )

                try:
                    course.save()
                except:
                    print(row)
                    raise
