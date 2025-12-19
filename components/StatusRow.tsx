import {
    Activity,
    Battery,
    Bluetooth,
    Thermometer,
    Wifi
} from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
export function StatusRow({ theme }: { theme: any }) {
  const [containerW, setContainerW] = React.useState(0);

  // pick how many items per row depending on available width
  const cols =
    containerW >= 900 ? 5 :   // wide screens: all 5 in one row
    containerW >= 700 ? 4 :
    containerW >= 520 ? 3 :
    2;                        // small phones: 2 per row

  const GAP = 10;
  const itemW =
    containerW > 0
      ? Math.floor((containerW - GAP * (cols - 1)) / cols)
      : undefined;

  return (
    <View style={styles.statusPhoneContainer}>
      <View
        style={[styles.statusGrid, { columnGap: GAP, rowGap: GAP }]}
        onLayout={(e) => setContainerW(e.nativeEvent.layout.width)}
      >
        <TopStatus theme={theme} icon={Battery} label="Battery" status="87%" w={itemW} />
        <TopStatus theme={theme} icon={Wifi} label="WiFi" status="Online" w={itemW} />
        <TopStatus theme={theme} icon={Bluetooth} label="Bluetooth" status="Connected" w={itemW} />
        <TopStatus theme={theme} icon={Thermometer} label="Temp" status="27°C" w={itemW} />
        <TopStatus theme={theme} icon={Activity} label="Humidity" status="63%" w={itemW} />
      </View>
    </View>
  );
}

type TopStatusProps = {
  theme: { card: string; border: string; text: string; muted: string };
  icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string;
  status: string;
  w?: number; // ✅ responsive width
};

function TopStatus({ theme, icon: Icon, label, status, w }: TopStatusProps) {
  return (
    <View
      style={[
        styles.statusItem,
        { backgroundColor: theme.card, borderColor: theme.border },
        w ? { width: w } : null,
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
        <Text style={[styles.statusLabel, { color: theme.muted }]} numberOfLines={1}>
          {label}
        </Text>
        <Text style={[styles.statusValue, { color: theme.text }]} numberOfLines={1}>
          {status}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statusPhoneContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  statusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 16,
  },
  statusIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  statusLabel: {
    fontSize: 12,
    lineHeight: 14,
  },
  statusValue: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 18,
  },
});
