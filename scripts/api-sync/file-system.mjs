import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// ----------------------
// 파일 시스템 유틸
// ----------------------

export async function readTextFile(filePath) {
  return readFile(filePath, "utf8");
}

export async function writeTextFile(filePath, content) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, content, "utf8");
}

export async function readJavaFilesFromDir(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await readJavaFilesFromDir(fullPath)));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".java")) {
      files.push(fullPath);
    }
  }

  return files.sort();
}
