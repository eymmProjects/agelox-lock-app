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
  Settings,
  Shield,
  Thermometer,
  Unlock,
  Wifi
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

type CameraTab ={id:"front" | "back"; name:string}

const CAMERA_TABS:CameraTab[]=[
  {id: "front", name:"Front Door"},
  {id: "back", name:"Back door"}
]

const ROOMS: Room[] = [
  { id: "bedroom", name: "Bedroom" },
  { id: "living", name: "Living room" },
  { id: "kitchen", name: "Kitchen" },
];

export default function HomeScreen() {
  const [cameraTab,setCameraTab] = useState<CameraTab>(CAMERA_TABS[0]);
  const [roomMenuVisible, setRoomMenuVisible] = useState(false);
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
              <Text style={styles.homeNameText}>Alex&apos;s home</Text>
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
           
<View style={styles.statusPhoneContainer}>
  {/* Header area */}
  <View style={[styles.metricsRow, { marginTop: 10 }]}>
    <View style={{ flexDirection: "column" }}>
      {/* Tabs */}
      <View style={styles.cameraTabsRow}>
        {CAMERA_TABS.map((t) => {
          const active = t.id === cameraTab.id;
          return (
            <TouchableOpacity
              key={t.id}
              style={[styles.cameraTab, active && styles.cameraTabActive]}
              onPress={() => setCameraTab(t)}
            >
              <Text
                style={[
                  styles.cameraTabText,
                  active && styles.cameraTabTextActive,
                ]}
              >
                {t.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Lock status row */}
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
        <View style={styles.smallIconWrap}>
          {locked ? (
            <Lock size={18} color="#E5E7EB" />
          ) : (
            <Unlock size={18} color={lockColor} />
          )}
        </View>
        <Text style={[styles.metricMain, { marginLeft: 10 }]}>{lockStatus}</Text>
          {cameraTab.id==="front"? (
            <Text style={{ color: "#E5E7EB" , marginLeft:5, marginTop:10}}>
              Front Door
              </Text>
          ) : (
            <Text style={{ color: "#E5E7EB" , marginLeft:5, marginTop:10}}>
              Back Door
            </Text> 

          )}



      </View>
    </View>
  </View>

  {/* Content changes based on tab */}
  {cameraTab.id === "front" ? (
    <View style={styles.statusPhoneContainer}>
      <View style={styles.statusGrid}>
        {/* <Text style={{ color: "#E5E7EB" }}>Front Door</Text> */}

        <TopWeather temp="14°" location="California" />
        <TopStatus icon={Battery} label="Battery" status="87%" />
        <TopStatus icon={Wifi} label="WiFi" status="Online" />
        <TopStatus icon={Bluetooth} label="Bluetooth" status="Connected" />
        <TopStatus icon={Thermometer} label="Temp" status="27°C" />
        <TopStatus icon={Activity} label="Humidity" status="63%" />
      </View>
    </View>
  ) : (
    <View style={styles.statusPhoneContainer}>
      <View style={styles.statusGrid}>
        {/* <Text style={{ color: "#E5E7EB" }}>Back Door Camera Feed</Text> */}

        <TopWeather temp="14°" location="California" />
        <TopStatus icon={Battery} label="Battery" status="87%" />
        <TopStatus icon={Wifi} label="WiFi" status="Online" />
        <TopStatus icon={Bluetooth} label="Bluetooth" status="Connected" />
        <TopStatus icon={Thermometer} label="Temp" status="27°C" />
        <TopStatus icon={Activity} label="Humidity" status="63%" />
      </View>
    </View>
  )}
</View>


              

              {/* Lock icon + action */}
              <View style={[styles.heroMiddleRow, {marginTop:55}]}>

  

                
                <View style={styles.deviceCircle}>
    
                  <View style={styles.heroActionCol}>
                   <LinearGradient
                              colors={["#0F172A", "#020617"]}
                              style={styles.lockCircle}
                            > 
                      <TouchableOpacity
                        onPress={() => setLocked(!locked)}
                        style={[styles.lockCircle, { borderColor: lockColor }]}
                      >
                        {locked ? (

                          <Unlock size={26} color={lockColor} />
                        ) : (
                          <Lock size={26} color={lockColor} />
                        )}
                      </TouchableOpacity>
                    </LinearGradient>
                    <Text style={styles.heroActionText}>
                      {locked ? "Tap to unlock" : "Tap to lock"}
                    </Text>
                  </View>

                  
                </View>
                  <View style={styles.heroActionCol}>


                  <Text style={[styles.heroActionText,{ textAlign:"center", marginBottom:5}]}>
                    Second Gate{"\n"}
                    {gate2 ? "Enabled" : "Disabled"}
                  </Text>


                    <ToggleGate
                      label={gate2 ? "Tap to Disable" : "Tap to Enable"}
                      active={gate2}
                      onToggle={() => setGate2((v) => !v)}
                    />
                  </View>

              </View>
              
              {/* status footer */}
              <View style={styles.heroFooterRow}>
                <View style={{ flexDirection: "column" }}>
              
                <View style={{ flexDirection: "row",  }}>
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: locked ? "#22C55E" : "#F97316" },
                    ]}
                  />
                  <Text style={styles.heroStatusText}>
                    {/* {locked ? "Door secure • Auto-lock 30s" : "Door open"} */}
                    {locked ? "Door • Secure  " : "Door open"}
                  </Text>
                </View>
                  <View style={{ flexDirection: "row",  }}>
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: locked ? "#22C55E" : "#F97316" },
                    ]}
                  />
                  {/* need to change */}
                  <Text style={styles.heroStatusText}>
                    {locked ? "Bolt • Secure" : "Bolt Retracted"}
                  </Text>
                </View>
                </View>
                <TouchableOpacity
                  onPress={() => router.push("/(tabs)/devices")}
                >
                  <Text style={styles.heroLink}>Device details ›</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

   
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
function ToggleGate({ label, active, onToggle }: ToggleGateProps) {
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

        {/* number inside shield */}
       
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

function TopWeather({ temp, location }: { temp: string; location: string }) {
  return (
    <View style={styles.topStatus}>
      <View style={styles.topStatusIconWrap}>
        <CloudRain size={18} color="#9CA3AF" />
      </View>
      <View>
        <Text style={styles.metricLabel}>Weather</Text>
        <Text style={styles.metricValue}>
          {temp} • {location}
        </Text>
      </View>
    </View>
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

  smallIconWrap: {
  width: 34,
  height: 34,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: "#1F2937",
  backgroundColor: "#0B1220",
  alignItems: "center",
  justifyContent: "center",
},


  cameraTabsRow: {
  flexDirection: "row",
  gap: 10,
  paddingHorizontal: 16,
  marginTop: 12,
  marginBottom: 12,
},
cameraTab: {
  flex: 1,
  paddingVertical: 10,
  borderRadius: 999,
  borderWidth: 1,
  borderColor: "#374151",
  backgroundColor: "#0B1220",
  alignItems: "center",
},
cameraTabActive: {
  borderColor: "#22D3EE",
  backgroundColor: "#22D3EE20",
},
cameraTabText: {
  color: "#9CA3AF",
  fontSize: 13,
  fontWeight: "600",
},
cameraTabTextActive: {
  color: "#E5E7EB",
},


  statusPhoneContainer: {
  width: "100%",
},

statusGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  rowGap: 12,
},



/* Weather styled like TopStatus */
weatherStatus: {
  flexDirection: "row",
  alignItems: "center",
  width: "48%",           // 🔥 same as TopStatus
  backgroundColor: "#111827",
  borderRadius: 14,
  paddingHorizontal: 10,
  paddingVertical: 8,
},

weatherTempSmall: {
  color: "#E5E7EB",
  fontSize: 14,
  fontWeight: "600",
},

weatherLocationSmall: {
  color: "#9CA3AF",
  fontSize: 11,
},


/* Full-width weather pill */
weatherFull: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#111827",
  borderRadius: 999,
  paddingHorizontal: 16,
  paddingVertical: 8,
  marginBottom: 12,
  width: "100%",
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
    // marginTop: 20,
    marginLeft:5
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
    width: 35,
    height: 35,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E293B",
    marginRight:4
  },
  heroActionCol: {
    alignItems: "center",
    paddingLeft: 8,
  },
  // lockCircle
  lockCircle: {
    width: 82,
    height: 85,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E293B",
    marginRight:4,
  },
  heroActionText: {
    marginTop: 18,
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