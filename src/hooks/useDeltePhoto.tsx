import { useMutation } from "react-query";
import photoApi from "../api/photoApi";

export function useDeletePhoto() {
  return useMutation(async (id: string) => await photoApi.remove(id));
}