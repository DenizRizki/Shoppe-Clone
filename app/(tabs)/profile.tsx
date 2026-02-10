import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
  category: string;
};

export default function Profile() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=4")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const formatRupiah = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER SECTION */}
      <View style={styles.headerBg}>
        <View style={styles.headerTopActions}>
          <TouchableOpacity style={styles.btnMulaiJual}>
            <Ionicons name="storefront-outline" size={16} color="#ee4d2d" />
            <Text style={styles.textMulaiJual}>Mulai Jual</Text>
            <Ionicons name="chevron-forward" size={14} color="#ee4d2d" />
          </TouchableOpacity>
          <View style={styles.headerRightIcons}>
            <Ionicons
              name="settings-outline"
              size={22}
              color="white"
              style={styles.topIcon}
            />
            <Ionicons
              name="cart-outline"
              size={22}
              color="white"
              style={styles.topIcon}
            />
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={22}
              color="white"
              style={styles.topIcon}
            />
          </View>
        </View>

        <View style={styles.userInfoContainer}>
          <Image
            source={require("../../assets/images/profile.png")}
            style={styles.avatarImg}
          />
          <View style={styles.userMetaData}>
            <Text style={styles.usernameText}>Deniz</Text>
            <View style={styles.badgeRow}>
              <View style={styles.classicBadge}>
                <Text style={styles.classicText}>Classic</Text>
                <Ionicons name="chevron-forward" size={10} color="#666" />
              </View>
            </View>
            <Text style={styles.followText}>0 Pengikut | 1 Mengikuti</Text>
          </View>
        </View>
      </View>

      {/* PESANAN */}
      <View style={styles.whiteSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pesanan Saya</Text>
          <TouchableOpacity style={styles.rowCenter}>
            <Text style={styles.subTitleText}>Lihat Riwayat Pesanan</Text>
            <Ionicons name="chevron-forward" size={14} color="#888" />
          </TouchableOpacity>
        </View>
        <View style={styles.orderMenuGrid}>
          <OrderIconButton icon="wallet-outline" label="Belum Bayar" />
          <OrderIconButton icon="cube-outline" label="Dikemas" />
          <OrderIconButton icon="bus-outline" label="Dikirim" />
          <OrderIconButton icon="star-outline" label="Beri Nilai" />
        </View>
        <MenuRow
          icon="receipt-outline"
          label="Pulsa, Tagihan & Tiket"
          rightText="Diskon Pengguna Baru 38%"
        />
        <MenuRow
          icon="fast-food-outline"
          label="ShopeeFood"
          rightText="Gratis Ongkir"
          colorRight="#ee4d2d"
        />
      </View>

      {/* DOMPET */}
      <View style={styles.whiteSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Dompet Saya</Text>
        </View>
        <View style={styles.walletGrid}>
          <WalletItem
            img={require("../../assets/images/shopper.png")}
            label="ShopeePay"
            sub="Aktivasi"
          />
          <WalletItem
            img={require("../../assets/images/coin.png")}
            label="Koin Shopee"
            sub="Gratis 25RB!"
            isRed
          />
          <WalletItem
            img={require("../../assets/images/flash.png")}
            label="Voucher Saya"
            sub="50+ Voucher"
          />
        </View>
      </View>

      {/* KEUANGAN */}
      <View style={[styles.whiteSection, { marginBottom: 10 }]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Keuangan</Text>
          <TouchableOpacity style={styles.rowCenter}>
            <Text style={styles.subTitleText}>Lihat Semua</Text>
            <Ionicons name="chevron-forward" size={14} color="#888" />
          </TouchableOpacity>
        </View>
        <View style={styles.financeRow}>
          <FinanceCard
            img={require("../../assets/images/shopper.png")}
            title="SPayLater"
            desc="Cicilan Pasti 0% + Diskon 50RB"
          />
          <FinanceCard
            img={require("../../assets/images/promo-cart.png")}
            title="SPinjam"
            desc="Pinjaman Pertama Bunga Harian 0.06%"
            badge="Baru"
          />
        </View>
      </View>

      {/* PRODUK REKOMENDASI */}
      <RecommendationSection
        title="Trend Hari Ini"
        data={products.slice(0, 2)}
        format={formatRupiah}
        router={router}
      />
      <RecommendationSection
        title="Untuk Anda"
        data={products.slice(2, 4)}
        format={formatRupiah}
        router={router}
      />

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

// --- SUB COMPONENTS ---

const OrderIconButton = ({ icon, label }: { icon: any; label: string }) => (
  <View style={styles.orderItem}>
    <Ionicons name={icon} size={26} color="#444" />
    <Text style={styles.orderLabel}>{label}</Text>
  </View>
);

const MenuRow = ({ icon, label, rightText, colorRight = "#888" }: any) => (
  <TouchableOpacity style={styles.menuRow}>
    <View style={styles.rowCenter}>
      <Ionicons name={icon} size={22} color="#26aa99" />
      <Text style={styles.menuLabel}>{label}</Text>
    </View>
    <View style={styles.rowCenter}>
      <Text style={[styles.menuRightText, { color: colorRight }]}>
        {rightText}
      </Text>
      <Ionicons name="chevron-forward" size={16} color="#ccc" />
    </View>
  </TouchableOpacity>
);

const WalletItem = ({ img, label, sub, isRed = false }: any) => (
  <View style={styles.walletItem}>
    <Image source={img} style={styles.walletImg} />
    <Text style={styles.walletLabel}>{label}</Text>
    <Text style={[styles.walletSub, isRed && { color: "#ee4d2d" }]}>{sub}</Text>
  </View>
);

const FinanceCard = ({ img, title, desc, badge }: any) => (
  <View style={styles.fCard}>
    <View style={styles.rowCenter}>
      <Image source={img} style={styles.fImg} />
      <Text style={styles.fTitle}>{title}</Text>
      {badge && (
        <View style={styles.newBadge}>
          <Text style={styles.newText}>{badge}</Text>
        </View>
      )}
    </View>
    <Text style={styles.fDesc}>{desc}</Text>
  </View>
);

const RecommendationSection = ({ title, data, format, router }: any) => (
  <View style={styles.recommendContainer}>
    <View style={styles.sectionHeader}>
      <Text style={styles.recommendTitle}>{title}</Text>
      <Text style={styles.seeMore}>Lihat Semua {">"}</Text>
    </View>
    <View style={styles.rowBetween}>
      {data.map((item: any) => {
        const harga = Math.floor(item.price * 15000);
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.pCard}
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
            <Image source={{ uri: item.image }} style={styles.pImg} />
            <Text numberOfLines={2} style={styles.pTitle}>
              {item.title}
            </Text>
            <Text style={styles.pPrice}>Rp {format(harga)}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  headerBg: {
    backgroundColor: "#ee4d2d",
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 15,
  },
  headerTopActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btnMulaiJual: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 15,
  },
  textMulaiJual: {
    fontSize: 12,
    color: "#ee4d2d",
    marginHorizontal: 4,
    fontWeight: "500",
  },
  headerRightIcons: { flexDirection: "row" },
  topIcon: { marginLeft: 15 },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  avatarImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "white",
  },
  userMetaData: { marginLeft: 12 },
  usernameText: { color: "white", fontSize: 18, fontWeight: "bold" },
  badgeRow: { flexDirection: "row", marginTop: 4 },
  classicBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  classicText: { fontSize: 10, color: "#666", marginRight: 2 },
  followText: { color: "white", fontSize: 12, marginTop: 6 },
  whiteSection: { backgroundColor: "white", marginTop: 8, paddingVertical: 12 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderColor: "#f0f0f0",
  },
  sectionTitle: { fontSize: 14, fontWeight: "500" },
  subTitleText: { fontSize: 12, color: "#888", marginRight: 4 },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  orderMenuGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
  },
  orderItem: { alignItems: "center" },
  orderLabel: { fontSize: 11, marginTop: 6, color: "#444" },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderTopWidth: 0.5,
    borderColor: "#f0f0f0",
  },
  menuLabel: { marginLeft: 12, fontSize: 14, color: "#333" },
  menuRightText: { fontSize: 12, marginRight: 5 },
  walletGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
  },
  walletItem: { alignItems: "center", flex: 1 },
  walletImg: { width: 22, height: 22, marginBottom: 6, resizeMode: "contain" },
  walletLabel: { fontSize: 11, color: "#333" },
  walletSub: { fontSize: 10, color: "#888", marginTop: 2 },
  financeRow: { flexDirection: "row", paddingHorizontal: 10, marginTop: 15 },
  fCard: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#eee",
  },
  fImg: { width: 18, height: 18, resizeMode: "contain" },
  fTitle: { fontSize: 12, fontWeight: "bold", marginLeft: 6 },
  fDesc: { fontSize: 10, color: "#888", marginTop: 5 },
  newBadge: {
    backgroundColor: "#ee4d2d",
    paddingHorizontal: 4,
    borderRadius: 4,
    marginLeft: 5,
  },
  newText: { color: "white", fontSize: 8, fontWeight: "bold" },
  recommendContainer: {
    backgroundColor: "white",
    marginTop: 10,
    paddingVertical: 15,
  },
  recommendTitle: { fontSize: 14, fontWeight: "bold", color: "#ee4d2d" },
  seeMore: { fontSize: 12, color: "#888" },
  pCard: { width: width / 2 - 20, marginTop: 10 },
  pImg: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    backgroundColor: "#f9f9f9",
  },
  pTitle: { fontSize: 12, marginVertical: 5, height: 32 },
  pPrice: { fontSize: 13, fontWeight: "bold", color: "#ee4d2d" },
});
