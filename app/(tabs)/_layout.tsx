  // app/(tabs)/_layout.tsx
  import { Tabs } from "expo-router";
import { Cpu, Home, ShoppingBag, User } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

export default function TabsLayout() {
  return (
    // <ThemeProvider>
      // <Stack>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#F9FAFB",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          backgroundColor: "#000000",   // pure black like Xiaomi
          borderTopColor: "#111827",
          borderTopWidth: 0.5,
          height: 70,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: 2,
          marginBottom: 6,
        },
      }}
    >
      {/* 1. HOME = Xiaomi Home */}
      <Tabs.Screen
        name="index" // your HomeScreen: app/(tabs)/index.tsx
        options={{
          tabBarLabel: "Xiaomi Home",
          tabBarIcon: ({ color, focused }) => (
            <IconWrapper focused={focused}>
              <Home size={22} color={color} />
            </IconWrapper>
          ),
        }}
      />

      {/* 2. SMART */}
      <Tabs.Screen
        name="smart" // create app/(tabs)/smart.tsx or point to your "automation" screen
        options={{
          tabBarLabel: "Smart",
          tabBarIcon: ({ color, focused }) => (
            <IconWrapper focused={focused}>
              <Cpu size={22} color={color} />
            </IconWrapper>
          ),
        }}
      />

      {/* 3. STORE */}
      <Tabs.Screen
        name="store" // create app/(tabs)/store.tsx or map to your "devices" or "settings"
        options={{
          tabBarLabel: "Store",
          tabBarIcon: ({ color, focused }) => (
            <IconWrapper focused={focused}>
              <ShoppingBag size={22} color={color} />
            </IconWrapper>
          ),
        }}
      />

      {/* 4. PROFILE */}
      <Tabs.Screen
        name="profile" // create app/(tabs)/profile.tsx
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <IconWrapper focused={focused}>
              <User size={22} color={color} />
            </IconWrapper>
          ),
        }}
      />
    </Tabs>
    // </Stack>
  );
}

/**
 * Small wrapper to give a subtle “pressed” feeling
 * on the active icon (similar to Xiaomi but minimal).
 */
function IconWrapper({
  focused,
  children,
}: {
  focused: boolean;
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        padding: 4,
        borderRadius: 999,
        backgroundColor: focused ? "rgba(156,163,175,0.18)" : "transparent",
      }}
    >
      {children}
    </View>
  );
}
