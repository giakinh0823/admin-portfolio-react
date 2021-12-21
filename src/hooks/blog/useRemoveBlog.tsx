import { useMutation } from "react-query";
import blogApi from "../../api/blogApi";
import { queryClient } from "../../lib/query/queryClient";

export function useRemoveBlog() {
  return useMutation(async (data: any) => await blogApi.removeAll(data), {
    onSettled: () => {
      queryClient.invalidateQueries("blogs");
    }
  });
}