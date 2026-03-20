import { LinearGradient } from "expo-linear-gradient";
import {
  Activity,
  Battery,
  ChevronRight,
  Cpu,
  Lock,
  RefreshCcw,
  Star,
  Wifi,
} from "lucide-react-native";
import React, { useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";

export default function DevicesScreen() {
  const insets = useSafeAreaInsets();
  const { theme, mode } = useTheme();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [modeSelected, setModeSelected] = useState<
    "convenience" | "smart" | "dual"
  >("smart");
  const pageGradient =
    mode === "dark"
      ? (["#020617", "#020617"] as const)
      : (["#F8FAFC", "#F8FAFC"] as const);

  const iconAccent = mode === "dark" ? "#22D3EE" : theme.accent;
  const chipBg = mode === "dark" ? "#0F172A" : "#EEF2FF";

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LinearGradient
          colors={pageGradient}
          style={[styles.safe, { backgroundColor: theme.bg }]}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 32 }}
          >
            {/* Header */}
            <View style={styles.header}>
              <View
                style={[
                  styles.headerIconWrap,
                  { backgroundColor: chipBg, borderColor: theme.border },
                ]}
              >
                <Cpu size={22} color={iconAccent} />
              </View>
              <View>
                <Text style={[styles.headerTitle, { color: theme.text }]}>
                  Device Management
                </Text>
                <Text style={[styles.headerSub, { color: theme.muted }]}>
                  Agelox Multi-Gate v1.2
                </Text>
              </View>
            </View>

            {/* Device status card */}
            <View
              style={[
                styles.card,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>
                  Status
                </Text>
                <Activity size={18} color={iconAccent} />
              </View>

              <View style={styles.infoRow}>
                <InfoTag theme={theme} label="Serial" value="AGX-221004B" />
                <InfoTag theme={theme} label="Firmware" value="2.3.1" />
              </View>
              <View style={styles.infoRow}>
                <InfoTag
                  theme={theme}
                  label="Battery"
                  value="87%"
                  icon={Battery}
                />
                <InfoTag
                  theme={theme}
                  label="Network"
                  value="Wi-Fi (online)"
                  icon={Wifi}
                />
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    { backgroundColor: theme.accent },
                  ]}
                >
                  <RefreshCcw
                    size={16}
                    color={mode === "dark" ? "#020617" : "#FFFFFF"}
                  />
                  <Text
                    style={[
                      styles.primaryButtonText,
                      { color: mode === "dark" ? "#020617" : "#FFFFFF" },
                    ]}
                  >
                    Update Firmware
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.secondaryButton,
                    { borderColor: theme.border, backgroundColor: theme.card },
                  ]}
                >
                  <Text
                    style={[styles.secondaryButtonText, { color: theme.text }]}
                  >
                    Calibrate
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={[
                styles.card,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                Auto-Lock & Feedback
              </Text>
              <SettingRow
                theme={theme}
                label="Auto-Lock Timer"
                value="30s"
                accent={iconAccent}
              />
              <SettingRow
                theme={theme}
                label="Sound Feedback"
                value="Enabled"
                accent={iconAccent}
              />
              <SettingRow
                theme={theme}
                label="LED Indicator"
                value="Enabled"
                accent={iconAccent}
              />
            </View>

            {/* Advance Settings */}
            <View
              style={[
                styles.card,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <TouchableOpacity
                onPress={() => setIsAdvancedOpen((v) => !v)}
                activeOpacity={0.85}
                style={styles.advancedHeader}
              >
                <Text style={[styles.cardTitle, { color: theme.text }]}>
                  Advanced Settings
                </Text>

                <ChevronRight
                  size={18}
                  color={theme.muted}
                  style={{
                    transform: [{ rotate: isAdvancedOpen ? "90deg" : "0deg" }],
                  }}
                />
              </TouchableOpacity>

              {isAdvancedOpen && (
                <View style={{ marginTop: 12 }}>
                  <ModeItem
                    theme={theme}
                    selected={modeSelected === "convenience"}
                    title="Convenience Mode"
                    desc="Unlock with key OR app"
                    onPress={() => setModeSelected("convenience")}
                  />

                  <ModeItem
                    theme={theme}
                    selected={modeSelected === "smart"}
                    title="Smart Secure Mode"
                    desc="Unlock with app only"
                    badge="Recommended"
                    icon={<Star size={12} color={iconAccent} />}
                    onPress={() => setModeSelected("smart")}
                  />

                  <ModeItem
                    theme={theme}
                    selected={modeSelected === "dual"}
                    title="Dual Authentication Mode"
                    desc="Requires both key + app"
                    badge="Locked"
                    icon={<Lock size={12} color={theme.muted} />}
                    onPress={() => setModeSelected("dual")}
                  />
                </View>
              )}
              {/* 
 Convenience Mode
    Unlock with key OR app

 Smart Secure Mode   ⭐ Recommended
    Unlock with app only

 Dual Authentication Mode 🔒
    Requires both key + app */}
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

function ModeItem({
  theme,
  selected,
  title,
  desc,
  onPress,
  badge,
  icon,
}: {
  theme: ThemeShape;
  selected: boolean;
  title: string;
  desc: string;
  onPress: () => void;
  badge?: string;
  icon?: React.ReactNode;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.modeItem,
        {
          borderColor: selected ? theme.accent : theme.border,
        },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 10 }}>
        {/* Radio */}
        <View
          style={[
            styles.radioOuter,
            {
              borderColor: selected ? theme.accent : theme.border,
            },
          ]}
        >
          {selected && (
            <View
              style={[styles.radioInner, { backgroundColor: theme.accent }]}
            />
          )}
        </View>

        {/* Text */}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={[styles.modeTitle, { color: theme.text }]}>
              {title}
            </Text>

            {badge && (
              <View style={styles.badge}>
                {icon}
                <Text style={[styles.badgeText, { color: theme.muted }]}>
                  {badge}
                </Text>
              </View>
            )}
          </View>

          <Text style={[styles.modeDesc, { color: theme.muted }]}>{desc}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

type ThemeShape = {
  card: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
};

type TagProps = {
  theme: ThemeShape;
  label: string;
  value: string;
  icon?: React.ComponentType<{ size?: number; color?: string }>;
};

function InfoTag({ theme, label, value, icon: Icon }: TagProps) {
  return (
    <View
      style={[
        styles.tag,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {Icon && <Icon size={14} color={theme.muted} />}
        <Text style={[styles.tagLabel, { color: theme.muted }]}>
          {Icon ? "  " : ""}
          {label}
        </Text>
      </View>
      <Text style={[styles.tagValue, { color: theme.text }]}>{value}</Text>
    </View>
  );
}

type RowProps = {
  theme: ThemeShape;
  label: string;
  value: string;
  accent: string;
};

function SettingRow({ theme, label, value, accent }: RowProps) {
  return (
    <View
      style={[
        styles.settingRow,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <Text style={[styles.settingLabel, { color: theme.text }]}>{label}</Text>
      <Text style={[styles.settingValue, { color: accent }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  advancedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modeItem: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
  },

  modeTitle: {
    fontSize: 14,
    fontWeight: "700",
  },

  modeDesc: {
    fontSize: 12,
    marginTop: 4,
  },

  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 999,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },

  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "600",
  },

  container: {
    paddingVertical: 5,
    flex: 1,
    paddingHorizontal: 0,
  },
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
  headerIconWrap: {
    width: 40,
    height: 40,
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

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 8,
  },
  tag: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  tagLabel: {
    fontSize: 11,
  },
  tagValue: {
    fontSize: 13,
    marginTop: 4,
    fontWeight: "600",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 12,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  primaryButtonText: {
    fontSize: 13,
    fontWeight: "700",
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },

  settingRow: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  settingValue: {
    fontSize: 13,
    fontWeight: "700",
  },
});
