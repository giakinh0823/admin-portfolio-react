import { Blog } from "../models/blog";
import { ListParams, ListResponse } from "../models/common";
import axiosClient from "./axiosClient";

const blogApi = {
  getAll(params: ListParams): Promise<ListResponse<Blog>> {
    const url = "/blogs";
    return axiosClient.get(url, { params });
  },
  getById(id: string): Promise<Blog> {
    const url = `/blogs/${id}`;
    return axiosClient.get(url);
  },
  add(data: Blog): Promise<Blog> {
    const url = "/blogs/";
    return axiosClient.post(url, data);
  },
  remove(id: string): Promise<Blog> {
    const url = `/blogs/${id}`;
    return axiosClient.delete(url);
  },
  update(data: Partial<Blog>): Promise<Blog> {
    const url = `/blogs/${data.id}`;
    return axiosClient.patch(url, data);
  },
};

export default blogApi;
