/// <reference types="node" />
import { appendFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

interface HookInput {
  tool_name?: string;
  cwd?: string;
  tool_input?: { command?: string };
}

const logDirectory = resolve(import.meta.dirname, "../logs");

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

const input = parseInput(await readStdin());
const command = input.tool_input?.command;

if (command) {
  // 명령어에 비밀 값이 섞일 수 있으므로 이 폴더는 Git에서 제외한다
  mkdirSync(logDirectory, { recursive: true });
  appendFileSync(
    resolve(logDirectory, "commands.log"),
    `${JSON.stringify({
      time: new Date().toISOString(),
      tool: input.tool_name,
      cwd: input.cwd,
      command,
    })}\n`,
  );
}
