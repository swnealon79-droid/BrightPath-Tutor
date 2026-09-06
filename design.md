# BrightPath Tutor — Mobile Interface Design

BrightPath Tutor is designed for children in grades 1–5 to practice independently in short, reassuring sessions while giving parents a clear window into learning progress. The interface uses a warm, low-distraction visual language, large touch targets, simple reading levels, and one primary action per screen. All student screens are designed for portrait 9:16 use and reachable with one hand.

## Product Principles

The student experience should feel like a patient learning companion rather than an open-ended chatbot. It will encourage thinking with hints, examples, and step-by-step scaffolds; it will not provide shortcuts that bypass learning. A dedicated parent area will expose settings, progress, and safety controls behind a parent gate. The first release stores student progress locally, while the secure server handles AI tutoring requests without placing model credentials in the app.

## Screen List

| Screen | Primary content and functionality | Portrait layout |
|---|---|---|
| Welcome and learner setup | Select a friendly learner profile, grade 1–5, interests, and optional learning goals. | Centered mascot mark, one-choice cards, and a fixed bottom continuation button. |
| Student Home | Shows today’s learning goal, subject choices, weekly learning streak, recent wins, and a prominent “Ask BrightPath” entry point. | Greeting and progress ring above two-column subject cards; tutor action stays within thumb reach. |
| Subject Practice | Offers grade-adjusted practice paths in math, reading, writing, science, and social studies. | Filter chip at top, short vertical lesson cards with outcome labels and estimated time. |
| Lesson Player | Presents one prompt at a time with accessible text, read-aloud option, visual support, answer choices or a response field, hints, and feedback. | Progress at top; question centered; large answer controls in the lower half; next action fixed at bottom. |
| Tutor Conversation | Gives age-appropriate help with homework and concepts, using guided questions, hints, worked examples, and encouragement. | Conversation bubbles above an optional prompt field and structured help buttons: “Explain,” “Hint,” “Show an example,” and “Check my work.” |
| Learning Journey | Displays each subject’s current skill path, completed lessons, strengths, and next recommendation. | Subject header, progress bar, then a vertical path of achievable skill cards. |
| Achievements | Celebrates completed lessons, helpful learning habits, and mastery milestones without competitive social mechanics. | Calm grid of badges with explanations; no external sharing. |
| Parent Gate | Requires a simple adult verification challenge before exposing settings or student data. | Full-screen simple arithmetic or typed phrase challenge; no student-facing navigation. |
| Parent Dashboard | Shows time spent, lessons completed, skill confidence, recent work, and where support is recommended. | At-a-glance summary cards followed by subject progress and recent activity. |
| Parent Controls | Lets adults choose grade level, subjects, daily time guidance, tutor tone, allowed interaction modes, and reset local data. | Grouped settings with native switches and explanatory helper text. |
| Help and Safety | Explains how tutoring works, privacy defaults, appropriate-use expectations, and when to involve an adult or teacher. | Plain-language scroll page with readable sections and clear contact/emergency guidance. |

## Key User Flows

| User goal | Flow |
|---|---|
| Begin a daily practice session | Student opens Home → taps a subject card → chooses a recommended skill → completes one question at a time → receives immediate instructional feedback → views a next-step recommendation. |
| Get homework help | Student taps “Ask BrightPath” → selects a structured help mode or types a question → tutor asks clarifying questions and offers hints or examples → student explains or enters work → tutor provides encouraging next steps and suggests asking an adult or teacher when appropriate. |
| Track growth | Student opens Learning Journey → selects a subject → sees completed skills, current focus, and recommended practice. |
| Review a child’s progress | Parent opens Parent Gate → completes verification → opens Dashboard → reviews activity, subject confidence, and support recommendations. |
| Adjust safety and learning preferences | Parent passes Parent Gate → opens Controls → changes learning level, time guidance, or allowed tutor modes → setting is persisted locally and reflected in future sessions. |

## Color and Type Choices

The brand is centered on **BrightPath Blue** (`#2563EB`) for trust and focus, **Sunbeam Yellow** (`#FBBF24`) for encouragement, **Mint Progress** (`#16A34A`) for completed work, **Lavender Insight** (`#7C3AED`) for tutor interactions, and **Cloud White** (`#F8FAFC`) for the primary canvas. Body copy uses deep **Ink** (`#1E293B`) for high contrast. Error feedback uses a calm coral (`#E85D75`) paired with explanatory text, never punitive wording. The visual rhythm uses familiar iOS rounded cards, 16–24 px spacing, an 8 px spacing unit, and a minimum 44 × 44 px target for every interactive control.

## Child Safety and Trust Defaults

The tutor will use age-appropriate language and an instructional coaching approach. It will not generate sexual content, violence instructions, self-harm guidance, abusive language, personal data requests, medical or legal advice, or private off-platform contact. It will redirect unsafe requests with a short supportive message and direct the learner to a trusted adult when needed. The interface will avoid advertising, social feeds, public profiles, direct messaging, location, external links in student areas, and competitive ranking.

The parent dashboard will make the learning model transparent by showing completed activities, responses, and confidence levels. Student data is local by default; the initial AI layer receives only the current learning context and question needed to generate a tutoring response. The app will avoid collecting names, addresses, contact details, photos, or school identifiers in the student experience.

## Initial Domain Model

| Entity | Key fields | Purpose |
|---|---|---|
| Learner profile | id, nickname, grade, interests, goals | Personalizes local learning paths without requiring identifying information. |
| Skill | id, subject, grade, title, description, prerequisiteIds | Defines a grade-scoped learning objective. |
| Lesson | id, skillId, title, activityType, questions | Delivers a short practice activity. |
| Attempt | lessonId, questionId, response, isCorrect, hintCount, completedAt | Captures progress and identifies productive struggle. |
| Progress record | learnerId, skillId, confidence, completedCount, lastPracticedAt | Drives home recommendations and parent summaries. |
| Tutor session | subject, grade, lesson context, messages, safety state | Keeps AI help focused on learning and suitable for the child. |
| Parent settings | timeGuidance, allowedSubjects, tutorModes, accessibilityPrefs | Gives adults control over the learning environment. |

## Implementation Scope for the First Working Release

The first working release will include local learner setup, a polished student dashboard, grade-aware starter lessons across the five core subjects, adaptive immediate feedback, a learning journey, achievements, local progress persistence, a parent gate/dashboard/settings area, and a secure AI tutor conversation that uses safety-conscious coaching prompts. Later releases can add multiple profiles, teacher exports, curriculum alignment selection, speech interaction, scanned worksheet support, and optional cloud sync after privacy and consent requirements are explicitly defined.
