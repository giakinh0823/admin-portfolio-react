import { useMutation } from "react-query";
import tagApi from "../../api/tagApi";
import { queryClient } from "../../lib/query/queryClient";

export function useRestoreTag() {
  return useMutation(async (data: any) => await tagApi.restore(data), {
    onSettled: () => {
      queryClient.invalidateQueries("tags");
      queryClient.invalidateQueries("tags-trash");
    }
  });
}