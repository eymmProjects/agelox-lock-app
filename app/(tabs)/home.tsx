// import { StatusRow } from "@/components/StatusRow";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Activity,
  Battery,
  Bell,
  Bluetooth,
  ChevronDown,
  ChevronLeft,
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
import React, { useEffect, useState } from "react";
import type { ColorValue, } from "react-native";
import {
  LayoutAnimation,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider"; // adjust path if needed
type IconType = React.ComponentType<{ size?: number; color?: string }>;
type Room = {
  id: string;
  name: string;
};
type FeatureCardProps = {
  title: string;
  subtitle: string;
  icon: any;
  accent: string;
  onPress?: () => void;
  theme: { card: string; border: string; text: string; muted: string };
};

type ToggleGateProps = {
  label: string;
  active: boolean;
  onToggle: () => void;
  number?: number; // optional gate number
};

type TopActionProps = {
  icon: IconType;
  label: string;
  active?: boolean;
  onPress?: () => void;
};

type TopStatusProps = {
  theme: {
    card: string;
    border: string;
    text: string;
    muted: string;
  };
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string;
  status: string;
};




type CameraTab ={id:"front" | "back"; name:string}

const CAMERA_TABS:CameraTab[]=[
  {id: "front", name:"Front Door"},
  {id: "back", name:"Back door"},
]

const ROOMS: Room[] = [
  { id: "bedroom", name: "Bedroom" },
  { id: "living", name: "Living room" },
  { id: "kitchen", name: "Kitchen" },
];



export default function HomeScreen() {

  const insets = useSafeAreaInsets();
  const { theme, mode, preference, setPreference } = useTheme();
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const iconColor = mode === "dark" ? "#9CA3AF" : "#475569";
const heroGradient: readonly [ColorValue, ColorValue, ...ColorValue[]] =
  theme.mode === "dark"
    ? ["#020617", "#020617"]
    : ["#FFFFFF", "#F8FAFC"];

  const lockGradient: readonly [ColorValue, ColorValue, ...ColorValue[]]=
  theme.mode === "dark"
    ? ["#020617", "#020617"]
    : ["#E5E7EB", "#FFFFFF"];
   

useEffect(() => {
  if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}, []);

const toggleFeatures = () => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  setFeaturesOpen((v) => !v);
};

  const [cameraTab,setCameraTab] = useState<CameraTab>(CAMERA_TABS[0]);
  const [roomMenuVisible, setRoomMenuVisible] = useState(false);
  const [gate2, setGate2] = useState(true);
  const [locked, setLocked] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<Room>(ROOMS[0]);
  const [confirmDisableVisible, setConfirmDisableVisible] = useState(false);
  const [homeMenuVisible, setHomeMenuVisible] = useState(false);


  const requestToggleSecondGate = () => {
    if (gate2) {
      // currently enabled -> user is trying to disable => show confirm modal
      setConfirmDisableVisible(true);
    } else {
      // enable directly
      setGate2(true);
    }
  };

  const confirmDisableSecondGate = () => {
    setGate2(false);
    setConfirmDisableVisible(false);
  };

  const cancelDisableSecondGate = () => {
    setConfirmDisableVisible(false);
  };
  // NEW: plus-menu visibility
  const [plusMenuVisible, setPlusMenuVisible] = useState(false);

  const router = useRouter();

  const lockStatus = locked ? "Locked" : "Unlocked";
  const lockColor = locked ? "#22C55E" : "#F97316";

  return (
    
      <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
        <View style={[styles.container, { paddingTop: insets.top }]}>
        <LinearGradient colors={[theme.bg, theme.bg]} style={styles.safe}>
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
            <TouchableOpacity
              style={styles.homeNameRow}
              onPress={() => setHomeMenuVisible(true)}
            >
              <Text style={[styles.homeNameText, { color: theme.text }]}>
                Alex’s Home
              </Text>

              <ChevronDown size={16} color={theme.text} />
            </TouchableOpacity>

            <View style={styles.homeHeaderIcons}>
              <TouchableOpacity
                style={[
                  styles.headerIconButton,
                  { borderColor: theme.border, backgroundColor: theme.card },
                ]}
                onPress={() => router.push("/notifications")}
              >
                <MessageCircle size={18} color={theme.text} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.headerIconButton,
                  { borderColor: theme.border, backgroundColor: theme.card },
                ]}
                onPress={() => setPlusMenuVisible((v) => !v)}
              >
                <Plus size={18} color={theme.text} />
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
        <TouchableOpacity key={room.id} onPress={() => setSelectedRoom(room)}>
          <Text
            style={[
              styles.roomTabText,
              { color: theme.muted },                 // default
              active && [styles.roomTabTextActive, { color: theme.text }], // active
            ]}
          >
            {room.name}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>

  <TouchableOpacity
    style={[
      styles.menuPill,
      { backgroundColor: theme.card, borderColor: theme.border },
    ]}
    onPress={() => setRoomMenuVisible(true)}
  >
    <List size={18} color={theme.text} />
  </TouchableOpacity>
</View>


          {/* HERO */}
         <View style={[styles.heroWrapper]}>
  {/* Outer card border/background */}
<View
  style={[
    styles.heroCard,
    { backgroundColor: theme.card, borderColor: theme.border },
  ]}
>
  <LinearGradient colors={heroGradient} style={styles.heroCard}>
      <View style={styles.statusPhoneContainer}>
        <View style={[styles.metricsRow]}>
          <View style={{ flexDirection: "column" }}>
            {/* Tabs */}
                  <View style={styles.cameraTabsRow}>
            {CAMERA_TABS.map((t) => {
              const active = t.id === cameraTab.id;
              return (
                <TouchableOpacity
                  key={t.id}
                  style={[
                    styles.cameraTab,
                    {
                      backgroundColor: theme.card,
                      borderColor: active ? theme.accent : theme.border,
                    },
                  ]}
                  onPress={() => setCameraTab(t)}
                >
                  <Text
                    style={[
                      styles.cameraTabText,
                      { color: active ? theme.text : theme.muted },
                    ]}
                  >
                    {t.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>


            {/* Lock status row */}
            <View style={styles.statusHeaderRow}>
              {/* LEFT */}
              <View style={styles.statusLeft}>
               <View
                  style={[
                    styles.smallIconWrap,
                    {
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  {locked ? (
                    <Lock size={18} color={lockColor} />
                  ) : (
                    <Unlock size={18} color={lockColor} />
                  )}
                </View>

                <Text style={[styles.metricMain, { color: theme.text }]}>
                  {lockStatus}
                </Text>

                <Text style={[styles.metricSub, { color: theme.muted }]}>
                  {cameraTab.id === "front" ? "Front Door" : "Back Door"}
                </Text>

              </View>

              {/* RIGHT */}
              <View style={styles.weatherRight}>
                <TopWeather temp="14°" location="California" compact />
              </View>
            </View>
          </View>
        </View>

{/* 
      <ScrollView contentContainerStyle={styles.container}>
      <StatusRow theme={theme} />

      <View style={{ height: 24 }} />
    </ScrollView> */}
     <View style={styles.statusPhoneContainer}>
            <View style={styles.statusGrid}>
              <TopStatus theme={theme} icon={Battery} label="Battery" status="87%" />
              <TopStatus theme={theme} icon={Wifi} label="WiFi" status="Online" />
              <TopStatus theme={theme} icon={Bluetooth} label="Bluetooth" status="Connected" />
              <TopStatus theme={theme} icon={Thermometer} label="Temp" status="27°C" />
              <TopStatus theme={theme} icon={Activity} label="Humidity" status="63%" />
            </View>
          </View>
        {/* Content changes based on tab */}
          {/*
      
           */}

      </View>

      {/* Lock + Gate section */}
      <View style={[styles.heroMiddleRow, { marginTop: 18 }]}>
        <View style={styles.lockCenterWrap}>
          <View style={styles.lockRingOuter}>
            <View style={styles.lockRingMid}>
            <LinearGradient colors={lockGradient} style={styles.lockCircle}>
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

            </View>
          </View>

        <Text style={[styles.heroActionTextCenter, { color: theme.muted  ,marginBottom:20}]}>
          {locked ? "Tap to unlock" : "Tap to lock"}
        </Text>
        </View>

        {/* Gate button BELOW */}
        <View style={styles.gateBelowWrap}>
              <TouchableOpacity
            onPress={requestToggleSecondGate}
            activeOpacity={0.85}
            style={[
              styles.gatePill,
              {
                backgroundColor: gate2
                  ? theme.accent + "20"
                  : "#EF444420",
                borderColor: gate2 ? theme.accent : "#EF4444",
              },
            ]}
          >
            <Shield size={18} color={gate2 ? theme.accent : "#EF4444"} />
            <Text
              style={[
                styles.gatePillText,
                { color: gate2 ? theme.text : "#EF4444" },
              ]}
            >
              Gate 2 • {gate2 ? "Enabled" : "Disabled"}
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* status footer */}
      <View style={styles.heroFooterRow}>
        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row" }}>
            <View
                style={[
                  styles.dot,
                  { backgroundColor: locked ? "#22C55E" : "#F97316" },
                ]}
              />

              <Text style={[styles.heroStatusText, { color: theme.text }]}>
                {locked ? "Door • Secure" : "Door open"}
              </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View
              style={[
                styles.dot,
                { backgroundColor: locked ? "#22C55E" : "#F97316" },
              ]}
            />
            <Text style={[styles.heroStatusText, { color: theme.text }]}>
              {locked ? "Bolt • Secure" : "Bolt Retracted"}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => router.push("/(tabs)/devices")}>
          <Text style={[styles.heroLink, { color: theme.accent }]}>
            Device details ›
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  </View>
</View>


   
<View style={styles.featuresSection}>
  <TouchableOpacity
    style={[
      styles.featuresHeader,
      {
        paddingHorizontal: 15,
        backgroundColor: theme.card,
        borderColor: theme.border,
      },
    ]}
    onPress={toggleFeatures}
    activeOpacity={0.85}
  >
    <Text style={[styles.featuresTitle, { color: theme.text }]}>
      Quick actions
    </Text>

    <View style={styles.featuresChevronWrap}>
      {featuresOpen ? (
        <ChevronDown size={20} color={theme.text} />
      ) : (
        <ChevronLeft size={20} color={theme.text} />
      )}
    </View>
  </TouchableOpacity>

  {featuresOpen && (
    <View style={styles.grid}>
      <FeatureCard
        title="Digital Key"
        subtitle="Use app / NFC to unlock"
        icon={KeyRound}
        accent={theme.mode === "dark" ? "#22C55E" : "#16A34A"}
        theme={theme}
      />
      <FeatureCard
        title="Doorbell Alerts"
        subtitle="Last alert • 09:12"
        icon={Bell}
        accent={theme.mode === "dark" ? "#F97316" : "#EA580C"}
        onPress={() => router.push("/(tabs)/settings")}
        theme={theme}
      />
      <FeatureCard
        title="Device Health"
        subtitle="All systems normal"
        icon={Activity}
        accent={theme.mode === "dark" ? "#22D3EE" : "#0891B2"}
        onPress={() => router.push("/(tabs)/devices")}
        theme={theme}
      />
      <FeatureCard
        title="Access Logs"
        subtitle="View recent door events"
        icon={Settings}
        accent={theme.mode === "dark" ? "#A855F7" : "#7C3AED"}
        theme={theme}
      />
    </View>
  )}
</View>


        </ScrollView>
      </LinearGradient>

      
  <Modal
  visible={confirmDisableVisible}
  transparent
  animationType="fade"
  onRequestClose={cancelDisableSecondGate}
>
  {/* dim + blur background */}
  <View style={styles.modalOverlay}>
    <BlurView intensity={35} tint="dark" style={StyleSheet.absoluteFillObject} />

    {/* dialog */}
    <View style={styles.dialogCard}>
      <Text style={styles.dialogTitle}>Disable Second Gate?</Text>
      <Text style={styles.dialogMessage}>
        Disabling this gate will turn off face recognition, biometric verification,
        and other advanced security protections. This may reduce overall system
        security. Do you want to continue?
      </Text>

      <View style={styles.dialogButtonsRow}>
        <TouchableOpacity style={styles.dialogBtnGhost} onPress={cancelDisableSecondGate}>
          <Text style={styles.dialogBtnGhostText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dialogBtnDanger} onPress={confirmDisableSecondGate}>
          <Text style={styles.dialogBtnDangerText}>Disable</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

{homeMenuVisible && (
  <TouchableOpacity
    activeOpacity={1}
    onPress={() => setHomeMenuVisible(false)}
    style={styles.menuOverlay}
  >
    <View style={styles.homeMenu}>
      {/* Alex’s Home */}
      <TouchableOpacity
        style={styles.homeMenuItem}
        onPress={() => {
          setHomeMenuVisible(false);
          router.replace("/(tabs)/home");
        }}
      >
        <Text style={styles.homeMenuTextActive}>Alex’s Home</Text>
      </TouchableOpacity>

      {/* Alex’s Smartwatch */}
      <TouchableOpacity
        style={styles.homeMenuItem}
        onPress={() => {
          setHomeMenuVisible(false);
          router.replace("/smartwatch");
        }}
      >
        <Text style={styles.homeMenuText}>Alex’s Smartwatch</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
)}

    </View>

    </SafeAreaView>

    
  );
}

/* small components */



function TopWeather({
  temp,
  location,
  compact,
}: {
  temp: string;
  location: string;
  compact?: boolean;
}) {
  const { theme, mode } = useTheme();

  const iconColor = mode === "dark" ? theme.muted : theme.muted; // same muted works well in both

  return (
    <View style={[styles.topStatus, compact && { width: "auto" }]}>
      <View
        style={[
          styles.topStatusIconWrap,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        <CloudRain size={18} color={iconColor} />
      </View>

      <View>
        <Text style={[styles.metricLabel, { color: theme.muted }]}>Weather</Text>
        <Text style={[styles.metricValue, { color: theme.text }]}>
          {temp}
          {/* optional:  • {location} */}
        </Text>
      </View>
    </View>
  );
}

function TopStatus({ theme, icon: Icon, label, status }: TopStatusProps) {
  return (
    <View
      style={[
        styles.statusItem, // create or reuse your item style (see below)
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <View
        style={[
          styles.statusIconWrap,
          { borderColor: theme.border, backgroundColor: theme.card },
        ]}
      >
        <Icon size={16} color={theme.text} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[styles.statusLabel, { color: theme.muted }]}>{label}</Text>
        <Text style={[styles.statusValue, { color: theme.text }]}>{status}</Text>
      </View>
    </View>
  );
}

function FeatureCard({ title, subtitle, icon: Icon, accent, onPress, theme }: FeatureCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.featureCard,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <View style={styles.featureTopRow}>
        <View>
          <Text style={[styles.featureTitle, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.featureSubtitle, { color: theme.muted }]}>{subtitle}</Text>
        </View>

        <View
          style={[
            styles.featureIconWrap,
            { borderColor: accent, backgroundColor: `${accent}20` },
          ]}
        >
          <Icon size={16} color={accent} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

/* styles */

const styles = StyleSheet.create({

  statusItem: {
  width: "48%",
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  paddingHorizontal: 10,
  paddingVertical: 10,
  borderRadius: 14,
  borderWidth: 1,
},

statusIconWrap: {
  width: 28,
  height: 28,
  borderRadius: 999,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
},

statusLabel: {
  fontSize: 11,
  fontWeight: "600",
},

statusValue: {
  fontSize: 14,
  fontWeight: "800",
  marginTop: 2,
},



  chevWrap: {
  width: 28,
  height: 28,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 999,
  backgroundColor: "rgba(2, 6, 23, 0.45)", // match your dark header
},


featuresChevronWrap: {
  width: 28,
  height: 28,
  alignItems: "center",
  justifyContent: "center",
},

  featuresSection: {
  marginTop: 14,
},
featuresHeader: {
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 4,
  marginBottom: 10,
},

featuresTitle: {
  color: "#E5E7EB",
  fontSize: 14,
  fontWeight: "700",
},


// center button
lockCenterWrap: {
  alignItems: "center",
  justifyContent: "center",
},

lockRingOuter: {
  width: 190,
  height: 190,
  borderRadius: 999,
  borderWidth: 1,
  borderColor: "rgba(17,24,39,0.14)",
  alignItems: "center",
  justifyContent: "center",
},

lockRingMid: {
  width: 150,
  height: 150,
  borderRadius: 999,
  borderWidth: 1,
  borderColor: "rgba(17,24,39,0.12)",
  alignItems: "center",
  justifyContent: "center",
},

lockRingInner: {
  width: 108,
  height: 108,
  borderRadius: 999,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  backgroundColor: "rgba(255,255,255,0.9)",
},

lockCenterSquare: {
  width: 18,
  height: 18,
  borderRadius: 3,
  borderWidth: 2,
},

heroActionTextCenter: {
  marginTop: 12,
  fontSize: 11,
  color: "#9CA3AF",
  fontWeight: "600",
},

gateBelowWrap: {
  marginTop: 14,
  width: "100%",
  alignItems: "center",
},

gatePill: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  paddingHorizontal: 14,
  paddingVertical: 10,
  borderRadius: 999,
  borderWidth: 1,
},

gatePillOn: {
  borderColor: "#22C55E55",
  backgroundColor: "#16A34A25",
},

gatePillOff: {
  borderColor: "#EF444455",
  backgroundColor: "#7F1D1D25",
},

gatePillText: {
  fontSize: 12,
  fontWeight: "700",
},

gatePillTextOn: {
  color: "#E5E7EB",
},

gatePillTextOff: {
  color: "#FCA5A5",
},

// center button

  // start alex top cheron
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

homeMenuItem: {
  paddingHorizontal: 16,
  paddingVertical: 12,
},

homeMenuText: {
  color: "#E5E7EB",
  fontSize: 14,
},

homeMenuTextActive: {
  color: "#22D3EE",
  fontSize: 14,
  fontWeight: "700",
},

  //end alex top cheron

statusHeaderRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  alignSelf: "stretch",
  marginTop: 8,
},

statusLeft: {
  flexDirection: "row",
  alignItems: "center",
  flex: 1,          // ✅ take remaining space so right goes to end
  minWidth: 0,      // ✅ prevents text from pushing weather off-screen
},

weatherRight: {
  flexShrink: 0,    // ✅ never shrink
  alignItems: "flex-end",
},

// end top lock weather icon

  // MODAL

  modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.35)",
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 18,
},

dialogCard: {
  width: "100%",
  maxWidth: 420,
  borderRadius: 22,
  padding: 16,
  backgroundColor: "#0B1220",
  borderWidth: 1,
  borderColor: "#1F2937",
},

dialogTitle: {
  color: "#F9FAFB",
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 8,
},

dialogMessage: {
  color: "#9CA3AF",
  fontSize: 13,
  lineHeight: 18,
},

dialogButtonsRow: {
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: 10,
  marginTop: 14,
},

dialogBtnGhost: {
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: "#374151",
},

dialogBtnGhostText: {
  color: "#E5E7EB",
  fontSize: 13,
  fontWeight: "600",
},

dialogBtnDanger: {
  paddingVertical: 10,
  paddingHorizontal: 14,
  borderRadius: 14,
  backgroundColor: "#EF4444",
},

dialogBtnDangerText: {
  color: "#0B1220",
  fontSize: 13,
  fontWeight: "800",
},

  //END MODAL

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
  // paddingHorizontal: 16,
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
  rowGap: 6,
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
    // color: "#F9FAFB",
    color: "#2563EB",
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
  width: "100%",
  alignSelf: "stretch",
  flexDirection: "column", // ✅ IMPORTANT (was "row")
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
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
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
    width: 130,
    height: 130,
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
//  menuOverlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: 20,
//   },
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

    container: {
    paddingVertical: 5,
        flex: 1,
    paddingHorizontal: 0,
  },
});

