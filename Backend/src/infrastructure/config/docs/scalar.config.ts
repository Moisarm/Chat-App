import swagger_document from "../../external/docs/swagger.json";

export const scalar_config = {
  spec: {
    content: swagger_document,
  },
  theme: "deepSpace" as const,
  layout: "modern" as const,
  metadata: {
    title: "Api documentation",
    description:
      "Write it Backend, A Realtime Chat app developed with clean architecture, Typescript and Bunjs by Moisarm",
  },
};
