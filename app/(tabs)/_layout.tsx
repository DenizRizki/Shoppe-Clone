import { HapticTab } from "@/components/haptic-tab";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons"; // Menggunakan Ionicons untuk kemiripan maksimal
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = "#ee4d2d"; // Warna oranye khas Shopee

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: "#888",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
      }}
    >
      {/* 1. BERANDA */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* 2. LIVE & VIDEO (Explore) */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Live & Video",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "play-circle" : "play-circle-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* 3. NOTIFIKASI */}
      <Tabs.Screen
        name="notifikasi" // Pastikan kamu punya file notifikasi.tsx atau sesuaikan namanya
        options={{
          title: "Notifikasi",
          tabBarBadge: 3, // Display angka 3 merah sesuai permintaan
          tabBarBadgeStyle: {
            backgroundColor: "#ee4d2d",
            color: "white",
            fontSize: 10,
          },
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "notifications" : "notifications-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* 4. SAYA */}
      <Tabs.Screen
        name="profile" // Pastikan kamu punya file profile.tsx atau sesuaikan namanya
        options={{
          title: "Saya",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
