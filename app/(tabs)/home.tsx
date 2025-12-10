import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Activity,
  Battery,
  Bell,
  Bluetooth,
  ChevronDown,
  CloudRain,
  KeyRound,
  List,
  Lock,
  MessageCircle,
  Plus,
  Radio,
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
  number: string | number;
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

type Room = {
  id: string;
  name: string;
};

const ROOMS: Room[] = [
  { id: "smart", name: "Smart home" },
  { id: "bedroom", name: "Bedroom" },
  { id: "living", name: "Living room" },
  { id: "kitchen", name: "Kitchen" },
];

export default function HomeScreen() {
  const [roomMenuVisible, setRoomMenuVisible] = useState(false);
  const [gate1, setGate1] = useState(true);
  const [gate2, setGate2] = useState(true);
  const [locked, setLocked] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room>(ROOMS[0]);

  // NEW: plus-menu visibility
  const [plusMenuVisible, setPlusMenuVisible] = useState(false);

  const router = useRouter();

  const lockStatus = locked ? "Locked" : "Unlocked";
  const lockColor = locked ? "#22C55E" : "#F97316";

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={["#020617", "#020617", "#020617"]}
        style={styles.safe}
      >
        {/* PLUS DROPDOWN OVERLAY */}
        {roomMenuVisible && (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setRoomMenuVisible(false)}
                style={styles.menuOverlay}
              >
                <View style={styles.roomMenu}>
                  {ROOMS.map((room) => (
                    <TouchableOpacity
                      key={room.id}
                      style={styles.roomMenuItem}
                      onPress={() => {
                        setSelectedRoom(room);
                        setRoomMenuVisible(false);
                      }}
                    >
                      <Text style={styles.roomMenuText}>{room.name}</Text>
                    </TouchableOpacity>
                  ))}

                  <View style={styles.roomDivider} />

                  <TouchableOpacity style={styles.roomMenuItem}>
                    <Text style={styles.roomMenuText}>Manage rooms</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.roomMenuItem}>
                    <Text style={styles.roomMenuText}>All devices</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
        {plusMenuVisible && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setPlusMenuVisible(false)}
            style={styles.menuOverlay}
          >
            <View style={styles.plusMenu}>
              {[
                { label: "Add device", onPress: () => {} },
                { label: "Scan", onPress: () => {} },
                { label: "Manual controls", onPress: () => {} },
                { label: "Automation", onPress: () => {} },
              ].map((item) => (
                <TouchableOpacity
                  key={item.label}
                  style={styles.plusMenuItem}
                  onPress={() => {
                    setPlusMenuVisible(false);
                    item.onPress();
                  }}
                >
                  <Text style={styles.plusMenuText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        )}

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {/* TOP BAR: Home name + icons */}
          <View style={styles.homeHeaderRow}>
            <TouchableOpacity style={styles.homeNameRow}>
              <Text style={styles.homeNameText}>Eymm&apos;s home</Text>
              <ChevronDown size={16} color="#E5E7EB" />
            </TouchableOpacity>
            <View style={styles.homeHeaderIcons}>
              <TouchableOpacity
                style={styles.headerIconButton}
                onPress={() => router.push("/notifications")}
              >
                <MessageCircle size={18} color="#E5E7EB" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerIconButton}
                onPress={() => setPlusMenuVisible((v) => !v)}
              >
                <Plus size={18} color="#E5E7EB" />
              </TouchableOpacity>
            </View>
          </View>

          {/* ROOM TABS + menu pill */}
          <View style={styles.roomsTabsRow}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.roomsTabsScroll}
            >
              {ROOMS.map((room) => {
                const active = room.id === selectedRoom.id;
                return (
                  <TouchableOpacity
                    key={room.id}
                    onPress={() => setSelectedRoom(room)}
                  >
                    <Text
                      style={[
                        styles.roomTabText,
                        active && styles.roomTabTextActive,
                      ]}
                    >
                      {room.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
                  <TouchableOpacity
                    style={styles.menuPill}
                    onPress={() => setRoomMenuVisible(true)}
                  >
                    <List size={18} color="#E5E7EB" />
                  </TouchableOpacity>
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
                  <Text style={styles.metricSub}>
                    Front Door • {selectedRoom.name}
                  </Text>
                </View>

                <View style={{ alignItems: "flex-end" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 4,
                    }}
                  >
                    {/* PHILIPPINES WEATHER PILL */}
                    <View style={styles.weatherRow}>
                      <View style={styles.weatherPill}>
                        <CloudRain size={20} color="#E5E7EB" />
                        <View style={{ marginLeft: 8 }}>
                          <Text style={styles.weatherTemp}>14°</Text>
                          <Text style={styles.weatherLocation}>Philippines</Text>
                        </View>
                      </View>
                    </View>
                    <TopStatus icon={Battery} label="Battery" status="87%" />
                    <View style={{ width: 10 }} />
                    <TopStatus icon={Wifi} label="WiFi" status="Online" />
                    <View style={{ width: 10 }} />
                    <TopStatus
                      icon={Bluetooth}
                      label="Bluetooth"
                      status="Connected"
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 8,
                    }}
                  >
                    <TopStatus
                      icon={Thermometer}
                      label="Temp"
                      status="27°C"
                    />
                    <View style={{ width: 10 }} />
                    <TopStatus
                      icon={Activity}
                      label="Humidity"
                      status="63%"
                    />
                    <View style={{ width: 10 }} />
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
                    style={[styles.lockCircle, { backgroundColor: lockColor }]}
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
                <TouchableOpacity
                  onPress={() => router.push("/(tabs)/devices")}
                >
                  <Text style={styles.heroLink}>Device details ›</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* GATE TOGGLES + Guests */}
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
        <Shield size={28} color={active ? "#22C55E" : "#EF4444"} />
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
          active && {
            borderColor: "#22C55E",
            backgroundColor: "#16A34A25",
          },
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
    <View style={styles.topStatus}>
      <View style={styles.topStatusIconWrap}>
        <Icon size={18} color="#9CA3AF" />
      </View>
      <View>
        <Text style={styles.metricLabel}>{label}</Text>
        <Text style={styles.metricValue}>{status}</Text>
      </View>
    </View>
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
  safe: {
    flex: 1,
    backgroundColor: "#020617",
  },

  roomMenu: {
  position: "absolute",
  top: 110, // adjust if needed to match your design
  right: 16,
  backgroundColor: "#111827",
  borderRadius: 18,
  paddingVertical: 8,
  width: 200,
  zIndex: 30,
  elevation: 12,
  shadowColor: "#000",
  shadowOpacity: 0.4,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 6 },
},
roomMenuItem: {
  paddingHorizontal: 16,
  paddingVertical: 12,
},
roomMenuText: {
  color: "#E5E7EB",
  fontSize: 15,
  fontWeight: "500",
},
roomDivider: {
  height: 1,
  backgroundColor: "#1F2937",
  marginVertical: 6,
},


  homeHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  homeNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  homeNameText: {
    color: "#F9FAFB",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 4,
  },
  homeHeaderIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIconButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#374151",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },

  roomsTabsRow: {
    marginTop: 6,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  roomsTabsScroll: {
    paddingRight: 8,
  },
  roomTabText: {
    marginRight: 16,
    fontSize: 16,
    color: "#6B7280",
  },
  roomTabTextActive: {
    color: "#F9FAFB",
    fontWeight: "600",
  },
  menuPill: {
    width: 38,
    height: 24,
    borderRadius: 999,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },

  weatherRow: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  weatherPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111827",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  weatherTemp: {
    color: "#F9FAFB",
    fontSize: 16,
    fontWeight: "600",
  },
  weatherLocation: {
    color: "#E5E7EB",
    fontSize: 12,
  },

  heroWrapper: {
    paddingHorizontal: 16,
    marginTop: 10,
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

  topStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  topStatusIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1F2937",
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

  shieldNumber: {
    position: "absolute",
    fontSize: 12,
    fontWeight: "700",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -4 }, { translateY: -8 }],
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
 menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
  },
  plusMenu: {
    position: "absolute",
    top: 60, // adjust if needed to match header height
    right: 16,
    backgroundColor: "#111827",
    borderRadius: 18,
    paddingVertical: 8,
    width: 190,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  plusMenuItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  plusMenuText: {
    color: "#E5E7EB",
    fontSize: 14,
  },
});