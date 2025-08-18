import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import OrderOption from "@/components/ui/OrderOption";
import TimeSlotSelector from "@/components/ui/TimeSlotSelector";
import Colors from "@/constants/colors";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [orderOption, setOrderOption] = useState<"dine-in" | "takeaway">("takeaway"
  );
  const [timeSlot, setTimeSlot] = useState("50-60 mins");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
      setEmail(user.email || "");
      setOrderOption("takeaway");
      setTimeSlot("50-60 mins");
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
    <View style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Feather name="edit-2" size={20} color={Colors.primary.main} />
          </TouchableOpacity>
        </View>
      </View> */}

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Personal Information Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Feather name="user" size={20} color={Colors.primary.main} />
              <Text style={styles.cardTitle}>Personal Information</Text>
            </View>

            <View style={styles.cardContent}>
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                // editable={isEditing}
                // style={!isEditing && styles.disabledInput}
                placeholderTextColor={Colors.text.placeHolder}
                style={styles.input}
                testID="name-input"
              />

              <Input
                label="Phone Number"
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                // editable={isEditing}
                // style={!isEditing && styles.disabledInput}
                placeholderTextColor={Colors.text.placeHolder}
                style={styles.input}
                testID="phone-input"
              />

              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={"useremail@example.com"}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={false}
                style={styles.disabledInput}
                testID="email-input"
              />

              <Button
                title="Update"
                onPress={handleSave}
                loading={loading}
                testID="save-button"
                style={styles.saveButton}
                variant="outline"
                disabled={true}
              />
            </View>
          </View>

          {/* Preferences Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Feather name="settings" size={20} color={Colors.primary.main} />
              <Text style={styles.cardTitle}>Order Preferences</Text>
            </View>

            <View style={styles.cardContent}>
              <OrderOption
                selectedOption={orderOption}
                onSelectOption={isEditing ? setOrderOption : () => {}}
              />

              <TimeSlotSelector
                selectedSlot={timeSlot}
                onSelectSlot={setTimeSlot}
              />
              <Button
                title="Update"
                onPress={handleSave}
                loading={loading}
                testID="save-button"
                style={styles.saveButton}
                variant="outline"
                disabled={true}
              />
            </View>
          </View>

          {/* Quick Actions Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Feather name="bell" size={20} color={Colors.primary.main} />
              <Text style={styles.cardTitle}>Quick Actions</Text>
            </View>

            <View style={styles.cardContent}>
              <TouchableOpacity style={styles.actionItem}>
                <Feather name="bell" size={18} color={Colors.text.secondary} />
                <Text style={styles.actionText}>Notification Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => setIsEditing(!isEditing)}
              >
                <Feather name="log-out" size={18} color={Colors.error.dark} />
                <Text style={[styles.actionText, { color: Colors.error.dark }]}>
                  Sign Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Save Button */}
          {isEditing && (
            <View style={styles.buttonContainer}>
              <Button
                title="Save Changes"
                onPress={handleSave}
                loading={loading}
                style={styles.saveButton}
                testID="save-button"
              />
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setIsEditing(false);
                  // Reset form values
                  setName(user?.name || "");
                  setPhone(user?.phone || "");
                  setEmail(user?.email || "");
                  setOrderOption("takeaway");
                  setTimeSlot("50-60 mins");
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  header: {
    backgroundColor: Colors.background.paper,
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: Colors.text.primary,
  },
  editButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: Colors.primary.light + "20",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: Colors.background.paper,
    marginBottom: 16,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary.main,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "600" as const,
    color: Colors.text.light,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.secondary.main,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: Colors.background.paper,
  },
  userName: {
    fontSize: 24,
    fontWeight: "600" as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  card: {
    backgroundColor: Colors.background.paper,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600" as const,
    color: Colors.text.primary,
    marginLeft: 12,
  },
  cardContent: {
    padding: 20,
  },
  disabledInput: {
    backgroundColor: Colors.background.main,
    opacity: 0.7,
    padding: 12,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  actionText: {
    fontSize: 16,
    color: Colors.text.primary,
    marginLeft: 12,
    fontWeight: "500" as const,
  },
  messageContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.background.paper,
  },
  input: {
    backgroundColor: Colors.background.paper,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  errorText: {
    color: Colors.error.light,
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500" as const,
  },
  successText: {
    color: Colors.success,
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500" as const,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  saveButton: {
    marginBottom: 12,
    paddingVertical: 5,
    alignSelf: "flex-end",
    padding: 0,
    width: "50%",
    borderRadius: 100,
  },
  cancelButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.text.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  cancelButtonText: {
    color: Colors.text.secondary,
    fontSize: 16,
    fontWeight: "600" as const,
  },
});
