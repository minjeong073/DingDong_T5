import api from "./axios";

export const articlesAPI = async(data) => {

  const response = await api.post(
    `${process.env.REACT_APP_SERVER_URL}/posts/1`,
    data
  );

  return response.data;
}