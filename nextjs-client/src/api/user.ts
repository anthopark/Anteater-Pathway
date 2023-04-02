import { IAcademicYear } from '@entities/academic-year';
import { axiosClient } from './client';

const baseRouterUrl = '/user';

const endpoints = {
  signIn: `${baseRouterUrl}/sign-in`,
  savePlan: `${baseRouterUrl}/planner/save`,
  loadPlan: `${baseRouterUrl}/planner/load`,
};

export const signInToBE = async (idToken: string) => {
  const response = await axiosClient.post(endpoints.signIn, undefined, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  return response.data;
};

export const savePlannerToBE = async (
  idToken: string,
  plannerInJSON: string
) => {
  const response = await axiosClient.post(
    endpoints.savePlan,
    {
      planner: plannerInJSON,
    },
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );

  return response.data;
};

export const loadPlannerFromBE = async (idToken: string) => {
  const response = await axiosClient.get(endpoints.loadPlan, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  return response.data;
};
