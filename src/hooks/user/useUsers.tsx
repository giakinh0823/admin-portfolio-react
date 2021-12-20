import { useQuery } from "react-query";
import userApi from "../../api/userApi";
import { ListParams } from "../../models/common";

export default function useUsers(params: ListParams) {
  return useQuery("users", async () => await userApi.getAll(params));
}
