import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { getQuestionById, SUBJECT_META } from "@/data/learning";
import { useLearning } from "@/lib/learning-store";

export default function LessonScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ questionId?: string | string[] }>();
  const questionId = Array.isArray(params.questionId) ? params.questionId[0] : params.questionId;
  const { learner, recordAttempt, ready } = useLearning();
  const [selected, setSelected] = useState<string | null>(null);
  const [hintShown, setHintShown] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const question = useMemo(() => learner && questionId ? getQuestionById(learner.grade, questionId) : undefined, [learner, questionId]);

  if (!ready || !learner || !question) return null;
  const meta = SUBJECT_META[question.subject];
  const correct = selected === question.answer;

  const handleCheck = () => {
    if (!selected || submitted) return;
    recordAttempt({ questionId: question.id, subject: question.subject, answer: selected, isCorrect: correct, usedHint: hintShown });
    setSubmitted(true);
  };

  return (
    <ScreenContainer className="px-5">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <Pressable accessibilityLabel="Go back" onPress={() => router.back()} style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
            <MaterialIcons name="arrow-back" size={22} color="#334155" />
          </Pressable>
          <View style={[styles.subjectPill, { backgroundColor: meta.pale }]}>
            <Text style={[styles.subjectPillText, { color: meta.color }]}>{question.subject}</Text>
          </View>
        </View>

        <View style={styles.progressTrack}><View style={[styles.progressFill, { backgroundColor: meta.color }]} /></View>
        <Text style={styles.skill}>{question.skill.toUpperCase()}</Text>
        <Text style={styles.title}>{question.title}</Text>
        <Text style={styles.prompt}>{question.prompt}</Text>

        <View style={styles.choices}>
          {question.choices.map((choice, index) => {
            const isSelected = selected === choice;
            const showCorrect = submitted && choice === question.answer;
            const showIncorrect = submitted && isSelected && !correct;
            return (
              <Pressable
                accessibilityRole="button"
                disabled={submitted}
                key={choice}
                onPress={() => setSelected(choice)}
                style={({ pressed }) => [
                  styles.choice,
                  isSelected && !submitted && { borderColor: meta.color, backgroundColor: meta.pale },
                  showCorrect && styles.choiceCorrect,
                  showIncorrect && styles.choiceIncorrect,
                  pressed && !submitted && styles.pressed,
                ]}
              >
                <View style={[styles.choiceLabel, isSelected && !submitted && { backgroundColor: meta.color }, showCorrect && { backgroundColor: "#16A34A" }, showIncorrect && { backgroundColor: "#E85D75" }]}>
                  <Text style={[styles.choiceLabelText, (isSelected || showCorrect || showIncorrect) && styles.choiceLabelTextActive]}>{String.fromCharCode(65 + index)}</Text>
                </View>
                <Text style={styles.choiceText}>{choice}</Text>
                {showCorrect && <MaterialIcons name="check-circle" size={22} color="#16A34A" />}
              </Pressable>
            );
          })}
        </View>

        {hintShown && !submitted && (
          <View style={styles.hintBox}>
            <MaterialIcons name="lightbulb" size={20} color="#B45309" />
            <Text style={styles.hintText}>{question.hint}</Text>
          </View>
        )}

        {submitted && (
          <View style={[styles.feedback, correct ? styles.feedbackCorrect : styles.feedbackTryAgain]}>
            <MaterialIcons name={correct ? "celebration" : "auto-awesome"} size={24} color={correct ? "#166534" : "#9A3412"} />
            <View style={styles.feedbackCopy}>
              <Text style={[styles.feedbackTitle, { color: correct ? "#166534" : "#9A3412" }]}>{correct ? "You figured it out!" : "A learning moment!"}</Text>
              <Text style={styles.feedbackText}>{question.explanation}</Text>
            </View>
          </View>
        )}

        <View style={styles.actions}>
          {!submitted && (
            <View style={styles.supportActions}>
              <Pressable onPress={() => setHintShown(true)} style={({ pressed }) => [styles.hintButton, pressed && styles.pressed]}>
                <MaterialIcons name="lightbulb-outline" size={20} color="#A16207" />
                <Text style={styles.hintButtonText}>Show a hint</Text>
              </Pressable>
              <Pressable onPress={() => router.push({ pathname: "./tutor", params: { questionId: question.id } })} style={({ pressed }) => [styles.tutorButton, pressed && styles.pressed]}>
                <MaterialIcons name="auto-awesome" size={20} color="#6D28D9" />
                <Text style={styles.tutorButtonText}>Ask BrightPath</Text>
              </Pressable>
            </View>
          )}
          <Pressable
            disabled={!selected && !submitted}
            onPress={submitted ? () => router.replace("./journey") : handleCheck}
            style={({ pressed }) => [styles.primaryButton, (!selected && !submitted) && styles.primaryDisabled, pressed && (selected || submitted) && styles.pressed]}
          >
            <Text style={styles.primaryText}>{submitted ? "See my learning path" : "Check my answer"}</Text>
            <MaterialIcons name={submitted ? "arrow-forward" : "check"} size={20} color="#FFFFFF" />
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: 32, paddingTop: 8 },
  topRow: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 18 },
  iconButton: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 18, borderWidth: 1, height: 44, justifyContent: "center", width: 44 },
  subjectPill: { borderRadius: 99, paddingHorizontal: 13, paddingVertical: 7 },
  subjectPillText: { fontSize: 12, fontWeight: "800" },
  progressTrack: { backgroundColor: "#E2E8F0", borderRadius: 99, height: 7, marginBottom: 24, overflow: "hidden" },
  progressFill: { borderRadius: 99, height: "100%", width: "48%" },
  skill: { color: "#64748B", fontSize: 11, fontWeight: "800", letterSpacing: 1.1, marginBottom: 8 },
  title: { color: "#1E293B", fontSize: 28, fontWeight: "800", lineHeight: 35, marginBottom: 10 },
  prompt: { color: "#334155", fontSize: 18, lineHeight: 27, marginBottom: 22 },
  choices: { gap: 10 },
  choice: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 16, borderWidth: 1.5, flexDirection: "row", gap: 12, minHeight: 62, paddingHorizontal: 14 },
  choiceCorrect: { backgroundColor: "#F0FDF4", borderColor: "#16A34A" },
  choiceIncorrect: { backgroundColor: "#FFF1F2", borderColor: "#E85D75" },
  choiceLabel: { alignItems: "center", backgroundColor: "#F1F5F9", borderRadius: 14, height: 28, justifyContent: "center", width: 28 },
  choiceLabelText: { color: "#64748B", fontSize: 13, fontWeight: "800" },
  choiceLabelTextActive: { color: "#FFFFFF" },
  choiceText: { color: "#334155", flex: 1, fontSize: 15, fontWeight: "700", lineHeight: 20 },
  hintBox: { alignItems: "flex-start", backgroundColor: "#FFFBEB", borderRadius: 16, flexDirection: "row", gap: 10, marginTop: 18, padding: 14 },
  hintText: { color: "#78350F", flex: 1, fontSize: 14, lineHeight: 20 },
  feedback: { alignItems: "flex-start", borderRadius: 18, flexDirection: "row", gap: 11, marginTop: 18, padding: 16 },
  feedbackCorrect: { backgroundColor: "#DCFCE7" },
  feedbackTryAgain: { backgroundColor: "#FFF7ED" },
  feedbackCopy: { flex: 1, gap: 4 },
  feedbackTitle: { fontSize: 16, fontWeight: "800" },
  feedbackText: { color: "#475569", fontSize: 14, lineHeight: 20 },
  actions: { gap: 10, marginTop: 24 },
  supportActions: { flexDirection: "row", gap: 10 },
  hintButton: { alignItems: "center", backgroundColor: "#FEF3C7", borderRadius: 15, flex: 1, flexDirection: "row", gap: 7, justifyContent: "center", minHeight: 50 },
  hintButtonText: { color: "#92400E", fontSize: 15, fontWeight: "800" },
  tutorButton: { alignItems: "center", backgroundColor: "#EDE9FE", borderRadius: 15, flex: 1, flexDirection: "row", gap: 7, justifyContent: "center", minHeight: 50 },
  tutorButtonText: { color: "#6D28D9", fontSize: 14, fontWeight: "800" },
  primaryButton: { alignItems: "center", backgroundColor: "#2563EB", borderRadius: 16, flexDirection: "row", gap: 8, justifyContent: "center", minHeight: 54 },
  primaryDisabled: { backgroundColor: "#94A3B8" },
  primaryText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
});
