import { axiosClient } from './client';

const baseRouterUrl = '/planner/course';

const endpoints = {
  allDepartments: `${baseRouterUrl}/all-departments`,
};

export const getAllDepartments = async (): Promise<
  ResponseModel.Department[]
> => {
  const response = await axiosClient.get(endpoints.allDepartments);
  return response.data;
};
