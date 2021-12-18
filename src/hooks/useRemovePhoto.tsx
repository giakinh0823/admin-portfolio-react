import { useMutation } from "react-query";
import photoApi from "../api/photoApi";

export function useRemovePhoto() {
  return useMutation(async (data: any) => await photoApi.removeAll(data));
}