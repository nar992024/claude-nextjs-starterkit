---
description: "배포 전 체크리스트를 실행하고 배포 가능 여부를 보고합니다"
argument-hint: "[배포 환경 또는 추가 확인 사항]"
allowed-tools:
  [
    "Read",
    "Grep",
    "Glob",
    "Bash(git status:*)",
    "Bash(git diff:*)",
    "Bash(git log:*)",
    "Bash(git fetch:*)",
    "Bash(git branch:*)",
    "Bash(git rev-list:*)",
    "Bash(npm audit:*)",
    "Bash(npm run typecheck)",
    "Bash(npm run lint)",
    "Bash(npm run build)",
    "Bash(npm test)",
  ]
---

# Claude 명령어: Deploy Check

배포 전 체크리스트를 실행하고 결과를 보고합니다. 코드 수정, 커밋, 푸시, 배포는 하지 않습니다.

추가 확인 사항: $ARGUMENTS

## 프로세스

1. `package.json`과 `CLAUDE.md`에서 프로젝트에 있는 스크립트와 규칙을 확인합니다. 없는 스크립트는 "해당 없음"으로 표시합니다.
2. 아래 항목을 순서대로 실행합니다. 하나가 실패해도 나머지를 계속 확인합니다.
3. 개발 서버가 이 프로젝트의 `.next`를 쓰고 있으면 빌드 전에 사용자에게 알리고, 끄지 말고 확인을 받습니다.
4. 실행하지 못한 항목을 통과로 표시하지 않습니다.

## 체크리스트

**코드 상태**

- 커밋하지 않은 변경이 없는지
- 원격 브랜치보다 뒤처지거나 앞서 있지 않은지

**검증**

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm test` (스크립트가 있을 때)

**보안**

- `npm audit --omit=dev`
- 저장소에 비밀 값이나 `.env` 파일이 포함되지 않았는지

**설정**

- 코드에서 쓰는 환경 변수 목록과 문서화 여부 (값은 출력하지 않음)
- 개발용 주소, 디버그 코드, 임시 라우트, 남은 `console.log`
- 데이터베이스가 있으면 마이그레이션 필요 여부와 롤백 방법

**사용자가 직접 확인할 항목**

- 배포 환경에 환경 변수가 설정되어 있는지
- 배포 후 주요 화면과 기능을 확인할 계획이 있는지

## 출력 형식

```text
판정: 배포 가능 / 조건부 가능 / 배포 불가

| 항목 | 결과 | 비고 |
| ... | ✅ 통과 / ❌ 실패 / ⚠️ 확인 필요 / ➖ 해당 없음 | ... |

배포 전 해결할 항목:
1. ...
```

실패 항목에는 실제 오류 메시지의 핵심을 함께 적습니다.
