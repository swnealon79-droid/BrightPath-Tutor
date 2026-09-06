# BrightPath Tutor — Project Conversation Summary

> This is a concise project record prepared for the archive. It captures the goals, decisions, and outcomes of the build conversation; it is not a verbatim platform chat transcript.

## Original Request and Product Direction

The project began with a request for a comprehensive AI tutoring app for children in grades 1–5. The intended outcome was a mobile-first learning companion that could support everyday schooling across core subjects while allowing a parent or caregiver to retain oversight. The build proceeded with a child-safe default: an encouraging instructional coach rather than an unrestricted chatbot.

| Topic | Decision recorded during the build |
|---|---|
| Product format | Mobile-first Expo application for iOS, Android, and web preview. |
| Learner ages | Grades 1–5, with a locally chosen grade level. |
| Core subjects | Math, reading, writing, science, and social studies. |
| Data approach | Local device persistence for learner data and preferences in the initial release. |
| AI approach | Server-side model invocation for short, guided tutoring responses; model credentials remain off the device. |
| Parent access | Family PIN gate, dashboard, local controls, and local-data reset. |
| Brand | BrightPath Tutor, with a blue-and-gold learning-path launcher icon. |

## Features Implemented

BrightPath Tutor includes a learner setup flow that asks only for a nickname, grade, and interests. The student home experience recommends a short activity, shows a daily learning goal, offers subject cards, and links to the guided tutor. The practice library includes starter activities for each of the five core subjects at every grade from 1 through 5. Lessons use short prompts, answer choices, hints, feedback, and an option to continue into the learning journey.

The learning journey summarizes activity completion, badges, and subject confidence. Learner profiles, attempts, settings, and the family PIN persist locally. The parent dashboard lets a grown-up change the grade level, daily target, available subjects, and tutor style. It also explains the safety boundary and can erase local data from the device.

## AI Tutoring and Safety Decisions

The AI tutor is designed to teach rather than complete active work. It uses age-appropriate, concise language; coaching questions; hints; and similar examples. Guided mode prioritizes one small next step, while balanced mode allows a compact explanation after the student has tried.

Requests containing personal-contact information, self-harm language, sexual material, violence instructions, or weapon-making requests are intercepted before being sent to the tutoring model. The child receives a brief boundary message and, when appropriate, is directed to a trusted grown-up. The interface also makes clear that BrightPath is for learning help rather than emergencies or private off-platform conversations.

## Design and Curriculum Foundation

The interface was planned for one-handed mobile portrait use, with large touch targets, one clear primary action per screen, high-contrast colors, and calm feedback. The implementation uses BrightPath Blue, Sunbeam Yellow, lavender tutor accents, and supportive visual language. The `design.md` and `product-foundations.md` documents in this archive provide the detailed screen plan, data model, safety defaults, and source references that guided these decisions.

## Validation and Delivery History

The learning library and tutoring safety boundary were covered with automated Vitest tests. The project also passed TypeScript validation and lint checks before delivery. A startup rendering issue seen during preview capture was resolved by adding a friendly initialization screen while local data is loaded.

The completed project was saved as checkpoint `412a7325` and deployed to `brightutor-djjoynfx.manus.space`. The archive itself is intended as a portable source backup; it includes the source code and dependency lockfile rather than installed `node_modules` packages.

## Later Account and Build Questions

After delivery, the project owner asked about an Expo cloud-build access number and token roles. The guidance given was not to share or expose tokens in chat. For account roles, **Admin** was described as the option that includes member and permission management, while a separate **Developer** automation identity is the safer choice when a build or publishing workflow only needs project access. The account owner should keep administrator access on their personal account and apply least privilege to any robot or token.

## Practical Next Steps Identified

The strongest next additions are a larger standards-aligned lesson library, optional read-aloud and worksheet-photo support, multiple child profiles, and parent-controlled cloud backup. These should be implemented with continued attention to child privacy, instructional quality, and appropriate adult review.
