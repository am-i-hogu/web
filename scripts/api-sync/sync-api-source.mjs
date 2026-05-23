import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

// ----------------------
// API repo 동기화
// ----------------------
// checkoutDir에 API repo가 없으면 clone하고, 있으면 지정 브랜치 최신 상태로 맞춥니다.
// generated 파일은 이 로컬 checkout의 Java source를 기준으로 만들어집니다.

function runGit(args, options = {}) {
  execFileSync("git", args, {
    stdio: "inherit",
    ...options,
  });
}

export function syncApiSource({ repositoryUrl, branch, checkoutDir }) {
  if (!existsSync(`${checkoutDir}/.git`)) {
    runGit(["clone", "--depth", "1", "--branch", branch, repositoryUrl, checkoutDir]);
    return;
  }

  runGit(["fetch", "--depth", "1", "origin", branch], { cwd: checkoutDir });
  runGit(["checkout", branch], { cwd: checkoutDir });
  runGit(["reset", "--hard", `origin/${branch}`], { cwd: checkoutDir });
}
