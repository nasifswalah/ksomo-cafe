import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import OrderOption from "@/components/ui/OrderOption";
import TimeSlotSelector from "@/components/ui/TimeSlotSelector";
import Colors from "@/constants/colors";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function ProfileScreen() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [orderOption, setOrderOption] = useState<"dine-in" | "takeaway">(
    user?.orderOption || "takeaway"
  );
  const [timeSlot, setTimeSlot] = useState(user?.timeSlot || "50-60 mins");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      setOrderOption(user.orderOption || "takeaway");
      setTimeSlot(user.timeSlot || "50-60 mins");
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess(false);

      const result = await updateProfile({
        name,
        phone,
        email,
        orderOption,
        timeSlot,
      });

      if (result) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError("Failed to update profile");
      }
    } catch (err) {
      setError("An error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Input
            label="Name"
            placeholder="Your name"
            value={name}
            onChangeText={setName}
            testID="name-input"
            inputStyle={styles.input}
            placeholderTextColor={Colors.text.secondary}
          />

          <Input
            label="Phone Number"
            placeholder="Your phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            testID="phone-input"
            inputStyle={styles.input}
            placeholderTextColor={Colors.text.secondary}
          />

          <Input
            label="Email"
            placeholder="Your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={false}
            testID="email-input"
            inputStyle={styles.input}
            placeholderTextColor={Colors.text.secondary}
          />

          <OrderOption
            selectedOption={orderOption}
            onSelectOption={setOrderOption}
          />

          <TimeSlotSelector
            selectedSlot={timeSlot}
            onSelectSlot={setTimeSlot}
          />

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : success ? (
            <Text style={styles.successText}>
              Profile updated successfully!
            </Text>
          ) : null}

          <Button
            title="Save"
            onPress={handleSave}
            loading={loading}
            style={styles.saveButton}
            testID="save-button"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  scrollContent: {
    padding: 16,
  },
  formContainer: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.secondary.main,
    borderRadius: 8,
  },
  saveButton: {
    marginTop: 24,
  },
  errorText: {
    color: Colors.error.light,
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  successText: {
    color: Colors.success,
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
