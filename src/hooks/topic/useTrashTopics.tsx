import { useQuery } from "react-query";
import tagApi from "../../api/tagApi";
import { ListParams } from "../../models/common";

export default function useTrashTags(params: ListParams) {
  return useQuery("tags-trash", async () => await tagApi.getAllTrash(params));
}
