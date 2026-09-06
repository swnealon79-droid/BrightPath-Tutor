import { describe, expect, it } from "vitest";

import { getQuestionById, getQuestionForSubject, getRecommendedQuestion, getSubjectSummary } from "../data/learning";

describe("BrightPath learning library", () => {
  it("provides a grade-level activity for each subject", () => {
    expect(getQuestionForSubject(1, "Math").grade).toBe(1);
    expect(getQuestionForSubject(5, "Social Studies").subject).toBe("Social Studies");
  });

  it("keeps a question tied to its learner grade", () => {
    expect(getQuestionById(3, "g3-science-lifecycle")?.answer).toBe("chrysalis");
    expect(getQuestionById(3, "g4-science-energy")).toBeUndefined();
  });

  it("reports progress and suggests a learning activity", () => {
    const attempts = [{ id: "a1", questionId: "g2-math-groups", subject: "Math" as const, answer: "12", isCorrect: true, usedHint: false, completedAt: "2026-08-17T12:00:00.000Z" }];
    expect(getSubjectSummary(2, "Math", attempts)).toMatchObject({ completed: 1, correct: 1, confidence: 100 });
    expect(getRecommendedQuestion(2, attempts).id).not.toBe("g2-math-groups");
  });
});
