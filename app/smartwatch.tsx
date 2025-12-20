import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Activity,
  BedDouble,
  ChevronDown,
  CloudSun,
  Droplets,
  Footprints,
  Heart,
  TrendingUp,
  Wind,
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

// ✅ adjust this path to where your ThemeProvider file is
import { Theme, useTheme } from "../app/theme/ThemeProvider";

type MetricCardProps = {
  theme: Theme;
  accent: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  title: string;
  right: string;
  sub?: string;
  footerRight?: string;
  children?: React.ReactNode;
};

type KpiRowProps = { theme: Theme; label: string; value: string };
type HrStatProps = { theme: Theme; label: string; value: string };
type LegendDotProps = { theme: Theme; color: string; label: string };
type MiniKpiProps = { theme: Theme; label: string; value: string; hint?: string };

export default function SmartwatchScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [homeMenuVisible, setHomeMenuVisible] = useState(false);

  const { theme, mode } = useTheme();

  // ✅ Fix TS overload: ensure literal tuple
  const pageGradient =
    mode === "dark"
      ? (["#020617", "#020617"] as const)
      : (["#F8FAFC", "#F8FAFC"] as const);

  // demo values (replace with real device data later)
  const today = "2025/12/15, Monday";
  const temp = "30°C";

  const steps = 0;
  const goalSteps = 6000;

  const sleepHours = "--";
  const sleepMins = "--";

  const hr = 67;
  const hrMin = 67;
  const hrAvg = 99;
  const hrMax = 112;

  const spo2 = 98;
  const hrv = 42; // ms
  const resp = 16; // breaths/min
  const mai = 78; // arbitrary score 0-100

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      <View style={[styles.container, { paddingTop: insets.top, backgroundColor: theme.bg }]}>
        <LinearGradient
          colors={pageGradient}
          style={[styles.safe, { backgroundColor: theme.bg }]}
        >
          {/* TOP DROPDOWN HEADER (Alex's Watch) */}
          <View style={styles.homeHeaderRow}>
            <TouchableOpacity
              style={styles.homeNameRow}
              onPress={() => setHomeMenuVisible((v) => !v)}
              activeOpacity={0.8}
            >
              <Text style={[styles.homeNameText, { color: theme.text }]}>
                Alex’s Watch
              </Text>
              <ChevronDown size={16} color={theme.text} />
            </TouchableOpacity>

            <View />
          </View>

          {/* DROPDOWN MENU */}
          {homeMenuVisible && (
            <TouchableOpacity
              style={styles.menuOverlay}
              activeOpacity={1}
              onPress={() => setHomeMenuVisible(false)}
            >
              <View
                style={[
                  styles.homeMenu,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <TouchableOpacity
                  style={styles.homeMenuItem}
                  onPress={() => {
                    setHomeMenuVisible(false);
                    router.replace("/(tabs)/home");
                  }}
                >
                  <Text style={[styles.homeMenuText, { color: theme.text }]}>
                    Alex’s Home
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.homeMenuItem}
                  onPress={() => {
                    setHomeMenuVisible(false);
                    router.replace("/smartwatch");
                  }}
                >
                  <Text style={[styles.homeMenuTextActive, { color: theme.accent }]}>
                    Alex’s Watch
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}

          <ScrollView contentContainerStyle={{ paddingBottom: 28 }}>
            {/* HEADER */}
            <View style={sw.headerWrap}>
              <View>
                <Text style={[sw.dateText, { color: theme.muted }]}>{today}</Text>
                <Text style={[sw.todayTitle, { color: theme.text }]}>Today</Text>
              </View>

              <View style={sw.weatherTop}>
                <Text style={[sw.tempText, { color: theme.text }]}>{temp}</Text>
                <CloudSun size={22} color={theme.accent} />
              </View>
            </View>

            {/* TIMELINE LIST */}
            <View style={sw.timelineWrap}>
              <View style={[sw.timelineLine, { backgroundColor: theme.border }]} />

              <MetricCard
                theme={theme}
                accent="#22C55E"
                icon={Footprints}
                title="Steps"
                right={`${steps} Steps`}
                sub="15/12/2025 1:38 pm"
                footerRight={`Goal: ${goalSteps} steps`}
              >
                <View style={sw.cardRow}>
                  <View style={sw.kpiCol}>
                    <KpiRow theme={theme} label="Kilometers" value="0" />
                    <KpiRow theme={theme} label="Kcal" value="0" />
                    <KpiRow theme={theme} label="Steps" value={`${steps}`} />
                  </View>

                  <View style={sw.ringsWrap}>
                    <View style={[sw.ring, { borderColor: "#22C55E30" }]} />
                    <View style={[sw.ringInner, { borderColor: "#22D3EE30" }]} />
                    <View style={[sw.ringCore, { borderColor: "#A78BFA30" }]} />
                  </View>
                </View>
              </MetricCard>

              <MetricCard
                theme={theme}
                accent="#A855F7"
                icon={BedDouble}
                title="Sleep"
                right={`${sleepHours}Hour ${sleepMins}Min`}
                sub="15/12/2025"
              >
                <View style={sw.legendRow}>
                  <LegendDot theme={theme} color="#A78BFA" label="Light sleep" />
                  <LegendDot theme={theme} color="#7C3AED" label="Deep sleep" />
                  <LegendDot theme={theme} color="#F59E0B" label="Eye movement" />
                  <LegendDot theme={theme} color="#22D3EE" label="Wake" />
                </View>
                <Text style={[sw.noDataText, { color: theme.muted }]}>No data</Text>
              </MetricCard>

              <MetricCard
                theme={theme}
                accent="#EF4444"
                icon={Heart}
                title="Heart rate"
                right={`${hr} BPM`}
                sub="15/12/2025 1:37 pm"
              >
                <View style={sw.hrStatsRow}>
                  <HrStat theme={theme} label="Minimum" value={`${hrMin} BPM`} />
                  <HrStat theme={theme} label="Average value" value={`${hrAvg} BPM`} />
                  <HrStat theme={theme} label="Maximum" value={`${hrMax} BPM`} />
                </View>

                <View style={sw.zoneBar}>
                  <View style={[sw.zoneSeg, { backgroundColor: "#FDE68A" }]} />
                  <View style={[sw.zoneSeg, { backgroundColor: "#F59E0B" }]} />
                  <View style={[sw.zoneSeg, { backgroundColor: "#FB7185" }]} />
                  <View style={[sw.zoneSeg, { backgroundColor: "#EF4444" }]} />
                </View>

                <View style={sw.zoneLabelsRow}>
                  <Text style={[sw.zoneLabel, { color: theme.muted }]}>Warm up</Text>
                  <Text style={[sw.zoneLabel, { color: theme.muted }]}>Endurance</Text>
                  <Text style={[sw.zoneLabel, { color: theme.muted }]}>Strengthen</Text>
                  <Text style={[sw.zoneLabel, { color: theme.muted }]}>Anaerobic</Text>
                </View>
              </MetricCard>

              <MetricCard
                theme={theme}
                accent="#22D3EE"
                icon={Droplets}
                title="SpO₂"
                right={`${spo2}%`}
                sub="Last measured today"
              >
                <MiniKpi
                  theme={theme}
                  label="Blood oxygen saturation"
                  value={`${spo2}%`}
                  hint="Normal: 95–100%"
                />
              </MetricCard>

              <MetricCard
                theme={theme}
                accent="#F59E0B"
                icon={Activity}
                title="HRV"
                right={`${hrv} ms`}
                sub="Last measured today"
              >
                <MiniKpi
                  theme={theme}
                  label="Heart rate variability"
                  value={`${hrv} ms`}
                  hint="Higher often indicates better recovery"
                />
              </MetricCard>

              <MetricCard
                theme={theme}
                accent="#60A5FA"
                icon={Wind}
                title="Respiratory Rate"
                right={`${resp} /min`}
                sub="Last measured today"
              >
                <MiniKpi
                  theme={theme}
                  label="Breaths per minute"
                  value={`${resp}`}
                  hint="Typical resting: ~12–20 /min"
                />
              </MetricCard>

              <MetricCard
                theme={theme}
                accent="#22C55E"
                icon={TrendingUp}
                title="MAI score"
                right={`${mai}/100`}
                sub="Daily wellness index"
              >
                <MiniKpi
                  theme={theme}
                  label="Overall readiness"
                  value={`${mai}/100`}
                  hint="Based on activity + sleep + vitals"
                />
                <View style={[sw.progressTrack, { backgroundColor: theme.border }]}>
                  <View style={[sw.progressFill, { width: `${mai}%` }]} />
                </View>
              </MetricCard>
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

/* ---------- blocks ---------- */

function MetricCard({
  theme,
  accent,
  icon: Icon,
  title,
  right,
  sub,
  footerRight,
  children,
}: MetricCardProps) {
  return (
    <View style={sw.itemRow}>
      <View
        style={[
          sw.bubble,
          {
            backgroundColor: `${accent}20`,
            borderColor: theme.border,
          },
        ]}
      >
        <Icon size={22} color={accent} />
      </View>

      <View style={[sw.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={sw.cardHeader}>
          <View>
            <Text style={[sw.cardTitle, { color: theme.text }]}>{title}</Text>
            {sub ? <Text style={[sw.cardSub, { color: theme.muted }]}>{sub}</Text> : null}
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={[sw.cardRight, { color: theme.text }]}>{right}</Text>
            {footerRight ? (
              <Text style={[sw.cardSub, { color: theme.muted }]}>{footerRight}</Text>
            ) : null}
          </View>
        </View>

        <View style={{ marginTop: 10 }}>{children}</View>
      </View>
    </View>
  );
}

function KpiRow({ theme, label, value }: KpiRowProps) {
  return (
    <View style={sw.kpiRow}>
      <Text style={[sw.kpiLabel, { color: theme.text }]}>{value}</Text>
      <Text style={[sw.kpiText, { color: theme.muted }]}>{label}</Text>
    </View>
  );
}

function HrStat({ theme, label, value }: HrStatProps) {
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <Text style={[sw.hrStatLabel, { color: theme.muted }]}>{label}</Text>
      <Text style={[sw.hrStatValue, { color: theme.text }]}>{value}</Text>
    </View>
  );
}

function LegendDot({ theme, color, label }: LegendDotProps) {
  return (
    <View style={sw.legendItem}>
      <View style={[sw.legendDot, { backgroundColor: color }]} />
      <Text style={[sw.legendText, { color: theme.muted }]}>{label}</Text>
    </View>
  );
}

function MiniKpi({ theme, label, value, hint }: MiniKpiProps) {
  return (
    <View>
      <Text style={[sw.miniLabel, { color: theme.muted }]}>{label}</Text>
      <Text style={[sw.miniValue, { color: theme.text }]}>{value}</Text>
      {hint ? <Text style={[sw.miniHint, { color: theme.muted }]}>{hint}</Text> : null}
    </View>
  );
}

/* ---------- styles ---------- */

const styles = StyleSheet.create({
  safe: { flex: 1 },
    container: {
    paddingVertical: 5,
    flex: 1,
    paddingHorizontal: 0,
  },


  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
  },
  homeMenu: {
    position: "absolute",
    top: 56,
    left: 16,
    borderRadius: 18,
    paddingVertical: 8,
    width: 220,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  homeMenuItem: { paddingHorizontal: 16, paddingVertical: 12 },
  homeMenuText: { fontSize: 14 },
  homeMenuTextActive: { fontSize: 14, fontWeight: "700" },

  homeHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    zIndex: 60,
  },
  homeNameRow: { flexDirection: "row", alignItems: "center" },
  homeNameText: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 6,
  },
});

const sw = StyleSheet.create({
  headerWrap: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  dateText: { fontSize: 12 },
  todayTitle: {
    fontSize: 34,
    fontWeight: "700",
    marginTop: 6,
  },
  weatherTop: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 18 },
  tempText: { fontSize: 14, fontWeight: "600" },

  timelineWrap: { marginTop: 8, paddingHorizontal: 16 },
  timelineLine: {
    position: "absolute",
    left: 28,
    top: 6,
    bottom: 0,
    width: 2,
    borderRadius: 999,
  },

  itemRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 16 },
  bubble: {
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    zIndex: 2,
    borderWidth: 1,
  },

  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: { fontSize: 16, fontWeight: "700" },
  cardSub: { fontSize: 11, marginTop: 2 },
  cardRight: { fontSize: 16, fontWeight: "800" },

  cardRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  kpiCol: { gap: 10 },
  kpiRow: { flexDirection: "row", alignItems: "baseline", gap: 10 },
  kpiLabel: { fontSize: 14, fontWeight: "700", width: 38 },
  kpiText: { fontSize: 12 },

  ringsWrap: { width: 120, height: 120, alignItems: "center", justifyContent: "center" },
  ring: { width: 110, height: 110, borderRadius: 999, borderWidth: 10 },
  ringInner: { position: "absolute", width: 86, height: 86, borderRadius: 999, borderWidth: 10 },
  ringCore: { position: "absolute", width: 58, height: 58, borderRadius: 999, borderWidth: 10 },

  legendRow: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 10 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 999 },
  legendText: { fontSize: 12 },
  noDataText: { textAlign: "center", marginTop: 12, fontSize: 12 },

  hrStatsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10, gap: 8 },
  hrStatLabel: { fontSize: 11 },
  hrStatValue: { fontSize: 12, fontWeight: "700", marginTop: 3 },

  zoneBar: { height: 10, borderRadius: 999, overflow: "hidden", flexDirection: "row" },
  zoneSeg: { flex: 1 },
  zoneLabelsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  zoneLabel: { fontSize: 10 },

  miniLabel: { fontSize: 12 },
  miniValue: { fontSize: 22, fontWeight: "800", marginTop: 4 },
  miniHint: { fontSize: 11, marginTop: 4 },

  progressTrack: {
    marginTop: 10,
    height: 10,
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#22C55E", borderRadius: 999 },
});
