import CartSummary from "@/components/ui/CartSummary";
import CategoryTabs from "@/components/ui/CategoryTabs";
import MenuItem from "@/components/ui/MenuItem";
import OutletStatus from "@/components/ui/OutletStatus";
import Colors from "@/constants/colors";
import { useMenu } from "@/hooks/useMenu";
import { categories } from "@/mocks/menu";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View
} from "react-native";

export default function MenuScreen() {
  const { menu } = useMenu();
  const [selectedCategory, setSelectedCategory] = useState("cold");
  const [filteredItems, setFilteredItems] = useState(
    menu.filter((item) => item.category === "cold")
  );
  const [loading, setLoading] = useState(false);

  console.log(menu);

  useEffect(() => {
    setLoading(true);
    // Simulate loading delay
    const timer = setTimeout(() => {
      setFilteredItems(
        menu.filter((item) => item.category === selectedCategory)
      );
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <View style={styles.container}>
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      <OutletStatus />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary.main} />
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MenuItem item={item} />}
          // ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          testID="menu-list"
        />
      )}
      <CartSummary />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  listContent: {
    paddingBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
