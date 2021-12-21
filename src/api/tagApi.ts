import { ListParams } from "../models/common";
import { Tag } from "../models/tag";
import axiosClient from "./axiosClient";

const tagApi = {
  getAll(params: ListParams): Promise<Tag[]> {
    const url = "/tags/";
    return axiosClient.get(url, { params });
  },
  getById(id: string): Promise<Tag> {
    const url = `/tags/${id}/`;
    return axiosClient.get(url);
  },
  add(data: Tag): Promise<Tag> {
    const url = "/tags/";
    return axiosClient.post(url, data);
  },
  remove(id: string): Promise<Tag> {
    const url = `/tags/${id}/`;
    return axiosClient.delete(url);
  },
  removeAll(data: any): Promise<Tag> {
    const url = `/tags/remove/`;
    return axiosClient.post(url, data);
  },
  update(data: Partial<Tag>): Promise<Tag> {
    const url = `/tags/${data.id}/`;
    return axiosClient.patch(url, data);
  },
};

export default tagApi;
