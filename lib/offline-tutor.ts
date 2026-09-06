import type { Grade, Subject } from "@/data/learning";
import type { ParentSettings } from "@/lib/learning-store";

type TutorReply = {
  kind: "tutoring" | "privacy" | "unsafe" | "trusted_adult";
  response: string;
};

const PRIVACY_PATTERN = /\b(my (address|phone|number|email|school|last name)|i live at|call me at|text me at)\b/i;
const SELF_HARM_PATTERN = /\b(kill myself|hurt myself|want to die|suicide|end my life)\b/i;
const UNSAFE_PATTERN = /\b(nude|naked|porn|sex(?:ual)?|how (can|do) i (hurt|kill|attack)|make (a |an )?(weapon|bomb))\b/i;

function safetyReply(message: string): TutorReply | null {
  if (SELF_HARM_PATTERN.test(message)) {
    return {
      kind: "trusted_adult",
      response:
        "I’m really glad you told me. Please tell a trusted grown-up near you right now, such as a parent, caregiver, teacher, or school counselor. If you or someone else might be in immediate danger, ask a grown-up to call emergency services now.",
    };
  }
  if (PRIVACY_PATTERN.test(message)) {
    return {
      kind: "privacy",
      response:
        "You do not need to share private details with BrightPath. Leave out names, addresses, phone numbers, school names, and contact information. You can still ask your learning question without those details.",
    };
  }
  if (UNSAFE_PATTERN.test(message)) {
    return {
      kind: "unsafe",
      response:
        "I can’t help with that. If this is about something you saw, heard, or that is worrying you, please talk with a trusted grown-up who can help you.",
    };
  }
  return null;
}

function gradeLanguage(grade: Grade) {
  if (grade <= 2) return "Use one small step at a time.";
  if (grade <= 4) return "Break the problem into two or three small steps.";
  return "Identify what you know, what you need to find, and the rule or evidence that connects them.";
}

function subjectHint(subject: Subject, message: string, context?: string) {
  const lower = `${message} ${context ?? ""}`.toLowerCase();

  if (subject === "Math") {
    if (/add|plus|sum|total|altogether/.test(lower)) return "For addition, line up the amounts and combine them. Start with the ones place, then move left.";
    if (/subtract|minus|difference|left|remain/.test(lower)) return "For subtraction, start with the total and take away the amount named in the problem. Check whether you need to regroup.";
    if (/multiply|times|groups|each/.test(lower)) return "For multiplication, think of equal groups. Ask: how many groups are there, and how many are in each group?";
    if (/divide|share|split|quotient/.test(lower)) return "For division, think about sharing equally. Ask: how many equal groups can you make?";
    if (/fraction|half|third|fourth/.test(lower)) return "For fractions, name the whole first. The bottom number tells how many equal parts; the top number tells how many parts you have.";
    return "Underline the numbers and the question being asked. Then decide which operation matches the story.";
  }

  if (subject === "Reading") {
    if (/main idea|main point/.test(lower)) return "Look for what most of the paragraph is about. Details should support that one main idea.";
    if (/infer|inference/.test(lower)) return "Use two clues: what the text says and what you already know. Put those clues together to make your inference.";
    if (/meaning|vocabulary|word/.test(lower)) return "Read the sentence before and after the word. Look for examples, opposites, or descriptions that give a clue to its meaning.";
    return "Go back to the passage and find the sentence that gives the strongest evidence for your answer.";
  }

  if (subject === "Writing") {
    if (/paragraph|topic sentence/.test(lower)) return "Start with one clear topic sentence. Add two or three details that support it, then finish with a closing sentence.";
    if (/spell|spelling/.test(lower)) return "Say the word slowly, listen for each sound, and check for a familiar word part or pattern.";
    return "Say your idea in one clear sentence first. Then add a detail that explains who, what, where, when, why, or how.";
  }

  if (subject === "Science") {
    return "Name what you observe first. Then ask what evidence supports your idea and whether another explanation could fit the evidence.";
  }

  return "Look for people, places, dates, causes, and effects. Ask which detail best explains why the event or idea mattered.";
}

export async function askOfflineTutor(input: {
  message: string;
  grade: Grade;
  subject: Subject;
  questionContext?: string;
  tutorMode: ParentSettings["tutorMode"];
}): Promise<TutorReply> {
  const safe = safetyReply(input.message);
  if (safe) return safe;

  const message = input.message.trim();
  const hint = subjectHint(input.subject, message, input.questionContext);
  const contextLine = input.questionContext
    ? `You’re working on: ${input.questionContext}`
    : `You’re working on ${input.subject}.`;
  const modeLine = input.tutorMode === "guided"
    ? "Try one step yourself, then tell me what you got."
    : "Try the hint, and if you’re stuck, tell me which step is confusing.";

  return {
    kind: "tutoring",
    response: `${contextLine}\n\n${gradeLanguage(input.grade)} ${hint}\n\n${modeLine}`,
  };
}
