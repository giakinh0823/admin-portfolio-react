import { useMutation } from "react-query";
import topicApi from "../../api/topicApi";
import { queryClient } from '../../lib/query/queryClient';

export function useCreateTopic() {
  return useMutation(async (data: any) => await topicApi.add(data), {
    onSettled: () => {
      queryClient.invalidateQueries("topics");
    }
  });
}
