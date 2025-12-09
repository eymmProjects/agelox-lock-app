import { LinearGradient } from "expo-linear-gradient";
import { CalendarDays, Clock, KeyRound, Users } from "lucide-react-native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AccessScreen() {
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
              <Users size={22} color="#22D3EE" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Guest Access</Text>
              <Text style={styles.headerSub}>Create and manage passes</Text>
            </View>
          </View>

          {/* Create Guest Pass card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Create Guest Pass</Text>
              <KeyRound size={18} color="#22D3EE" />
            </View>

            <View style={styles.formRow}>
              <TextInput
                placeholder="Guest name"
                placeholderTextColor="#6B7280"
                style={styles.input}
              />
              <TextInput
                placeholder="Email / Phone"
                placeholderTextColor="#6B7280"
                style={styles.input}
              />
            </View>

            <View style={styles.formRow}>
              <TouchableOpacity style={styles.selector}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CalendarDays size={16} color="#9CA3AF" />
                  <Text style={styles.selectorLabel}>  Dates</Text>
                </View>
                <Text style={styles.selectorValue}>Select</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.selector}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Clock size={16} color="#9CA3AF" />
                  <Text style={styles.selectorLabel}>  Hours</Text>
                </View>
                <Text style={styles.selectorValue}>Set</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>
                Generate QR / NFC Pass
              </Text>
            </TouchableOpacity>
          </View>

          {/* Active Passes */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Active Passes</Text>

            <View style={styles.passRow}>
              <View>
                <Text style={styles.passName}>John (Cleaner)</Text>
                <Text style={styles.passMeta}>Today • 08:00 — 10:00</Text>
              </View>
              <View style={styles.passActions}>
                <TouchableOpacity style={styles.outlineButton}>
                  <Text style={styles.outlineButtonText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.outlineButton, { borderColor: "#F97373" }]}
                >
                  <Text
                    style={[
                      styles.outlineButtonText,
                      { color: "#F97373" },
                    ]}
                  >
                    Revoke
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.passRowMuted}>
              <Text style={styles.passMutedText}>
                Add more guests to automate access for cleaners, family, and
                deliveries.
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
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
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E5E7EB",
  },
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#020617",
    borderColor: "#1F2937",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#E5E7EB",
    fontSize: 13,
  },
  selector: {
    flex: 1,
    backgroundColor: "#020617",
    borderColor: "#1F2937",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectorLabel: {
    color: "#D1D5DB",
    fontSize: 13,
  },
  selectorValue: {
    color: "#22D3EE",
    fontSize: 13,
  },
  primaryButton: {
    marginTop: 4,
    backgroundColor: "#22D3EE",
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#020617",
    fontWeight: "600",
    fontSize: 13,
  },
  passRow: {
    marginTop: 12,
    padding: 10,
    borderRadius: 14,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1F2937",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passName: {
    color: "#F9FAFB",
    fontSize: 14,
  },
  passMeta: {
    color: "#9CA3AF",
    fontSize: 11,
  },
  passActions: {
    flexDirection: "row",
    gap: 6,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#22D3EE",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  outlineButtonText: {
    color: "#22D3EE",
    fontSize: 11,
  },
  passRowMuted: {
    marginTop: 10,
  },
  passMutedText: {
    color: "#6B7280",
    fontSize: 11,
  },
});
