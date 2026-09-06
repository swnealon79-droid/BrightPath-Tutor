import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { ComponentProps } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { Subject } from "@/data/learning";
import { SUBJECT_META } from "@/data/learning";

type SubjectCardProps = {
  subject: Subject;
  detail?: string;
  compact?: boolean;
  onPress: () => void;
};

export function SubjectCard({ subject, detail, compact = false, onPress }: SubjectCardProps) {
  const meta = SUBJECT_META[subject];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Practice ${subject}`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, compact && styles.compactCard, pressed && styles.pressed]}
    >
      <View style={[styles.iconWrap, { backgroundColor: meta.pale }]}>
        <MaterialIcons name={meta.icon as ComponentProps<typeof MaterialIcons>["name"]} size={compact ? 23 : 27} color={meta.color} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{subject}</Text>
        <Text numberOfLines={compact ? 2 : 1} style={styles.detail}>{detail ?? meta.description}</Text>
      </View>
      {!compact && <MaterialIcons name="chevron-right" size={24} color="#94A3B8" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E8F0",
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    minHeight: 88,
    padding: 14,
  },
  compactCard: {
    alignItems: "flex-start",
    flexDirection: "column",
    flexGrow: 1,
    minHeight: 148,
    padding: 16,
    width: "48%",
  },
  iconWrap: {
    alignItems: "center",
    borderRadius: 16,
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  copy: { flex: 1, gap: 4 },
  title: { color: "#1E293B", fontSize: 16, fontWeight: "700", lineHeight: 21 },
  detail: { color: "#64748B", fontSize: 12, lineHeight: 17 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.98 }] },
});
