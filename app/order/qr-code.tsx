import Colors from "@/constants/colors";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function QRCodeScreen() {
  // In a real app, this would generate a QR code based on order details
  // For now, we'll use a placeholder QR code image
  
  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <Image
          source={{
            uri: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=KosmoCafeOrder123456",
          }}
          style={styles.qrCode}
          resizeMode="contain"
        />
      </View>
      
      <Text style={styles.instructionText}>
        take a screen shot if you want too!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  qrContainer: {
    backgroundColor: Colors.background.paper,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  qrCode: {
    width: 250,
    height: 250,
  },
  instructionText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 24,
    textAlign: "center",
  },
});