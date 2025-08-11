import Colors from "@/constants/colors";
import { useAuth } from "@/hooks/useAuth";
import { Feather, MaterialIcons, Octicons } from "@expo/vector-icons";
import React from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SettingsScreen() {
  const { logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: logout,
        style: "destructive",
      },
    ]);
  };

  const renderSettingItem = (
    icon: React.ReactNode,
    title: string,
    onPress?: () => void,
    rightElement?: React.ReactNode
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
      testID={`setting-${title.toLowerCase().replace(/\s/g, "-")}`}
    >
      <View style={styles.settingIconContainer}>{icon}</View>
      <Text style={styles.settingTitle}>{title}</Text>
      <View style={styles.settingRightElement}>
        {rightElement || <Text style={styles.settingArrow}>›</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        {renderSettingItem(
          //   <Lock size={20} color={Colors.text.primary} />,
          <Octicons name="lock" size={24} color={Colors.text.primary} />,
          "Change Password"
        )}
        {renderSettingItem(
          <Feather name="map-pin" size={24} color={Colors.text.primary} />,
          "Saved Addresses"
        )}
        {renderSettingItem(
          <Octicons name="credit-card" size={24} color={Colors.text.primary} />,
          "Payment Methods"
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        {renderSettingItem(
          <Octicons name="bell" size={24} color={Colors.text.primary} />,
          "Notifications",
          undefined,
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: Colors.divider, true: Colors.primary.light }}
            thumbColor={notificationsEnabled ? Colors.primary.main : "#f4f3f4"}
            testID="notifications-switch"
          />
        )}
        {renderSettingItem(
          <Feather name="moon" size={24} color={Colors.text.primary} />,
          "Dark Mode",
          undefined,
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            trackColor={{ false: Colors.divider, true: Colors.primary.light }}
            thumbColor={darkModeEnabled ? Colors.primary.main : "#f4f3f4"}
            testID="dark-mode-switch"
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        {renderSettingItem(
          <Feather name="help-circle" size={24} color={Colors.text.primary} />,
          "Help Center"
        )}
        {renderSettingItem(
          <Octicons name="star" size={24} color="black" />,
          "Rate the App"
        )}
        {renderSettingItem(
          <Feather name="shield" size={24} color={Colors.text.primary} />,
          "Privacy Policy"
        )}
        {renderSettingItem(
          <Octicons name="info" size={24} color={Colors.text.primary} />,
          "About"
        )}
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        testID="logout-button"
      >
        <MaterialIcons name="logout" size={24} color={Colors.error.light} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text.secondary,
    marginLeft: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  settingIconContainer: {
    width: 32,
    alignItems: "center",
    marginRight: 12,
  },
  settingTitle: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  settingRightElement: {
    alignItems: "flex-end",
  },
  settingArrow: {
    fontSize: 20,
    color: Colors.text.secondary,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
    backgroundColor: Colors.background.paper,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.error.light,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.error.light,
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    color: Colors.text.secondary,
    textAlign: "center",
    marginBottom: 24,
  },
});
