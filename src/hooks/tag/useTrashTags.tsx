import { useQuery } from "react-query";
import topicApi from "../../api/topicApi";
import { ListParams } from "../../models/common";

export default function useTrashTopics(params: ListParams) {
  return useQuery("topics-trash", async () => await topicApi.getAllTrash(params));
}
