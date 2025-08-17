import {
  GetBioResponse,
  GetSocialLinksResponse,
} from "@piperunner-cms/types/v1";
import { piperunnerCmsApiEndpoint } from "./config";

export const getBio = async () => {
  const response = await piperunnerCmsApiEndpoint.get("getBio");
  return response.data as GetBioResponse;
};

export const getSocialLinks = async () => {
  const response = await piperunnerCmsApiEndpoint.get("/getSocialLinks");
  return response.data as GetSocialLinksResponse;
};
