import { ListParams } from "../models/common";
import { Photo } from "../models/photos";
import axiosClient from "./axiosClient";

const blogApi = {
  getAll(params: ListParams): Promise<Photo[]> {
    const url = "/photos";
    const access_token = localStorage.getItem("access_token");
    return axiosClient.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  getById(id: string): Promise<Photo> {
    const url = `/photos/${id}`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  add(data: any): Promise<Photo> {
    const url = "/upload/";
    const access_token = localStorage.getItem("access_token");
    const form_data = new FormData();
    form_data.append("image", data.file, data.file.name);
    return axiosClient.post(url, form_data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  remove(id: string): Promise<Photo> {
    const url = `/upload/${id}`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  removeAll(data: any): Promise<Photo> {
    const url = `/upload/remove/`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  update(data: Partial<Photo>): Promise<Photo> {
    const url = `/photos/${data.id}`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.patch(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
};

export default blogApi;
