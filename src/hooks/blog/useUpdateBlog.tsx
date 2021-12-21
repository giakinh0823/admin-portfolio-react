import { useMutation } from "react-query";
import blogApi from "../../api/blogApi";
import { queryClient } from '../../lib/query/queryClient';

export function useUpdateBlog() {
  return useMutation(async (data: any) => await blogApi.update(data), {
    onSettled: (data: any) => {
      queryClient.invalidateQueries("blogs");
    }
  });
}
