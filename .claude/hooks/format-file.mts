/// <reference types="node" />
import { spawnSync } from "node:child_process";
import { isAbsolute, relative, resolve } from "node:path";

interface HookInput {
  tool_input?: { file_path?: string };
}

const projectRoot = resolve(import.meta.dirname, "../..");
const ESLINT_TARGET = /\.(?:[cm]?[jt]s|[jt]sx)$/i;
const TOOL_TIMEOUT_MS = 50000;

const readStdin = async (): Promise<string> => {
  let text = "";
  process.stdin.setEncoding("utf8");
  for await (const chunk of process.stdin) {
    text += chunk;
  }
  return text;
};

const parseInput = (text: string): HookInput => {
  try {
    return JSON.parse(text) as HookInput;
  } catch {
    return {};
  }
};

// 프로젝트 밖 파일과 생성물은 포맷하지 않는다
const isFormatTarget = (filePath: string): boolean => {
  const fromRoot = relative(projectRoot, resolve(projectRoot, filePath));
  const [firstSegment] = fromRoot.split(/[\\/]/);
  return (
    fromRoot !== "" &&
    !fromRoot.startsWith("..") &&
    !isAbsolute(fromRoot) &&
    firstSegment !== "node_modules" &&
    firstSegment !== ".next"
  );
};

const runTool = (toolPath: string, args: string[]): void => {
  const result = spawnSync(
    process.execPath,
    [resolve(projectRoot, toolPath), ...args],
    {
      cwd: projectRoot,
      encoding: "utf8",
      timeout: TOOL_TIMEOUT_MS,
      windowsHide: true,
    },
  );
  if (result.status !== 0 && result.stderr) {
    console.error(result.stderr.slice(0, 1000));
  }
};

const filePath = parseInput(await readStdin()).tool_input?.file_path;

// 포맷 실패가 작업을 막지 않도록 항상 종료 코드 0으로 끝낸다
if (filePath && isFormatTarget(filePath)) {
  if (ESLINT_TARGET.test(filePath)) {
    runTool("node_modules/eslint/bin/eslint.js", [
      "--fix",
      "--no-warn-ignored",
      filePath,
    ]);
  }
  runTool("node_modules/prettier/bin/prettier.cjs", [
    "--write",
    "--ignore-unknown",
    filePath,
  ]);
}
