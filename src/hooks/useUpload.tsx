import { useMutation } from "react-query";
import photoApi from "../api/photoApi";

export function useUpload() {
  return useMutation((data: any) => photoApi.add(data));
}
