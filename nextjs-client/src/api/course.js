import axios from "axios";

const courseApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_PLANNER_API_BASE_URL}/api/course`,
});

export const fetchAllCoursesGroupedByDepartment = async () => {
  const response = await courseApi.get("/all");
  return response.data;
};

export const fetchCourseDetail = async ({ queryKey }) => {
  const { departmentCode, number } = queryKey[1];
  const response = await courseApi.get(`/${departmentCode}/${number}`);
  return response.data;
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
