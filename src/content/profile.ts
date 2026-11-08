/**
 * 개인 정보 · 소개 · 연락처
 * 출처: 이효은 포트폴리오 PDF. PDF에 없는 값은 null + TODO 주석.
 */

export const profile = {
  name: "이효은",
  nameEn: "LEE HYOEUN",
  role: "Front-End Developer",

  /** Hero 컨셉 한 줄 */
  headline: "코드보다 먼저, 구조를 그립니다.",

  /** About 소개글. 한 문장씩 스크롤 리빌된다. */
  intro: [
    "GIF와 Signal을 프론트엔드로 설계·개발하며, 점수 산정 로직부터 인증 흐름까지 프론트엔드 전반을 직접 맡아왔습니다.",
    "막히는 지점은 추측 대신 근거로 좁혀가며 해결해왔습니다.",
    "이제는 한 프로젝트의 완성도를 넘어, 팀 전체의 기술적 기준을 함께 만드는 프론트엔드 개발자로 성장하고 싶습니다.",
  ],

  /** 핵심 키워드 3개 */
  keywords: [
    {
      title: "구조 설계",
      en: "Structure",
      description: "점수 산정 로직부터 인증 흐름까지, 화면 뒤의 흐름을 먼저 설계합니다.",
    },
    {
      title: "근거 기반 문제 해결",
      en: "Evidence",
      description: "DevTools와 실제 요청·응답을 확인하며 원인을 좁혀갑니다.",
    },
    {
      title: "팀의 기준",
      en: "Standard",
      description: "공용 컴포넌트와 공통 기능으로 팀이 함께 쓰는 기준을 만듭니다.",
    },
  ],

  contact: {
    email: "2eeoeun@gmail.com",
    phone: "010-9676-1278",
    github: "https://github.com/hyooeunn",
    /** TODO: LinkedIn URL 필요 */
    linkedin: null as string | null,
  },

  /**
   * TODO: 이력서 PDF 필요 — public/resume.pdf 로 넣으면 버튼이 동작한다.
   */
  resume: "/resume.pdf",

  education: {
    school: "광주소프트웨어마이스터고등학교",
    major: "스마트 IoT과",
    period: "2025.03 – 2028.01 (예정)",
  },

  /** 마퀴에 흐르는 단어 */
  marquee: ["Front-End Developer", "구조를 먼저", "Next.js", "TypeScript", "근거로 해결", "React"],
} as const;

export type Profile = typeof profile;
