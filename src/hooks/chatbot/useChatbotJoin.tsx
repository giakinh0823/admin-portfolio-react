import { useMutation } from "react-query";
import chatbotApi from "../../api/chatbotApi";
import { queryClient } from '../../lib/query/queryClient';

export function useChatbotJoin() {
  return useMutation(async (data:any) => await chatbotApi.join(data), {
    onSettled: () => {
      queryClient.invalidateQueries("chatbots");
    }
  });
}
