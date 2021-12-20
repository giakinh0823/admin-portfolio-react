import { useMutation } from "react-query";
import blogApi from "../../api/blogApi";
import { queryClient } from '../../lib/query/queryClient';

export function useCreateBlog() {
  return useMutation(async (data: any) => await blogApi.add(data), {
    onSettled: () => {
      queryClient.invalidateQueries("blogs");
    }
  });
}
