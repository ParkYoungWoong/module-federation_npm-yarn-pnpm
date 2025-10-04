# 모듈 페더레이션 이해 with npm, yarn, pnpm

## 프로젝트 초기화

```bash
git restore .
git clean -fdx
```

## npm

프로젝트 초기화

```bash
npm init -y
```

`package.json`의 `workspaces` 속성에 워크스페이스 경로 지정

```json
{
  "workspaces": [
    "apps/*"
  ]
}
```

npm 버전 확인 및 패키지 매니저 강제 지정

```bash
npm -v # E.g, 10.8.2
corepack enable
corepack use npm@10.8.2
```

모든 워크스페이스의 패키지 설치

- `ws`(`—-workspaces`): 모든 워크스페이스에 대한 작업 실행

```bash
npm i --ws
```

모든 워크스페이스의 빌드

- `-if-present`: 워크스페이스에 특정 스크립트(`dev`, `build` 등)가 없는 경우에 무시

```bash
npm run build --ws --if-present
```

병렬 실행 불가로 개별 실행

```bash
npm start --workspace=remote
npm start --workspace=host
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

```bash
npm start
```

개별 워크스페이스에 패키지 설치하기

```bash
npm i axios --workspace=host
npm i lodash-es --workspace=remote
```

---

## yarn

프로젝트 초기화

- `w`(`-workspace`): 루트 프로젝트 및 워크스페이스 초기화

```bash
yarn init -w
```

루트 `package.json`에서 루트 스크립트 실행을 제어하기 위해 `name` 속성의 값을 `root`로 지정하고 `workspaces` 속성에 워크스페이스 경로 지정

```json
{
  "name": "root",
  "workspaces": [
    "apps/*"
  ]
}
```

yarn 버전 확인 및 패키지 매니저 강제 지정

```bash
yarn -v # E.g, 4.10.3
corepack enable
corepack use yarn@4.10.3
```

모든 워크스페이스의 패키지 설치

```bash
yarn
# 또는
yarn install
```

`@module-federation/enhanced` 모듈의 피어 의존성(Peer Dependency) 설치

- npm, pnpm: `node_modules` 구조에서 상위 디렉토리의 의존성을 찾을 수 있음
- yarn: 가상 파일 시스템에서 명시적으로 선언된 의존성만 접근 가능

```bash
yarn add -D typescript tapable
```

모든 워크스페이스의 빌드

- `foreach`: 필터링된 각각의 워크스페이스에 대한 작업 실행
- `-A`(`-all`): 모든 워크스페이스를 필터링
- `-p`(`-parallel`): 명령어를 병렬로 실행
- `-i`(`-interlaced`): 명령어를 병렬 실행 시 실시간으로 진행 상황 출력(`-p`와 같이 사용)
- `-t`(`--topological`): 워크스페이스 내 패키지 간 **의존성 관계**를 파악해 스크립트를 **올바른 순서**로 실행(토폴로지 정렬)
- `—exclude root`: 기본적으로 루트 스크립트가 실행을 제외하도록 지정

```bash
yarn workspaces foreach -Apit --exclude root run build
```

모든 워크스페이스의 실행

```bash
yarn workspaces foreach -Apit --exclude root run start
```

개별 워크스페이스에 패키지 설치하기

```bash
yarn workspace host add axios
yarn workspace remote add lodash-es
```

---

## pnpm

`pnpm-workspace.yaml` 파일 생성 후 `packages` 속성에 워크스페이스 경로 지정

```yaml
packages:
  - "apps/*"
```

프로젝트 초기화(루트 프로젝트 및 워크스페이스 초기화)

```bash
pnpm init
```

pnpm 버전 확인 및 패키지 매니저 강제 지정

```bash
pnpm -v # E.g, 10.17.1
corepack enable
corepack use pnpm@10.17.1
```

모든 워크스페이스의 패키지 설치

```bash
pnpm i
```

모든 워크스페이스의 빌드

- `r`(`-recursive`): 모든 워크스페이스의 토폴로지 정렬, 병렬 실행, 루트 제외 지정

```bash
pnpm -r build
```

모든 워크스페이스의 실행

```bash
pnpm -r start
```

개별 워크스페이스에 패키지 설치하기

```bash
pnpm --filter host add axios
pnpm --filter remote add lodash-es
```