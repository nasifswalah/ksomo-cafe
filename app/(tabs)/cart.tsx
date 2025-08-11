import Button from "@/components/ui/Button";
import CartItem from "@/components/ui/CartItem";
import Colors from "@/constants/colors";
import { useCart } from "@/hooks/useCart";
import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function CartScreen() {
  const { items, getTotal, clearCart } = useCart();

  const handleCheckout = () => {
    router.push("/order/confirmation");
  };

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Feather name="shopping-bag" size={24} color={Colors.text.secondary} />
      <Text style={styles.emptyText}>Cart is empty...</Text>
      <Button
        title="Browse Menu"
        onPress={() => router.navigate("/(tabs)")}
        style={styles.browseButton}
        variant="outline-green"
        testID="browse-menu-button"
      />
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Subtotal:</Text>
        <Text style={styles.totalValue}>₹{getTotal().toFixed(2)}</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Taxes (5%):</Text>
        <Text style={styles.totalValue}>₹{(getTotal() * 0.05).toFixed(2)}</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.grandTotalLabel}>Total:</Text>
        <Text style={styles.grandTotalValue}>₹{(getTotal() * 1.05).toFixed(2)}</Text>
      </View>
      <Button
        title="Go to checkout"
        onPress={handleCheckout}
        style={styles.checkoutButton}
        testID="checkout-button"
        variant="secondary"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.item.id}
            renderItem={({ item }) => <CartItem item={item} />}
            contentContainerStyle={styles.listContent}
            testID="cart-list"
          />
          {renderFooter()}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  listContent: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.text.secondary,
    marginVertical: 16,
  },
  browseButton: {
    marginTop: 16,
    width: "60%",
  },
  footerContainer: {
    padding: 16,
    backgroundColor: Colors.background.paper,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  totalValue: {
    fontSize: 16,
    color: Colors.text.primary,
  },
  grandTotalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  grandTotalValue: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  checkoutButton: {
    marginTop: 16,
  },
});