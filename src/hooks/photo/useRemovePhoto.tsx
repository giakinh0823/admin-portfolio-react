import { useMutation } from "react-query";
import photoApi from "../../api/photoApi";
import { queryClient } from "../../lib/query/queryClient";

export function useRemovePhoto() {
  return useMutation(async (data: any) => await photoApi.removeAll(data), {
    onSettled: () => {
      queryClient.invalidateQueries("photos");
    }
  });
}