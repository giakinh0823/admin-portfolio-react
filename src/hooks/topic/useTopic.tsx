import { useQuery } from "react-query";
import topicApi from "../../api/topicApi";

export default function useTopic(slug: any) {
  return useQuery(
    `topic/${slug}`,
    async () => await topicApi.getBySlug(slug)
  );
}
