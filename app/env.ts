import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    SESSION_SECRET: z.string(),
  },
  onValidationError: (error) => {
    console.log(error);
    throw new Error(
      `Invalid environment variable configuration, missing the following variables: ${error
        .map((error) => {
          if (error.path) {
            return error.path[0];
          }
        })
        .join(", ")}`
    );
  },
  runtimeEnv: process.env,
});
