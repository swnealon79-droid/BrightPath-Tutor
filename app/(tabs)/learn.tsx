import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { SubjectCard } from "@/components/subject-card";
import { SUBJECTS, getQuestionForSubject } from "@/data/learning";
import { useLearning } from "@/lib/learning-store";

export default function LearnScreen() {
  const router = useRouter();
  const { learner, parentSettings, ready } = useLearning();

  if (!ready || !learner) return null;
  const visibleSubjects = SUBJECTS.filter((subject) => parentSettings.enabledSubjects.includes(subject));

  return (
    <ScreenContainer className="px-5">
      <FlatList
        contentContainerStyle={styles.content}
        data={visibleSubjects}
        keyExtractor={(subject) => subject}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.iconWrap}><MaterialIcons name="school" size={25} color="#2563EB" /></View>
            <Text style={styles.eyebrow}>GRADE {learner.grade} PRACTICE</Text>
            <Text style={styles.title}>Choose what you want to grow today.</Text>
            <Text style={styles.subtitle}>Each BrightPath activity is a short, focused challenge with helpful hints when you need them.</Text>
          </View>
        }
        renderItem={({ item }) => {
          const question = getQuestionForSubject(learner.grade, item);
          return (
            <SubjectCard
              detail={question.skill}
              onPress={() => router.push({ pathname: "./lesson", params: { questionId: question.id } })}
              subject={item}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { gap: 12, paddingBottom: 30 },
  header: { paddingBottom: 16, paddingTop: 10 },
  iconWrap: { alignItems: "center", backgroundColor: "#DBEAFE", borderRadius: 16, height: 50, justifyContent: "center", marginBottom: 13, width: 50 },
  eyebrow: { color: "#2563EB", fontSize: 11, fontWeight: "800", letterSpacing: 1.1, marginBottom: 7 },
  title: { color: "#1E293B", fontSize: 27, fontWeight: "800", lineHeight: 34, marginBottom: 8 },
  subtitle: { color: "#64748B", fontSize: 15, lineHeight: 22 },
});
