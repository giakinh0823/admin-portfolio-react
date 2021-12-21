import { useMutation } from "react-query";
import tagApi from "../../api/tagApi";
import { queryClient } from '../../lib/query/queryClient';

export function useCreateTag() {
  return useMutation(async (data: any) => await tagApi.add(data), {
    onSettled: () => {
      queryClient.invalidateQueries("tags");
    }
  });
}
