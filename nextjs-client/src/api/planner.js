import axios from "axios";

const plannerApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_PLANNER_API_BASE_URL}/api/planner`,
});

export const saveEntirePlanner = async (appUser) => {
  const payLoad = {
    uID: appUser.uid,
    tentativeLeft: mapCourseItems(appUser.tentativePlanner.leftCourseItems),
    tentativeRight: mapCourseItems(appUser.tentativePlanner.rightCourseItems),
    mainPlanner: mapPlanner(appUser.planner),
  };

  const response = await plannerApi.patch("/save/entire", payLoad, {
    headers: {
      Authorization: `Bearer ${appUser.accessToken}`,
    },
  });

  return response;
};

export const loadEntirePlanner = async (appUser) => {
  const response = await plannerApi.get(`/load/entire/${appUser.uid}`, {
    headers: {
      Authorization: `Bearer ${appUser.accessToken}`,
    },
  });

  return response.data;
};

const mapPlanner = (planner) => {
  return planner.academicYears.map((academicYear) => ({
    year: academicYear.year,
    quarters: academicYear.quarters.map((quarter) => ({
      year: quarter.year,
      season: quarter.season,
      courseItems: mapCourseItems(quarter.plannedCourses),
    })),
  }));
};

const mapCourseItems = (courseItems) => {
  return courseItems.map((courseItem) => ({
    courseId: courseItem.id,
    departmentCode: courseItem.departmentCode,
    number: courseItem.number,
    unit: courseItem.unit,
    title: courseItem.title,
    isCustomCreated: courseItem.isCustomCreated,
    isCustomUnit: courseItem.isCustomUnit,
    customMinUnit: courseItem.customMinUnit,
    customMaxUnit: courseItem.customMaxUnit,
    color: courseItem.color,
  }));
};
