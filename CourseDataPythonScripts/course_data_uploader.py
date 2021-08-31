from mongoengine import *
from pathlib import Path
import csv
from dotenv import load_dotenv
import os

COURSE_DATA_DIR = Path('./course-data-2021-08-26/')

load_dotenv('mongodb.env')

class Course(Document):
    dept = StringField(required=True, max_length=50)
    num = StringField(required=True, max_length=10)
    title = StringField(required=True, max_length=200)
    unit = StringField(required=True, max_length=20)
    desc = StringField(require=True, max_length=1000)
    ge = StringField(max_length=30)
    prerequisite = StringField(max_length=1000)
    restriction = StringField(max_length=1000)
    sameAs = StringField(max_length=1000)
    overlapsWith = StringField(max_length=1000)
    concurrentWith = StringField(max_length=1000)
    gradingOption = StringField(max_length=1000)
    repeatability = StringField(max_length=1000)
    corequisite = StringField(max_length=1000)
    preOrCorequisite = StringField(max_length=1500)
    v = IntField(db_field='__v')
    meta={'collection': 'courses'}


db = connect(os.environ.get('DB_NAME'), host=os.environ.get('MONGODB_URI'))

if __name__ == "__main__":

    for data_file in COURSE_DATA_DIR.iterdir():
        if not data_file.name.endswith('.csv'):
            continue
        with open(data_file, 'r') as read_file:
            csv_reader = csv.DictReader(read_file)
            for row in csv_reader:
                course = Course(dept=row['department'].strip(),
                                num=row['number'].strip(),
                                title=row['title'].strip(),
                                desc=row['description'].strip(),
                                unit=row['unit'].strip())
                
                if row['ge']:
                    course.ge = row['ge'].strip()
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

    
