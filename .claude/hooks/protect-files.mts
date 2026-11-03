/// <reference types="node" />

interface HookInput {
  tool_input?: { file_path?: string };
}

// .env.example은 비밀 값이 없는 템플릿이라 수정을 허용한다
const PROTECTED_FILE_PATTERNS = [
  /^\.env(?!\.example$)(?:\..+)?$/i,
  /^package-lock\.json$/i,
];

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

const filePath = parseInput(await readStdin()).tool_input?.file_path ?? "";
const fileName = filePath.split(/[\\/]/).pop() ?? "";

if (PROTECTED_FILE_PATTERNS.some((pattern) => pattern.test(fileName))) {
  console.error(
    `보호된 파일이라 수정할 수 없습니다: ${fileName}. 비밀 값은 사용자가 직접 수정하고, package-lock.json은 npm 명령으로 갱신합니다.`,
  );
  // PreToolUse의 종료 코드 2는 도구 실행을 차단한다
  process.exitCode = 2;
}
