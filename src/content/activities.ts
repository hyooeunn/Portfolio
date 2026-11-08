/**
 * 수상 · 활동 · 자격증 · 학력 타임라인
 * 같은 행사의 수상과 활동은 한 항목으로 합치고 award 필드로 표시한다.
 */

export type ActivityKind = "award" | "hackathon" | "event" | "certificate" | "education";

export type Activity = {
  id: string;
  /** "YYYY.MM". 모르면 null(TODO) */
  date: string | null;
  title: string;
  kind: ActivityKind;
  tags: string[];
  description: string;
  /** 수상 내역 */
  award?: string;
  /** 연결된 프로젝트 slug */
  project?: string;
};

export const activityKindLabel: Record<ActivityKind, string> = {
  award: "수상",
  hackathon: "해커톤",
  event: "행사 · 교류",
  certificate: "자격증",
  education: "학력",
};

export const activities: Activity[] = [
  {
    id: "sw-meister-union-hackathon",
    date: "2026.11",
    title: "SW마이스터고 연합해커톤",
    kind: "hackathon",
    tags: ["전국 SW마이스터고 연합", "해커톤"],
    description:
      "경북·광주·대구·대전·부산 5개 SW마이스터고가 모인 연합 해커톤에 5인 팀으로 참가해, 2박 3일 동안 AI 답변 품질 비교·평가 도구를 개발했습니다.",
  },
  {
    id: "japan-exchange",
    date: "2026.10",
    title: "한·일 국제 교류",
    kind: "event",
    tags: ["글로벌 협업", "찻잎 찌꺼기 기반 업사이클링 립케어 제품화 탐구"],
    description:
      "일본 현지 학생들과 언어의 장벽을 넘어 소통하고 있으며, 10월 일본 현지 방문 중간발표 이후에도 국제 교류와 연구를 이어가고 있습니다.",
  },
  {
    id: "major-camp-hackathon",
    date: "2026.07",
    title: "여름방학 전공캠프 해커톤",
    kind: "award",
    award: "우수상",
    tags: ["Took-Tak", "Front-End"],
    description:
      "AI 기반 교내 불편·시설 고장 신고 서비스 Took-Tak. 배치도 위에 핀을 찍어 신고하는 서비스로, Front-End 개발을 담당했습니다.",
    project: "took-tak",
  },
  {
    id: "gsm-devfest-3",
    date: "2026.07",
    title: "GSM DevFest 제3회",
    kind: "award",
    award: "우수상 · 공동 2위",
    tags: ["GIF", "부스 운영", "7인 팀 Front-End"],
    description:
      "GSM Idea Festival 통합 관리 서비스 GIF로 부스를 운영했습니다. 7인 팀에서 Front-End 개발을 담당했습니다.",
    project: "gif",
  },
  {
    id: "company-tour",
    date: "2026.06",
    title: "Worxphere · AWS · 스탠바이랩 · 구름 기업 탐방",
    kind: "event",
    tags: ["자기주도체험학습"],
    description:
      "현직 개발자분들과 커피챗을 하며 실무 환경을 둘러봤습니다. 한 직무에 머물지 않고 여러 분야를 받아들여야 한다는 것을 느꼈고, AI 시대의 공부 방향을 잡았습니다.",
  },
  {
    id: "copilot-dev-days",
    date: "2026.04",
    title: "Microsoft × GitHub Copilot Dev Days | Seoul",
    kind: "event",
    tags: ["컨퍼런스"],
    description:
      "Copilot을 실무에서 활용하는 방법과 AI에게 요구사항을 전달하는 방식을 들었습니다. 보고서를 쓰듯 요구사항을 구체적으로 전달하는 방식이 가장 인상 깊었습니다.",
  },
  {
    id: "gsm-competency",
    date: "2026.01",
    title: "GSM 역량성취대회",
    kind: "award",
    award: "우수상",
    tags: ["교내 대회"],
    description: "SW 개발 등 학교 생활을 종합 평가하는 대회에서 우수상을 수상했습니다.",
  },
  {
    id: "dalbit-hackathon",
    date: "2025.10",
    title: "2025 달빛연합 SW융합 학생 해커톤",
    kind: "award",
    award: "융합상",
    tags: ["AKIVE", "3인 팀", "하드웨어"],
    description:
      "헷갈리는 분리수거를 불빛 하나로 해결하는 AKIVE. 라즈베리파이와 LED로 분리수거 기기를 만들고 Python으로 제어해 Back-End와 연동했습니다. 앱에서 신호를 보내면 LED가 켜집니다.",
  },
  {
    id: "vibe-hackathon",
    date: "2025.09",
    title: "2025 청춘어람 바이브 해커톤",
    kind: "hackathon",
    tags: ["마이다스아이티 NEWRROW", "팀장"],
    description:
      "팀장으로 참가해 팀원들과 아이디어를 모으고, 짧은 시간 안에 바이브코딩으로 구현했습니다.",
  },
  {
    id: "school",
    date: "2025.03",
    title: "광주소프트웨어마이스터고등학교 입학",
    kind: "education",
    tags: ["스마트 IoT과", "2028.01 졸업 예정"],
    description: "스마트 IoT과 재학 중입니다. (2025.03 – 2028.01 예정)",
  },
  {
    id: "diat",
    // TODO: DIAT 취득 연월 필요
    date: null,
    title: "DIAT 디지털정보활용능력",
    kind: "certificate",
    tags: ["프리젠테이션 고급", "워드프로세서 고급", "스프레드시트 고급"],
    description: "프리젠테이션, 워드프로세서, 스프레드시트 세 과목 모두 고급을 취득했습니다.",
  },
];
