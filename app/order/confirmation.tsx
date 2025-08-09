import Button from "@/components/ui/Button";
import Colors from "@/constants/colors";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function OrderConfirmationScreen() {
  const { items, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [orderDate] = useState(new Date().toISOString());

  useEffect(() => {
    // In a real app, this would submit the order to a backend
    // and then clear the cart upon successful submission
    return () => {
      // clearCart(); // Uncomment in a real app
    };
  }, []);

  const handleGenerateQR = () => {
    router.push("/order/qr-code");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Kosmo cafe</Text>
      
      <View style={styles.receiptContainer}>
        <Text style={styles.receiptTitle}>Here&apos;s your receipt.</Text>
        <Text style={styles.receiptDate}>{formatDate(orderDate)}</Text>
        
        <View style={styles.divider} />
        
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoText}>Name: {user?.name || "Guest"}</Text>
          <Text style={styles.userInfoText}>Phone: {user?.phone || "N/A"}</Text>
          <Text style={styles.userInfoText}>Email: {user?.email || "N/A"}</Text>
          <Text style={styles.userInfoText}>Food delivery type: {user?.orderOption || "Takeaway"}</Text>
          <Text style={styles.userInfoText}>Time takes to Pickup: {user?.timeSlot || "50-60 mins"}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.orderSummaryContainer}>
          <Text style={styles.orderSummaryText}>Total Items: {items.reduce((sum, item) => sum + item.quantity, 0)}</Text>
          <Text style={styles.orderSummaryText}>Food Price: ₹{getTotal().toFixed(2)}</Text>
          <Text style={styles.orderSummaryText}>SGST: {(getTotal() * 0.025).toFixed(2)}</Text>
          <Text style={styles.orderSummaryText}>CGST: {(getTotal() * 0.025).toFixed(2)}</Text>
          <Text style={styles.orderSummaryTotal}>Total Price: ₹{(getTotal() * 1.05).toFixed(2)}</Text>
        </View>
      </View>
      
      <Text style={styles.thankYouText}>Thank you for your order!</Text>
      
      <Button
        title="Generate QR code"
        onPress={handleGenerateQR}
        style={styles.generateQRButton}
        testID="generate-qr-button"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text.primary,
    textAlign: "center",
    marginBottom: 24,
  },
  receiptContainer: {
    backgroundColor: Colors.background.paper,
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  receiptTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 8,
  },
  receiptDate: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: 16,
  },
  userInfoContainer: {
    marginBottom: 16,
  },
  userInfoText: {
    fontSize: 14,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  orderSummaryContainer: {
    marginBottom: 16,
  },
  orderSummaryText: {
    fontSize: 14,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  orderSummaryTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
    marginTop: 8,
  },
  thankYouText: {
    fontSize: 16,
    color: Colors.text.primary,
    textAlign: "center",
    marginBottom: 24,
  },
  generateQRButton: {
    marginBottom: 24,
  },
});