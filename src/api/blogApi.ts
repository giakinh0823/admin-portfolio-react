import { Blog } from "../models/blog";
import { ListParams, ListResponse } from "../models/common";
import axiosClient from "./axiosClient";

const blogApi = {
  getAll(params: ListParams): Promise<ListResponse<Blog>> {
    const url = "/getBlogs/";
    const access_token = localStorage.getItem("access_token");
    return axiosClient.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  getAllTrash(params: ListParams): Promise<ListResponse<Blog>> {
    const url = "/getBlogs/trash/";
    const access_token = localStorage.getItem("access_token");
    return axiosClient.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  restore(data: any): Promise<ListResponse<Blog>> {
    const url = "/getBlogs/trash/";
    const access_token = localStorage.getItem("access_token");
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  getById(id: string): Promise<Blog> {
    const url = `/blogs/${id}/`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  getBySlug(slug: string): Promise<Blog> {
    const url = `/blog/${slug}/`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  add(data: Blog): Promise<Blog> {
    const url = "/blogs/";
    const access_token = localStorage.getItem("access_token");
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  remove(id: string): Promise<Blog> {
    const url = `/blogs/${id}`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  removeAll(data: any): Promise<Blog> {
    const url = `/blogs/remove/`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  removeForeverAll(data: any): Promise<Blog> {
    const url = `/blogs/remove-forever/`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  update(data: Partial<Blog>): Promise<Blog> {
    const url = `/blogs/${data.id}/`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.patch(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
};

export default blogApi;
