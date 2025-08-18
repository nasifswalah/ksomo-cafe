// import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import { MenuProvider } from "@/hooks/useMenu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const queryClient = new QueryClient();

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // useEffect(() => {
  //   if (loading) return;

  //   const inAuthGroup = segments[0] === "(auth)";

  //   if (!user && !inAuthGroup) {
  //     router.replace("/(auth)/login");
  //   } else if (user && inAuthGroup) {
  //     router.replace("/(tabs)");
  //   }
  // }, [user, loading, segments, router]);

  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="order/confirmation"
        options={{ title: "Order Progress" }}
      />
      <Stack.Screen
        name="order/qr-code"
        options={{ title: "Generate QR Code" }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ConvexProvider client={convex}>
          <AuthProvider>
            <MenuProvider>
              <CartProvider>
                <RootLayoutNav />
              </CartProvider>
            </MenuProvider>
          </AuthProvider>
        </ConvexProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
