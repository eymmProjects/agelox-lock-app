import { useRouter } from "expo-router";
import { ArrowLeft, ChevronDown, MessageSquare, Settings as SettingsIcon } from "lucide-react-native";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={22} color="#E5E7EB" />
        </TouchableOpacity>

        <Text style={styles.title}>Notifications</Text>

        <TouchableOpacity style={styles.settingsButton}>
          <SettingsIcon size={20} color="#E5E7EB" />
        </TouchableOpacity>
      </View>

      {/* Filter row: All families ▼ */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterChip}>
          <Text style={styles.filterText}>All families</Text>
          <ChevronDown size={16} color="#E5E7EB" />
        </TouchableOpacity>
      </View>

      {/* Empty state */}
      <View style={styles.emptyState}>
        <View style={styles.emptyIconWrap}>
          <MessageSquare size={32} color="#4B5563" />
        </View>
        <Text style={styles.emptyText}>No messages for the last 7 days</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#000000",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  backButton: {
    paddingRight: 12,
    paddingVertical: 8,
  },
  title: {
    flex: 1,
    fontSize: 28,
    fontWeight: "500",
    color: "#E5E7EB",
  },
  settingsButton: {
    paddingLeft: 12,
    paddingVertical: 8,
  },
  filterRow: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  filterText: {
    fontSize: 14,
    color: "#E5E7EB",
    marginRight: 4,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyIconWrap: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyText: {
    color: "#9CA3AF",
    fontSize: 14,
  },
});