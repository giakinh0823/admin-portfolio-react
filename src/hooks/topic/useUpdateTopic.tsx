import { useMutation } from "react-query";
import topicApi from "../../api/topicApi";
import { queryClient } from '../../lib/query/queryClient';

export function useUpdateTopic() {
  return useMutation(async (data: any) => await topicApi.update(data), {
    onSettled: (data: any) => {
      queryClient.invalidateQueries("topics");
      queryClient.invalidateQueries(`topic/${data?.slug}`);
    }
  });
}
