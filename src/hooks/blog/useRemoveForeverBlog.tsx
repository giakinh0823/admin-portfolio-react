import { useMutation } from "react-query";
import blogApi from "../../api/blogApi";
import { queryClient } from "../../lib/query/queryClient";

export function useRemoveForeverBlog() {
  return useMutation(async (data: any) => await blogApi.removeForeverAll(data), {
    onSettled: () => {
      queryClient.invalidateQueries("blogs-trash");
    }
  });
}