import { useMutation } from "react-query";
import tagApi from "../../api/tagApi";
import { queryClient } from "../../lib/query/queryClient";

export function useRemoveTag() {
  return useMutation(async (data: any) => await tagApi.removeAll(data), {
    onSettled: () => {
      queryClient.invalidateQueries("tags");
    }
  });
}