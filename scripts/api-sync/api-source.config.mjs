import "dotenv/config";
import path from "node:path";
import process from "node:process";

const API_SYNC_DOMAIN_CONFIGS = {
  post: {
    javaRoot: "src/main/java/com/hogu/am_i_hogu/domain/post",
    controllerFiles: ["controller/PostController.java", "controller/ImageController.java"],
    dtoDirs: ["dto/request", "dto/response"],
    output: {
      dto: "src/features/post/model/post.dto.ts",
      mockSkeleton: "src/features/post/model/post.mock.generated.ts",
    },
  },
};

function requiredEnv(env, key) {
  const value = env[key];
  if (!value) {
    throw new Error(`Missing required API sync env: ${key}`);
  }
  return value;
}

function optionalPathEnv(env, key, fallback) {
  return env[key] ?? path.join(process.cwd(), fallback);
}

export function createApiSyncConfig(env = process.env) {
  return {
    repositoryUrl: requiredEnv(env, "API_SYNC_REPOSITORY_URL"),
    defaultBranch: requiredEnv(env, "API_SYNC_BRANCH"),
    checkoutDir: optionalPathEnv(env, "API_SYNC_CHECKOUT_DIR", ".api-sync/am-i-hogu-api"),
    domains: API_SYNC_DOMAIN_CONFIGS,
  };
}
