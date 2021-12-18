import { ListParams } from "../models/common";
import { Topic } from "../models/topic";
import axiosClient from "./axiosClient";

const blogApi = {
  getAll(params: ListParams): Promise<Topic[]> {
    const url = "/topics/";
    return axiosClient.get(url, { params });
  },
  getById(id: string): Promise<Topic> {
    const url = `/topics/${id}/`;
    return axiosClient.get(url);
  },
  getBySlug(slug: string): Promise<Topic> {
    const url = `/topic/${slug}/`;
    return axiosClient.get(url);
  },
  add(data: Topic): Promise<Topic> {
    const url = "/topics/";
    return axiosClient.post(url, data);
  },
  remove(id: string): Promise<Topic> {
    const url = `/topics/remove/${id}/`;
    return axiosClient.delete(url);
  },
  removeAll(data: any): Promise<Topic> {
    const url = `/topics/remove/`;
    return axiosClient.post(url, data);
  },
  update(data: Partial<Topic>): Promise<Topic> {
    const url = `/topics/${data.id}/`;
    return axiosClient.patch(url, data);
  },
};

export default blogApi;
