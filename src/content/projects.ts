/**
 * 프로젝트 데이터. 목록 카드와 /projects/[slug] 상세 페이지가 모두 이 파일을 읽는다.
 * - contributions: "내가 직접 한 일"만 넣는다(팀 작업과 구분).
 * - PDF에 없는 항목은 비워두고 todos에 적는다. 상세 페이지는 빈 항목을 숨긴다.
 */

export type TeamMember = { role: string; count: number };

export type Troubleshooting = {
  title: string;
  /** 어느 화면/영역에서 생긴 문제인지 */
  area: string;
  /** 한 줄 요약 */
  summary: string;
  problem: string;
  cause: string;
  solution: string;
  result: string;
  steps: { title: string; description: string }[];
  learned: string;
  /** 코드 캡처 설명. 이미지는 TODO */
  codeCaption?: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  /** 카드에 보이는 한 줄 */
  oneLiner: string;
  period: string;
  ongoing: boolean;
  featured: boolean;
  teamName?: string;
  team: TeamMember[];
  /** 내 역할 한 줄 (카드·상세 상단) */
  myRole: string;
  award?: string;
  stack: string[];
  /** 문제 정의 */
  problem?: string;
  /** 무엇을 만들었는가 */
  overview: string;
  impact?: string[];
  contributions: { area: string; items: string[] }[];
  screens?: { title: string; description: string; image?: string }[];
  troubleshooting?: Troubleshooting;
  /** 결과 */
  results?: string[];
  /** 배운 점 */
  learned?: string[];
  links: { label: string; href: string }[];
  thumbnail?: string;
  todos: string[];
};

export const projects: Project[] = [
  {
    slug: "gif",
    title: "GIF",
    subtitle: "GSM Idea Festival 통합 관리 서비스",
    oneLiner: "수기로 하던 등록·심사·점수 집계·등수 발표를 하나의 서비스로",
    period: "2026.06 –",
    ongoing: true,
    featured: true,
    teamName: "VOID-GSM",
    team: [
      { role: "FE", count: 3 },
      { role: "BE", count: 2 },
      { role: "DevOps", count: 1 },
      { role: "Design", count: 1 },
    ],
    myRole: "Front-End · 점수 부여/집계와 관리자 기능 담당",
    award: "2026 DevFest 우수상 · 공동 2위",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "TanStack Query", "Axios", "Turborepo"],
    problem:
      "GSM Idea Festival은 프로젝트 등록부터 점수 집계, 등수 발표까지 수기로 진행되어 시간이 많이 들고 실수가 생기기 쉬웠습니다.",
    overview:
      "프로젝트 등록부터 심사, 점수 수합, 등수 확인까지의 과정을 하나의 서비스로 통합해 반복적인 운영 작업을 줄이고 결과를 효율적으로 관리할 수 있도록 만들었습니다.",
    impact: ["GSM 재학생 130명 이상 대상 실제 운영", "프로젝트 등록 · 결과 보고서 제출 과정 서비스화"],
    contributions: [
      {
        area: "Admin · 평가 및 점수 관리",
        items: ["평가자별 담당 영역에 따른 점수 입력 및 수정", "평가 점수 수합 및 프로젝트별 순위 산출"],
      },
      {
        area: "Client · 프로젝트 및 문의",
        items: [
          "프로젝트 생성 및 팀원 검색, 썸네일 업로드, 유효성 검사",
          "문의 작성·수정 및 Markdown 미리보기 구현",
        ],
      },
      {
        area: "Admin · 운영 관리",
        items: [
          "문의 관리, 선생님 배정, 팀장 양도 등 관리 기능 구현",
          "사용자 권한에 따른 관리자 페이지 접근 제어",
        ],
      },
      {
        area: "Common · UI / 공통 기능",
        items: ["Tailwind CSS 기반 다크모드 구현", "packages/ui 기반 공용 컴포넌트 구축 및 재사용"],
      },
    ],
    screens: [
      {
        title: "점수 부여 목록",
        description: "팀별 평가 상태를 병렬 조회해 완료 · 미부여를 필터링",
      },
      {
        title: "담당 선생님 배정",
        description: "프로젝트를 고르면 슬라이드 패널로 선생님 목록 표시, 팀당 1명만 배정",
      },
    ],
    troubleshooting: {
      title: "첫 채점이 ‘수정’ 요청으로 나가던 문제",
      area: "Admin · 점수 부여",
      summary: "서버 응답 방식에 기대던 판정 로직을 실제 데이터 기준으로 개선",
      problem:
        "Admin 점수 부여 화면에서 처음 채점하는 팀의 점수가 저장되지 않았습니다. DevTools의 Network 탭을 보니 첫 채점인데도 등록(POST)이 아니라 수정(PATCH) 요청이 나가고 있었습니다.",
      cause:
        "‘기존 점수가 있는가’를 existingScore !== null로 판단했는데, 이 조건은 점수가 없으면 서버가 404를 반환하고 프론트가 이를 null로 처리한다는 전제에 의존하고 있었습니다. 백엔드가 미채점 팀에도 200과 기본값을 반환하도록 바뀌면서 조건이 항상 참이 되었습니다.",
      solution:
        "서버 응답 자체가 아니라 실제 채점 데이터의 존재 여부로 판단하도록 바꿨습니다. 12개 채점 필드 중 유효한 점수가 하나라도 있으면 PATCH, 모두 비어 있으면 POST로 요청합니다.",
      result: "첫 채점은 POST, 기존 점수 수정은 PATCH로 정확히 구분되었습니다.",
      steps: [
        {
          title: "원인 분석",
          description: "UI에서 문제를 발견한 뒤, DevTools의 Network 탭에서 실제 요청과 응답을 확인하며 원인을 추적했습니다.",
        },
        {
          title: "안정적인 로직 설계",
          description:
            "서버의 응답 형태를 전제로 하지 않고 실제 점수 데이터의 존재 여부를 기준으로 판단해, Back-End 응답 방식이 바뀌어도 동작하도록 했습니다.",
        },
      ],
      learned: "서버의 응답 방식에 의존하기보다 실제 데이터와 상태를 기준으로 판단하는 것이 중요하다는 것을 배웠습니다.",
      codeCaption: "useScoreArea.ts · 판정 기준 추가, 분기 조건 변경",
    },
    results: ["GSM 재학생 130명 이상 대상으로 실제 운영", "2026 DevFest 우수상 · 공동 2위"],
    learned: ["서버의 응답 방식에 의존하기보다 실제 데이터와 상태를 기준으로 판단하는 것이 중요하다는 것을 배웠습니다."],
    links: [],
    todos: ["GitHub · 배포 링크", "썸네일 이미지", "화면 스크린샷 2장", "트러블슈팅 코드 캡처"],
  },
  {
    slug: "signal",
    title: "Signal",
    subtitle: "AI 기반 딥페이크 피해 예방 · 탐지 · 대응 솔루션",
    oneLiner: "흩어져 있던 피해 확인·증거 정리·신고·상담을 한 곳에서",
    period: "2026.08 –",
    ongoing: true,
    featured: true,
    teamName: "소마어스",
    team: [
      { role: "FE", count: 2 },
      { role: "BE", count: 1 },
      { role: "Design", count: 1 },
    ],
    myRole: "Front-End · 신고·상담·탐지 플로우와 인증 처리 담당",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "TanStack Query", "Axios"],
    problem:
      "딥페이크 피해는 피해 확인, 증거 정리, 신고, 상담이 각각 다른 곳에서 이루어져 피해자가 무엇부터 해야 할지 막막하고, 대응 과정을 혼자 감당해야 하는 경우가 많았습니다.",
    overview:
      "딥페이크 피해 예방과 도용 탐지에 AI를 활용하고, 신고서 초안 자동 구성과 기관 연동까지 하나의 서비스로 통합해 피해 대응에 필요한 과정을 한 곳에서 지원합니다.",
    contributions: [
      {
        area: "신고 지원 작성 플로우",
        items: [
          "피해 유형 선택부터 상세 정보 입력, 신고서 초안 확인·수정까지의 화면 흐름 구현",
          "입력값 검증 및 신고 기관 안내 화면 연결",
        ],
      },
      {
        area: "익명 상담 기능",
        items: [
          "로그인 없이 이용 가능한 익명 상담 세션과 대화 흐름 구현",
          "대화 저장 동의, 빠른 질문, 대화 초기화 등 주요 기능 구성",
        ],
      },
      {
        area: "딥페이크 탐지 및 이미지 보호",
        items: [
          "이미지·영상 업로드부터 탐지 요청, 처리 상태 확인, 결과 표시까지 구현",
          "분석 후 보호본 생성 결과 확인 및 다운로드 연동",
        ],
      },
      {
        area: "인증 및 비동기 상태 처리",
        items: [
          "인증 만료 상황에서 토큰 재발급 및 기존 요청 처리",
          "분석·보호 작업의 상태에 따른 화면 갱신 및 중복 동작 방지",
        ],
      },
    ],
    troubleshooting: {
      title: "같은 탭에서 인증 상태가 갱신되지 않던 문제",
      area: "Auth · 인증 상태 관리",
      summary: "같은 탭에서 토큰 변경을 감지하지 못하던 문제를 이벤트 기반으로 개선",
      problem: "로그인·로그아웃 후에도 현재 페이지와 헤더의 인증 상태가 즉시 갱신되지 않았습니다.",
      cause:
        "로그인 여부는 localStorage의 토큰으로 판단하고, 변경 신호로는 storage 이벤트만 쓰고 있었습니다. storage 이벤트는 다른 탭의 변경은 감지하지만, 값을 바꾼 현재 탭에서는 발생하지 않습니다.",
      solution:
        "토큰을 저장·삭제하는 함수에서 직접 auth-token-changed 이벤트를 발생시키고, 구독하는 쪽에서 storage와 이 이벤트를 함께 감지하도록 바꿨습니다.",
      result: "로그인·로그아웃 직후에도 현재 페이지와 헤더의 인증 상태가 즉시 반영됩니다.",
      steps: [
        {
          title: "브라우저 동작 범위 이해",
          description:
            "storage 이벤트가 값을 변경한 현재 탭에서는 발생하지 않는다는 동작 범위를 이해하고, 이를 고려한 이벤트 구독 구조가 필요하다는 것을 파악했습니다.",
        },
        {
          title: "변경 지점에서 직접 알리기",
          description: "토큰이 저장·삭제되는 지점에서 직접 이벤트를 발생시켜, 같은 탭에서도 인증 상태가 즉시 갱신되도록 했습니다.",
        },
      ],
      learned: "브라우저 이벤트에만 의존하기보다, 상태가 변경되는 지점에서 직접 변경 신호를 전달하는 것이 중요하다는 것을 배웠습니다.",
      codeCaption: "authToken.ts, useIsLoggedIn.ts · 이벤트 발생, 구독 변경",
    },
    // TODO: 결과·성과 (진행 중)
    learned: ["브라우저 이벤트에만 의존하기보다, 상태가 변경되는 지점에서 직접 변경 신호를 전달하는 것이 중요하다는 것을 배웠습니다."],
    links: [],
    todos: ["결과 · 성과", "GitHub · 배포 링크", "썸네일 이미지", "트러블슈팅 코드 캡처"],
  },
  {
    slug: "flooding",
    title: "Flooding",
    subtitle: "GSM 통합 학교 관리 서비스",
    oneLiner: "학교생활에 필요한 기능을 모은 통합 웹 서비스",
    period: "2026.05 –",
    ongoing: false,
    featured: false,
    team: [
      { role: "FE", count: 6 },
      { role: "BE", count: 7 },
      { role: "APP", count: 3 },
      { role: "DevOps", count: 2 },
      { role: "AI", count: 2 },
      { role: "Design", count: 1 },
    ],
    myRole: "Front-End · 동아리 기능 담당",
    stack: [],
    overview: "GSM 통합 학교 관리 서비스로, 학교생활에 필요한 다양한 기능을 제공하는 웹 서비스입니다.",
    contributions: [
      {
        area: "동아리",
        items: ["동아리 개설·신청", "관리자 승인·거부", "동아리 관리 기능"],
      },
    ],
    links: [],
    todos: ["GitHub 링크", "사용 기술", "문제 정의 · 해결 과정 · 결과 · 배운 점", "썸네일 이미지"],
  },
  {
    slug: "took-tak",
    title: "Took-Tak",
    subtitle: "AI 기반 교내 불편 · 시설 고장 신고 서비스",
    oneLiner: "학교 배치도 위에 핀을 찍어 신고하는 서비스",
    period: "2026.07",
    ongoing: false,
    featured: false,
    team: [
      { role: "FE", count: 1 },
      { role: "BE", count: 1 },
      { role: "DevOps", count: 2 },
      { role: "AI", count: 2 },
      { role: "DB", count: 1 },
    ],
    myRole: "Front-End 단독 담당",
    award: "여름방학 전공캠프 해커톤 우수상",
    stack: [],
    overview:
      "학교 배치도에서 위치를 선택하고 핀을 생성해 시설 고장과 교내 불편 사항을 신고할 수 있는 서비스입니다.",
    contributions: [
      {
        area: "Front-End 전체",
        items: ["지도 기반 핀 생성", "신고 기능", "데이터 조회", "전체 UI 구현"],
      },
    ],
    results: ["여름방학 전공캠프 해커톤 우수상"],
    links: [],
    todos: ["GitHub 링크", "사용 기술", "문제 정의 · 해결 과정 · 배운 점", "썸네일 이미지"],
  },
  {
    slug: "taekbae",
    title: "택배왔숑",
    subtitle: "스마트 택배 도착 알림 서비스",
    oneLiner: "택배 무게와 바코드로 도착을 확인하고 학생에게 알림",
    period: "2026.07 –",
    ongoing: true,
    featured: false,
    team: [
      { role: "FE", count: 3 },
      { role: "BE", count: 2 },
      { role: "Design", count: 1 },
    ],
    myRole: "Back-End 도전 · 인증 API와 무게 측정 하드웨어",
    stack: [],
    overview:
      "택배 무게와 바코드 스캔으로 학교에 도착한 택배를 확인하고, 학생에게 웹·앱으로 알림을 제공하는 서비스입니다.",
    contributions: [
      {
        area: "Back-End",
        items: ["Google · 학교 계정(DataGSM) OAuth 구현", "이메일 · 비밀번호 로그인 API 구현"],
      },
      {
        area: "Hardware",
        items: ["택배 무게 측정 하드웨어 개발 중"],
      },
    ],
    links: [],
    todos: ["GitHub 링크", "사용 기술", "문제 정의 · 해결 과정 · 결과 · 배운 점", "썸네일 이미지"],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const teamSize = (team: TeamMember[]) => team.reduce((sum, m) => sum + m.count, 0);
