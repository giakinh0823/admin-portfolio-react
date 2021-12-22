import { ListParams } from "../models/common";
import { Topic } from "../models/topic";
import axiosClient from "./axiosClient";

const blogApi = {
  getAll(params: ListParams): Promise<Topic[]> {
    const url = "/topics/";
    const access_token = localStorage.getItem("access_token");
    return axiosClient.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  getAllTrash(params: ListParams): Promise<Topic[]> {
    const url = "/topics/trash/";
    const access_token = localStorage.getItem("access_token");
    return axiosClient.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  restore(data: any): Promise<Topic[]> {
    const url = "/topics/trash/";
    const access_token = localStorage.getItem("access_token");
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  getById(id: string): Promise<Topic> {
    const url = `/topics/${id}/`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  getBySlug(slug: string): Promise<Topic> {
    const url = `/topic/${slug}/`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  add(data: Topic): Promise<Topic> {
    const url = "/topics/";
    const access_token = localStorage.getItem("access_token");
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  remove(id: string): Promise<Topic> {
    const url = `/topics/remove/${id}/`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  removeAll(data: any): Promise<Topic> {
    const url = `/topics/remove/`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  removeForeverAll(data: any): Promise<Topic> {
    const url = `/topics/remove-forever/`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  update(data: Partial<Topic>): Promise<Topic> {
    const url = `/topics/${data.id}/`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.patch(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
};

export default blogApi;
