# 🧩 이벤트 / 보상 관리 시스템

## 🔧 기술 스택
| 항목 | 사용 기술 |
|------|-----------|
| 언어 | TypeScript |
| 프레임워크 | NestJS |
| 인증 방식 | JWT |
| DB | MongoDB |
| 배포 환경 | Docker + docker-compose |
| 구조 | MSA (Auth / Gateway / Event) |

## 📁 프로젝트 구조
```
maplestory/
├── auth-server/       # 회원가입, 로그인, 역할 부여, JWT 발급
├── gateway-server/    # 인증/인가 체크, 라우팅 처리
├── event-server/      # 이벤트 등록, 몬스터 처치 기록, 보상 요청 처리
└── docker-compose.yml # 3개 서버를 통합 실행
```

## 🚀 실행 방법 (Docker Compose 기준)
```bash
# 1. 레포 클론
git clone https://github.com/kimhoechang/maplestory.git
cd maplestory

# 2. 실행
docker-compose up --build
```
2회 이후는 build 생략 가능
docker-compose up

> 📌 MongoDB는 기본 포트 `27017`, Nest 앱들은 각각 다음과 같이 실행됩니다:  
> - Gateway: http://localhost:3000  
> - Auth: http://localhost:3001  
> - Event: http://localhost:3002

## 🔐 역할 정의
| 역할 | 권한 |
|------|------|
| USER | 보상 요청, 본인 이력 조회 |
| OPERATOR | 이벤트 / 보상 등록, 전체 이력 조회 |
| AUDITOR | 전체 보상 이력 조회만 가능 |
| ADMIN | 모든 기능 접근 가능 |

## 🧪 주요 API 예시

### ✅ 로그인
```http
POST /auth/login
```
```json
{
  "email": "user@example.com",
  "password": "qwer1234"
}
```

### ✅ 보상 요청 (JWT 필요)
```http
POST /rewards
Authorization: Bearer <access_token>
```
```json
{
  "eventId": "event_object_id",
  "type": "point",
  "quantity": 100
}
```

### ✅ 보상 이력 조회
```http
GET /rewards
Authorization: Bearer <access_token>
```

### ✅ 전체 보상 이력 조회 (OPERATOR 이상)
```http
GET /rewards/all
Authorization: Bearer <access_token>
```

## ✅ 기능 체크리스트

| 기능 | 구현 여부 |
|------|------------|
| 회원가입 / 로그인 / 역할 부여 | ✅ |
| JWT 인증 / 권한 체크 | ✅ |
| 이벤트 등록 (조건, 기간, 상태 포함) | ✅ |
| 몬스터 처치 기록 | ✅ |
| 몬스터 10마리 처치 → 보상 지급 | ✅ |
| 보상 요청 중복 방지 | ✅ |
| 보상 이력 조회 (본인/관리자) | ✅ |
| 비활성 이벤트 보상 차단 | ✅ |
| 보상 종류(type) 및 수량(quantity) 명확화 | ✅ |

## 🧠 설계 의도 및 구현 중 고민

- **이벤트 설계**: 확장 가능하도록 조건을 고정값이 아닌 서비스 계층에서 유연하게 처리할 수 있도록 구성했습니다. 향후 Rule Engine 구조로도 확장 가능하도록 고려했습니다.
- **조건 검증**: 현재는 "몬스터 10마리 처치 시 보상 지급"이라는 간단한 로직이지만, 이벤트마다 별도의 조건을 부여해도 무리가 없도록 서비스 로직에 집중 배치했습니다.
- **API 구조**: 역할(Role) 기반으로 접근 제한을 걸 수 있도록 `@Roles()` 데코레이터와 `RolesGuard`를 적용했습니다. 역할별 접근이 명확하게 구분됩니다.
- **보상 처리**: 보상은 단순히 title로 표현되지 않고 `type`, `quantity`, `status`, `eventId` 등을 포함해 명확한 구조로 표현됩니다.
- **고민한 점**: 실제 서비스 환경을 고려하여 MSA 구조로 분리하고, 각 서버별 책임을 명확히 했습니다. 추후 Kafka나 Redis 등으로 확장도 고려할 수 있는 구조입니다.

---
