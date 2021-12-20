import { Blog } from "../models/blog";
import { ListParams } from "../models/common";
import axiosClient from "./axiosClient";

const userApi = {
  getAll(params: ListParams): Promise<any[]> {
    const url = "/users";
    return axiosClient.get(url, { params });
  },
  getById(id: string): Promise<Blog> {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
  add(data: Blog): Promise<Blog> {
    const url = "/users/";
    return axiosClient.post(url, data);
  },
  remove(id: string): Promise<Blog> {
    const url = `/users/${id}`;
    return axiosClient.delete(url);
  },
  update(data: Partial<Blog>): Promise<Blog> {
    const url = `/users/${data.id}`;
    return axiosClient.patch(url, data);
  },
};

export default userApi;
