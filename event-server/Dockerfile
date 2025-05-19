# 1. Node.js 18 버전을 베이스 이미지로 사용
FROM node:18

# 2. 컨테이너 안에서 사용할 작업 디렉토리 생성 및 진입
WORKDIR /app

# 3. pnpm 설치 (기본은 npm만 있음)
RUN npm install -g pnpm

# 4. 패키지 관리 파일 복사
COPY pnpm-lock.yaml package.json ./

# 5. 의존성 설치
RUN pnpm install --frozen-lockfile

# 6. 전체 코드 복사
COPY . .

# 7. NestJS 빌드
RUN pnpm build

# 8. 앱 실행
CMD ["node", "dist/main"]
