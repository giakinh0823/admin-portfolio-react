import { ListParams } from "../models/common";
import { Tag } from "../models/tag";
import axiosClient from "./axiosClient";

const tagApi = {
  getAll(params: ListParams): Promise<Tag[]> {
    const url = "/tags/";
    const access_token = localStorage.getItem("access_token");
    return axiosClient.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  getById(id: string): Promise<Tag> {
    const url = `/tags/${id}/`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  add(data: Tag): Promise<Tag> {
    const url = "/tags/";
    const access_token = localStorage.getItem("access_token");
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  remove(id: string): Promise<Tag> {
    const url = `/tags/${id}/`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  removeAll(data: any): Promise<Tag> {
    const url = `/tags/remove/`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  update(data: Partial<Tag>): Promise<Tag> {
    const url = `/tags/${data.id}/`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.patch(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
};

export default tagApi;
