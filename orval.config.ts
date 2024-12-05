import { defineConfig } from "orval";

export default defineConfig({
  sampleFront: {
    output: {
      mode: "tags-split",
      clean: true,
      target: "src/framework/stories/libs/generated/api.ts",
      schemas: "src/framework/stories/libs/generated/model",
      client: "react-query",
      tsconfig: "tsconfig.json",
      override: {
        query: {
          useQuery: true,
        },
        mutator: {
          path: "src/framework/stories/libs/backend/customInstance.ts",
          name: "customInstance",
        },
      },
    },
    input: {
      target: "./openapi/openapi.yaml",
    },
  },
});
