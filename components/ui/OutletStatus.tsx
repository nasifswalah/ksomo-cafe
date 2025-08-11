import Colors from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

export default function OutletStatus() {
  return (
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
}

const styles = StyleSheet.create({
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
});
