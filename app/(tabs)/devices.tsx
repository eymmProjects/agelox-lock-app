import { LinearGradient } from "expo-linear-gradient";
import {
  Activity,
  Battery,
  Cpu,
  RefreshCcw,
  Wifi,
} from "lucide-react-native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DevicesScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={["#020617", "#020617"]}
        style={styles.safe}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerIconWrap}>
              <Cpu size={22} color="#22D3EE" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Device Management</Text>
              <Text style={styles.headerSub}>Agelox Multi-Gate v1.2</Text>
            </View>
          </View>

          {/* Device status card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Status</Text>
              <Activity size={18} color="#22D3EE" />
            </View>

            <View style={styles.infoRow}>
              <InfoTag label="Serial" value="AGX-221004B" />
              <InfoTag label="Firmware" value="2.3.1" />
            </View>
            <View style={styles.infoRow}>
              <InfoTag label="Battery" value="87%" icon={Battery} />
              <InfoTag label="Network" value="Wi-Fi (online)" icon={Wifi} />
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.primaryButton}>
                <RefreshCcw size={16} color="#020617" />
                <Text style={styles.primaryButtonText}>Update Firmware</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Calibrate</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Auto-lock & Feedback */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Auto-Lock & Feedback</Text>
            <SettingRow label="Auto-Lock Timer" value="30s" />
            <SettingRow label="Sound Feedback" value="Enabled" />
            <SettingRow label="LED Indicator" value="Enabled" />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

type TagProps = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ size?: number; color?: string }>;
};

function InfoTag({ label, value, icon: Icon }: TagProps) {
  return (
    <View style={styles.tag}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {Icon && <Icon size={14} color="#9CA3AF" />}
        <Text style={styles.tagLabel}>
          {Icon ? "  " : ""}
          {label}
        </Text>
      </View>
      <Text style={styles.tagValue}>{value}</Text>
    </View>
  );
}

type RowProps = {
  label: string;
  value: string;
};

function SettingRow({ label, value }: RowProps) {
  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingLabel}>{label}</Text>
      <Text style={styles.settingValue}>{value}</Text>
    </View>
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
    marginBottom: 16,
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
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 14,
    borderRadius: 20,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#111827",
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
    color: "#E5E7EB",
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
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1F2937",
  },
  tagLabel: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  tagValue: {
    fontSize: 13,
    color: "#E5E7EB",
    marginTop: 4,
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
    backgroundColor: "#22D3EE",
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  primaryButtonText: {
    color: "#020617",
    fontSize: 13,
    fontWeight: "600",
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#4B5563",
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#E5E7EB",
    fontSize: 13,
  },
  settingRow: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1F2937",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 13,
    color: "#E5E7EB",
  },
  settingValue: {
    fontSize: 13,
    color: "#22D3EE",
  },
});
