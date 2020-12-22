import pymongo
from pathlib import Path
from collections import defaultdict
import csv
from dotenv import load_dotenv
from pprint import pprint
import os

load_dotenv('./.env')
past_offering_data_dir = Path('./course-offering-data-2020-12-21/')

csv_files = [csv_file for csv_file in past_offering_data_dir.iterdir()
             if csv_file.name.endswith('.csv')]

# Extra character for ordering.
# In the same year, 2020, Winter 2020 is the oldest and Fall 2020 is the most recent
TERM_NAME_DICT = {
    'Summer Session 2': 'dSummer II',
    'Summer Session 1': 'cSummer I',
    '10 wk Summer': 'eSummer 10-WK',
    'Winter Quarter': 'aWinter',
    'Fall Quarter': 'fFall',
    'Spring Quarter': 'bSpring'
}


def construct_course_termlist_dict() -> {str: [str]}:
    """
    Construct a mapping from course to its offered terms.
    The offered terms is in decreasing order (most recent terms comes first)
    """
    course_termlist_dict = defaultdict(list)

    _read_in_from_csv_files(course_termlist_dict)
    _sort_terms_in_decreasing_order(course_termlist_dict)

    return course_termlist_dict


def _read_in_from_csv_files(course_termlist_dict: defaultdict):
    """
    Construct an inverted mapping, course - list of terms the course had offered
    """
    for csv_file in csv_files:
        # quarter : list - later sorted
        year = csv_file.name.split('-')[0]
        term = " ".join(csv_file.name.split('-')[1:-1])

        with open(csv_file, 'r') as read_file:
            csv_reader = csv.reader(read_file)

            # skip the first heading row
            next(csv_reader)
            for row in csv_reader:
                course_termlist_dict[f'{row[0]}-{row[1]}'].append(
                    f'{year}-{TERM_NAME_DICT[term]}')


def _sort_terms_in_decreasing_order(course_termlist_dict: defaultdict):
    """
    Sort the terms in Decreasing Order
    i.e., in 2020, fall 2020 is more recent than summer 2019.
    """

    def convert_term(term):
        """
        convert '2021-fFall' to '2021 Fall'
        """
        return f"{term.split('-')[0]} {'-'.join(term.split('-')[1:])[1:]}"

    # Sort the terms in decreasing order
    for course, term_list in course_termlist_dict.items():
        term_list.sort(reverse=True)

    # Map the term into normal text
    # i.e., 2021-aWinter -> 2021 Winter
    for course, term_list in course_termlist_dict.items():
        course_termlist_dict[course] = list(map(convert_term, term_list))


if __name__ == "__main__":

    client = pymongo.MongoClient(os.environ.get('ATLAS_URI_PYMONGO'))
    db = client[os.environ.get('DB_NAME')]
    course_collection = db['courses']



    # {'COMPSCI-141': ['2021 Winter', '2020 Fall', '2020 Summer I', ...]}
    course_termlist_dict = construct_course_termlist_dict()

    print('Testing Log')
    print('COMPSCI-161:', course_termlist_dict['COMPSCI-161'])
    print('COMPSCI-141:', course_termlist_dict['COMPSCI-141'])


    # Updating the existing course documents, by adding a new field "prevQuarters"
    for course, termlist in course_termlist_dict.items():
        dept = course.split('-')[0]
        num = course.split('-')[1]
        print(f"Dept: {dept}, Num: {num}...")
        course_collection.find_one_and_update(
            {'dept': dept, 'num': num}, {'$set': {'prevQuarters': termlist}})




