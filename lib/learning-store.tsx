import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

import type { ActivityAttempt, Grade, Subject } from "@/data/learning";

const STORAGE_KEY = "brightpath-learning-state-v1";
const MAX_LEARNERS = 5;

export type LearnerProfile = {
  id: string;
  nickname: string;
  grade: Grade;
  interests: string[];
  createdAt: string;
};

export type ParentSettings = {
  dailyGoalMinutes: 15 | 20 | 30;
  tutorMode: "guided" | "balanced";
  enabledSubjects: Subject[];
  readAloudEnabled: boolean;
};

type LearningState = {
  learner: LearnerProfile | null;
  learners?: LearnerProfile[];
  activeLearnerId?: string | null;
  attempts: ActivityAttempt[];
  parentSettings: ParentSettings;
  parentPin: string | null;
};

type LearningContextValue = LearningState & {
  ready: boolean;
  completeOnboarding: (profile: Pick<LearnerProfile, "nickname" | "grade" | "interests">) => void;
  addLearner: (profile: Pick<LearnerProfile, "nickname" | "grade" | "interests">) => void;
  switchLearner: (learnerId: string) => void;
  removeLearner: (learnerId: string) => void;
  recordAttempt: (attempt: Omit<ActivityAttempt, "id" | "completedAt">) => void;
  updateParentSettings: (patch: Partial<ParentSettings>) => void;
  setParentPin: (pin: string) => void;
  resetLearningData: () => Promise<void>;
};

const defaultSettings: ParentSettings = {
  dailyGoalMinutes: 15,
  tutorMode: "guided",
  enabledSubjects: ["Math", "Reading", "Writing", "Science", "Social Studies"],
  readAloudEnabled: true,
};

const defaultState: LearningState = {
  learner: null,
  learners: [],
  activeLearnerId: null,
  attempts: [],
  parentSettings: defaultSettings,
  parentPin: null,
};

const LearningContext = createContext<LearningContextValue | null>(null);

export function LearningProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LearningState>(defaultState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (!saved) return;
        const parsed = JSON.parse(saved) as Partial<LearningState>;          const existingLearner = parsed.learner ?? null;
          const learners = Array.isArray(parsed.learners) && parsed.learners.length
            ? parsed.learners.slice(0, MAX_LEARNERS)
            : existingLearner ? [existingLearner] : [];
          setState({
            learner: existingLearner ?? learners[0] ?? null,
            learners,
            activeLearnerId: parsed.activeLearnerId ?? existingLearner?.id ?? learners[0]?.id ?? null,
            attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
            parentSettings: { ...defaultSettings, ...(parsed.parentSettings ?? {}) },
            parentPin: typeof parsed.parentPin === "string" ? parsed.parentPin : null,
          });
      })
      .catch(() => setState(defaultState))
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => undefined);
  }, [ready, state]);

  const value = useMemo<LearningContextValue>(
    () => ({
      ...state,
      ready,
      completeOnboarding: ({ nickname, grade, interests }) => {
        setState((current) => {
          const profile = {
            id: current.learner?.id ?? `learner-${Date.now()}`,
            nickname: nickname.trim() || "Learner",
            grade,
            interests,
            createdAt: current.learner?.createdAt ?? new Date().toISOString(),
          };
          const existing = current.learners ?? [];
          const learners = existing.some((item) => item.id === profile.id)
            ? existing.map((item) => item.id === profile.id ? profile : item)
            : existing.length < MAX_LEARNERS ? [...existing, profile] : existing;
          return { ...current, learner: profile, learners, activeLearnerId: profile.id };
        });
      },
      addLearner: ({ nickname, grade, interests }) => {
        setState((current) => {
          const existing = current.learners ?? [];
          if (existing.length >= MAX_LEARNERS) return current;
          const profile = {
            id: `learner-${Date.now()}`,
            nickname: nickname.trim() || "Learner",
            grade,
            interests,
            createdAt: new Date().toISOString(),
          };
          return { ...current, learner: profile, learners: [...existing, profile], activeLearnerId: profile.id };
        });
      },
      switchLearner: (learnerId) => {
        setState((current) => {
          const profile = (current.learners ?? []).find((item) => item.id === learnerId);
          if (!profile) return current;
          return { ...current, learner: profile, activeLearnerId: profile.id };
        });
      },
      removeLearner: (learnerId) => {
        setState((current) => {
          const learners = (current.learners ?? []).filter((item) => item.id !== learnerId);
          const removingActive = current.activeLearnerId === learnerId;
          const nextLearner = removingActive ? learners[0] ?? null : current.learner;
          return {
            ...current,
            learners,
            learner: nextLearner,
            activeLearnerId: nextLearner?.id ?? null,
          };
        });
      },
      recordAttempt: (attempt) => {
        setState((current) => ({
          ...current,
          attempts: [
            ...current.attempts,
            { ...attempt, id: `attempt-${Date.now()}-${Math.random().toString(16).slice(2)}`, completedAt: new Date().toISOString() },
          ],
        }));
      },
      updateParentSettings: (patch) => {
        setState((current) => ({
          ...current,
          parentSettings: { ...current.parentSettings, ...patch },
        }));
      },
      setParentPin: (pin) => {
        setState((current) => ({ ...current, parentPin: pin }));
      },
      resetLearningData: async () => {
        await AsyncStorage.removeItem(STORAGE_KEY);
        setState(defaultState);
      },
    }),
    [ready, state],
  );

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) throw new Error("useLearning must be used inside LearningProvider");
  return context;
}
