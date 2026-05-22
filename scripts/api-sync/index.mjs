import path from "node:path";
import { createApiSyncConfig } from "./api-source.config.mjs";
import { readJavaFilesFromDir, readTextFile, writeTextFile } from "./file-system.mjs";
import { generateMockSkeleton } from "./generate-mock-skeleton.mjs";
import { generateTypeScriptDto } from "./generate-ts-dto.mjs";
import { parseJavaRecords } from "./parse-java-records.mjs";
import { parseSpringController } from "./parse-spring-controllers.mjs";
import { syncApiSource } from "./sync-api-source.mjs";

// pnpm sync:api post
// pnpm sync:api
// pnpm sync:api post --branch feat/post-crud-api
// pnpm sync:api post --skip-fetch

// ----------------------
// 옵션 파싱
// ----------------------
function parseArgs(argv) {
  const apiSyncConfig = createApiSyncConfig();
  const result = {
    domain: null,
    branch: apiSyncConfig.defaultBranch,
    skipFetch: false,
    config: apiSyncConfig,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--") && result.domain === null) {
      result.domain = arg;
      continue;
    }
    if (arg === "--domain") {
      result.domain = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg === "--branch") {
      result.branch = argv[index + 1];
      index += 1;
      continue;
    }
    if (arg === "--skip-fetch") {
      result.skipFetch = true;
    }
  }

  return result;
}

// ----------------------
// API repo 파일 수집
// ----------------------
async function collectDomainFiles(domainConfig, checkoutDir) {
  const javaRoot = path.join(checkoutDir, domainConfig.javaRoot);
  const dtoPaths = (
    await Promise.all(domainConfig.dtoDirs.map((dtoDir) => readJavaFilesFromDir(path.join(javaRoot, dtoDir))))
  ).flat();

  const dtoFiles = await Promise.all(
    dtoPaths.map(async (filePath) => ({
      path: path.relative(checkoutDir, filePath),
      source: await readTextFile(filePath),
    })),
  );

  const controllerFiles = await Promise.all(
    domainConfig.controllerFiles.map(async (controllerFile) => {
      const filePath = path.join(javaRoot, controllerFile);
      return {
        path: path.relative(checkoutDir, filePath),
        source: await readTextFile(filePath),
      };
    }),
  );

  return { dtoFiles, controllerFiles };
}

function unwrapJavaType(javaType) {
  const cleanType = javaType.trim();
  const genericMatch = cleanType.match(/^(?:List|ArrayList|Set|JsonNullable)<(.+)>$/);
  return genericMatch ? unwrapJavaType(genericMatch[1]) : cleanType;
}

function filterRecordsByEndpointTypes(records, endpoints) {
  const recordByName = new Map(records.map((record) => [record.name, record]));
  const selectedNames = new Set();
  const queue = endpoints.flatMap((endpoint) => [endpoint.requestType, endpoint.responseType]).filter(Boolean);

  while (queue.length > 0) {
    const javaType = unwrapJavaType(queue.shift());
    const record = recordByName.get(javaType);
    if (!record || selectedNames.has(record.name)) {
      continue;
    }

    selectedNames.add(record.name);
    for (const field of record.fields) {
      queue.push(field.javaType);
    }
  }

  return records.filter((record) => selectedNames.has(record.name));
}

async function syncDomain({ domain, domainConfig, checkoutDir }) {
  const { dtoFiles, controllerFiles } = await collectDomainFiles(domainConfig, checkoutDir);
  const endpoints = controllerFiles.flatMap(parseSpringController);
  const records = filterRecordsByEndpointTypes(parseJavaRecords(dtoFiles), endpoints);

  await writeTextFile(domainConfig.output.dto, generateTypeScriptDto(records, { domain }));
  await writeTextFile(domainConfig.output.mockSkeleton, generateMockSkeleton(records, { domain }));

  return { records, endpoints };
}

// ----------------------
// 생성 실행
// ----------------------
async function main() {
  const args = parseArgs(process.argv.slice(2));
  const domainNames = args.domain === null ? Object.keys(args.config.domains) : [args.domain];

  if (!args.skipFetch) {
    syncApiSource({
      repositoryUrl: args.config.repositoryUrl,
      branch: args.branch,
      checkoutDir: args.config.checkoutDir,
    });
  }

  for (const domain of domainNames) {
    const domainConfig = args.config.domains[domain];
    if (!domainConfig) {
      throw new Error(`Unknown API sync domain: ${domain}`);
    }

    const { records, endpoints } = await syncDomain({
      domain,
      domainConfig,
      checkoutDir: args.config.checkoutDir,
    });
    console.log(`Synced ${records.length} DTO records and ${endpoints.length} endpoints for domain "${domain}".`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
