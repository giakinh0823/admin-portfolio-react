import { useQuery } from "react-query";
import blogApi from "../../api/blogApi";
import { ListParams } from "../../models/common";

export default function useTrashBlogs(params: ListParams) {
  return useQuery("blogs-trash", async () => await blogApi.getAllTrash(params));
}
