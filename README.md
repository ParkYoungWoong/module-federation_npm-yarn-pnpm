# npm

```bash
# 루트 프로젝트 및 워크스페이스 초기화
npm init -y --include-workspace-root --workspace=host --workspace=remote

# npm 버전 확인 및 패키지 매니저 강제 지정
npm -v # 예시) 10.8.2
corepack enable
corepack use npm@10.8.2

# 모든 워크스페이스의 패키지 설치
npm i --workspaces

# 모든 워크스페이스의 빌드
## --if-present 옵션: 워크스페이스에 특정 스크립트가 없는 경우에 무시
npm run build --workspaces --if-present

# 병렬 실행 불가로 개별 실행
npm start --workspace=host
npm start --workspace=remote
```

개별 워크스페이스에 패키지 설치하기

```bash
npm i axios --workspace=host
npm i lodash --workspace=remote
```

스크립트 병렬 실행을 위한 `concurrently` 설치 및 스크립트 추가

```bash
npm i concurrently
```

```json
{
  "scripts": {
    "start": "concurrently \"npm run start --workspace=host\" \"npm run start --workspace=remote\""
  }
}
```

# pnpm

`pnpm-workspace.yaml` 파일 생성 후 구조 지정

```yaml
packages:
  - "host"
  - "remote"
```

```bash
# 루트 프로젝트 및 워크스페이스 초기화
pnpm init

# 모든 워크스페이스의 패키지 설치
pnpm i

# 모든 워크스페이스의 빌드
pnpm -r build

# 모든 워크스페이스의 실행
pnpm -r start
```

개별 워크스페이스에 패키지 설치하기

```bash
pnpm --filter host add axios
pnpm --filter remote add lodash
```
