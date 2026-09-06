import { useState } from "react";

import { ParentDashboard, ParentGate } from "@/components/parent-space";
import { useLearning } from "@/lib/learning-store";

export default function FamilyScreen() {
  const { learner, ready } = useLearning();
  const [unlocked, setUnlocked] = useState(false);
  if (!ready || !learner) return null;
  return unlocked ? <ParentDashboard onLock={() => setUnlocked(false)} /> : <ParentGate onUnlock={() => setUnlocked(true)} />;
}
