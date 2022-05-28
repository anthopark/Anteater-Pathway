import axios from "axios";

const courseApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_FAST_API_BASE_URL}/api/`,
});

export const fetchAllCourses = async () => {
  const response = await courseApi.get(`/`);
  return response.data;
};

export const fetchAllDepartment = async () => {
  const response = await courseApi.get("department/all");
  return response.data;
};

export const fetchAllCoursesByDepartment = async ({ queryKey }) => {
  const { departmentCode } = queryKey[1];
  const response = await courseApi.get(`course/${departmentCode}/`);
  return response.data;
};

export const fetchCourseDetail = async ({ queryKey }) => {
  const { departmentCode, number } = queryKey[1];
  const response = await courseApi.get(`course/${departmentCode}/${number}`);
  return response.data;
};
