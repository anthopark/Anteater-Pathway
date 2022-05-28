from pydantic import BaseModel
from typing import Optional, List


class Course(BaseModel):
    dept_code: str
    num: str
    title: str
    unit: int
    desc: str
    is_custom_unit: bool
    custom_min_unit: Optional[int]
    custom_max_unit: Optional[int]
    ge: Optional[str]
    prereq: Optional[str]
    coreq: Optional[str]
    prereq_or_coreq: Optional[str]
    concurrent_with: Optional[str]
    overlaps_with: Optional[str]
    same_as: Optional[str]
    gr_option: Optional[str]
    repeatability: Optional[str]
    restriction: Optional[str]
    offered_terms: List[str] = []


class Department(BaseModel):
    name: str
    code: str