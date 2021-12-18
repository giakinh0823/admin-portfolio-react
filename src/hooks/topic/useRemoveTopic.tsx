import { useMutation } from "react-query";
import topicApi from "../../api/topicApi";
import { queryClient } from "../../lib/query/queryClient";

export function useRemoveTopic() {
  return useMutation(async (data: any) => await topicApi.removeAll(data), {
    onSettled: () => {
      queryClient.invalidateQueries("topics");
    }
  });
}