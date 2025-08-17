import axios from "axios";

export const piperunnerCmsApiEndpoint = axios.create({
  baseURL: "https://cms-api.piperunner.in",
  headers: {
    "auth-key": process.env.NEXT_PUBLIC_AUTH_KEY,
    "project-id": process.env.NEXT_PUBLIC_PROJECT_ID,
  },
});
