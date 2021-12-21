import { useQuery } from "react-query";
import tagApi from "../../api/tagApi";

export default function useTag(id: any) {
  return useQuery(
    `tag/${id}`,
    async () => await tagApi.getById(id),
  );
}
