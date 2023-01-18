//get posts with axios

import axios, { AxiosResponse } from "axios";

export const BASE_URL = "http://localhost:3000";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getPosts = async () => {
  const response = await axios.get<any, AxiosResponse<IPost[]>>(
    `${BASE_URL}/posts`
  );
  return response.data;
};

export const getPost = async (id: number) => {
  const response = await axios.get<any, AxiosResponse<IPost>>(
    `${BASE_URL}/posts/${id}`
  );
  return response.data;
};
