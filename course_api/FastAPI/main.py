from FastAPI.database import (
    getCourseDept,
    getSpecificCourse,
    getAllDepartment,
    putCourseHistory,
    putCatalogue
)
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from FastAPI.model import Course
from FastAPI.model import Department
app = FastAPI()


origins = ['https://localhost:3000/']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=[""],
    allow_headers=[""],
)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.get("/api/course/{dept}", response_model=list[Course])
async def getCourse(dept: str):
    response = await getCourseDept(dept)
    if response:
        return response
    raise HTTPException(404, "No course available")


@app.get("/api/course/{dept}/{num}", response_model=Course)
async def getCourse(dept: str, num: str):
    response = await getSpecificCourse(dept, num)
    if response:
        return response
    raise HTTPException(404, "No course available")


@app.get("/api/department", response_model=list[Department])
async def getDepartment():
    response = await getAllDepartment()
    if response:
        return response
    raise HTTPException(404, "No department available")


@app.put("/api/course/updateHistory")
async def updateCourseHistory():
    response = await putCourseHistory()
    if response:
        return response
    raise HTTPException(
        500, f"There is a runtime issue at serverside")


@app.put("/api/course/updateCatalogue")
async def updateCatalogue():
    response = await putCatalogue()
    if response:
        return response
    raise HTTPException(
        500, f"There is a runtime issue at serverside")
