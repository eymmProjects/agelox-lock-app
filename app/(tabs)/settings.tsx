import { LinearGradient } from "expo-linear-gradient";
import { Bell, Moon, ShieldCheck, Smartphone, User } from "lucide-react-native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../theme/ThemeProvider"; // app/(tabs)/settings.tsx -> app/theme/ThemeProvider.tsx

type ThemePreference = "light" | "dark" | "auto";

export default function SettingsScreen() {
  const { theme, preference, setPreference } = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      <LinearGradient colors={[theme.bg, theme.bg]} style={styles.safe}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Header / Profile */}
          <View style={styles.header}>
            <View style={[styles.avatar, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <User size={26} color={theme.accent} />
            </View>
            <View>
              <Text style={[styles.headerTitle, { color: theme.text }]}>Alex Vargas</Text>
              <Text style={[styles.headerSub, { color: theme.muted }]}>alex@agenox.ai</Text>
            </View>
          </View>

          {/* Security card */}
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>Security</Text>
              <ShieldCheck size={18} color={theme.accent} />
            </View>

            <Row theme={theme} label="Password & Security" value="Manage" />
            <Row theme={theme} label="Biometric Login" value="Enabled" />
          </View>

          {/* Preferences */}
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>Preferences</Text>
            </View>

            {/* ✅ Appearance segmented control (Light / Dark / Auto) */}
            <View style={[styles.row, { backgroundColor: theme.card }]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Moon size={18} color={theme.muted} />
                <Text style={[styles.rowLabel, { marginLeft: 6, color: theme.text }]}>
                  Appearance
                </Text>
              </View>

              <Segmented
                theme={theme}
                value={preference}
                onChange={setPreference}
              />
            </View>

            <IconRow theme={theme} icon={Bell} label="Notifications" value="Enabled" />
            <IconRow theme={theme} icon={Smartphone} label="Device language" value="English" />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

function Segmented({
  theme,
  value,
  onChange,
}: {
  theme: any;
  value: ThemePreference;
  onChange: (v: ThemePreference) => void;
}) {
  const items: { key: ThemePreference; label: string }[] = [
    { key: "light", label: "Light" },
    { key: "dark", label: "Dark" },
    { key: "auto", label: "Auto" },
  ];

  return (
    <View style={[styles.segment, { borderColor: theme.border, backgroundColor: theme.bg }]}>
      {items.map((it) => {
        const active = value === it.key;
        return (
          <TouchableOpacity
            key={it.key}
            onPress={() => onChange(it.key)}
            activeOpacity={0.9}
            style={[
              styles.segmentBtn,
              active && { backgroundColor: theme.accent },
            ]}
          >
            <Text style={[styles.segmentText, { color: active ? "#FFFFFF" : theme.muted }]}>
              {it.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

type RowProps = {
  theme: any;
  label: string;
  value: string;
};

function Row({ theme, label, value }: RowProps) {
  return (
    <View style={[styles.row, { backgroundColor: theme.card }]}>
      <Text style={[styles.rowLabel, { color: theme.text }]}>{label}</Text>
      <Text style={[styles.rowValue, { color: theme.accent }]}>{value}</Text>
    </View>
  );
}

type IconRowProps = {
  theme: any;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string;
  value: string;
};

function IconRow({ theme, icon: Icon, label, value }: IconRowProps) {
  return (
    <View style={[styles.row, { backgroundColor: theme.card }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon size={18} color={theme.muted} />
        <Text style={[styles.rowLabel, { marginLeft: 6, color: theme.text }]}>{label}</Text>
      </View>
      <Text style={[styles.rowValue, { color: theme.accent }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    marginBottom: 16,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  headerSub: {
    fontSize: 12,
    marginTop: 2,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  row: {
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  rowValue: {
    fontSize: 13,
    fontWeight: "700",
  },

  // Segmented control
  segment: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 999,
    padding: 2,
  },
  segmentBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentText: {
    fontSize: 13,
    fontWeight: "800",
  },
});
