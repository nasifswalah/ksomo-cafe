import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";
import Colors from "@/constants/colors";
import { GoogleIcon } from "@/constants/icons";
import { useAuth } from "@/hooks/useAuth";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const { register, loading, error } = useAuth();

  const validateForm = () => {
    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      await register(email, password, confirmPassword);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // In a real app, this would integrate with social login providers
    console.log(`Register with ${provider}`);
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
        <View style={styles.logoContainer}>
          <Logo size="large" showText={false} />
        </View>

        <View style={styles.formContainer}>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
            testID="email-input"
            inputStyle={styles.input}
          />

          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            isPassword
            error={passwordError}
            testID="password-input"
            inputStyle={styles.input}
          />

          <Input
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            isPassword
            error={confirmPasswordError}
            testID="confirm-password-input"
            inputStyle={styles.input}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <Button
            title="Sign Up"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerButton}
            testID="register-button"
            variant="primary"
          />
        </View>

        <View style={styles.socialContainer}>
          <Text style={styles.orText}>Or continue with</Text>

          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin("google")}
              testID="google-register-button"
            >
              <Image source={GoogleIcon} style={styles.socialIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin("apple")}
              testID="apple-register-button"
            >
              <FontAwesome name="apple" size={30} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>already have an account? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Login now</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.dark,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    color: Colors.text.light,
    textAlign: "center",
    marginBottom: 24,
  },
  formContainer: {
    marginBottom: 24,
  },
  registerButton: {
    marginTop: 16,
    width: "30%",
    alignSelf: "center",
    borderRadius: 100,
  },
  input: {
    color: Colors.text.light,
    borderRadius: 100,
  },
  socialContainer: {
    marginBottom: 24,
  },
  orText: {
    color: Colors.text.light,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.text.light,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    color: Colors.text.light,
    fontSize: 14,
  },
  loginLink: {
    color: Colors.secondary.main,
    fontSize: 14,
    fontWeight: "600",
  },
  errorText: {
    color: Colors.error.light,
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
