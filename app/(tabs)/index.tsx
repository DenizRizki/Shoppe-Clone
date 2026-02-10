import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

const icons: Record<string, any> = {
  "promo-cart.png": require("../../assets/images/promo-cart.png"),
  "jacket.png": require("../../assets/images/jacket.png"),
  "pulsa.png": require("../../assets/images/pulsa.png"),
  "flash.png": require("../../assets/images/flash.png"),
  "mall.png": require("../../assets/images/mall.png"),
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const formatRupiah = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#ff6a00" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* SEARCH HEADER */}
      <View style={styles.searchHeader}>
        <View style={styles.searchBox}>
          <Text style={{ color: "#999" }}>Mukena</Text>
        </View>
        <Image
          source={require("../../assets/images/cart.png")}
          style={styles.topIcon}
        />
        <Image
          source={require("../../assets/images/chat-3.png")}
          style={styles.topIcon}
        />
      </View>

      {/* WALLET BAR */}
      <View style={styles.walletBar}>
        <View style={styles.walletSectionIcon}>
          <Image
            source={require("../../assets/images/qris.png")}
            style={styles.qrisIcon}
          />
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.walletSection}>
          <Image
            source={require("../../assets/images/shopper.png")}
            style={styles.walletImg}
          />
          <View style={styles.walletTextGap}>
            <Text style={styles.walletTitle}>ShopeePay</Text>
            <Text style={styles.walletSub}>Cashback Saldo</Text>
          </View>
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.walletSection}>
          <Image
            source={require("../../assets/images/coin.png")}
            style={styles.walletImgSmall}
          />
          <View style={styles.walletTextGap}>
            <Text style={styles.walletTitle}>Cek-in!</Text>
            <Text style={styles.walletSub}>Klaim 25RB!</Text>
          </View>
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.walletSection}>
          <Image
            source={require("../../assets/images/shopper.png")}
            style={styles.walletImgSmall}
          />
          <View style={styles.walletTextGap}>
            <Text style={styles.walletTitle}>Kirim Uang</Text>
            <Text style={[styles.walletSub, { color: "#888" }]}>
              Gratis Admin
            </Text>
          </View>
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.walletSectionIcon}>
          <Image
            source={require("../../assets/images/shopper.png")}
            style={styles.walletImgSmall}
          />
        </View>
      </View>

      {/* ICON MENU */}
      <View style={styles.iconGrid}>
        {[
          { img: "promo-cart.png", text: "Spesial Cart" },
          { img: "jacket.png", text: "Fit Diskon" },
          { img: "pulsa.png", text: "Pulsa" },
          { img: "flash.png", text: "Flash Sale" },
          { img: "mall.png", text: "Shopee Mall" },
        ].map((item, i) => (
          <View key={i} style={styles.iconItem}>
            <Image source={icons[item.img]} style={styles.iconImg} />
            <Text style={styles.iconText}>{item.text}</Text>
          </View>
        ))}
      </View>

      {/* BIG BANNER */}
      <Image
        source={require("../../assets/images/banner-4.png")}
        style={styles.bigBanner}
      />

      {/* PRODUK */}
      <Text style={styles.title}>Produk Populer</Text>

      <View style={styles.productListContainer}>
        {products.map((item) => {
          const harga = Math.floor(item.price * 15000);
          return (
            <Pressable
              key={item.id}
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/detailProduk",
                  params: {
                    id: item.id,
                    title: item.title,
                    price: harga,
                    image: item.image,
                    category: item.category,
                  },
                })
              }
            >
              <View style={styles.promoBadge}>
                <Text style={styles.promoText}>PROMO XTRA</Text>
              </View>
              <Image source={{ uri: item.image }} style={styles.productImg} />
              <View style={styles.productInfo}>
                <Text style={styles.starBadge}>Star+</Text>
                <Text numberOfLines={2} style={styles.productName}>
                  {item.title}
                </Text>
                <Text style={styles.price}>Rp {formatRupiah(harga)}</Text>
                <Text style={styles.sold}>2RB+ terjual</Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ff6a00",
  },
  searchBox: { flex: 1, backgroundColor: "white", borderRadius: 6, padding: 8 },
  topIcon: { width: 24, height: 24, marginLeft: 10 },

  walletBar: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 10,
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
    alignItems: "center",
  },
  walletSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 4,
  },
  walletSectionIcon: {
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  walletTextGap: { marginLeft: 4 },
  walletTitle: { fontSize: 10, fontWeight: "bold", color: "#333" },
  walletSub: { fontSize: 9, color: "#ee4d2d", fontWeight: "600" },
  verticalDivider: { width: 1, height: "60%", backgroundColor: "#e0e0e0" },
  qrisIcon: { width: 24, height: 18, resizeMode: "contain" },
  walletImg: { width: 16, height: 16, resizeMode: "contain" },
  walletImgSmall: { width: 14, height: 14, resizeMode: "contain" },

  iconGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  iconItem: { alignItems: "center" },
  iconImg: { width: 40, height: 40 },
  iconText: { fontSize: 10, marginTop: 4 },
  bigBanner: { width: width, height: 160, resizeMode: "cover" },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    marginVertical: 10,
  },

  productListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  card: {
    backgroundColor: "white",
    width: width / 2 - 15,
    margin: 5,
    borderRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  promoBadge: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "red",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 10,
  },
  promoText: { color: "yellow", fontSize: 10, fontWeight: "bold" },
  productImg: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginTop: 10,
  },
  productInfo: { padding: 8 },
  starBadge: {
    backgroundColor: "#ff3d00",
    color: "white",
    fontSize: 9,
    alignSelf: "flex-start",
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  productName: { fontSize: 12, marginVertical: 5, height: 32, color: "#333" },
  price: { fontWeight: "bold", color: "#ff6a00", fontSize: 14 },
  sold: { fontSize: 10, color: "gray", marginTop: 4 },
});
