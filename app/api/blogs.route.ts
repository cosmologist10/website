import {
  GetBlogListResponse,
  GetBlogResponse,
  GetBlogListRequest,
} from "@piperunner-cms/types/v1";
import { piperunnerCmsApiEndpoint } from "./config";

export const getBlogList = async (
  parentBlogId?: GetBlogListRequest["parentBlogId"]
) => {
  /**
   * Note: Sending body and query paraments:
   * https://stackoverflow.com/questions/53501185/how-to-post-query-parameters-with-axios
   */
  const response = await piperunnerCmsApiEndpoint.post("getBlogList", {
    parentBlogId,
  });
  return response.data as GetBlogListResponse;
};

export const getBlog = async (slug: string) => {
  const response = await piperunnerCmsApiEndpoint.get("/getBlogBySlug", {
    params: { slug },
  });
  return response.data as GetBlogResponse;
};
