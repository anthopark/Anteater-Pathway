import { axiosClient } from './client';

const baseRouterUrl = '/planner/course';

const endpoints = {
  allDepartments: `${baseRouterUrl}/all-departments`,
  allDepartmentCourses: baseRouterUrl,
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
  return response.data;
};

export const getAllCourseAttributes = async (): Promise<
  ResponseModel.CourseAttribute[]
> => {
  const response = await axiosClient.get(endpoints.allCourseAttributes);
  return response.data;
};
