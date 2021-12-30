import { ListParams } from "../models/common";
import axiosClient from "./axiosClient";

const chatbotApi = {
  getAll(params: ListParams): Promise<any[]> {
    const url = "/chatbots/";
    const access_token = localStorage.getItem("access_token");
    return axiosClient.get(url, {
      params,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  join(data:any): Promise<any> {
    const url = "/chatbots/join/";
    const access_token = localStorage.getItem("access_token");
    return axiosClient.post(url,data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  getById(id: any, data?: any): Promise<any> {
    const url = `/chatbots/${id}/`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.post(url,data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  add(data: any): Promise<any> {
    const url = "/chatbots/";
    const access_token = localStorage.getItem("access_token");
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  remove(id: string): Promise<any> {
    const url = `/chatbots/${id}`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  update(data: Partial<any>): Promise<any> {
    const url = `/chatbots/${data.id}`;
    const access_token = localStorage.getItem("access_token");
    return axiosClient.patch(url, data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
};

export default chatbotApi;
