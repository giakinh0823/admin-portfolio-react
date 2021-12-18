import { useMutation } from "react-query";
import photoApi from "../../api/photoApi";
import { queryClient } from '../../lib/query/queryClient';

export function useDeletePhoto() {
  return useMutation(async (id: string) => await photoApi.remove(id), {
    onSettled: () => {
      queryClient.invalidateQueries("photos");
    }
  });
}