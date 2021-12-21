import { Blog } from "../models/blog";
import { ListParams } from "../models/common";
import axiosClient from "./axiosClient";

const userApi = {
  getAll(params: ListParams): Promise<any[]> {
    const url = "/users";
    const access_token = localStorage.getItem("access_token");
    return axiosClient.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  getById(id: string): Promise<Blog> {
    const url = `/users/${id}`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  add(data: Blog): Promise<Blog> {
    const url = "/users/";
    const access_token = localStorage.getItem("access_token");
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  remove(id: string): Promise<Blog> {
    const url = `/users/${id}`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  update(data: Partial<Blog>): Promise<Blog> {
    const url = `/users/${data.id}`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.patch(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
};

export default userApi;
