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

export const fetchAllCoursesByDepartment = async (departmentCode) => {
  const response = await courseApi.get(`course/${departmentCode}/`);
  return response.data;
};

export const fetchSpecificCourse = async (departmentCode, number) => {
  let response;
  try {
    response = await courseApi.get(`course/${departmentCode}/${number}`);
    return response.data;
  } catch (error) {}

  return null;
};

export const fetchCourseConfig = {
  retry: 3,
  retryDelay: 3000,
  staleTime: Infinity,
  cacheTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};
