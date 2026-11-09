# 이효은 Portfolio

> 코드보다 먼저, 구조를 그립니다.

Front-End 개발자 이효은의 포트폴리오 사이트입니다.

## Stack

- Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- GSAP + ScrollTrigger · Lenis · Framer Motion

## 실행

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 배포 전 확인
```

## 폴더 구조

```
src/
├─ app/                  라우트 (layout, page, projects/[slug])
├─ components/
│  ├─ layout/            Header, Footer
│  ├─ motion/            CustomCursor, Magnetic, ScrollProgress 등 인터랙션 부품
│  ├─ providers/         SmoothScroll (Lenis ↔ ScrollTrigger 연동)
│  ├─ projects/          프로젝트 카드
│  ├─ sections/          Hero, About, Skills, Projects, Activities, Contact
│  ├─ space/             Starfield(별 배경), SpaceAsset(에셋 이미지), Parallax
│  └─ ui/                Button, 아이콘
├─ assets/space/         우주 에셋 WebP (원숭이 6포즈, 행성 · 궤도 · HUD · 스킬 아이콘)
├─ content/              ✏️ 사이트에 나오는 모든 글 (profile, skills, projects, activities) + 에셋 레지스트리(assets.ts)
├─ hooks/                useGsap(gsap.context 래퍼), useMediaQuery
└─ lib/                  motion 토큰, gsap 등록, 폰트, 사이트 설정
```

글을 고칠 때는 `src/content/`만 수정하면 됩니다.

## 디자인 · 모션 토큰

- 색 · 타이포: `src/app/globals.css`의 `@theme`
- 움직임: `src/lib/motion.ts` — 모든 easing과 속도는 여기 값만 사용합니다.
  - `ease.out` (0.16, 1, 0.3, 1): 등장 · 이동
  - `ease.inOut` (0.65, 0, 0.35, 1): 장면 · 페이지 전환
  - `duration.fast / base / slow`: 0.35s / 0.8s / 1.2s
- GSAP 애니메이션은 반드시 `useGsap`(gsap.context) 안에서 만들어 언마운트 시 정리합니다.
- 터치 기기와 `prefers-reduced-motion`에서는 커서 · 마그네틱 · Lenis가 꺼집니다.

## 디자인 컨셉 — Curious Explorer

깊은 우주(네이비 블랙) + 라임 포인트 + 유리 카드 · HUD 모서리.
우주복 원숭이가 섹션마다 다른 포즈로 등장합니다 (Hero 떠다니기 · About 가리키기 · Projects 앉기 · Activities 엄지 척 · Contact 지구 바라보기).

- 에셋은 `src/assets/space/`에 있고, `src/content/assets.ts`에서 이름으로 가져다 씁니다.
- 프로젝트 카드 장식은 `projectArt`, 스킬 아이콘은 `skillIcons`에서 바꿀 수 있습니다.

## 배포 (Vercel)

1. Vercel에서 이 레포를 Import → 기본 설정 그대로 Deploy
2. 커스텀 도메인을 쓰면 환경변수 `NEXT_PUBLIC_SITE_URL`에 주소를 넣어 OG · sitemap 주소를 맞춥니다.

## TODO

- [ ] `public/resume.pdf` — 이력서 PDF
- [ ] LinkedIn URL (`src/content/profile.ts`)
- [ ] 프로젝트 GitHub · 배포 링크, 썸네일, 스크린샷
- [ ] Flooding · Took-Tak · 택배왔숑 상세 내용 (문제 정의 · 해결 과정 · 결과 · 배운 점, 사용 기술)
- [ ] Signal 결과 · 성과
- [ ] DIAT 취득 연월
