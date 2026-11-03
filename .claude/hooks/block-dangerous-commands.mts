/// <reference types="node" />

interface HookInput {
  tool_input?: { command?: string };
}

const DELETE_COMMANDS = new Set([
  "rm",
  "remove-item",
  "ri",
  "del",
  "erase",
  "rd",
  "rmdir",
]);
const SHELL_WRAPPER =
  /\b(?:bash|sh|zsh|eval|powershell|pwsh|cmd)(?:\.exe)?\b|\biex\b|invoke-expression/i;
// bash -c 뒤의 내용을 별도 명령으로 검사하도록 래퍼 부분을 구분자로 바꾼다
const WRAPPER_PREFIX =
  /\b(?:bash|sh|zsh|powershell|pwsh|cmd)(?:\.exe)?\b[^;&|\n]*?\s(?:-c|-command|\/c)\s/gi;

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

// 커밋 메시지 같은 문자열 안의 단어로 오탐하지 않도록 따옴표 내용을 지운다.
// 명령 치환($, 백틱)이 있는 문자열과 bash -c 같은 래퍼의 인자는 실행될 수 있어 남긴다
const removeQuotedText = (command: string): string =>
  SHELL_WRAPPER.test(command)
    ? command
        .replace(/["']/g, " ")
        .replace(WRAPPER_PREFIX, ";")
        .replace(/\b(?:eval|iex|invoke-expression)\s/gi, ";")
    : command.replace(/"(?:[^"\\$`]|\\.)*"|'[^']*'/g, '""');

const getCommandName = (token: string): string =>
  (token.split(/[\\/]/).pop() ?? "").toLowerCase().replace(/\.exe$/, "");

const hasRecursiveAndForce = (args: string[]): boolean => {
  let recursive = false;
  let force = false;
  for (const arg of args) {
    if (/^--recursive$|^-rec/i.test(arg)) {
      recursive = true;
    } else if (/^--force$|^-fo/i.test(arg)) {
      force = true;
    } else if (/^-[a-z]{1,4}$/i.test(arg)) {
      // rm -rf, rm -fr, rm -r -f 처럼 짧은 옵션을 묶어 쓰는 경우
      recursive ||= /r/i.test(arg);
      force ||= /f/i.test(arg);
    }
  }
  return recursive && force;
};

const findDangerousCommand = (command: string): string | null => {
  const segments = removeQuotedText(command).split(/&&|\|\||[;|&\n`()]|\$\(/);
  for (const segment of segments) {
    const tokens = segment.trim().split(/\s+/).filter(Boolean);
    // FOO=bar rm -rf 처럼 앞에 붙은 환경 변수 지정은 건너뛴다
    while (tokens[0] && /^[a-z_][a-z0-9_]*=/i.test(tokens[0])) {
      tokens.shift();
    }
    const name = getCommandName(tokens[0] ?? "");
    if (name === "sudo") {
      return "sudo";
    }
    if (DELETE_COMMANDS.has(name) && hasRecursiveAndForce(tokens.slice(1))) {
      return `${name} (재귀 강제 삭제)`;
    }
  }
  return null;
};

const command = parseInput(await readStdin()).tool_input?.command ?? "";
const dangerous = findDangerousCommand(command);

if (dangerous) {
  console.error(`위험한 명령어라 차단했습니다: ${dangerous}`);
  // PreToolUse의 종료 코드 2는 도구 실행을 차단한다
  process.exitCode = 2;
}
