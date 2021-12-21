import { LogginPayload } from "../features/Auth/authSlice";
import axiosClient from "./axiosClient";

const authApi = {
    login: (data: LogginPayload) => {
        return axiosClient.post("/token/", data);
    },
    getUser: (data: any) => {
        return axiosClient.post("/user/", data);
    },
}

export default authApi;