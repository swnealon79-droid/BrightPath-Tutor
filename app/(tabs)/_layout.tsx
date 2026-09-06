import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Platform } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { LearningProvider } from "@/lib/learning-store";

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 56 + bottomPadding;

  return (
    <LearningProvider>
      <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: bottomPadding,
          height: tabBarHeight,
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
        },
      }}
    >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <IconSymbol size={25} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="learn"
          options={{
            title: "Practice",
            tabBarIcon: ({ color }) => <IconSymbol size={25} name="book.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="journey"
          options={{
            title: "Journey",
            tabBarIcon: ({ color }) => <IconSymbol size={25} name="chart.bar.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="family"
          options={{
            title: "Family",
            tabBarIcon: ({ color }) => <IconSymbol size={25} name="person.2.fill" color={color} />,
          }}
        />
        <Tabs.Screen name="lesson" options={{ href: null }} />
        <Tabs.Screen name="tutor" options={{ href: null }} />
      </Tabs>
    </LearningProvider>
  );
}
