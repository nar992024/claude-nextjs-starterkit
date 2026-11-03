/// <reference types="node" />
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

interface HookInput {
  tool_input?: { file_path?: string };
}

const projectRoot = resolve(import.meta.dirname, "../..");
const TYPESCRIPT_FILE = /\.(?:[cm]?ts|tsx)$/i;
const MAX_OUTPUT_LENGTH = 4000;

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

const filePath = parseInput(await readStdin()).tool_input?.file_path;

if (filePath && TYPESCRIPT_FILE.test(filePath)) {
  const result = spawnSync(
    process.execPath,
    [resolve(projectRoot, "node_modules/typescript/bin/tsc"), "--noEmit"],
    { cwd: projectRoot, encoding: "utf8", windowsHide: true },
  );

  if (result.status !== 0) {
    const output = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();
    console.error(
      `타입 오류가 있습니다.\n${output.slice(0, MAX_OUTPUT_LENGTH)}`,
    );
    // PostToolUse의 종료 코드 2는 오류 내용을 Claude에게 전달해 바로 고치게 한다
    process.exitCode = 2;
  }
}
