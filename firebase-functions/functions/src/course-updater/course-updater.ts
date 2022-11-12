import axios from 'axios';

export const crawlAllDepartments = async (): Promise<string> => {
  const response = await axios.get('https://catalogue.uci.edu/allcourses/');

  return Promise.resolve(response.data);
};
