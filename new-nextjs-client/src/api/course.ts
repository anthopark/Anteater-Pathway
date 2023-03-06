import { axiosClient } from './client';

const baseRouterUrl = '/planner/course';

const endpoints = {
  allDepartments: `${baseRouterUrl}/all-departments`,
  allDepartmentCourses: `${baseRouterUrl}/department`,
  allCourseAttributes: `${baseRouterUrl}/all-attributes`,
};

export const getAllDepartments = async (): Promise<
  ResponseModel.Department[]
> => {
  const response = await axiosClient.get(endpoints.allDepartments);
  return response.data;
};

export const getAllDepartmentCourses = async (
  deptCode: string
): Promise<ResponseModel.Course[]> => {
  const response = await axiosClient.get(
    `${endpoints.allDepartmentCourses}/${encodeURIComponent(deptCode)}`
  );
  const sortedData = response.data.sort(
    (a: ResponseModel.Course, b: ResponseModel.Course) => {
      return a.num.localeCompare(b.num, undefined, {
        numeric: true,
        sensitivity: 'base',
      });
    }
  );

  return sortedData;
};

export const getAllCourseAttributes = async (): Promise<
  ResponseModel.CourseAttribute[]
> => {
  const response = await axiosClient.get(endpoints.allCourseAttributes);
  return response.data;
};
