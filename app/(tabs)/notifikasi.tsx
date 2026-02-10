import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Notifikasi() {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifikasi</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons
              name="cart-outline"
              size={26}
              color="#ee4d2d"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="#ee4d2d"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* LIST MENU */}
        <TouchableOpacity style={styles.notifItem}>
          <View style={[styles.iconCircle, { borderColor: "#fbc02d" }]}>
            <Ionicons name="pricetag-outline" size={20} color="#fbc02d" />
          </View>
          <View style={styles.notifContent}>
            <Text style={styles.notifTitle}>Promo Shopee</Text>
            <Text numberOfLines={1} style={styles.notifSub}>
              Deniz, cek Produk Terlaris hari ini unt...
            </Text>
          </View>
          <View style={styles.badgeNotif}>
            <Text style={styles.badgeText}>2</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.notifItem}>
          <View style={[styles.iconCircle, { borderColor: "#ee4d2d" }]}>
            <Ionicons name="megaphone-outline" size={20} color="#ee4d2d" />
          </View>
          <View style={styles.notifContent}>
            <Text style={styles.notifTitle}>Info Shopee</Text>
            <Text numberOfLines={1} style={styles.notifSub}>
              Metode log in ke akunmu dengan sidik jari te...
            </Text>
          </View>
          <View style={styles.badgeNotif}>
            <Text style={styles.badgeText}>1</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#ccc" />
        </TouchableOpacity>

        <View style={styles.statusSection}>
          <Text style={styles.statusText}>Status Pesanan</Text>
          <TouchableOpacity>
            <Text style={styles.markRead}>Tandai Sudah Dibaca</Text>
          </TouchableOpacity>
        </View>

        {/* GAMBAR TENGAH */}
        <View style={styles.emptyContainer}>
          <Image
            source={require("../../assets/images/empty.png")}
            style={styles.emptyImg}
          />
          <TouchableOpacity style={styles.btnBelanja}>
            <Text style={styles.btnBelanjaText}>Belanja Sekarang</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },
  headerTitle: { fontSize: 20, fontWeight: "500" },
  headerIcons: { flexDirection: "row" },
  icon: { marginLeft: 15 },
  notifItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notifContent: { flex: 1, marginLeft: 15 },
  notifTitle: { fontSize: 15, fontWeight: "400" },
  notifSub: { fontSize: 13, color: "#777", marginTop: 2 },
  badgeNotif: {
    backgroundColor: "#ee4d2d",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  badgeText: { color: "white", fontSize: 10, fontWeight: "bold" },
  statusSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  statusText: { color: "#666", fontSize: 14 },
  markRead: { color: "#ccc", fontSize: 12 },
  emptyContainer: { alignItems: "center", marginTop: 50 },
  emptyImg: { width: 250, height: 200, resizeMode: "contain" },
  btnBelanja: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#ee4d2d",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 4,
  },
  btnBelanjaText: { color: "#ee4d2d", fontSize: 16 },
});
