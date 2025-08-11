import CartSummary from "@/components/ui/CartSummary";
import CategoryTabs from "@/components/ui/CategoryTabs";
import MenuItem from "@/components/ui/MenuItem";
import Colors from "@/constants/colors";
import { categories, menuItems } from "@/mocks/menu";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState("cold");
  const [filteredItems, setFilteredItems] = useState(menuItems.filter(item => item.category === "cold"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Simulate loading delay
    const timer = setTimeout(() => {
      setFilteredItems(menuItems.filter(item => item.category === selectedCategory));
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.deliveryText}>Deliver now</Text>
      <Text style={styles.addressText}>
        Kosmo cafe, 199, TT krishnamachari rd, Alwarapet.
      </Text>
      <View style={styles.deliveryTimeContainer}>
        <Text style={styles.deliveryTimeLabel}>Delivery time:</Text>
        <Text style={styles.deliveryTimeValue}>50-60 mins</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary.main} />
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MenuItem item={item} />}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          testID="menu-list"
        />
      )}
      <CartSummary/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: Colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  deliveryText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  addressText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text.primary,
    marginBottom: 16,
  },
  deliveryTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.background.main,
    borderRadius: 8,
  },
  deliveryTimeLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  deliveryTimeValue: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text.primary,
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