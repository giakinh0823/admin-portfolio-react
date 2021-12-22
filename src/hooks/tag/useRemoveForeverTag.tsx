import { useMutation } from "react-query";
import tagApi from "../../api/tagApi";
import { queryClient } from "../../lib/query/queryClient";

export function useRemoveForeverTag() {
  return useMutation(async (data: any) => await tagApi.removeForeverAll(data), {
    onSettled: () => {
      queryClient.invalidateQueries("tags-trash");
    }
  });
}