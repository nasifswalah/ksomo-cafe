import Colors from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface OrderOptionProps {
  selectedOption: "dine-in" | "takeaway";
  onSelectOption: (option: "dine-in" | "takeaway") => void;
}

const OrderOption: React.FC<OrderOptionProps> = ({
  selectedOption,
  onSelectOption,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Order Option</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => onSelectOption("dine-in")}
          testID="option-dine-in"
        >
          <View
            style={[
              styles.radio,
              selectedOption === "dine-in" && styles.radioSelected,
            ]}
          >
            {selectedOption === "dine-in" && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.optionText}>Dine-In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => onSelectOption("takeaway")}
          testID="option-takeaway"
        >
          <View
            style={[
              styles.radio,
              selectedOption === "takeaway" && styles.radioSelected,
            ]}
          >
            {selectedOption === "takeaway" && (
              <View style={styles.radioInner} />
            )}
          </View>
          <Text style={styles.optionText}>Takeaway</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
    color: Colors.text.primary,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.text.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioSelected: {
    borderColor: Colors.primary.main,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary.main,
  },
  optionText: {
    fontSize: 16,
    color: Colors.text.primary,
  },
});

export default OrderOption;