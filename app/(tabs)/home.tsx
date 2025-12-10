import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Activity,
  Battery,
  Bell,
  Bluetooth,
  KeyRound,
  Lock,
  Radio,
  RadioTower,
  Settings,
  Shield,
  Thermometer,
  Unlock,
  Users,
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

type IconType = React.ComponentType<{ size?: number; color?: string }>;

type FeatureCardProps = {
  title: string;
  subtitle: string;
  icon: IconType;
  accent?: string;
  onPress?: () => void;
};

type ToggleGateProps = {
  label: string;
  active: boolean;
  onToggle: () => void;
  number: string | number; // add gate number
};

type TopActionProps = {
  icon: IconType;
  label: string;
  active?: boolean;
  onPress?: () => void;
};
type TopStatusProps = {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string;
  status: string;
};


export default function HomeScreen() {
  const [gate1, setGate1] = useState(true);   // First Gate active
  const [gate2, setGate2] = useState(true);  // Second Gate inactive
  const [locked, setLocked] = useState(true);
  const router = useRouter();

  const lockStatus = locked ? "Locked" : "Unlocked";
  const lockColor = locked ? "#22C55E" : "#F97316";

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={["#020617", "#020617", "#020617"]}
        style={styles.safe}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {/* Fake status bar row */}
          <View style={styles.topRow}>
            <Text style={styles.timeText}>4:33</Text>
            <View style={styles.topIcons}>
              <Wifi size={16} color="#9CA3AF" />
              <Bluetooth size={16} color="#9CA3AF" style={{ marginLeft: 6 }} />
              <RadioTower size={16} color="#9CA3AF" style={{ marginLeft: 6 }} />
            </View>
          </View>

          {/* HERO */}
          <View style={styles.heroWrapper}>
            <LinearGradient
              colors={["#020617", "#020617"]}
              style={styles.heroCard}
            >
              {/* Metrics */}
              <View style={styles.metricsRow}>
                <View>
                  <Text style={styles.metricMain}>{lockStatus}</Text>
                  <Text style={styles.metricSub}>Front Door</Text>
                </View>
                <View style={{ alignItems: "flex-end" }}>


                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, marginTop: 12 }}>
                  <TopStatus icon={Battery} label="Battery" status="87%" />
                  <TopStatus icon={Wifi} label="WiFi" status="Online" />
                  <TopStatus icon={Bluetooth} label="Bluetooth" status="Connected" />
                  
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, marginTop: 10 }}>
                  <TopStatus icon={Thermometer} label="Temp" status="27°C" />
                  <TopStatus icon={Activity} label="Humidity" status="63%" />
                  <TopStatus icon={Radio} label="Signal" status="Strong" />
                </View>
                </View>
              </View>

              {/* Lock icon + action */}
              <View style={styles.heroMiddleRow}>
                <View style={styles.deviceCircle}>
                  <LinearGradient
                    colors={["#0F172A", "#020617"]}
                    style={styles.deviceCircleInner}
                  >
                    {locked ? (
                      <Lock size={52} color="#E5E7EB" />
                    ) : (
                      <Unlock size={52} color="#FACC15" />
                    )}
                  </LinearGradient>
                </View>

                <View style={styles.heroActionCol}>
                  <TouchableOpacity
                    onPress={() => setLocked(!locked)}
                    style={[
                      styles.lockCircle,
                      { backgroundColor: lockColor },
                    ]}
                  >
                    {locked ? (
                      <Unlock size={26} color="#020617" />
                    ) : (
                      <Lock size={26} color="#020617" />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.heroActionText}>
                    {locked ? "Tap to unlock" : "Tap to lock"}
                  </Text>
                </View>
              </View>

              {/* status footer */}
              <View style={styles.heroFooterRow}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: locked ? "#22C55E" : "#F97316" },
                    ]}
                  />
                  <Text style={styles.heroStatusText}>
                    {locked ? "Door secure • Auto-lock 30s" : "Door open"}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => router.push("/(tabs)/devices")}>
                  <Text style={styles.heroLink}>Device details ›</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* TOP ACTIONS (3 icons row) */}
          <View style={styles.topActionsRow}>
         <ToggleGate
            label="First Gate"
            active={gate1}
            number={1}
            onToggle={() => setGate1(!gate1)}
          />

          <ToggleGate
            label="Second Gate"
            active={gate2}
            number={2}
            onToggle={() => setGate2(!gate2)}
          />
            <TopAction
              icon={Users}
              label="Guests"
              onPress={() => router.push("/(tabs)/access")}
            />
          </View>

          {/* GRID CARDS */}
          <View style={styles.grid}>
            <FeatureCard
              title="Digital Key"
              subtitle="Use app / NFC to unlock"
              icon={KeyRound}
              accent="#22C55E"
            />
            <FeatureCard
              title="Doorbell Alerts"
              subtitle="Last alert • 09:12"
              icon={Bell}
              accent="#F97316"
              onPress={() => router.push("/(tabs)/settings")}
            />
            <FeatureCard
              title="Device Health"
              subtitle="All systems normal"
              icon={Activity}
              accent="#22D3EE"
              onPress={() => router.push("/(tabs)/devices")}
            />
            <FeatureCard
              title="Access Logs"
              subtitle="View recent door events"
              icon={Settings}
              accent="#A855F7"
            />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}



/* small components */



function ToggleGate({ label, active, onToggle, number }: ToggleGateProps) {
  return (
    <TouchableOpacity style={styles.topAction} onPress={onToggle}>
      <View
        style={[
          styles.topActionIconWrap,
          active
            ? { borderColor: "#22C55E", backgroundColor: "#16A34A25" }
            : { borderColor: "#EF4444", backgroundColor: "#7F1D1D25" },
        ]}
      >
        {/* Shield icon */}
        <Shield size={28} color={active ? "#22C55E" : "#EF4444"} />

        {/* Number overlay */}
        <Text
          style={[
            styles.shieldNumber,
            { color: active ? "#22C55E" : "#EF4444" },
          ]}
        >
          {number}
        </Text>
      </View>

      <Text
        style={[
          styles.topActionLabel,
          active ? { color: "#E5E7EB" } : { color: "#EF4444" },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function TopAction({ icon: Icon, label, active, onPress }: TopActionProps) {
  return (
    <TouchableOpacity style={styles.topAction} onPress={onPress}>
      <View
        style={[
          styles.topActionIconWrap,
          active && { borderColor: "#22C55E", backgroundColor: "#16A34A25" },
        ]}
      >
        <Icon size={22} color={active ? "#22C55E" : "#E5E7EB"} />
      </View>
      <Text style={[styles.topActionLabel, active && { color: "#E5E7EB" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}


function TopStatus({ icon: Icon, label, status }: TopStatusProps) {
  return (
    <TouchableOpacity style={styles.topStatus}>
      <View style={styles.topStatusIconWrap}>
        <Icon size={18} color="#9CA3AF" />
      </View>
      <View>
        <Text style={styles.metricLabel}>{label}</Text>
        <Text style={styles.metricValue}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
}



function FeatureCard({
  title,
  subtitle,
  icon: Icon,
  accent = "#22D3EE",
  onPress,
}: FeatureCardProps) {
  return (
    <TouchableOpacity style={styles.featureCard} onPress={onPress}>
      <View style={styles.featureTopRow}>
        <Text style={styles.featureTitle} numberOfLines={1}>
          {title}
        </Text>
        <View
          style={[
            styles.featureIconWrap,
            { borderColor: accent + "55", backgroundColor: "#020617" },
          ]}
        >
          <Icon size={18} color={accent} />
        </View>
      </View>
      <Text style={styles.featureSubtitle} numberOfLines={2}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
}

/* styles */

const styles = StyleSheet.create({

  topStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  topStatusIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1F2937",
  },

  shieldNumber: {
  position: "absolute",
  fontSize: 12,
  fontWeight: "700",
  top: "50%",
  left: "50%",
  transform: [{ translateX: -4 }, { translateY: -8 }],
},

  safe: {
    flex: 1,
    backgroundColor: "#020617",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 6,
    marginBottom: 4,
  },
  timeText: {
    color: "#E5E7EB",
    fontSize: 12,
  },
  topIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  heroWrapper: {
    paddingHorizontal: 16,
    marginTop: 4,
  },
  heroCard: {
    borderRadius: 24,
    padding: 16,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1F2937",
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  metricMain: {
    fontSize: 26,
    fontWeight: "700",
    color: "#F9FAFB",
  },
  metricSub: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
  metricLabel: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  metricValue: {
    fontSize: 16,
    color: "#E5E7EB",
    fontWeight: "600",
  },
  heroMiddleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  deviceCircle: {
    flex: 1,
    alignItems: "center",
  },
  deviceCircleInner: {
    width: 130,
    height: 130,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E293B",
  },
  heroActionCol: {
    alignItems: "center",
    paddingLeft: 8,
  },
  lockCircle: {
    width: 62,
    height: 62,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  heroActionText: {
    marginTop: 8,
    fontSize: 11,
    color: "#9CA3AF",
  },
  heroFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    marginRight: 6,
  },
  heroStatusText: {
    color: "#E5E7EB",
    fontSize: 11,
  },
  heroLink: {
    color: "#22D3EE",
    fontSize: 11,
  },

  topActionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    marginTop: 18,
  },
  topAction: {
    alignItems: "center",
  },
  topActionIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020617",
  },
  topActionLabel: {
    fontSize: 11,
    marginTop: 6,
    color: "#9CA3AF",
  },

  grid: {
    marginTop: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  featureCard: {
    width: "48%",
    backgroundColor: "#020617",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#111827",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  featureTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  featureTitle: {
    fontSize: 14,
    color: "#E5E7EB",
    fontWeight: "600",
  },
  featureSubtitle: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  featureIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
