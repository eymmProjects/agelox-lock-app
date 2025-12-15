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

export default function SmartwatchScreen() {
  const router = useRouter();
  const [homeMenuVisible, setHomeMenuVisible] = useState(false);

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
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={["#020617", "#020617"]} style={styles.safe}>
        {/* TOP DROPDOWN HEADER (Alex's Watch) */}
        <View style={styles.homeHeaderRow}>
          <TouchableOpacity
            style={styles.homeNameRow}
            onPress={() => setHomeMenuVisible((v) => !v)}
            activeOpacity={0.8}
          >
            <Text style={styles.homeNameText}>Alex’s Watch</Text>
            <ChevronDown size={16} color="#E5E7EB" />
          </TouchableOpacity>

          {/* right side is optional - keep empty for now */}
          <View />
        </View>

        {/* DROPDOWN MENU */}
        {homeMenuVisible && (
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPress={() => setHomeMenuVisible(false)}
          >
            <View style={styles.homeMenu}>
              <TouchableOpacity
                style={styles.homeMenuItem}
                onPress={() => {
                  setHomeMenuVisible(false);
                  router.replace("/(tabs)/home");
                }}
              >
                <Text style={styles.homeMenuText}>Alex’s Home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.homeMenuItem}
                onPress={() => {
                  setHomeMenuVisible(false);
                  router.replace("/smartwatch");
                }}
              >
                <Text style={styles.homeMenuTextActive}>Alex’s Watch</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}

        <ScrollView contentContainerStyle={{ paddingBottom: 28 }}>
          {/* HEADER */}
          <View style={sw.headerWrap}>
            <View>
              <Text style={sw.dateText}>{today}</Text>
              <Text style={sw.todayTitle}>Today</Text>
            </View>

            <View style={sw.weatherTop}>
              <Text style={sw.tempText}>{temp}</Text>
              <CloudSun size={22} color="#22D3EE" />
            </View>
          </View>

          {/* TIMELINE LIST */}
          <View style={sw.timelineWrap}>
            <View style={sw.timelineLine} />

            <MetricCard
              accent="#22C55E"
              icon={Footprints}
              title="Steps"
              right={`${steps} Steps`}
              sub="15/12/2025 1:38 pm"
              footerRight={`Goal: ${goalSteps} steps`}
            >
              <View style={sw.cardRow}>
                <View style={sw.kpiCol}>
                  <KpiRow label="Kilometers" value="0" />
                  <KpiRow label="Kcal" value="0" />
                  <KpiRow label="Steps" value={`${steps}`} />
                </View>

                <View style={sw.ringsWrap}>
                  <View style={[sw.ring, { borderColor: "#22C55E30" }]} />
                  <View style={[sw.ringInner, { borderColor: "#22D3EE30" }]} />
                  <View style={[sw.ringCore, { borderColor: "#A78BFA30" }]} />
                </View>
              </View>
            </MetricCard>

            <MetricCard
              accent="#A855F7"
              icon={BedDouble}
              title="Sleep"
              right={`${sleepHours}Hour ${sleepMins}Min`}
              sub="15/12/2025"
            >
              <View style={sw.legendRow}>
                <LegendDot color="#A78BFA" label="Light sleep" />
                <LegendDot color="#7C3AED" label="Deep sleep" />
                <LegendDot color="#F59E0B" label="Eye movement" />
                <LegendDot color="#22D3EE" label="Wake" />
              </View>
              <Text style={sw.noDataText}>No data</Text>
            </MetricCard>

            <MetricCard
              accent="#EF4444"
              icon={Heart}
              title="Heart rate"
              right={`${hr} BPM`}
              sub="15/12/2025 1:37 pm"
            >
              <View style={sw.hrStatsRow}>
                <HrStat label="Minimum" value={`${hrMin} BPM`} />
                <HrStat label="Average value" value={`${hrAvg} BPM`} />
                <HrStat label="Maximum" value={`${hrMax} BPM`} />
              </View>

              <View style={sw.zoneBar}>
                <View style={[sw.zoneSeg, { backgroundColor: "#FDE68A" }]} />
                <View style={[sw.zoneSeg, { backgroundColor: "#F59E0B" }]} />
                <View style={[sw.zoneSeg, { backgroundColor: "#FB7185" }]} />
                <View style={[sw.zoneSeg, { backgroundColor: "#EF4444" }]} />
              </View>

              <View style={sw.zoneLabelsRow}>
                <Text style={sw.zoneLabel}>Warm up</Text>
                <Text style={sw.zoneLabel}>Endurance</Text>
                <Text style={sw.zoneLabel}>Strengthen</Text>
                <Text style={sw.zoneLabel}>Anaerobic</Text>
              </View>
            </MetricCard>

            <MetricCard
              accent="#22D3EE"
              icon={Droplets}
              title="SpO₂"
              right={`${spo2}%`}
              sub="Last measured today"
            >
              <MiniKpi
                label="Blood oxygen saturation"
                value={`${spo2}%`}
                hint="Normal: 95–100%"
              />
            </MetricCard>

            <MetricCard
              accent="#F59E0B"
              icon={Activity}
              title="HRV"
              right={`${hrv} ms`}
              sub="Last measured today"
            >
              <MiniKpi
                label="Heart rate variability"
                value={`${hrv} ms`}
                hint="Higher often indicates better recovery"
              />
            </MetricCard>

            <MetricCard
              accent="#60A5FA"
              icon={Wind}
              title="Respiratory Rate"
              right={`${resp} /min`}
              sub="Last measured today"
            >
              <MiniKpi
                label="Breaths per minute"
                value={`${resp}`}
                hint="Typical resting: ~12–20 /min"
              />
            </MetricCard>

            <MetricCard
              accent="#22C55E"
              icon={TrendingUp}
              title="MAI score"
              right={`${mai}/100`}
              sub="Daily wellness index"
            >
              <MiniKpi
                label="Overall readiness"
                value={`${mai}/100`}
                hint="Based on activity + sleep + vitals"
              />
              <View style={sw.progressTrack}>
                <View style={[sw.progressFill, { width: `${mai}%` }]} />
              </View>
            </MetricCard>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

/* ---------- blocks ---------- */

function MetricCard({
  accent,
  icon: Icon,
  title,
  right,
  sub,
  footerRight,
  children,
}: any) {
  return (
    <View style={sw.itemRow}>
      <View style={[sw.bubble, { backgroundColor: `${accent}20` }]}>
        <Icon size={22} color={accent} />
      </View>

      <View style={sw.card}>
        <View style={sw.cardHeader}>
          <View>
            <Text style={sw.cardTitle}>{title}</Text>
            {sub ? <Text style={sw.cardSub}>{sub}</Text> : null}
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={sw.cardRight}>{right}</Text>
            {footerRight ? <Text style={sw.cardSub}>{footerRight}</Text> : null}
          </View>
        </View>

        <View style={{ marginTop: 10 }}>{children}</View>
      </View>
    </View>
  );
}

function KpiRow({ label, value }: any) {
  return (
    <View style={sw.kpiRow}>
      <Text style={sw.kpiLabel}>{value}</Text>
      <Text style={sw.kpiText}>{label}</Text>
    </View>
  );
}

function HrStat({ label, value }: any) {
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <Text style={sw.hrStatLabel}>{label}</Text>
      <Text style={sw.hrStatValue}>{value}</Text>
    </View>
  );
}

function LegendDot({ color, label }: any) {
  return (
    <View style={sw.legendItem}>
      <View style={[sw.legendDot, { backgroundColor: color }]} />
      <Text style={sw.legendText}>{label}</Text>
    </View>
  );
}

function MiniKpi({ label, value, hint }: any) {
  return (
    <View>
      <Text style={sw.miniLabel}>{label}</Text>
      <Text style={sw.miniValue}>{value}</Text>
      {hint ? <Text style={sw.miniHint}>{hint}</Text> : null}
    </View>
  );
}

/* ---------- styles ---------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#020617" },

  // dropdown styles (same style language as your home)
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
    backgroundColor: "#0B1220",
    borderRadius: 18,
    paddingVertical: 8,
    width: 220,
    borderWidth: 1,
    borderColor: "#1F2937",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  homeMenuItem: { paddingHorizontal: 16, paddingVertical: 12 },
  homeMenuText: { color: "#E5E7EB", fontSize: 14 },
  homeMenuTextActive: { color: "#22D3EE", fontSize: 14, fontWeight: "700" },

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
    color: "#F9FAFB",
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
  dateText: { color: "#9CA3AF", fontSize: 12 },
  todayTitle: {
    color: "#F9FAFB",
    fontSize: 34,
    fontWeight: "700",
    marginTop: 6,
  },
  weatherTop: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 18 },
  tempText: { color: "#E5E7EB", fontSize: 14, fontWeight: "600" },

  timelineWrap: { marginTop: 8, paddingHorizontal: 16 },
  timelineLine: {
    position: "absolute",
    left: 28,
    top: 6,
    bottom: 0,
    width: 2,
    backgroundColor: "#111827",
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
    borderColor: "#111827",
    backgroundColor: "#0B1220",
  },

  card: {
    flex: 1,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#111827",
    borderRadius: 18,
    padding: 14,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTitle: { color: "#E5E7EB", fontSize: 16, fontWeight: "700" },
  cardSub: { color: "#9CA3AF", fontSize: 11, marginTop: 2 },
  cardRight: { color: "#E5E7EB", fontSize: 16, fontWeight: "800" },

  cardRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  kpiCol: { gap: 10 },
  kpiRow: { flexDirection: "row", alignItems: "baseline", gap: 10 },
  kpiLabel: { color: "#E5E7EB", fontSize: 14, fontWeight: "700", width: 38 },
  kpiText: { color: "#9CA3AF", fontSize: 12 },

  ringsWrap: { width: 120, height: 120, alignItems: "center", justifyContent: "center" },
  ring: { width: 110, height: 110, borderRadius: 999, borderWidth: 10 },
  ringInner: { position: "absolute", width: 86, height: 86, borderRadius: 999, borderWidth: 10 },
  ringCore: { position: "absolute", width: 58, height: 58, borderRadius: 999, borderWidth: 10 },

  legendRow: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 10 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 999 },
  legendText: { color: "#9CA3AF", fontSize: 12 },
  noDataText: { textAlign: "center", color: "#9CA3AF", marginTop: 12, fontSize: 12 },

  hrStatsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10, gap: 8 },
  hrStatLabel: { color: "#9CA3AF", fontSize: 11 },
  hrStatValue: { color: "#E5E7EB", fontSize: 12, fontWeight: "700", marginTop: 3 },

  zoneBar: { height: 10, borderRadius: 999, overflow: "hidden", flexDirection: "row" },
  zoneSeg: { flex: 1 },
  zoneLabelsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  zoneLabel: { color: "#9CA3AF", fontSize: 10 },

  miniLabel: { color: "#9CA3AF", fontSize: 12 },
  miniValue: { color: "#E5E7EB", fontSize: 22, fontWeight: "800", marginTop: 4 },
  miniHint: { color: "#6B7280", fontSize: 11, marginTop: 4 },

  progressTrack: {
    marginTop: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#111827",
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#22C55E", borderRadius: 999 },
});
