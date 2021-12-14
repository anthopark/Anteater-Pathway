import axios from "axios";

const courseApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_PLANNER_API_BASE_URL}/api/course`,
});

export const fetchAllCoursesGroupedByDepartment = async () => {};

export const fetchCourseDetail = async ({ queryKey }) => {
  const { departmentCode, number } = queryKey[1];
  const response = await courseApi.get(`/${departmentCode}/${number}`);
  return response;
};

export const fetchCourseDetailConfig = {
  staleTime: Infinity,
  cacheTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};
