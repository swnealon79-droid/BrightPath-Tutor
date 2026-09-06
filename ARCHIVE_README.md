# BrightPath Tutor — Project Archive

This archive contains the BrightPath Tutor mobile application source code, its local learning library, tests, configuration, custom launcher assets, and supporting project documents.

## Opening the Project

The app is built with Expo, React Native, TypeScript, Expo Router, and NativeWind. Install dependencies with `pnpm install`, then use `pnpm dev` to start the local development environment. The standard validation commands are `pnpm test`, `pnpm check`, and `pnpm lint`.

| Directory or file | Purpose |
|---|---|
| `app/` | Student, lesson, AI tutor, parent, and navigation screens. |
| `components/` | Reusable student and parent interface components. |
| `data/learning.ts` | Grade 1–5 starter activities and progress helpers. |
| `lib/learning-store.tsx` | Local learner profile, progress, parent PIN, and settings persistence. |
| `server/` | Validated server-side AI tutoring route and safety filter. |
| `tests/` | Learning-library and AI safety automated tests. |
| `assets/images/` | BrightPath launcher, splash, web favicon, and Android foreground assets. |
| `design.md` | Mobile product and interface design plan. |
| `product-foundations.md` | Child-safety and curriculum product rationale with source references. |
| `PROJECT_CONVERSATION_SUMMARY.md` | Concise record of the decisions and outcomes in the build conversation. |

## Privacy and Safety Notes

The initial app stores the learner profile, practice attempts, settings, and family PIN locally on the device. The tutoring service is server-side and is designed to keep children’s conversations instructional, age-appropriate, and bounded. Before distributing the app more broadly, have a qualified privacy, legal, and education reviewer assess the final product for the jurisdictions, curriculum, and age groups you intend to serve.
