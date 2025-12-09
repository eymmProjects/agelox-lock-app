import { LinearGradient } from "expo-linear-gradient";
import { Bell, Moon, ShieldCheck, Smartphone, User } from "lucide-react-native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function SettingsScreen() {
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
          {/* Header / Profile */}
          <View style={styles.header}>
            <View style={styles.avatar}>
              <User size={26} color="#22D3EE" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Alex Vargas</Text>
              <Text style={styles.headerSub}>alex@agenox.ai</Text>
            </View>
          </View>

          {/* Security card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Security</Text>
              <ShieldCheck size={18} color="#22D3EE" />
            </View>
            <Row label="Password & Security" value="Manage" />
            <Row label="Biometric Login" value="Enabled" />
          </View>

          {/* Preferences */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Preferences</Text>
            </View>
            <IconRow icon={Moon} label="Dark Mode" value="On" />
            <IconRow icon={Bell} label="Notifications" value="Enabled" />
            <IconRow icon={Smartphone} label="Device language" value="English" />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

type RowProps = {
  label: string;
  value: string;
};

function Row({ label, value }: RowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

type IconRowProps = {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string;
  value: string;
};

function IconRow({ icon: Icon, label, value }: IconRowProps) {
  return (
    <View style={styles.row}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon size={18} color="#9CA3AF" />
        <Text style={[styles.rowLabel, { marginLeft: 6 }]}>{label}</Text>
      </View>
      <Text style={styles.rowValue}>{value}</Text>
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
  avatar: {
    width: 46,
    height: 46,
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
  row: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#020617",
  },
  rowLabel: {
    fontSize: 13,
    color: "#E5E7EB",
  },
  rowValue: {
    fontSize: 13,
    color: "#22D3EE",
  },
});
