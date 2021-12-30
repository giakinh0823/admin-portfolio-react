import { useQuery } from "react-query";
import chatbotApi from "../../api/chatbotApi";

export default function useChatbotId(id: any) {
  return useQuery(`chatbots/${id}`, async () => await chatbotApi.getById(id));
}
