import { useQuery } from "react-query";
import blogApi from "../../api/blogApi";

export default function useBlog(slug: any) {
  return useQuery(
    `blog/${slug}`,
    async () => await blogApi.getBySlug(slug)
  );
}
