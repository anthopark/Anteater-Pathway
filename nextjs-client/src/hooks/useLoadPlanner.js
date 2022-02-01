import { useGlobalObjects } from "@components/GlobalContextProvider";
import { loadEntirePlanner } from "src/api/planner";
import { useToastBox } from "./useToastBox";
import { Course } from "src/entities/course";
import { Planner } from "src/entities/planner";
import { AcademicYear } from "src/entities/academic-year";

export const useLoadPlanner = () => {
  const { updateAppUser } = useGlobalObjects();
  const { showToastBox } = useToastBox();

  const loadPlannerFromBackend = (appUser) => {
    if (appUser.isAuthenticated) {
      loadEntirePlanner(appUser)
        .then((result) => {
          console.log(result);
          unpackResultToAppUser(result, appUser);
          updateAppUser(appUser);
          showToastBox({
            status: "success",
            dataOfInterest: [],
            message: "Planner data is loaded",
          });
        })
        .catch(() => {
          showToastBox({
            status: "failure",
            dataOfInterest: ["SERVER ERROR"],
            message: "Failed to load planner",
          });
        });
    }
  };

  return { loadPlannerFromBackend };
};

const unpackResultToAppUser = (result, appUser) => {
  appUser.tentativePlanner.leftCourseItems = unpackCourseItems(
    result.tentativeLeft
  );
  appUser.tentativePlanner.rightCourseItems = unpackCourseItems(
    result.tentativeRight
  );

  appUser.planner = unpackMainPlanner(result.mainPlanner);
};

const unpackMainPlanner = (mainPlanner) => {
  const planner = new Planner();

  planner.academicYears = mainPlanner.map((backendAcademicYear) => {
    const academicYear = new AcademicYear(backendAcademicYear.year);
    backendAcademicYear.quarters.forEach((backendQuarter, index) => {
      academicYear.quarters[index].plannedCourses = unpackCourseItems(
        backendQuarter.courseItems
      );
    });

    return academicYear;
  });

  return planner;
};

const unpackCourseItems = (backendCourseItems) => {
  return backendCourseItems.map((backendCourseItem) => {
    const courseItem = new Course(backendCourseItem);

    courseItem.id = backendCourseItem.courseId;
    courseItem.isCustomCreated = backendCourseItem.isCustomCreated;
    courseItem.isCustomUnit = backendCourseItem.isCustomUnit;
    courseItem.customMinUnit = backendCourseItem.customMinUnit;
    courseItem.customMaxUnit = backendCourseItem.customMaxUnit;
    courseItem.color = backendCourseItem.color;

    return courseItem;
  });
};
