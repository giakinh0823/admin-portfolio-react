import { useMutation } from "react-query";
import photoApi from "../../api/photoApi";
import { queryClient } from '../../lib/query/queryClient';

export function useUpload() {
  return useMutation(async (data: any) => await photoApi.add(data), {
    onSettled: () => {
      queryClient.invalidateQueries("photos");
    }
  });
}
