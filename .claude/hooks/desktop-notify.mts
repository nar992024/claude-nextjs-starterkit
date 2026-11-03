/// <reference types="node" />
import { spawnSync } from "node:child_process";
import { basename, resolve } from "node:path";

interface HookInput {
  hook_event_name?: string;
  message?: string;
  title?: string;
  agent_type?: string;
}

const projectName = basename(resolve(import.meta.dirname, "../.."));

// Windows 기본 PowerShell의 앱 ID로 등록 없이 알림을 띄운다
const POWERSHELL_APP_ID =
  "{1AC14E77-02E7-4E5D-B744-2EB1AE5198B7}\\WindowsPowerShell\\v1.0\\powershell.exe";

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

const escapeXml = (text: string): string =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// 한글이 깨지거나 문구가 명령어로 해석되지 않도록 UTF-16 Base64로 전달한다
const runPowerShell = (script: string): void => {
  const result = spawnSync(
    "powershell.exe",
    [
      "-NoProfile",
      "-NonInteractive",
      "-EncodedCommand",
      Buffer.from(
        `$ErrorActionPreference='Stop';${script}`,
        "utf16le",
      ).toString("base64"),
    ],
    { encoding: "utf8", windowsHide: true },
  );
  if (result.status !== 0) {
    console.error(`데스크톱 알림 실패: ${result.stderr?.slice(0, 300) ?? ""}`);
    process.exitCode = 1;
  }
};

const showToast = (title: string, body: string): void => {
  const xml = `<toast><visual><binding template="ToastGeneric"><text>${escapeXml(title)}</text><text>${escapeXml(body)}</text></binding></visual></toast>`;
  runPowerShell(
    [
      "[Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null",
      "[Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom.XmlDocument, ContentType = WindowsRuntime] | Out-Null",
      "$xml = New-Object Windows.Data.Xml.Dom.XmlDocument",
      `$xml.LoadXml('${xml.replace(/'/g, "''")}')`,
      "$toast = [Windows.UI.Notifications.ToastNotification]::new($xml)",
      `[Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier('${POWERSHELL_APP_ID}').Show($toast)`,
    ].join(";"),
  );
};

const playSound = (): void => {
  runPowerShell(
    `(New-Object System.Media.SoundPlayer "$env:WINDIR\\Media\\tada.wav").PlaySync()`,
  );
};

const input = parseInput(await readStdin());

// 데스크톱 알림과 사운드는 현재 Windows에서만 동작한다
if (process.platform === "win32") {
  const title = `Claude Code · ${projectName}`;
  if (input.hook_event_name === "Notification") {
    showToast(input.title ?? title, input.message ?? "확인이 필요합니다");
  } else if (input.hook_event_name === "SubagentStop") {
    showToast(title, `${input.agent_type ?? "서브에이전트"} 작업 완료`);
  } else if (input.hook_event_name === "Stop") {
    playSound();
  }
}
