import axios from "axios";

const plannerApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_PLANNER_API_BASE_URL}/api/planner`,
});

export const saveEntirePlanner = async (appUser) => {
  const payLoad = {
    uID: appUser.uid,
    tentativeCourseItemsLeft: mapCourseItems(
      appUser.tentativePlanner.leftCourseItems
    ),
    tentativeCourseItemsRight: mapCourseItems(
      appUser.tentativePlanner.rightCourseItems
    ),
    mainPlanner: mapPlanner(appUser.planner),
  };

  const response = await plannerApi.patch("/save/entire", payLoad, {
    headers: {
      Authorization: `Bearer ${appUser.accessToken}`,
    },
  });

  return response;
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
