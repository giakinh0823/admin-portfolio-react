import { useMutation } from "react-query";
import tagApi from "../../api/tagApi";
import { queryClient } from '../../lib/query/queryClient';

export default function useUpdateTag() {
  return useMutation(async (data: any) => await tagApi.update(data), {
    onSettled: () => {
      queryClient.invalidateQueries("tags");
    }
  });
}
