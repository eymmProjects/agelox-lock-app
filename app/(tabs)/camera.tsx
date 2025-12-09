import { LinearGradient } from "expo-linear-gradient";
import { Bell, Camera, Image as ImageIcon, Video } from "lucide-react-native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CameraScreen() {
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
          <View style={styles.header}>
            <View style={styles.headerIconWrap}>
              <Camera size={22} color="#22D3EE" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Live View</Text>
              <Text style={styles.headerSub}>Front Door Camera</Text>
            </View>
          </View>

          {/* Live view card */}
          <View style={styles.card}>
            <View style={styles.liveBox}>
              <Camera size={52} color="#22D3EE" />
              <Text style={styles.liveHint}>No live feed connected</Text>
            </View>

            <View style={styles.liveFooter}>
              <Text style={styles.liveStatus}>Offline • Tap to configure</Text>
              <TouchableOpacity>
                <Text style={styles.liveLink}>Camera settings ›</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controlsRow}>
            <ControlButton icon={Video} label="Record" />
            <ControlButton icon={ImageIcon} label="Snapshot" />
            <ControlButton icon={Bell} label="Motion Alerts" />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

type ControlProps = {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string;
};

function ControlButton({ icon: Icon, label }: ControlProps) {
  return (
    <TouchableOpacity style={styles.controlButton}>
      <View style={styles.controlIconWrap}>
        <Icon size={20} color="#E5E7EB" />
      </View>
      <Text style={styles.controlLabel}>{label}</Text>
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
  },
  liveHint: {
    marginTop: 10,
    fontSize: 12,
    color: "#9CA3AF",
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
