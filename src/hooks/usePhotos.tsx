import { useQuery } from "react-query";
import photoApi from "../api/photoApi";
import { ListParams } from "../models/common";


export default function usePhotos(params: ListParams) {
  return useQuery("photos", async () => await photoApi.getAll(params));
}
