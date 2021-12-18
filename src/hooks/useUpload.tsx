import { useMutation } from "react-query";
import photoApi from "../api/photoApi";

export function useUpload() {
  return useMutation(async (data: any) => await photoApi.add(data));
}
