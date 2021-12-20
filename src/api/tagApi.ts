import { ListParams } from "../models/common";
import { Topic } from "../models/topic";
import axiosClient from "./axiosClient";

const tagApi = {
  getAll(params: ListParams): Promise<Topic[]> {
    const url = "/tags/";
    return axiosClient.get(url, { params });
  },
  getById(id: string): Promise<Topic> {
    const url = `/tags/${id}/`;
    return axiosClient.get(url);
  },
  add(data: Topic): Promise<Topic> {
    const url = "/tags/";
    return axiosClient.post(url, data);
  },
  remove(id: string): Promise<Topic> {
    const url = `/tags/${id}/`;
    return axiosClient.delete(url);
  },
  removeAll(data: any): Promise<Topic> {
    const url = `/tags/remove/`;
    return axiosClient.post(url, data);
  },
  update(data: Partial<Topic>): Promise<Topic> {
    const url = `/tags/${data.id}/`;
    return axiosClient.patch(url, data);
  },
};

export default tagApi;
