// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Tabs navigator group */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Optional: keep modal if you still have app/modal.tsx */}
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
