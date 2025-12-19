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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";


export default function AccessScreen() {
  const { theme, mode } = useTheme();

  const pageGradient =
    mode === "dark"
      ? (["#020617", "#020617"] as const)
      : (["#F8FAFC", "#F8FAFC"] as const);

  const iconAccent = mode === "dark" ? "#22D3EE" : theme.accent;
  const chipBg = mode === "dark" ? "#0F172A" : "#EEF2FF";
  const insets = useSafeAreaInsets();

  return (
    
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      <View style={[styles.container, { paddingTop: insets.top }]}>

      <LinearGradient colors={pageGradient} style={[styles.safe, { backgroundColor: theme.bg }]}>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }}>
          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.headerIconWrap, { backgroundColor: chipBg, borderColor: theme.border }]}>
              <Users size={22} color={iconAccent} />
            </View>
            <View>
              <Text style={[styles.headerTitle, { color: theme.text }]}>Guest Access</Text>
              <Text style={[styles.headerSub, { color: theme.muted }]}>Create and manage passes</Text>
            </View>
          </View>

          {/* Create Guest Pass card */}
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>Create Guest Pass</Text>
              <KeyRound size={18} color={iconAccent} />
            </View>

            <View style={styles.formRow}>
              <TextInput
                placeholder="Guest name"
                placeholderTextColor={theme.muted}
                style={[
                  styles.input,
                  { backgroundColor: theme.card, borderColor: theme.border, color: theme.text },
                ]}
              />
              <TextInput
                placeholder="Email / Phone"
                placeholderTextColor={theme.muted}
                style={[
                  styles.input,
                  { backgroundColor: theme.card, borderColor: theme.border, color: theme.text },
                ]}
              />
            </View>

            <View style={styles.formRow}>
              <TouchableOpacity
                style={[
                  styles.selector,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <CalendarDays size={16} color={theme.muted} />
                  <Text style={[styles.selectorLabel, { color: theme.text }]}>  Dates</Text>
                </View>
                <Text style={[styles.selectorValue, { color: theme.accent }]}>Select</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.selector,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Clock size={16} color={theme.muted} />
                  <Text style={[styles.selectorLabel, { color: theme.text }]}>  Hours</Text>
                </View>
                <Text style={[styles.selectorValue, { color: theme.accent }]}>Set</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.primaryButton,
                { backgroundColor: theme.accent },
              ]}
            >
              <Text style={[styles.primaryButtonText, { color: mode === "dark" ? "#020617" : "#FFFFFF" }]}>
                Generate QR / NFC Pass
              </Text>
            </TouchableOpacity>
          </View>

          {/* Active Passes */}
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>Active Passes</Text>

            <View
              style={[
                styles.passRow,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <View>
                <Text style={[styles.passName, { color: theme.text }]}>John (Cleaner)</Text>
                <Text style={[styles.passMeta, { color: theme.muted }]}>
                  Today • 08:00 — 10:00
                </Text>
              </View>

              <View style={styles.passActions}>
                <TouchableOpacity
                  style={[styles.outlineButton, { borderColor: theme.accent }]}
                >
                  <Text style={[styles.outlineButtonText, { color: theme.accent }]}>Share</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.outlineButton, { borderColor: "#EF4444" }]}
                >
                  <Text style={[styles.outlineButtonText, { color: "#EF4444" }]}>
                    Revoke
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.passRowMuted}>
              <Text style={[styles.passMutedText, { color: theme.muted }]}>
                Add more guests to automate access for cleaners, family, and deliveries.
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },

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
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
  },

  selector: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectorLabel: {
    fontSize: 13,
  },
  selectorValue: {
    fontSize: 13,
    fontWeight: "600",
  },

  primaryButton: {
    marginTop: 4,
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
  },
  primaryButtonText: {
    fontWeight: "700",
    fontSize: 13,
  },

  passRow: {
    marginTop: 12,
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passName: {
    fontSize: 14,
    fontWeight: "600",
  },
  passMeta: {
    fontSize: 11,
    marginTop: 2,
  },
  passActions: {
    flexDirection: "row",
    gap: 6,
  },
  outlineButton: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  outlineButtonText: {
    fontSize: 11,
    fontWeight: "600",
  },

  passRowMuted: {
    marginTop: 10,
  },
  passMutedText: {
    fontSize: 11,
  },

    container: {
    paddingVertical: 5,
    flex: 1,
    paddingHorizontal: 0,
  },
});
