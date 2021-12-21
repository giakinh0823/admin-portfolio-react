import { useQuery } from "react-query";
import blogApi from "../../api/blogApi";
import { ListParams } from "../../models/common";

export default function useBlogs(params: ListParams) {
  return useQuery("blogs", async () => await blogApi.getAll(params));
}
