import { useQuery } from "react-query";
import chatbotApi from "../../api/chatbotApi";
import { ListParams } from "../../models/common";


export default function useChatbots(params: ListParams) {
  return useQuery<any, Error>("chatbots", async () => await chatbotApi.getAll(params));
}
