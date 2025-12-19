import { LinearGradient } from "expo-linear-gradient";
import {
  Bell,
  Camera,
  Image as ImageIcon,
  Package,
  ShieldCheck,
  UserRoundCheck,
  Video
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../theme/ThemeProvider";

type VisionMode = "none" | "single" | "dual" | "triple";
type CamId = "front" | "down" | "up";

type CamTab = {
  id: CamId;
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  hint: string;
};

const VISION_MODES: { id: VisionMode; label: string; desc: string }[] = [
  { id: "none", label: "No Camera", desc: "Lock only" },
  { id: "single", label: "Single", desc: "Front camera" },
  { id: "dual", label: "Dual", desc: "Front + Down" },
  { id: "triple", label: "Triple", desc: "Front + Down + Up" },
];

export default function CameraScreen() {
  const { theme } = useTheme();
  // You can later load this from your lock device capability (API/BLE/Wi-Fi)
  const [visionMode, setVisionMode] = useState<VisionMode>("single");

  const cameraTabs: CamTab[] = useMemo(() => {
    const front: CamTab = {
      id: "front",
      name: "Front",
      icon: Camera,
      hint: "Video call + surveillance",
    };
    const down: CamTab = {
      id: "down",
      name: "Down",
      icon: Package,
      hint: "Parcel / object / pet detection",
    };
    const up: CamTab = {
      id: "up",
      name: "Up",
      icon: UserRoundCheck,
      hint: "Face verification",
    };

    if (visionMode === "none") return [];
    if (visionMode === "single") return [front];
    if (visionMode === "dual") return [front, down];
    return [front, down, up];
  }, [visionMode]);

  const [selectedCam, setSelectedCam] = useState<CamId>("front");

  // keep selectedCam valid when visionMode changes
  React.useEffect(() => {
    if (cameraTabs.length === 0) return;
    const stillExists = cameraTabs.some((t) => t.id === selectedCam);
    if (!stillExists) setSelectedCam(cameraTabs[0].id);
  }, [cameraTabs, selectedCam]);

  const activeTab = cameraTabs.find((t) => t.id === selectedCam);

  const subtitle =
    visionMode === "none"
      ? "No camera installed"
      : activeTab
      ? `${activeTab.name} Camera • ${activeTab.hint}`
      : "Camera";

  return (
<SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
  <LinearGradient colors={[theme.bg, theme.bg]} style={[styles.safe, { backgroundColor: theme.bg }]}>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Header */}
          <View style={styles.header}>
<View style={[styles.headerIconWrap, { backgroundColor: theme.card, borderColor: theme.border }]}>

            <Camera size={22} color={theme.accent} />
            </View>
            <View style={{ flex: 1 }}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Live View</Text>
<Text style={[styles.headerSub, { color: theme.muted }]}>{subtitle}</Text>
            </View>
          </View>

          {/* Vision Mode Selector */}
          <View style={styles.visionRow}>
            <Text style={[styles.sectionLabel, { color: theme.muted }]}>Vision configuration</Text>

            <View style={styles.visionChips}>
              {VISION_MODES.map((m) => {
                const active = m.id === visionMode;
                return (
              <TouchableOpacity
                key={m.id}
                style={[
                  styles.chip,
                  {
                    borderColor: active ? theme.accent : theme.border,
                    backgroundColor: active ? `${theme.accent}14` : theme.card,
                  },
                ]}
                onPress={() => setVisionMode(m.id)}
              >
                <Text style={[styles.chipText, { color: active ? theme.text : theme.text }]}>
                  {m.label}
                </Text>
                <Text style={[styles.chipSub, { color: active ? theme.accent : theme.muted }]}>
                  {m.desc}
                </Text>
              </TouchableOpacity>

                );
              })}
            </View>
          </View>

          {/* Camera Tabs (only when cameras exist) */}
          {visionMode !== "none" && cameraTabs.length > 0 && (
            <View style={styles.cameraTabsRow}>
              {cameraTabs.map((t) => {
                const active = t.id === selectedCam;
                const Icon = t.icon;
                return (
                  <TouchableOpacity
                    key={t.id}
                    style={[
                        styles.cameraTab,
                        {
                          borderColor: active ? theme.accent : theme.border,
                          backgroundColor: active ? `${theme.accent}12` : theme.card,
                        },
                      ]}
                    onPress={() => setSelectedCam(t.id)}
                  >
                    <View
                      style={[
                        styles.cameraTabIconWrap,
                        { borderColor: theme.border, backgroundColor: theme.bg },
                        active && { borderColor: `${theme.accent}55` },
                      ]}
                    >
                      <Icon size={18} color={active ? theme.accent : theme.muted} />
                    </View>
                    <Text style={[styles.cameraTabText, { color: active ? theme.text : theme.muted }]}>{t.name}</Text>

                  </TouchableOpacity>
                );
              })}
            </View>
          )}

              {/* Live view card */}
            <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={[styles.liveBox, { backgroundColor: theme.bg, borderColor: theme.border }]}>

              {visionMode === "none" ? (
                <>
                <ShieldCheck size={52} color={theme.accent} />
                  <Text style={styles.liveHint}>This lock has no camera module</Text>
                  <Text style={[styles.liveHint, { marginTop: 4 }]}>
                    Add a camera module to enable live view
                  </Text>
                </>
              ) : (
                <>
                  <Camera size={52} color={theme.accent} />
                  <Text style={[styles.liveHint, { color: theme.muted }]}>No live feed connected</Text>
                  <Text style={[styles.liveHint, { marginTop: 4 }]}>
                    {activeTab ? activeTab.hint : "Select a camera"}
                  </Text>
                </>
              )}
            </View>

            <View style={styles.liveFooter}>
              <Text style={[styles.liveStatus, { color: theme.muted }]}>
                {visionMode === "none" ? "N/A • No camera" : "Offline • Tap to configure"}
              </Text>
              <TouchableOpacity>
                <Text style={[styles.liveLink, { color: theme.accent }]}>
                  {visionMode === "none" ? "Learn more ›" : "Camera settings ›"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controlsRow}>
          <ControlButton theme={theme} icon={Video} label="Record" disabled={visionMode === "none"} />
          <ControlButton theme={theme} icon={ImageIcon} label="Snapshot" disabled={visionMode === "none"} />
          <ControlButton theme={theme} icon={Bell} label="Motion Alerts" disabled={visionMode === "none"} />

          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

type ControlProps = {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string;
  disabled?: boolean;
};
function ControlButton({ icon: Icon, label, disabled, theme }: ControlProps & { theme: any }) {
  return (
    <TouchableOpacity style={[styles.controlButton, disabled && { opacity: 0.45 }]} disabled={disabled}>
      <View style={[styles.controlIconWrap, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Icon size={20} color={theme.text} />
      </View>
      <Text style={[styles.controlLabel, { color: theme.text }]}>{label}</Text>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#020617",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    marginBottom: 10,
  },
  headerIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#F9FAFB",
  },
  headerSub: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },

  visionRow: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionLabel: {
    color: "#9CA3AF",
    fontSize: 12,
    marginBottom: 10,
  },
  visionChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    width: "48%",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#1F2937",
    backgroundColor: "#0B1220",
  },
  chipActive: {
    borderColor: "#22D3EE",
    backgroundColor: "#22D3EE14",
  },
  chipText: {
    color: "#E5E7EB",
    fontSize: 13,
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#F9FAFB",
  },
  chipSub: {
    color: "#9CA3AF",
    fontSize: 11,
    marginTop: 2,
  },
  chipSubActive: {
    color: "#CFFAFE",
  },

  cameraTabsRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 12,
  },
  cameraTab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1F2937",
    backgroundColor: "#0B1220",
  },
  cameraTabActive: {
    borderColor: "#22D3EE",
    backgroundColor: "#22D3EE12",
  },
  cameraTabIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1F2937",
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraTabIconWrapActive: {
    borderColor: "#22D3EE55",
  },
  cameraTabText: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  cameraTabTextActive: {
    color: "#E5E7EB",
  },

  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    borderRadius: 20,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#111827",
  },
  liveBox: {
    height: 220,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1F2937",
    backgroundColor: "#020617",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  liveHint: {
    marginTop: 10,
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
  },
  liveFooter: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  liveStatus: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  liveLink: {
    fontSize: 11,
    color: "#22D3EE",
  },

  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  controlButton: {
    alignItems: "center",
  },
  controlIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#1F2937",
    justifyContent: "center",
    alignItems: "center",
  },
  controlLabel: {
    fontSize: 11,
    color: "#E5E7EB",
    marginTop: 6,
  },
});
