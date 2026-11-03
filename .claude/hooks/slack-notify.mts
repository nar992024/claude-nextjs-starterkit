/// <reference types="node" />
import { basename, resolve } from "node:path";

interface HookInput {
  hook_event_name?: string;
  message?: string;
  cwd?: string;
}

const SEND_TIMEOUT_MS = 5000;

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

// Slack 메시지에서 제어 문자로 쓰이는 &, <, > 를 이스케이프한다
const escapeSlackText = (text: string): string =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const buildStatus = (input: HookInput): string | null => {
  if (input.hook_event_name === "Notification") {
    const status = "🔐 권한 요청";
    return input.message
      ? `${status} (${escapeSlackText(input.message)})`
      : status;
  }
  if (input.hook_event_name === "Stop") {
    return "✅ 작업 완료";
  }
  return null;
};

// PC 시간대 기준으로 2026-11-03 10:49:12 형식을 만든다 (sv-SE 로케일이 이 형식을 쓴다)
const formatTime = (date: Date): string =>
  new Intl.DateTimeFormat("sv-SE", {
    dateStyle: "short",
    timeStyle: "medium",
  }).format(date);

// 명령어, 코드, 응답 내용은 외부로 보내지 않고 알림 문구만 만든다
const buildMessage = (input: HookInput): string | null => {
  const project = escapeSlackText(
    basename(process.env.CLAUDE_PROJECT_DIR ?? input.cwd ?? process.cwd()),
  );

  const status = buildStatus(input);
  if (!status) {
    return null;
  }

  return [
    `*프로젝트:* ${project}`,
    `*이벤트:* ${input.hook_event_name}`,
    `*상태:* ${status}`,
    `*시간:* ${formatTime(new Date())}`,
  ].join("\n");
};

// 웹훅 URL은 비밀 정보이므로 오류 출력에 포함하지 않는다
const sendToSlack = async (url: string, text: string): Promise<void> => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
    signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
  });
  if (!response.ok) {
    const reason = (await response.text()).slice(0, 100);
    throw new Error(`HTTP ${response.status} ${reason}`);
  }
};

// hook은 Next.js와 달리 .env를 자동으로 읽지 않는다. 이미 설정된 환경 변수가 있으면 그 값을 우선한다
const loadProjectEnv = (): void => {
  // loadEnvFile은 빈 값도 덮어쓰지 않으므로 빈 환경 변수는 없는 것으로 처리한다
  if (!process.env.SLACK_WEBHOOK_URL?.trim()) {
    delete process.env.SLACK_WEBHOOK_URL;
  }
  try {
    process.loadEnvFile(resolve(import.meta.dirname, "../../.env"));
  } catch {
    // .env가 없으면 전송하지 않고 넘어간다
  }
};

loadProjectEnv();
const webhookUrl = process.env.SLACK_WEBHOOK_URL?.trim();
const message = buildMessage(parseInput(await readStdin()));

if (webhookUrl && message) {
  try {
    await sendToSlack(webhookUrl, message);
  } catch (error) {
    // fetch의 원본 오류에 URL이 섞이지 않도록 오류 이름과 직접 만든 문구만 출력한다
    const detail =
      error instanceof Error && error.message.startsWith("HTTP ")
        ? error.message
        : error instanceof Error
          ? error.name
          : "알 수 없는 오류";
    console.error(`Slack 알림 전송 실패: ${detail}`);
    // 종료 코드 2는 Stop hook에서 Claude의 종료를 막으므로 1만 사용한다
    process.exitCode = 1;
  }
}
