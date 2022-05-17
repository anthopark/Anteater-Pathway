from mongoengine import connect, Document, StringField, IntField, BooleanField, ListField
from dotenv import load_dotenv
import os

load_dotenv()

connect(host=os.environ["CONNECTION_STRING"])


class Department(Document):
    name = StringField(max_length=100, required=True, unique=True)
    code = StringField(max_length=10, required=True, unique=True)

    meta = {"collection": "departments"}


class Course(Document):
    dept_code = StringField(required=True)
    num = StringField(required=True)
    title = StringField(required=True)
    unit = IntField(required=True)
    desc = StringField()
    is_custom_unit = BooleanField(required=True, default=False)
    custom_min_unit = IntField()
    custom_max_unit = IntField()
    ge = StringField()
    prereq = StringField()
    coreq = StringField()
    prereq_or_coreq = StringField()
    concurrent_with = StringField()
    overlaps_with = StringField()
    same_as = StringField()
    gr_option = StringField()
    repeatability = StringField()
    restriction = StringField()
    offered_terms = ListField(StringField())

    meta = {"collection": "courses"}
