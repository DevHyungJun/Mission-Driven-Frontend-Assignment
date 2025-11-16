# Mission-Driven-Frontend-Assignment

미션드리븐 프론트엔드 과제 전형

## 프로젝트 개요

콘텐츠 생성 폼 애플리케이션으로, 이미지 업로드, 카테고리 선택, 제목 입력, 활동 유형 설정, 그리고 세션별 상세 정보(날짜, 시간, 활동 내용)를 관리할 수 있는 웹 애플리케이션입니다.

## 기술 스택

### Frontend Framework & Library

- **Next.js** 16.0.2 - React 프레임워크
  - **선택 이유**: App Router를 통한 파일 기반 라우팅으로 개발 생산성 향상, 내장된 최적화 기능(이미지 최적화, 코드 스플리팅)
- **React** 19.2.0 - UI 라이브러리

- **TypeScript** 5 - 타입 안정성

### State Management

- **Zustand** 5.0.8 - 경량 상태 관리 라이브러리
  - **선택 이유**: Redux 대비 보일러플레이트 코드가 적고 학습 곡선이 낮음, React 외부 의존성 없이 독립적인 스토어 관리, 프로젝트 규모에 적합한 경량 라이브러리. 카테고리, 콘텐츠 제목, 활동 유형, 세션 정보 등 여러 도메인 상태를 간단하게 관리.

### Form Management

- **React Hook Form** 7.66.0 - 폼 상태 관리 및 검증
  - **선택 이유**: 제어 컴포넌트보다 성능이 우수한 비제어 컴포넌트 방식으로 리렌더링 최소화, 간결한 API로 복잡한 폼 검증 로직을 쉽게 구현, 제목 입력(8자 이상), 검증 규칙을 유지보수하기 쉽게 관리.

### Styling

- **Tailwind CSS** 4 - 유틸리티 기반 CSS 프레임워크

  - **선택 이유**: 별도의 CSS 파일 작성 없이 HTML에서 바로 스타일링 가능하여 개발 속도 향상, 반응형 디자인을 유틸리티 클래스로 쉽게 구현(모바일 우선 설계), 번들 크기 최적화로 불필요한 CSS 제거.

- **tailwind-merge** 3.4.0 - Tailwind 클래스 병합 유틸리티

  - **선택 이유**: 동적 클래스명 병합 시 충돌하는 Tailwind 클래스를 자동으로 해결하여 예상치 못한 스타일 오버라이드 방지.

### Date & Time

- **date-fns** 4.1.0 - 날짜/시간 조작 라이브러리
  - **선택 이유**: Moment.js 대비 경량이고 불변성을 지원하여 예상치 못한 사이드 이펙트 방지, 날짜 선택, 시간 계산(시작/종료 시간 검증), 세션 날짜 관리 등 복잡한 날짜/시간 로직을 안전하게 처리.

### Testing

- **Jest** 29.7.0 - 테스팅 프레임워크

  - **선택 이유**: React 생태계와의 높은 호환성, 내장된 모킹 및 스냅샷 테스팅 기능, 코드 커버리지 자동 수집으로 테스트 품질 관리.

- **@testing-library/react** 16.3.0 - React 컴포넌트 테스팅
  - **선택 이유**: 사용자 관점에서 컴포넌트를 테스트하는 접근 방식으로 실제 사용자 행동과 유사한 테스트 작성, 접근성(a11y) 테스트를 자연스럽게 포함, 구현 세부사항이 아닌 컴포넌트 동작에 집중하여 리팩토링에 안정적인 테스트 코드 작성.

## 주요 기능

### 1. 이미지 관리

- **메인 이미지 업로드**: 대표 이미지 선택 및 미리보기
- **추가 이미지 업로드**: 다중 이미지 업로드 및 관리

### 2. 카테고리 선택

- 최대 2개까지 카테고리 선택 가능
- 선택된 카테고리 시각적 피드백 제공
- 전용 카테고리 선택 페이지 제공

### 3. 콘텐츠 정보 입력

- **제목 입력**: 8자 이상 필수 검증
- **활동 유형 선택**: 온라인/오프라인 선택

### 4. 상세 정보 관리

- **세션 관리**

  - 세션 추가/삭제 기능
  - 삭제 확인 모달
  - 회차별 정보 표시 및 번호 자동 재정렬

- **날짜 선택**

  - 달력 컴포넌트를 통한 날짜 선택
  - 오늘 이후 날짜만 선택 가능

- **시간 선택**

  - 시작 시간/종료 시간 선택
  - 오전/오후 토글
  - 키보드 화살표/숫자키로 시간 조정
  - 시작 시간 기준 종료 시간 자동 계산
  - 시작 시간보다 종료 시간이 빠른 경우 자동 조정 및 토스트 알림

- **활동 내용 입력**
  - 텍스트 영역 입력
  - 최소/최대 글자 수 검증
  - 연속 공백 방지 검증

### 5. 폼 검증 및 완료 체크

- 모든 필수 필드 완료 여부 자동 체크
- 조건에 따른 다음 버튼 활성화/비활성화

## 프로젝트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── _components/              # 페이지별 컴포넌트
│   │   ├── MainImageUpload/      # 메인 이미지 업로드
│   │   ├── AdditonalImages/      # 추가 이미지 업로드
│   │   ├── CategorySelector/     # 카테고리 선택기
│   │   ├── ContentTitle/         # 제목 입력
│   │   ├── ActivityTypeSelector/ # 활동 유형 선택기
│   │   ├── DetailInfo/           # 상세 정보 관리
│   │   └── NextButton/           # 다음 버튼
│   ├── (route)/                  # 라우트 그룹
│   │   └── category-select/      # 카테고리 선택 페이지
│   └── _utils/                   # 유틸리티 함수
│
├── components/                   # 공통 컴포넌트
│   ├── Button/                   # 버튼 컴포넌트
│   ├── Calender/                 # 달력 컴포넌트
│   ├── TimePickerButton/         # 시간 선택 컴포넌트
│   ├── Modal/                    # 모달 컴포넌트
│   ├── Textarea/                 # 텍스트 영역 컴포넌트
│   └── Icon/                     # 아이콘 컴포넌트
│
├── stores/                       # Zustand 상태 관리
│   ├── categoryStore.ts          # 카테고리 상태
│   ├── contentTitleStore.ts      # 제목 상태
│   ├── activityTypeStore.ts      # 활동 유형 상태
│   └── sessionStore.ts           # 세션 상태
│
├── provider/                     # Context Provider
│   ├── CategoryProvider/         # 카테고리 컨텍스트
│   ├── ImageProvider/            # 이미지 컨텍스트
│   ├── ToastProvider/            # 토스트 알림 컨텍스트
│   └── SectionProvider/          # 섹션 컨텍스트
│
└── constant/                     # 상수 정의
    └── TEXTAREA_VALIDATION.ts    # 텍스트 영역 검증 상수
```

## 개발 환경 설정

### 필수 요구사항

- Node.js 20.x 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 실행
npm run lint

# 테스트 실행
npm test
```

## 테스트

프로젝트는 Jest와 React Testing Library를 사용하여 단위 테스트와 통합 테스트를 포함하고 있습니다.

### 컴포넌트 테스트

#### 1. MainImageUpload (통합 테스트)

- UI 상태 표시 (기본 상태, 업로드된 이미지 상태)
- 파일 입력 설정 (accept 속성, multiple 속성)
- 파일 업로드 (이미지 선택, URL 생성, 미리보기 표시)
- 상호작용 (이미지 클릭, 재선택)
- ImageProvider 연동 (상태 동기화)
- 접근성 (ARIA 레이블, 키보드 네비게이션)

#### 2. AdditonalImages (통합 테스트)

- UI 상태 표시 (기본 상태, 이미지 목록 표시)
- 파일 입력 설정
- 파일 업로드 (다중 이미지 선택, URL 생성)
- 4장 제한 (최대 개수 초과 시 처리)
- ImageProvider 연동 (상태 동기화)
- 접근성

#### 3. ContentTitle (통합 테스트)

- React Hook Form 연동 (텍스트 입력, 값 변경, watch)
- Validation (8자 이상 검증, 에러 메시지 표시)
- Store 저장 (Zustand store 연동, 초기값 로드)
- 접근성 (ARIA 레이블)

#### 4. DetailInfo (통합 테스트)

- 세션 추가 (버튼 클릭 시 세션 추가, 화면 업데이트, 여러 번 추가)
- 세션 삭제 (삭제 버튼 표시 조건, 모달 열기/닫기, 취소/확인 동작, 올바른 세션 삭제)
- 모달 동작 (모달 내용 표시, 닫기 동작, 여러 세션 중 삭제)
- 회차 정보 표시 (회차 번호 표시, 삭제 후 번호 재정렬)

#### 5. DetailTextarea (통합 테스트)

- React Hook Form 연동
- Validation (최소/최대 글자 수, 연속 공백 방지)
- Store 저장 (세션별 텍스트 저장)
- 접근성

#### 6. NextButton (통합 테스트)

- 버튼 활성화/비활성화 (category-select 페이지, 다른 페이지)
- Store 연동 (모든 필수 조건 만족 여부 체크)
- 클릭 동작 (라우팅, 조건에 따른 동작)
- 접근성

#### 7. CategorySelectPage (통합 테스트)

- 카테고리 선택 UI (버튼 표시, 선택 상태 시각적 피드백)
- categoryStore 연동 (선택/취소, 최대 2개 제한)
- 메인 화면 연동 (라우팅)

### 커스텀 훅 테스트

#### useCompletedAll (단위 테스트)

- 모든 조건이 만족되는 경우 (true 반환)
- mainImage 조건 (필수 여부)
- selectedCategories 조건 (필수 여부)
- contentTitle 조건 (8자 이상 검증)
- activityType 조건 (필수 여부)
- sessions 조건 (날짜, 시작 시간, 종료 시간, 상세 텍스트 검증)
- 복합 시나리오 (여러 조건 조합)

### 유틸리티 함수 테스트

#### handleImageUpload (단위 테스트)

- 이미지 형식 검증 (유효한 형식, 잘못된 형식)
- URL 생성 (정상 생성)
- 기존 이미지 정리 (revokeObjectURL 호출)
- 예외 상황 처리 (에러 핸들링)

#### handleMultiImageUpload (단위 테스트)

- 이미지 형식 검증
- URL 생성
- 다중 업로드 (여러 이미지 처리)
- 최대 4장 제한 (개수 제한 처리)
- 기존 이미지 정리
- 예외 상황 처리

#### getCategoryDisplayText (단위 테스트)

- 빈 배열 처리
- 단일 카테고리 선택
- 다중 카테고리 선택 (2개)
- 카테고리 순서
- 특수 문자 포함 카테고리
- 잘못된 ID 필터링
- 복합 시나리오

#### handleCategoryClick (단위 테스트)

- 카테고리 선택 (추가)
- 카테고리 취소 (제거)
- 최대 2개 제한 (선택 제한 처리)
- 복합 시나리오

### 테스트 실행

```bash
# 테스트 실행
npm test
```

## 주요 구현 특징

### 1. 클린 코드 원칙 적용

- 단일 책임 원칙 (SRP)
- 관심사 분리
- 높은 응집도, 낮은 결합도
- 의미 있는 네이밍

### 2. 컴포넌트 설계

- 재사용 가능한 공통 컴포넌트
- 컴포넌트 컴포지션 패턴 활용
- Props Drilling 방지

### 3. 상태 관리

- Zustand를 통한 전역 상태 관리
- Context API를 통한 지역 상태 관리
- 폼 상태는 React Hook Form으로 관리

### 4. 접근성 (A11y)

- ARIA 레이블 및 속성 활용
- 스크린 리더 호환성 고려
- 의도에 맞는 시멘틱 태그 사용

### 5. 반응형 디자인

- 모바일 우선 설계
- Tailwind CSS 미디어 쿼리 활용
- 반응형 레이아웃 구현

## 배포

프로젝트는 Next.js의 빌드 시스템을 사용하여 배포 가능합니다.

### 로컬 빌드 및 실행

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

### 배포 방법

##### AWS EC2를 이용한 배포

**필수 요구사항:**

- EC2 인스턴스 (Ubuntu/Amazon Linux)
- Node.js 20.x 이상 설치

**배포 절차:**

```bash
# 1. EC2 인스턴스에 접속 후 프로젝트 클론
git clone https://github.com/DevHyungJun/Mission-Driven-Frontend-Assignment.git
cd mission-driven-frontend-assignment

# 2. 의존성 설치 (프로덕션 환경에서는 npm ci 권장)
npm ci --production=false

# 3. 프로덕션 빌드
npm run build

# 4. PM2를 이용한 프로세스 관리 (선택사항)
npm install -g pm2
pm2 start npm --name "frontend-assignment" -- start
pm2 save
pm2 startup

# 5. EC2 보안 그룹 설정
# 인바운드 규칙에 HTTP(80), HTTPS(443), SSH(22) 포트 허용

# 6. Nginx를 이용한 리버스 프록시 설정 (선택사항)
# /etc/nginx/sites-available/default 파일 수정
```

**Nginx 설정 예시:**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**참고사항:**

- Next.js는 기본적으로 포트 3000에서 실행됩니다.
- PM2를 사용하면 서버 재시작 시에도 애플리케이션이 자동으로 재시작됩니다.
- Nginx 설정 변경 후 `sudo nginx -t`로 설정을 검증하고 `sudo systemctl reload nginx`로 재로드하세요.
- HTTPS를 사용하려면 Let's Encrypt와 Certbot을 이용하여 SSL 인증서를 설정할 수 있습니다.
