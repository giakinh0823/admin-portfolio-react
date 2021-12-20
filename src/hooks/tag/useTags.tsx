import { useQuery } from "react-query";
import tagApi from "../../api/tagApi";
import { ListParams } from "../../models/common";

export default function useTags(params: ListParams) {
  return useQuery("tags", async () => await tagApi.getAll(params));
}
