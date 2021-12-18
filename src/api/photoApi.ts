import { ListParams } from "../models/common";
import { Photo } from "../models/photos";
import axiosClient from "./axiosClient";

const blogApi = {
  getAll(params: ListParams): Promise<Photo[]> {
    const url = "/photos";
    return axiosClient.get(url, { params });
  },
  getById(id: string): Promise<Photo> {
    const url = `/photos/${id}`;
    return axiosClient.get(url);
  },
  add(data: any): Promise<Photo> {
    const url = "/upload/";
    const form_data = new FormData();
    console.log(data);
    form_data.append("image", data.file, data.file.name);
    return axiosClient.post(url, form_data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  remove(id: string): Promise<Photo> {
    const url = `/upload/${id}`;
    return axiosClient.delete(url);
  },
  removeAll(data: any): Promise<Photo> {
    const url = `/upload/remove/`;
    return axiosClient.post(url, data);
  },
  update(data: Partial<Photo>): Promise<Photo> {
    const url = `/photos/${data.id}`;
    return axiosClient.patch(url, data);
  },
};

export default blogApi;
