import { useMutation } from "react-query";
import topicApi from "../../api/topicApi";
import { queryClient } from "../../lib/query/queryClient";

export function useRemoveForeverTopic() {
  return useMutation(async (data: any) => await topicApi.removeForeverAll(data), {
    onSettled: () => {
      queryClient.invalidateQueries("topics-trash");
    }
  });
}