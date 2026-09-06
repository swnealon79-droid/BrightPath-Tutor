import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";
import { getQuestionById } from "@/data/learning";
import { useLearning } from "@/lib/learning-store";
import { askOfflineTutor } from "@/lib/offline-tutor";

type ChatMessage = { id: string; role: "learner" | "tutor"; text: string; tone?: "safety" | "standard" };

export default function TutorScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ questionId?: string | string[] }>();
  const questionId = Array.isArray(params.questionId) ? params.questionId[0] : params.questionId;
  const { learner, parentSettings, ready } = useLearning();
  const contextQuestion = useMemo(() => learner && questionId ? getQuestionById(learner.grade, questionId) : undefined, [learner, questionId]);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: "welcome", role: "tutor", text: contextQuestion ? `Let’s work on ${contextQuestion.title} together. Tell me what you notice, or choose a help button below.` : "Hi! I’m BrightPath. I can help you think through a school question one small step at a time." }]);
  const [isThinking, setIsThinking] = useState(false);

  if (!ready || !learner) return null;

  const sendQuestion = async (message?: string) => {
    const trimmed = (message ?? draft).trim();
    if (!trimmed || isThinking) return;
    setDraft("");
    setMessages((current) => [...current, { id: `learner-${Date.now()}`, role: "learner", text: trimmed }]);
    setIsThinking(true);
    try {
      const result = await askOfflineTutor({
        message: trimmed,
        grade: learner.grade,
        subject: contextQuestion?.subject ?? "Math",
        questionContext: contextQuestion?.prompt,
        tutorMode: parentSettings.tutorMode,
      });
      setMessages((current) => [...current, { id: `tutor-${Date.now()}`, role: "tutor", text: result.response, tone: result.kind === "tutoring" ? "standard" : "safety" }]);
    } catch {
      setMessages((current) => [...current, { id: `tutor-error-${Date.now()}`, role: "tutor", text: "BrightPath could not make a hint for that question. Try asking in a different way, or ask a trusted grown-up or teacher for help.", tone: "safety" }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <ScreenContainer className="px-5" edges={["top", "left", "right", "bottom"]}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.keyboard}>
        <View style={styles.topBar}>
          <Pressable accessibilityLabel="Go back" onPress={() => router.back()} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}><MaterialIcons name="arrow-back" size={22} color="#334155" /></Pressable>
          <View style={styles.tutorIdentity}><View style={styles.tutorMark}><MaterialIcons name="auto-awesome" size={18} color="#FFFFFF" /></View><View><Text style={styles.tutorName}>Ask BrightPath</Text><Text style={styles.tutorStatus}>Learning coach</Text></View></View>
          <View style={styles.safePill}><MaterialIcons name="verified-user" size={15} color="#166534" /><Text style={styles.safeText}>Safe help</Text></View>
        </View>

        <FlatList
          contentContainerStyle={styles.chatContent}
          data={messages}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={contextQuestion ? <View style={styles.contextCard}><Text style={styles.contextLabel}>CURRENT ACTIVITY</Text><Text style={styles.contextText}>{contextQuestion.prompt}</Text></View> : null}
          ListFooterComponent={isThinking ? <View style={styles.thinking}><MaterialIcons name="auto-awesome" size={16} color="#7C3AED" /><Text style={styles.thinkingText}>BrightPath is thinking with you…</Text></View> : null}
          renderItem={({ item }) => <View style={[styles.messageRow, item.role === "learner" && styles.learnerRow]}><View style={[styles.message, item.role === "learner" ? styles.learnerMessage : item.tone === "safety" ? styles.safetyMessage : styles.tutorMessage]}><Text style={[styles.messageText, item.role === "learner" && styles.learnerMessageText]}>{item.text}</Text></View></View>}
          showsVerticalScrollIndicator={false}
          style={styles.chat}
        />

        <View style={styles.quickHelp}>
          <Pressable onPress={() => sendQuestion("Can you explain this one step at a time?")} style={({ pressed }) => [styles.quickButton, pressed && styles.pressed]}><Text style={styles.quickText}>Explain step by step</Text></Pressable>
          <Pressable onPress={() => sendQuestion("Can you give me a similar example to try?")} style={({ pressed }) => [styles.quickButton, pressed && styles.pressed]}><Text style={styles.quickText}>Similar example</Text></Pressable>
        </View>
        <View style={styles.composer}>
          <TextInput
            accessibilityLabel="Ask BrightPath a learning question"
            editable={!isThinking}
            multiline
            onChangeText={setDraft}
            onSubmitEditing={() => void sendQuestion()}
            placeholder="Tell me what you’re working on…"
            placeholderTextColor="#94A3B8"
            returnKeyType="send"
            style={styles.input}
            value={draft}
          />
          <Pressable accessibilityLabel="Send question" disabled={!draft.trim() || isThinking} onPress={() => void sendQuestion()} style={({ pressed }) => [styles.sendButton, (!draft.trim() || isThinking) && styles.sendDisabled, pressed && draft.trim() && styles.pressed]}><MaterialIcons name="arrow-upward" size={21} color="#FFFFFF" /></Pressable>
        </View>
        <Text style={styles.privacyNote}>Keep personal details private. BrightPath helps with learning, not emergencies or private conversations.</Text>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  keyboard: { flex: 1 },
  topBar: { alignItems: "center", flexDirection: "row", gap: 10, minHeight: 56 },
  backButton: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 16, borderWidth: 1, height: 42, justifyContent: "center", width: 42 },
  tutorIdentity: { alignItems: "center", flex: 1, flexDirection: "row", gap: 8 },
  tutorMark: { alignItems: "center", backgroundColor: "#7C3AED", borderRadius: 12, height: 32, justifyContent: "center", width: 32 },
  tutorName: { color: "#1E293B", fontSize: 14, fontWeight: "800" },
  tutorStatus: { color: "#64748B", fontSize: 11, marginTop: 1 },
  safePill: { alignItems: "center", backgroundColor: "#DCFCE7", borderRadius: 99, flexDirection: "row", gap: 4, paddingHorizontal: 8, paddingVertical: 5 },
  safeText: { color: "#166534", fontSize: 10, fontWeight: "800" },
  chat: { flex: 1 },
  chatContent: { gap: 10, paddingBottom: 12, paddingTop: 14 },
  contextCard: { backgroundColor: "#F5F3FF", borderRadius: 15, marginBottom: 5, padding: 13 },
  contextLabel: { color: "#7C3AED", fontSize: 10, fontWeight: "800", letterSpacing: 1, marginBottom: 5 },
  contextText: { color: "#475569", fontSize: 13, lineHeight: 19 },
  messageRow: { alignItems: "flex-start", flexDirection: "row" },
  learnerRow: { justifyContent: "flex-end" },
  message: { borderRadius: 18, maxWidth: "86%", paddingHorizontal: 14, paddingVertical: 11 },
  tutorMessage: { backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderWidth: 1 },
  learnerMessage: { backgroundColor: "#2563EB" },
  safetyMessage: { backgroundColor: "#FFF7ED", borderColor: "#FED7AA", borderWidth: 1 },
  messageText: { color: "#334155", fontSize: 14, lineHeight: 21 },
  learnerMessageText: { color: "#FFFFFF" },
  thinking: { alignItems: "center", alignSelf: "flex-start", backgroundColor: "#F5F3FF", borderRadius: 99, flexDirection: "row", gap: 6, paddingHorizontal: 11, paddingVertical: 7 },
  thinkingText: { color: "#6D28D9", fontSize: 12, fontWeight: "700" },
  quickHelp: { flexDirection: "row", gap: 8, paddingBottom: 9 },
  quickButton: { backgroundColor: "#EFF6FF", borderRadius: 99, flex: 1, minHeight: 37, paddingHorizontal: 10, justifyContent: "center" },
  quickText: { color: "#1D4ED8", fontSize: 11, fontWeight: "800", textAlign: "center" },
  composer: { alignItems: "flex-end", backgroundColor: "#FFFFFF", borderColor: "#CBD5E1", borderRadius: 17, borderWidth: 1, flexDirection: "row", gap: 8, minHeight: 56, padding: 7 },
  input: { color: "#1E293B", flex: 1, fontSize: 14, lineHeight: 20, maxHeight: 90, paddingHorizontal: 8, paddingVertical: 8 },
  sendButton: { alignItems: "center", backgroundColor: "#2563EB", borderRadius: 13, height: 40, justifyContent: "center", width: 40 },
  sendDisabled: { backgroundColor: "#94A3B8" },
  privacyNote: { color: "#64748B", fontSize: 10, lineHeight: 14, paddingTop: 7, textAlign: "center" },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
});
