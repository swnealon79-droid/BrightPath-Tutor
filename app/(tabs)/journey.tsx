import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { SUBJECTS, SUBJECT_META, getAchievementCount, getSubjectSummary } from "@/data/learning";
import { useLearning } from "@/lib/learning-store";

export default function JourneyScreen() {
  const router = useRouter();
  const { learner, attempts, ready } = useLearning();
  if (!ready || !learner) return null;

  const badges = getAchievementCount(attempts);
  const completedActivities = new Set(attempts.map((attempt) => attempt.questionId)).size;

  return (
    <ScreenContainer className="px-5">
      <FlatList
        contentContainerStyle={styles.content}
        data={SUBJECTS}
        keyExtractor={(subject) => subject}
        ListHeaderComponent={
          <View>
            <Text style={styles.eyebrow}>MY LEARNING PATH</Text>
            <Text style={styles.title}>Small steps add up, {learner.nickname}.</Text>
            <Text style={styles.subtitle}>Keep exploring. BrightPath saves your practice on this device and uses it to suggest a next step.</Text>
            <View style={styles.statsRow}>
              <View style={styles.statCard}><MaterialIcons name="check-circle" size={21} color="#16A34A" /><Text style={styles.statValue}>{completedActivities}</Text><Text style={styles.statLabel}>activities</Text></View>
              <View style={styles.statCard}><MaterialIcons name="workspace-premium" size={21} color="#B45309" /><Text style={styles.statValue}>{badges}</Text><Text style={styles.statLabel}>badges</Text></View>
              <View style={styles.statCard}><MaterialIcons name="auto-awesome" size={21} color="#7C3AED" /><Text style={styles.statValue}>G{learner.grade}</Text><Text style={styles.statLabel}>learning level</Text></View>
            </View>
            <Text style={styles.sectionTitle}>Subjects</Text>
          </View>
        }
        renderItem={({ item }) => {
          const meta = SUBJECT_META[item];
          const summary = getSubjectSummary(learner.grade, item, attempts);
          const status = summary.completed === 0 ? "Ready to begin" : summary.confidence >= 80 ? "Growing strong" : "Keep practicing";
          return (
            <Pressable
              accessibilityRole="button"
              key={item}
              onPress={() => router.push({ pathname: "./lesson", params: { questionId: summary.nextQuestion.id } })}
              style={({ pressed }) => [styles.subjectCard, pressed && styles.pressed]}
            >
              <View style={[styles.subjectIcon, { backgroundColor: meta.pale }]}><MaterialIcons name={meta.icon as "calculate"} size={23} color={meta.color} /></View>
              <View style={styles.subjectCopy}>
                <View style={styles.subjectTitleRow}><Text style={styles.subjectTitle}>{item}</Text><Text style={[styles.status, { color: meta.color }]}>{status}</Text></View>
                <View style={styles.barTrack}><View style={[styles.barFill, { backgroundColor: meta.color, width: `${summary.confidence}%` }]} /></View>
                <Text style={styles.subjectDetail}>{summary.completed === 0 ? summary.nextQuestion.skill : `${summary.correct} correct answer${summary.correct === 1 ? "" : "s"} · ${summary.confidence}% confidence`}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={23} color="#94A3B8" />
            </Pressable>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { gap: 12, paddingBottom: 28, paddingTop: 12 },
  eyebrow: { color: "#7C3AED", fontSize: 11, fontWeight: "800", letterSpacing: 1.1, marginBottom: 7 },
  title: { color: "#FFFFFF", fontSize: 27, fontWeight: "800", lineHeight: 34, marginBottom: 8 },
  subtitle: { color: "#CBD5E1", fontSize: 14, lineHeight: 21 },
  statsRow: { flexDirection: "row", gap: 9, marginBottom: 24, marginTop: 20 },
  statCard: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 17, borderWidth: 1, flex: 1, gap: 2, paddingHorizontal: 4, paddingVertical: 12 },
  statValue: { color: "#1E293B", fontSize: 17, fontWeight: "800", marginTop: 3 },
  statLabel: { color: "#64748B", fontSize: 10, textAlign: "center" },
  sectionTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "800", marginBottom: 2 },
  subjectCard: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 18, borderWidth: 1, flexDirection: "row", gap: 12, minHeight: 96, padding: 13 },
  subjectIcon: { alignItems: "center", borderRadius: 15, height: 50, justifyContent: "center", width: 50 },
  subjectCopy: { flex: 1, gap: 6 },
  subjectTitleRow: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  subjectTitle: { color: "#1E293B", fontSize: 15, fontWeight: "800" },
  status: { fontSize: 11, fontWeight: "800" },
  barTrack: { backgroundColor: "#E2E8F0", borderRadius: 99, height: 7, overflow: "hidden" },
  barFill: { borderRadius: 99, height: "100%", minWidth: 0 },
  subjectDetail: { color: "#64748B", fontSize: 11, lineHeight: 15 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
});
