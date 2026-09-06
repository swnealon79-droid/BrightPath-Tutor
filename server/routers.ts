import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { invokeLLM } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getTutorSafetyResponse } from "./tutor-safety";

const tutorInput = z.object({
  message: z.string().trim().min(1).max(800),
  grade: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  subject: z.enum(["Math", "Reading", "Writing", "Science", "Social Studies"]),
  questionContext: z.string().trim().max(600).optional(),
  tutorMode: z.enum(["guided", "balanced"]),
});

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  tutor: router({
    ask: publicProcedure.input(tutorInput).mutation(async ({ input }) => {
      const safetyResponse = getTutorSafetyResponse(input.message);
      if (safetyResponse) return safetyResponse;

      const modeInstruction = input.tutorMode === "guided"
        ? "Ask one short guiding question or offer one small hint before explaining."
        : "Offer one short guiding question, then a compact explanation or a similar example if useful.";
      const context = input.questionContext ? `The student is currently practicing: ${input.questionContext}` : "No activity context was provided.";
      const response = await invokeLLM({
        model: "claude-haiku-4-5",
        messages: [
          {
            role: "system",
            content: `You are BrightPath, a safe, kind learning coach for a child in grade ${input.grade}. The subject is ${input.subject}. Use short, concrete sentences appropriate for ages 6–11. Help the child learn, not simply finish work. ${modeInstruction} If the child asks for a direct answer to active schoolwork, invite them to share what they tried and show a similar, changed example rather than completing the work for them. Do not claim to be a person or a friend. Do not request or retain names, school names, addresses, phone numbers, email addresses, images, or off-platform contact. Do not provide medical, legal, sexual, violent, self-harm, or emergency guidance; instead tell the child to talk to a trusted grown-up. Be honest when uncertain. Keep the response under 140 words and do not use markdown tables. ${context}`,
          },
          { role: "user", content: input.message },
        ],
        maxTokens: 350,
      });
      const text = response.choices[0]?.message?.content;
      return {
        kind: "tutoring" as const,
        response: typeof text === "string" && text.trim().length > 0 ? text.trim() : "Let’s take this one small step at a time. What have you already tried?",
      };
    }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
