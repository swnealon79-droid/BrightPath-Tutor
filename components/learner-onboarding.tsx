import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import type { Grade } from "@/data/learning";
import { ScreenContainer } from "@/components/screen-container";
import { useLearning } from "@/lib/learning-store";

const interestOptions = ["Animals", "Space", "Sports", "Art", "Music"];

export function LearnerOnboarding() {
  const { completeOnboarding } = useLearning();
  const [nickname, setNickname] = useState("");
  const [grade, setGrade] = useState<Grade>(3);
  const [interests, setInterests] = useState<string[]>(["Space"]);

  const toggleInterest = (interest: string) => {
    setInterests((current) => current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest]);
  };

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <View style={styles.page}>
        <View style={styles.heroMark}>
          <MaterialIcons name="auto-awesome" size={34} color="#FFFFFF" />
        </View>
        <View style={styles.intro}>
          <Text style={styles.eyebrow}>WELCOME TO BRIGHTPATH</Text>
          <Text style={styles.heading}>Let’s make learning feel like an adventure.</Text>
          <Text style={styles.subtitle}>This quick setup helps BrightPath choose friendly practice that fits you.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>What should BrightPath call you?</Text>
          <TextInput
            accessibilityLabel="Learner nickname"
            autoCapitalize="words"
            maxLength={20}
            onChangeText={setNickname}
            placeholder="Your first name or a nickname"
            placeholderTextColor="#94A3B8"
            returnKeyType="done"
            style={styles.input}
            value={nickname}
          />

          <Text style={styles.label}>Choose your grade</Text>
          <View style={styles.gradeRow}>
            {[1, 2, 3, 4, 5].map((level) => {
              const selected = grade === level;
              return (
                <Pressable key={level} onPress={() => setGrade(level as Grade)} style={({ pressed }) => [styles.gradeButton, selected && styles.gradeSelected, pressed && styles.pressed]}>
                  <Text style={[styles.gradeText, selected && styles.gradeTextSelected]}>{level}</Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.label}>Pick a few things you enjoy</Text>
          <View style={styles.chipRow}>
            {interestOptions.map((interest) => {
              const selected = interests.includes(interest);
              return (
                <Pressable key={interest} onPress={() => toggleInterest(interest)} style={({ pressed }) => [styles.chip, selected && styles.chipSelected, pressed && styles.pressed]}>
                  <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{interest}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => completeOnboarding({ nickname, grade, interests })}
          style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
        >
          <Text style={styles.primaryText}>Start my learning path</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.privacy}>No full name, school, address, or contact details are needed.</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, justifyContent: "center", paddingBottom: 22, paddingTop: 10 },
  heroMark: { alignItems: "center", alignSelf: "center", backgroundColor: "#2563EB", borderRadius: 26, height: 72, justifyContent: "center", marginBottom: 22, width: 72 },
  intro: { alignItems: "center", gap: 8, marginBottom: 28 },
  eyebrow: { color: "#2563EB", fontSize: 11, fontWeight: "800", letterSpacing: 1.2 },
  heading: { color: "#1E293B", fontSize: 27, fontWeight: "800", lineHeight: 34, textAlign: "center" },
  subtitle: { color: "#64748B", fontSize: 15, lineHeight: 22, maxWidth: 320, textAlign: "center" },
  form: { gap: 11 },
  label: { color: "#334155", fontSize: 14, fontWeight: "700", marginTop: 5 },
  input: { backgroundColor: "#FFFFFF", borderColor: "#CBD5E1", borderRadius: 14, borderWidth: 1, color: "#1E293B", fontSize: 16, minHeight: 50, paddingHorizontal: 15 },
  gradeRow: { flexDirection: "row", gap: 8 },
  gradeButton: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#CBD5E1", borderRadius: 14, borderWidth: 1, flex: 1, minHeight: 48, justifyContent: "center" },
  gradeSelected: { backgroundColor: "#2563EB", borderColor: "#2563EB" },
  gradeText: { color: "#334155", fontSize: 16, fontWeight: "800" },
  gradeTextSelected: { color: "#FFFFFF" },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { backgroundColor: "#FFFFFF", borderColor: "#CBD5E1", borderRadius: 99, borderWidth: 1, minHeight: 38, paddingHorizontal: 14, justifyContent: "center" },
  chipSelected: { backgroundColor: "#DBEAFE", borderColor: "#2563EB" },
  chipText: { color: "#475569", fontSize: 13, fontWeight: "700" },
  chipTextSelected: { color: "#1D4ED8" },
  primaryButton: { alignItems: "center", backgroundColor: "#2563EB", borderRadius: 16, flexDirection: "row", gap: 8, justifyContent: "center", marginTop: 26, minHeight: 54 },
  primaryText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  privacy: { color: "#64748B", fontSize: 11, lineHeight: 16, marginHorizontal: 20, marginTop: 12, textAlign: "center" },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
});
