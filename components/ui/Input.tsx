import Colors from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  isPassword?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  labelStyle,
  inputStyle,
  isPassword = false,
  ...props
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={styles.inputContainer}>
        <BlurView intensity={30} tint="light" style={styles.blurBackground}>
          <TextInput
            style={[
              styles.input,
              error ? styles.inputError : null,
              inputStyle as TextStyle,
            ]}
            placeholderTextColor={Colors.text.placeHolder}
            secureTextEntry={secureTextEntry}
            {...props}
          />
          {isPassword && (
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={toggleSecureEntry}
              testID="toggle-password-visibility"
            >
              {secureTextEntry ? (
                <Feather name="eye" size={24} color={Colors.text.placeHolder} />
              ) : (
                <Feather
                  name="eye-off"
                  size={24}
                  color={Colors.text.placeHolder}
                />
              )}
            </TouchableOpacity>
          )}
        </BlurView>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: Colors.text.secondary,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  blurBackground: {
    borderRadius: 100,
    overflow: "hidden", // required for blur to stay inside rounded shape
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text.primary,
    width: "100%",
  },
  inputError: {
    borderColor: Colors.error.light,
  },
  errorText: {
    color: Colors.error.light,
    fontSize: 12,
    marginTop: 4,
    alignSelf: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
});

export default Input;
