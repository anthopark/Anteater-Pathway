import axios from "axios";

const userApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_PLANNER_API_BASE_URL}/api/user`,
});

export const signInUser = async (uid, accessToken) => {
  const payLoad = {
    uid,
  };

  const response = await userApi.post("/sign-in", payLoad, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export const sendUserContactMessage = async (senderEmail, content) => {
  const payLoad = {
    senderEmail,
    content,
  };

  const response = await userApi.post("/contact-us", payLoad);

  return response;
};
