import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";

import type { Grade, Subject } from "@/data/learning";
import { ScreenContainer } from "@/components/screen-container";
import { useLearning } from "@/lib/learning-store";

type ParentGateProps = { onUnlock: () => void };

export function ParentGate({ onUnlock }: ParentGateProps) {
  const { parentPin, setParentPin } = useLearning();
  const [answer, setAnswer] = useState("");
  const [stage] = useState<"verify" | "create">(parentPin ? "verify" : "create");
  const [message, setMessage] = useState("");

  const continueGate = () => {
    if (stage === "verify") {
      if (answer === parentPin) {
        setAnswer("");
        setMessage("");
        onUnlock();
      } else {
        setMessage("That PIN does not match. Please try again.");
      }
      return;
    }

    if (!/^\d{4}$/.test(answer)) {
      setMessage("Choose a 4-digit family PIN that a grown-up can remember.");
      return;
    }
    setParentPin(answer);
    setAnswer("");
    setMessage("");
    onUnlock();
  };

  return (
    <ScreenContainer className="px-5">
      <View style={styles.gatePage}>
        <View style={styles.gateMark}><MaterialIcons name="lock" size={30} color="#7C3AED" /></View>
        <Text style={styles.eyebrow}>GROWN-UP SPACE</Text>
        <Text style={styles.gateTitle}>{stage === "create" ? "Set a family PIN" : "Enter the family PIN"}</Text>
        <Text style={styles.gateCopy}>{stage === "create" ? "This keeps BrightPath’s progress and learning controls separate from the student area on this device." : "Only a parent or caregiver should open learning controls and progress details."}</Text>
        <TextInput
          accessibilityLabel="Family PIN"
          keyboardType="number-pad"
          maxLength={4}
          onChangeText={(value) => { setAnswer(value.replace(/[^0-9]/g, "")); setMessage(""); }}
          placeholder="••••"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          style={styles.pinInput}
          value={answer}
        />
        {message ? <Text style={styles.gateMessage}>{message}</Text> : <Text style={styles.gateHint}>Use four numbers. This PIN stays only on this device.</Text>}
        <Pressable onPress={continueGate} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
          <Text style={styles.primaryText}>{stage === "create" ? "Save PIN and continue" : "Open family space"}</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </ScreenContainer>
  );
}

type ParentDashboardProps = { onLock: () => void };

export function ParentDashboard({ onLock }: ParentDashboardProps) {
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChildName, setNewChildName] = useState("");
  const [newChildGrade, setNewChildGrade] = useState<Grade>(1);
  const [newChildInterests, setNewChildInterests] = useState<string[]>([]);
  const { learner, learners = [], activeLearnerId, attempts, parentSettings, completeOnboarding, addLearner, switchLearner, removeLearner, resetLearningData, updateParentSettings } = useLearning();
  if (!learner) return null;

  const completed = new Set(attempts.map((attempt) => attempt.questionId)).size;
  const correct = attempts.filter((attempt) => attempt.isCorrect).length;
  const accuracy = attempts.length === 0 ? 0 : Math.round((correct / attempts.length) * 100);

  const setGrade = (grade: Grade) => completeOnboarding({ nickname: learner.nickname, grade, interests: learner.interests });
  const toggleSubject = (subject: Subject) => {
    const active = parentSettings.enabledSubjects;
    if (active.includes(subject) && active.length === 1) return;
    updateParentSettings({ enabledSubjects: active.includes(subject) ? active.filter((item) => item !== subject) : [...active, subject] });
  };
  const clearData = () => {
    Alert.alert("Reset this device’s learning data?", "This removes the learner profile, local progress, settings, and the family PIN from this device.", [
      { text: "Cancel", style: "cancel" },
      { text: "Reset", style: "destructive", onPress: () => { void resetLearningData(); onLock(); } },
    ]);
  };

  return (
    <ScreenContainer className="px-5">
      <ScrollView contentContainerStyle={styles.dashboardContent} showsVerticalScrollIndicator={false}>
        <View style={styles.dashboardHeader}>
          <View><Text style={styles.eyebrow}>FAMILY SPACE</Text><Text style={styles.dashboardTitle}>{learner.nickname}’s learning snapshot</Text></View>
          <Pressable accessibilityLabel="Lock family space" onPress={onLock} style={({ pressed }) => [styles.lockButton, pressed && styles.pressed]}><MaterialIcons name="lock" size={18} color="#5B21B6" /></Pressable>
        </View>
        <View style={{ gap: 10 }}>
            <Text style={styles.settingLabel}>Child profiles ({learners.length}/5)</Text>
            {learners.map((child) => (
              <Pressable key={child.id} onPress={() => switchLearner(child.id)} style={{ padding: 12, borderRadius: 12, borderWidth: 1, borderColor: child.id === activeLearnerId ? "#2563EB" : "#CBD5E1", backgroundColor: child.id === activeLearnerId ? "#DBEAFE" : "#FFFFFF" }}>
                <Text style={{ fontWeight: "800", color: "#1E3A8A" }}>{child.nickname}</Text>
                <Text style={{ color: "#475569" }}>Grade {child.grade}</Text><Pressable onPress={()=>Alert.alert("Remove child?",`Remove ${child.nickname} from this family account?`,[{text:"Cancel",style:"cancel"},{text:"Remove",style:"destructive",onPress:()=>removeLearner(child.id)}])} style={{marginTop:8,padding:8,borderRadius:8,backgroundColor:"#FEE2E2",alignItems:"center"}}><Text style={{color:"#B91C1C",fontWeight:"800"}}>Remove Child</Text></Pressable>
              </Pressable>
            ))}
          </View>

        <Pressable
            disabled={learners.length >= 5}
            onPress={() => setShowAddChild(true)}
            style={({ pressed }) => [
              {
                padding: 12,
                borderRadius: 12,
                alignItems: "center",
                backgroundColor: learners.length >= 5 ? "#E2E8F0" : "#2563EB",
              },
              pressed && learners.length < 5 && styles.pressed,
            ]}
          >
            <Text style={{ color: learners.length >= 5 ? "#64748B" : "#FFFFFF", fontWeight: "800" }}>
              {learners.length >= 5 ? "Maximum 5 children" : "Add Child"}
            </Text>
          </Pressable>



          {showAddChild && <View style={{gap:10,padding:12}}><Text style={styles.settingLabel}>Add a Child</Text><TextInput value={newChildName} onChangeText={setNewChildName} placeholder="Child nickname" style={{borderWidth:1,borderColor:"#CBD5E1",borderRadius:10,padding:12}} /><View style={{flexDirection:"row",gap:6}}>{[1,2,3,4,5].map((g)=><Pressable key={g} onPress={()=>setNewChildGrade(g as Grade)} style={{padding:10,borderRadius:10,backgroundColor:newChildGrade===g?"#2563EB":"#E2E8F0"}}><Text style={{color:newChildGrade===g?"#FFFFFF":"#1E293B",fontWeight:"800"}}>{g}</Text></Pressable>)}<Pressable onPress={()=>{if(!newChildName.trim())return;addLearner({nickname:newChildName,grade:newChildGrade,interests:newChildInterests});setNewChildName("");setNewChildGrade(1);setNewChildInterests([]);setShowAddChild(false);}} style={{padding:12,borderRadius:10,alignItems:"center",backgroundColor:"#2563EB"}}><Text style={{color:"#FFFFFF",fontWeight:"800"}}>Save Child</Text></Pressable><Pressable onPress={()=>setShowAddChild(false)} style={{alignItems:"center",padding:8}}><Text style={{color:"#475569",fontWeight:"700"}}>Cancel</Text></Pressable></View></View>}
        <Text style={styles.dashboardCopy}>BrightPath uses these local results to suggest small next steps. Review them as a conversation starter, not a scorecard.</Text>

        <View style={styles.metricsRow}>
          <Metric icon="task-alt" label="activities" value={String(completed)} color="#16A34A" />
          <Metric icon="insights" label="accuracy" value={`${accuracy}%`} color="#2563EB" />
          <Metric icon="school" label="grade" value={`G${learner.grade}`} color="#7C3AED" />
        </View>

        <View style={styles.section}><Text style={styles.sectionTitle}>Learning controls</Text><Text style={styles.sectionCopy}>Adjust the practice level and what subjects appear in the student area.</Text>
          <Text style={styles.settingLabel}>Current grade</Text>
          <View style={styles.gradeRow}>
            <GradeControl grade={1} selected={learner.grade === 1} onPress={() => setGrade(1)} />
            <GradeControl grade={2} selected={learner.grade === 2} onPress={() => setGrade(2)} />
            <GradeControl grade={3} selected={learner.grade === 3} onPress={() => setGrade(3)} />
            <GradeControl grade={4} selected={learner.grade === 4} onPress={() => setGrade(4)} />
            <GradeControl grade={5} selected={learner.grade === 5} onPress={() => setGrade(5)} />
          </View>

          <Text style={styles.settingLabel}>Daily practice target</Text>
          <View style={styles.targetRow}>
            <TargetControl minutes={15} selected={parentSettings.dailyGoalMinutes === 15} onPress={() => updateParentSettings({ dailyGoalMinutes: 15 })} />
            <TargetControl minutes={20} selected={parentSettings.dailyGoalMinutes === 20} onPress={() => updateParentSettings({ dailyGoalMinutes: 20 })} />
            <TargetControl minutes={30} selected={parentSettings.dailyGoalMinutes === 30} onPress={() => updateParentSettings({ dailyGoalMinutes: 30 })} />
          </View>

          <Text style={styles.settingLabel}>Subjects available to the learner</Text>
          <SubjectControl enabled={parentSettings.enabledSubjects.includes("Math")} label="Math" onChange={() => toggleSubject("Math")} />
          <SubjectControl enabled={parentSettings.enabledSubjects.includes("Reading")} label="Reading" onChange={() => toggleSubject("Reading")} />
          <SubjectControl enabled={parentSettings.enabledSubjects.includes("Writing")} label="Writing" onChange={() => toggleSubject("Writing")} />
          <SubjectControl enabled={parentSettings.enabledSubjects.includes("Science")} label="Science" onChange={() => toggleSubject("Science")} />
          <SubjectControl enabled={parentSettings.enabledSubjects.includes("Social Studies")} label="Social Studies" onChange={() => toggleSubject("Social Studies")} />
        </View>

        <View style={styles.section}><Text style={styles.sectionTitle}>AI tutor style</Text><Text style={styles.sectionCopy}>Guided mode asks a child to think through each step. Balanced mode can offer a little more explanation after a child has tried.</Text>
          <Pressable onPress={() => updateParentSettings({ tutorMode: "guided" })} style={({ pressed }) => [styles.modeOption, parentSettings.tutorMode === "guided" && styles.modeSelected, pressed && styles.pressed]}><View style={styles.modeIcon}><MaterialIcons name="psychology" size={20} color="#7C3AED" /></View><View style={styles.modeCopy}><Text style={styles.modeTitle}>Guided coaching</Text><Text style={styles.modeText}>Hints and questions first</Text></View>{parentSettings.tutorMode === "guided" && <MaterialIcons name="check-circle" size={21} color="#7C3AED" />}</Pressable>
          <Pressable onPress={() => updateParentSettings({ tutorMode: "balanced" })} style={({ pressed }) => [styles.modeOption, parentSettings.tutorMode === "balanced" && styles.modeSelected, pressed && styles.pressed]}><View style={styles.modeIcon}><MaterialIcons name="menu-book" size={20} color="#7C3AED" /></View><View style={styles.modeCopy}><Text style={styles.modeTitle}>Balanced explanation</Text><Text style={styles.modeText}>Guidance plus a short example</Text></View>{parentSettings.tutorMode === "balanced" && <MaterialIcons name="check-circle" size={21} color="#7C3AED" />}</Pressable>
        </View>

        <View style={styles.boundaryCard}><MaterialIcons name="verified-user" size={23} color="#2563EB" /><View style={styles.boundaryCopy}><Text style={styles.boundaryTitle}>Safety boundary</Text><Text style={styles.boundaryText}>BrightPath avoids requests for personal information, filters unsafe topics, and reminds children to seek a trusted adult when a question needs human help.</Text></View></View>
        <Pressable onPress={clearData} style={({ pressed }) => [styles.resetButton, pressed && styles.pressed]}><MaterialIcons name="delete-outline" size={19} color="#BE123C" /><Text style={styles.resetText}>Reset learning data on this device</Text></Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

function Metric({ icon, label, value, color }: { icon: "task-alt" | "insights" | "school"; label: string; value: string; color: string }) {
  return <View style={styles.metric}><MaterialIcons name={icon} size={20} color={color} /><Text style={styles.metricValue}>{value}</Text><Text style={styles.metricLabel}>{label}</Text></View>;
}

function GradeControl({ grade, selected, onPress }: { grade: Grade; selected: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.gradeControl, selected && styles.gradeControlSelected, pressed && styles.pressed]}><Text style={[styles.gradeControlText, selected && styles.gradeControlTextSelected]}>{grade}</Text></Pressable>;
}

function TargetControl({ minutes, selected, onPress }: { minutes: 15 | 20 | 30; selected: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.targetControl, selected && styles.targetControlSelected, pressed && styles.pressed]}><Text style={[styles.targetControlText, selected && styles.targetControlTextSelected]}>{minutes} min</Text></Pressable>;
}

function SubjectControl({ label, enabled, onChange }: { label: string; enabled: boolean; onChange: () => void }) {
  return <View style={styles.subjectControl}><Text style={styles.subjectControlText}>{label}</Text><Switch onValueChange={onChange} thumbColor="#FFFFFF" trackColor={{ false: "#CBD5E1", true: "#2563EB" }} value={enabled} /></View>;
}

const styles = StyleSheet.create({
  gatePage: { flex: 1, justifyContent: "center", paddingBottom: 48 },
  gateMark: { alignItems: "center", backgroundColor: "#EDE9FE", borderRadius: 20, height: 64, justifyContent: "center", marginBottom: 20, width: 64 },
  eyebrow: { color: "#7C3AED", fontSize: 11, fontWeight: "800", letterSpacing: 1.1, marginBottom: 7 },
  gateTitle: { color: "#1E293B", fontSize: 29, fontWeight: "800", lineHeight: 36, marginBottom: 10 },
  gateCopy: { color: "#64748B", fontSize: 15, lineHeight: 23, marginBottom: 23 },
  pinInput: { backgroundColor: "#FFFFFF", borderColor: "#CBD5E1", borderRadius: 15, borderWidth: 1, color: "#1E293B", fontSize: 24, fontWeight: "800", letterSpacing: 10, minHeight: 56, paddingHorizontal: 18, textAlign: "center" },
  gateHint: { color: "#64748B", fontSize: 12, lineHeight: 18, marginTop: 10 },
  gateMessage: { color: "#BE123C", fontSize: 12, lineHeight: 18, marginTop: 10 },
  primaryButton: { alignItems: "center", backgroundColor: "#2563EB", borderRadius: 16, flexDirection: "row", gap: 8, justifyContent: "center", marginTop: 24, minHeight: 54 },
  primaryText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  dashboardContent: { gap: 17, paddingBottom: 32, paddingTop: 12 },
  dashboardHeader: { alignItems: "flex-start", flexDirection: "row", justifyContent: "space-between" },
  dashboardTitle: { color: "#FFFFFF", fontSize: 25, fontWeight: "800", lineHeight: 32, maxWidth: 275 },
  lockButton: { alignItems: "center", backgroundColor: "#EDE9FE", borderRadius: 14, height: 42, justifyContent: "center", width: 42 },
  dashboardCopy: { color: "#64748B", fontSize: 14, lineHeight: 21, marginTop: -9 },
  metricsRow: { flexDirection: "row", gap: 9 },
  metric: { alignItems: "center", backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 17, borderWidth: 1, flex: 1, gap: 2, minHeight: 100, justifyContent: "center" },
  metricValue: { color: "#1E293B", fontSize: 18, fontWeight: "800" },
  metricLabel: { color: "#64748B", fontSize: 10 },
  section: { backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: 20, borderWidth: 1, gap: 10, padding: 16 },
  sectionTitle: { color: "#334155", fontSize: 17, fontWeight: "800" },
  sectionCopy: { color: "#64748B", fontSize: 13, lineHeight: 19, marginBottom: 5 },
  settingLabel: { color: "#475569", fontSize: 12, fontWeight: "800", marginTop: 5 },
  gradeRow: { flexDirection: "row", gap: 7 },
  gradeControl: { alignItems: "center", borderColor: "#CBD5E1", borderRadius: 12, borderWidth: 1, flex: 1, height: 40, justifyContent: "center" },
  gradeControlSelected: { backgroundColor: "#2563EB", borderColor: "#2563EB" },
  gradeControlText: { color: "#475569", fontSize: 14, fontWeight: "800" },
  gradeControlTextSelected: { color: "#FFFFFF" },
  targetRow: { flexDirection: "row", gap: 8 },
  targetControl: { alignItems: "center", borderColor: "#CBD5E1", borderRadius: 12, borderWidth: 1, flex: 1, height: 40, justifyContent: "center" },
  targetControlSelected: { backgroundColor: "#DBEAFE", borderColor: "#2563EB" },
  targetControlText: { color: "#475569", fontSize: 12, fontWeight: "800" },
  targetControlTextSelected: { color: "#1D4ED8" },
  subjectControl: { alignItems: "center", borderTopColor: "#F1F5F9", borderTopWidth: 1, flexDirection: "row", justifyContent: "space-between", paddingTop: 9 },
  subjectControlText: { color: "#334155", fontSize: 14, fontWeight: "700" },
  modeOption: { alignItems: "center", borderColor: "#E2E8F0", borderRadius: 15, borderWidth: 1, flexDirection: "row", gap: 10, minHeight: 66, padding: 11 },
  modeSelected: { backgroundColor: "#F5F3FF", borderColor: "#7C3AED" },
  modeIcon: { alignItems: "center", backgroundColor: "#EDE9FE", borderRadius: 12, height: 38, justifyContent: "center", width: 38 },
  modeCopy: { flex: 1, gap: 2 },
  modeTitle: { color: "#334155", fontSize: 14, fontWeight: "800" },
  modeText: { color: "#64748B", fontSize: 12 },
  boundaryCard: { alignItems: "flex-start", backgroundColor: "#EFF6FF", borderRadius: 18, flexDirection: "row", gap: 11, padding: 15 },
  boundaryCopy: { flex: 1, gap: 4 },
  boundaryTitle: { color: "#1E3A8A", fontSize: 14, fontWeight: "800" },
  boundaryText: { color: "#475569", fontSize: 12, lineHeight: 18 },
  resetButton: { alignItems: "center", backgroundColor: "#FFF1F2", borderRadius: 15, flexDirection: "row", gap: 8, justifyContent: "center", minHeight: 50 },
  resetText: { color: "#BE123C", fontSize: 14, fontWeight: "800" },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
});
