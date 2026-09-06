export type TutorSafetyResult =
  | { kind: "privacy" | "unsafe" | "trusted_adult"; response: string }
  | null;

const PRIVACY_PATTERN = /\b(my (address|phone|number|email|school|last name)|i live at|call me at|text me at)\b/i;
const SELF_HARM_PATTERN = /\b(kill myself|hurt myself|want to die|suicide|end my life)\b/i;
const UNSAFE_PATTERN = /\b(nude|naked|porn|sex(?:ual)?|how (can|do) i (hurt|kill|attack)|make (a |an )?(weapon|bomb))\b/i;

/**
 * Filters requests that should not be passed to the tutoring model. This is a
 * first-line boundary; the model prompt adds a second instructional boundary.
 */
export function getTutorSafetyResponse(message: string): TutorSafetyResult {
  if (SELF_HARM_PATTERN.test(message)) {
    return {
      kind: "trusted_adult",
      response: "I’m really glad you told me. Please tell a trusted grown-up near you right now, such as a parent, caregiver, teacher, or school counselor. If you or someone else might be in immediate danger, ask a grown-up to call emergency services now.",
    };
  }

  if (PRIVACY_PATTERN.test(message)) {
    return {
      kind: "privacy",
      response: "You do not need to share private details with BrightPath. Please leave out names, addresses, phone numbers, school names, or contact information. You can still ask your learning question without those details.",
    };
  }

  if (UNSAFE_PATTERN.test(message)) {
    return {
      kind: "unsafe",
      response: "I can’t help with that. If this is about something you saw, heard, or that is worrying you, please talk with a trusted grown-up who can help you.",
    };
  }

  return null;
}
