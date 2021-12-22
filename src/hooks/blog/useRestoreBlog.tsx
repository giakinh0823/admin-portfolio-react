import { useMutation } from "react-query";
import blogApi from "../../api/blogApi";
import { queryClient } from "../../lib/query/queryClient";

export function useRestoreBlog() {
  return useMutation(async (data: any) => await blogApi.restore(data), {
    onSettled: () => {
      queryClient.invalidateQueries("blogs");
      queryClient.invalidateQueries("blogs-trash");
    }
  });
}