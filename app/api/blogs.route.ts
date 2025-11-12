import { GetBlogListResponse, GetBlogResponse } from "@piperunner-cms/types/v1";
import { piperunnerCmsApiEndpoint } from "./config";

export const getBlogList = async () => {
  const response = await piperunnerCmsApiEndpoint.get("getBlogList");
  return response.data as GetBlogListResponse;
};

export const getBlog = async (slug: string) => {
  const response = await piperunnerCmsApiEndpoint.get("/getBlogBySlug", {
    params: { slug },
  });
  return response.data as GetBlogResponse;
};
