export const profile = {
  name: "이효은",
  englishName: "LEE HYOEUN",
  role: "Frontend Developer",
  tagline: "안녕하세요, 저는 새로운 걸 배우는 데 망설임이 없는 개발자입니다!",
  about: [
    "2025 ~ 광주소프트웨어마이스터고등학교 재학 중입니다.",
    "모르는 개념이 나오면 일단 부딪혀보고, 팀원과 막힌 부분을 같이 풀어가는 과정에서 오히려 더 많이 배우는 편입니다.",
    "기능을 그대로 구현하는 것보다, 그 화면을 쓸 사람 입장에서 한 번 더 생각하는 것을 중요하게 여깁니다.",
  ],
  skills: ["Next.js", "TypeScript", "React"],
  contact: {
    email: "2eeoeun@gmail.com",
    phone: "010-9676-1278",
    github: "https://github.com/hyooeunn",
  },
};

export type Project = {
  title: string;
  subtitle: string;
  org: string;
  repoUrl: string;
  description: string;
  team?: string;
  roles: { label: string; items: string[] }[];
  accent: "yellow" | "purple";
};

export const projects: Project[] = [
  {
    title: "GIF",
    subtitle: "GSM Idea Festival 관리 서비스",
    org: "VOID-GSM",
    repoUrl: "https://github.com/VOID-GSM",
    description:
      "광주소프트웨어마이스터고등학교 아이디어 페스티벌 운영을 위한 관리 웹 서비스 GIF입니다. Client와 Admin 양쪽에 걸쳐 여러 기능을 구현했습니다.",
    team: "Frontend 3명, Backend 2명, DevOps 1명, Design 1명",
    roles: [
      { label: "Client", items: ["프로젝트 생성 페이지"] },
      { label: "Admin", items: ["점수 부여 페이지", "점수 수합 페이지"] },
      { label: "공통", items: ["등수 확인 페이지", "404 페이지"] },
    ],
    accent: "yellow",
  },
  {
    title: "Flooding",
    subtitle: "GSM 학교 통합 서비스",
    org: "team-incube",
    repoUrl: "https://github.com/team-incube",
    description:
      "광주소프트웨어마이스터고등학교의 학교·기숙사·동아리 정보를 하나로 모은 통합 학교 관리 시스템 플러딩입니다.",
    roles: [
      {
        label: "담당 역할",
        items: [
          "동아리 개설 신청 페이지 구현",
          "관리자용 동아리 승인 / 거부 기능",
          "동아리 소유자용 수정 · 삭제 기능",
        ],
      },
    ],
    accent: "purple",
  },
];
