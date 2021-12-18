import { useQuery } from "react-query";
import topicApi from "../../api/topicApi";
import { ListParams } from "../../models/common";

export default function useTopics(params: ListParams) {
  return useQuery("topics", async () => await topicApi.getAll(params));
}
