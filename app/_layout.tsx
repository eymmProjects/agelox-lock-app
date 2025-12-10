// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,          // we handle headers in each screen
        animation: "slide_from_right", // default slide animation for pushes
      }}
    >
      {/* Tabs navigator group */}
      <Stack.Screen name="(tabs)" />

      {/* Notifications screen (slide in from right) */}
      <Stack.Screen
        name="notifications"
        options={{
          // you can override animation here if you want something else:
          // animation: "slide_from_right",
        }}
      />

      {/* Optional modal screen */}
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          title: "Modal",
        }}
      />
    </Stack>
  );
}
