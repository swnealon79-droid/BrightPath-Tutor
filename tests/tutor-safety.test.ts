import { describe, expect, it } from "vitest";

import { getTutorSafetyResponse } from "../server/tutor-safety";

describe("BrightPath tutor safety boundary", () => {
  it("keeps personal contact details out of the tutoring model", () => {
    expect(getTutorSafetyResponse("My phone number is 555-0100. Can you help me with math?")?.kind).toBe("privacy");
  });

  it("routes self-harm language toward a trusted adult", () => {
    const result = getTutorSafetyResponse("I want to hurt myself");
    expect(result?.kind).toBe("trusted_adult");
    expect(result?.response).toContain("trusted grown-up");
  });

  it("allows an ordinary learning question through to the tutor", () => {
    expect(getTutorSafetyResponse("Can you help me understand 3/4?")).toBeNull();
  });
});
