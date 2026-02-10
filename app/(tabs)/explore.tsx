import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

export default function Explore() {
  const [product, setProduct] = useState<Product | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [lastTap, setLastTap] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/2")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (now - lastTap < DOUBLE_PRESS_DELAY) {
      toggleLike();
    } else {
      setLastTap(now);
    }
  };

  const toggleLike = () => {
    if (!liked) {
      setLikeCount(1);
      setLiked(true);
    } else {
      setLikeCount(0);
      setLiked(false);
    }
  };

  const goToDetail = () => {
    if (product) {
      const hargaRupiah = Math.floor(product.price * 15000);
      router.push({
        pathname: "/detailProduk",
        params: {
          id: product.id,
          title: product.title,
          price: hargaRupiah,
          image: product.image,
          category: product.category,
        },
      });
    }
  };

  if (!product) return null;

  return (
    <View style={styles.container}>
      <Pressable onPress={handleDoubleTap} style={styles.videoWrapper}>
        <Video
          source={require("../../assets/images/video-shoppe.mp4")}
          style={styles.backgroundVideo}
          shouldPlay
          isLooping
          resizeMode={ResizeMode.COVER}
          isMuted={false}
        />

        <View style={styles.uiOverlay}>
          {/* HEADER ATAS */}
          <View style={styles.topHeader}>
            <Ionicons name="person-outline" size={24} color="white" />
            <View style={styles.tabContainer}>
              <Text style={styles.tabText}>Video</Text>
              <Text style={styles.tabTextActive}>Live</Text>
              <Text style={styles.tabText}>Untuk Anda</Text>
            </View>
            <Ionicons name="add-circle-outline" size={24} color="white" />
          </View>

          {/* SIDEBAR AKSI */}
          <View style={styles.sidebar}>
            <View style={styles.sideIconGroup}>
              <TouchableOpacity onPress={toggleLike}>
                <Ionicons
                  name={liked ? "heart" : "heart-outline"}
                  size={38}
                  color={liked ? "#ff3d00" : "white"}
                />
              </TouchableOpacity>
              <Text style={styles.iconLabel}>{likeCount}</Text>
            </View>

            <View style={styles.sideIconGroup}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={35}
                color="white"
              />
              <Text style={styles.iconLabel}>0</Text>
            </View>

            <View style={styles.sideIconGroup}>
              <Ionicons name="share-social-outline" size={35} color="white" />
              <Text style={styles.iconLabel}>Bagikan</Text>
            </View>
          </View>

          {/* BOTTOM CONTENT */}
          <View style={styles.bottomContent}>
            {/* 3. PRODUCT CARD SEKARANG BISA DITEKAN */}
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={goToDetail}
              style={styles.productCard}
            >
              <Image source={{ uri: product.image }} style={styles.miniImg} />
              <View style={styles.productInfo}>
                <View style={styles.starRow}>
                  <Text style={styles.starText}>Star+</Text>
                </View>
                <Text numberOfLines={1} style={styles.prodTitle}>
                  {product.title}
                </Text>
                <Text style={styles.prodPrice}>
                  Rp{(product.price * 15000).toLocaleString("id-ID")}
                </Text>
              </View>
              <View style={styles.btnBeli}>
                <Text style={styles.btnBeliText}>Beli</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.username}>@{product.category}.official ✨</Text>
            <Text style={styles.caption}>
              Review jujur {product.title}! Kualitas mantap harga bersahabat.
              #RacunShopee
            </Text>

            <View style={styles.musicRow}>
              <Ionicons name="musical-notes" size={14} color="white" />
              <Text style={styles.musicText}>
                Suara asli - {product.category} Official Store
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  videoWrapper: { flex: 1 },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  uiOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  tabContainer: { flexDirection: "row", alignItems: "center" },
  tabText: {
    color: "rgba(255,255,255,0.7)",
    marginHorizontal: 10,
    fontSize: 16,
  },
  tabTextActive: {
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 10,
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: "white",
    paddingBottom: 4,
  },
  sidebar: {
    position: "absolute",
    right: 10,
    bottom: 220,
    alignItems: "center",
  },
  sideIconGroup: { alignItems: "center", marginBottom: 20 },
  iconLabel: { color: "white", fontSize: 13, fontWeight: "bold", marginTop: 4 },
  bottomContent: { paddingHorizontal: 15 },
  productCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginBottom: 15,
    width: "85%",
    elevation: 5,
  },
  miniImg: { width: 45, height: 45, borderRadius: 4, resizeMode: "contain" },
  productInfo: { flex: 1, marginLeft: 10 },
  starRow: {
    alignSelf: "flex-start",
    backgroundColor: "#ff3d00",
    borderRadius: 2,
    paddingHorizontal: 4,
  },
  starText: { color: "white", fontSize: 9, fontWeight: "bold" },
  prodTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    marginVertical: 2,
  },
  prodPrice: { color: "#ff3d00", fontWeight: "bold", fontSize: 13 },
  btnBeli: {
    backgroundColor: "#ff3d00",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
  },
  btnBeliText: { color: "white", fontSize: 13, fontWeight: "bold" },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },
  caption: { color: "white", fontSize: 14, marginBottom: 12, lineHeight: 20 },
  musicRow: { flexDirection: "row", alignItems: "center" },
  musicText: { color: "white", fontSize: 12, marginLeft: 6 },
});
