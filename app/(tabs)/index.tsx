import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { LearnerOnboarding } from "@/components/learner-onboarding";
import { SubjectCard } from "@/components/subject-card";
import { SUBJECT_META, getRecommendedQuestion, getSubjectSummary } from "@/data/learning";
import { useLearning } from "@/lib/learning-store";

/**
 * Home Screen - NativeWind Example
 *
 * This template uses NativeWind (Tailwind CSS for React Native).
 * You can use familiar Tailwind classes directly in className props.
 *
 * Key patterns:
 * - Use `className` instead of `style` for most styling
 * - Theme colors: use tokens directly (bg-background, text-foreground, bg-primary, etc.); no dark: prefix needed
 * - Responsive: standard Tailwind breakpoints work on web
 * - Custom colors defined in tailwind.config.js
 */
export default function HomeScreen() {
  const router = useRouter();
  const { learner, attempts, ready } = useLearning();

  if (!ready) {
    return (
      <ScreenContainer className="px-5">
        <View style={styles.loadingPage}>
          <View style={styles.loadingMark}><MaterialIcons name="auto-awesome" size={28} color="#FFFFFF" /></View>
          <Text style={styles.loadingTitle}>Getting BrightPath ready…</Text>
          <Text style={styles.loadingCopy}>Setting up a safe space for small learning wins.</Text>
        </View>
      </ScreenContainer>
    );
  }
  if (!learner) return <LearnerOnboarding />;

  const recommended = getRecommendedQuestion(learner.grade, attempts);
  const recommendationMeta = SUBJECT_META[recommended.subject];
  const today = new Date().toDateString();
  const todayCount = attempts.filter((attempt) => new Date(attempt.completedAt).toDateString() === today).length;
  const readingSummary = getSubjectSummary(learner.grade, "Reading", attempts);

  return (
    <ScreenContainer className="px-5">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.hello}>Hi, {learner.nickname}!</Text>
            <Text style={styles.supporting}>Ready for one small win today?</Text>
          </View>
          <View style={styles.avatar}><Text style={styles.avatarText}>{learner.nickname.slice(0, 1).toUpperCase()}</Text></View>
        </View>

        <Pressable onPress={() => router.push({ pathname: "./lesson", params: { questionId: recommended.id } })} style={({ pressed }) => [styles.recommendation, { backgroundColor: recommendationMeta.color }, pressed && styles.pressed]}>
          <View style={styles.recommendationTop}>
            <View style={styles.sunMark}><MaterialIcons name="wb-sunny" size={20} color="#FBBF24" /></View>
            <Text style={styles.recommendationEyebrow}>TODAY’S BRIGHTPATH</Text>
            <MaterialIcons name="arrow-forward" size={22} color="#FFFFFF" />
          </View>
          <Text style={styles.recommendationTitle}>{recommended.title}</Text>
          <Text style={styles.recommendationCopy}>{recommended.subject} · {recommended.skill} · about 3 minutes</Text>
        </Pressable>

        <View style={styles.goalCard}>
          <View style={styles.goalHeader}><View><Text style={styles.goalTitle}>Today’s goal</Text><Text style={styles.goalCopy}>{todayCount} of 3 short activities completed</Text></View><Text style={styles.goalNumber}>{todayCount}/3</Text></View>
          <View style={styles.goalTrack}><View style={[styles.goalFill, { width: `${Math.min(100, (todayCount / 3) * 100)}%` }]} /></View>
        </View>

        <Pressable onPress={() => router.push("./tutor")} style={({ pressed }) => [styles.askCard, pressed && styles.pressed]}>
          <View style={styles.askIcon}><MaterialIcons name="auto-awesome" size={22} color="#FFFFFF" /></View>
          <View style={styles.askCopy}><Text style={styles.askTitle}>Need a thinking partner?</Text><Text style={styles.askText}>Ask BrightPath for a hint, a simple explanation, or a similar example.</Text></View>
          <MaterialIcons name="chevron-right" size={23} color="#7C3AED" />
        </Pressable>

        <View style={styles.sectionHeader}><Text style={styles.sectionTitle}>Explore a subject</Text><Pressable onPress={() => router.push("./learn")} style={({ pressed }) => pressed && styles.pressed}><Text style={styles.linkText}>See all</Text></Pressable></View>
        <View style={styles.subjectGrid}>
          <SubjectCard compact onPress={() => router.push({ pathname: "./lesson", params: { questionId: recommended.id } })} subject="Math" />
          <SubjectCard compact onPress={() => router.push({ pathname: "./lesson", params: { questionId: readingSummary.nextQuestion.id } })} subject="Reading" />
          <SubjectCard compact onPress={() => router.push("./learn")} subject="Writing" />
          <SubjectCard compact onPress={() => router.push("./learn")} subject="Science" />
        </View>

        <View style={styles.growthCard}>
          <View style={styles.growthIcon}><MaterialIcons name="psychology" size={24} color="#7C3AED" /></View>
          <View style={styles.growthCopy}><Text style={styles.growthTitle}>A learning tip</Text><Text style={styles.growthText}>When a question feels tricky, pause, use a hint, and try one small step at a time.</Text></View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { gap: 18, paddingBottom: 28, paddingTop: 10 },
  loadingPage: { alignItems: "center", flex: 1, justifyContent: "center", paddingBottom: 72 },
  loadingMark: { alignItems: "center", backgroundColor: "#2563EB", borderRadius: 24, height: 64, justifyContent: "center", marginBottom: 17, width: 64 },
  loadingTitle: { color: "#1E293B", fontSize: 19, fontWeight: "800", lineHeight: 25 },
  loadingCopy: { color: "#64748B", fontSize: 14, lineHeight: 21, marginTop: 5, textAlign: "center" },
  headerRow: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  hello: { color: "#FFFFFF", fontSize: 27, fontWeight: "800", lineHeight: 34 },
  supporting: { color: "#CBD5E1", fontSize: 14, lineHeight: 20 },
  avatar: { alignItems: "center", backgroundColor: "#EDE9FE", borderRadius: 22, height: 44, justifyContent: "center", width: 44 },
  avatarText: { color: "#6D28D9", fontSize: 17, fontWeight: "800" },
  recommendation: { borderRadius: 22, minHeight: 158, padding: 19 },
  recommendationTop: { alignItems: "center", flexDirection: "row", gap: 9, marginBottom: 20 },
  sunMark: { alignItems: "center", backgroundColor: "rgba(255,255,255,0.18)", borderRadius: 12, height: 30, justifyContent: "center", width: 30 },
  recommendationEyebrow: { color: "#DBEAFE", flex: 1, fontSize: 11, fontWeight: "800", letterSpacing: 1 },
  recommendationTitle: { color: "#FFFFFF", fontSize: 24, fontWeight: "800", lineHeight: 30, marginBottom: 5 },
  recommendationCopy: { color: "#E0E7FF", fontSize: 13, lineHeight: 19 },
  goalCard: { backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 18, borderWidth: 1, padding: 16 },
  goalHeader: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  goalTitle: { color: "#334155", fontSize: 15, fontWeight: "800" },
  goalCopy: { color: "#64748B", fontSize: 12, marginTop: 3 },
  goalNumber: { color: "#2563EB", fontSize: 16, fontWeight: "800" },
  goalTrack: { backgroundColor: "#E2E8F0", borderRadius: 99, height: 8, overflow: "hidden" },
  goalFill: { backgroundColor: "#16A34A", borderRadius: 99, height: "100%" },
  askCard: { alignItems: "center", backgroundColor: "#F5F3FF", borderRadius: 18, flexDirection: "row", gap: 11, padding: 14 },
  askIcon: { alignItems: "center", backgroundColor: "#7C3AED", borderRadius: 14, height: 44, justifyContent: "center", width: 44 },
  askCopy: { flex: 1, gap: 3 },
  askTitle: { color: "#5B21B6", fontSize: 14, fontWeight: "800" },
  askText: { color: "#6B7280", fontSize: 12, lineHeight: 17 },
  sectionHeader: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginTop: 2 },
  sectionTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  linkText: { color: "#2563EB", fontSize: 14, fontWeight: "800" },
  subjectGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  growthCard: { alignItems: "flex-start", backgroundColor: "#F5F3FF", borderRadius: 18, flexDirection: "row", gap: 12, padding: 15 },
  growthIcon: { alignItems: "center", backgroundColor: "#EDE9FE", borderRadius: 14, height: 44, justifyContent: "center", width: 44 },
  growthCopy: { flex: 1, gap: 4 },
  growthTitle: { color: "#5B21B6", fontSize: 14, fontWeight: "800" },
  growthText: { color: "#6B7280", fontSize: 13, lineHeight: 19 },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
});
