import Colors from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TimeSlotSelectorProps {
  selectedSlot: string;
  onSelectSlot: (slot: string) => void;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedSlot,
  onSelectSlot,
}) => {
  const timeSlots = [
    "0-10 mins",
    "10-20 mins",
    "20-30 mins",
    "30-40 mins",
    "40-50 mins",
    "50-60 mins",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Time Slot</Text>
      <View style={styles.slotsContainer}>
        {timeSlots.map((slot) => (
          <TouchableOpacity
            key={slot}
            style={[
              styles.slot,
              selectedSlot === slot && styles.selectedSlot,
            ]}
            onPress={() => onSelectSlot(slot)}
            testID={`time-slot-${slot}`}
          >
            <Text
              style={[
                styles.slotText,
                selectedSlot === slot && styles.selectedSlotText,
              ]}
            >
              {slot}
            </Text>
            {selectedSlot === slot && (
              <View style={styles.checkmark} />
            )}
          </TouchableOpacity>
        ))}
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
  slotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  slot: {
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  selectedSlot: {
    backgroundColor: Colors.secondary.light,
    borderColor: Colors.secondary.main,
  },
  slotText: {
    fontSize: 14,
    color: Colors.text.primary,
  },
  selectedSlotText: {
    color: Colors.text.primary,
    fontWeight: "600",
  },
  checkmark: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.secondary.main,
    marginLeft: 6,
  },
});

export default TimeSlotSelector;