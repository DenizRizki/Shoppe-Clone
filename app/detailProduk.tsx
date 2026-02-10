import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function DetailProduk() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=6")
      .then((res) => res.json())
      .then((data) => setRecommendations(data));
  }, []);

  const formatRupiah = (num: any) => {
    if (!num) return "0";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerFloating}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <Ionicons
            name="share-social-outline"
            size={24}
            color="white"
            style={styles.headerIcon}
          />
          <Ionicons
            name="cart-outline"
            size={24}
            color="white"
            style={styles.headerIcon}
          />
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color="white"
            style={styles.headerIcon}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* GAMBAR PRODUK */}
        <Image
          source={{ uri: params.image as string }}
          style={styles.mainImage}
        />

        {/* INFO PRODUK */}
        <View style={styles.infoContainer}>
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>Rp{formatRupiah(params.price)}</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-4%</Text>
            </View>
          </View>

          <View style={styles.starBadgeContainer}>
            <Text style={styles.starBadge}>Star+</Text>
            <Text style={styles.productTitle}>{params.title}</Text>
          </View>

          <Text style={styles.soldText}>10RB+ terjual</Text>

          <View style={styles.shopSection}>
            <Text style={styles.shopName}>
              Toko: {params.category || "Official Store"}
            </Text>
            <TouchableOpacity style={styles.viewShopBtn}>
              <Text style={styles.viewShopText}>Kunjungi Toko</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/*  ROW PRODUK */}
        <View style={styles.recommendationSection}>
          <View style={styles.recommendationHeader}>
            <Text style={styles.recommendationTitle}>Produk Lainnya</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>Lihat Semua {">"}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {recommendations.map((item) => {
              const hargaRekomendasi = Math.floor(item.price * 15000);
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.miniCard}
                  onPress={() =>
                    router.push({
                      pathname: "/detailProduk",
                      params: { ...item, price: hargaRekomendasi },
                    })
                  }
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.miniProductImg}
                  />
                  <Text numberOfLines={2} style={styles.miniProductTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.miniPrice}>
                    Rp{formatRupiah(hargaRekomendasi)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* BOTTOM ACTION BAR */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.chatBtn}>
          <Ionicons name="chatbubbles-outline" size={22} color="#ee4d2d" />
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.chatBtn}>
          <Ionicons name="cart-outline" size={22} color="#ee4d2d" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowBtn}>
          <Text style={styles.buyNowText}>Beli Sekarang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  headerFloating: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  backButton: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 8,
    borderRadius: 20,
  },
  headerRight: { flexDirection: "row" },
  headerIcon: {
    marginLeft: 15,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 8,
    borderRadius: 20,
  },
  mainImage: { width: width, height: width, backgroundColor: "white" },
  infoContainer: { backgroundColor: "white", padding: 15, marginBottom: 10 },
  priceRow: { flexDirection: "row", alignItems: "center" },
  priceText: { fontSize: 24, fontWeight: "bold", color: "#ee4d2d" },
  discountBadge: {
    backgroundColor: "#ffebe7",
    marginLeft: 10,
    paddingHorizontal: 4,
    borderRadius: 2,
  },
  discountText: { color: "#ee4d2d", fontSize: 12 },
  starBadgeContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "flex-start",
  },
  starBadge: {
    backgroundColor: "#ee4d2d",
    color: "white",
    fontSize: 10,
    paddingHorizontal: 4,
    borderRadius: 2,
    marginRight: 6,
    marginTop: 3,
  },
  productTitle: { fontSize: 16, flex: 1, lineHeight: 22 },
  soldText: { color: "#777", marginTop: 10, fontSize: 13 },
  shopSection: {
    marginTop: 20,
    paddingVertical: 15,
    borderTopWidth: 0.5,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shopName: { fontWeight: "bold", fontSize: 14, textTransform: "capitalize" },
  viewShopBtn: {
    borderWidth: 1,
    borderColor: "#ee4d2d",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
  viewShopText: { color: "#ee4d2d", fontSize: 12 },

  recommendationSection: { backgroundColor: "white", paddingVertical: 15 },
  recommendationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  recommendationTitle: { fontSize: 14, fontWeight: "bold", color: "#555" },
  seeMoreText: { fontSize: 12, color: "#ee4d2d" },
  horizontalScroll: { paddingLeft: 15 },
  miniCard: {
    width: 120,
    marginRight: 12,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#eee",
    padding: 8,
  },
  miniProductImg: { width: "100%", height: 100, resizeMode: "contain" },
  miniProductTitle: { fontSize: 11, marginVertical: 5, height: 30 },
  miniPrice: { fontSize: 12, fontWeight: "bold", color: "#ee4d2d" },

  bottomBar: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "white",
    borderTopWidth: 0.5,
    borderColor: "#ddd",
    position: "absolute",
    bottom: 0,
    width: width,
  },
  chatBtn: { flex: 1, justifyContent: "center", alignItems: "center" },
  divider: {
    width: 1,
    height: "60%",
    backgroundColor: "#eee",
    alignSelf: "center",
  },
  buyNowBtn: {
    flex: 3,
    backgroundColor: "#ee4d2d",
    justifyContent: "center",
    alignItems: "center",
  },
  buyNowText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
