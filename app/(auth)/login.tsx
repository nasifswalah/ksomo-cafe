import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";
import Colors from "@/constants/colors";
import { GoogleIcon } from "@/constants/icons";
import { useAuth } from "@/hooks/useAuth";
import FontAwesome from "@expo/vector-icons/FontAwesome";
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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login, loading, error } = useAuth();

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

    return isValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      await login(email, password);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // In a real app, this would integrate with social login providers
    console.log(`Login with ${provider}`);
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
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
            testID="email-input"
            inputStyle={styles.input}
            borderRadius={100}
          />

          <Input
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            isPassword
            error={passwordError}
            testID="password-input"
            inputStyle={styles.input}
            borderRadius={100}
          />

          <Link href="/forgot-password" asChild>
            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </Link>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
            testID="login-button"
            size="medium"
            variant="primary"
          />

          <View style={styles.socialContainer}>
            <Text style={styles.orText}>Or sign in with</Text>
            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialLogin("google")}
                testID="google-login-button"
              >
                <Image source={GoogleIcon} style={styles.socialIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialLogin("apple")}
                testID="apple-login-button"
              >
                <FontAwesome
                  name="apple"
                  size={24}
                  color={Colors.text.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Not a member? </Text>
            <Link href="/register" asChild>
              <TouchableOpacity>
                <Text style={styles.registerLink}>Register now</Text>
              </TouchableOpacity>
            </Link>
          </View>
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
  formContainer: {
    marginBottom: 24,
  },
  loginButton: {
    marginTop: 20,
    borderRadius: 100,
    width: "30%",
    alignSelf: "center",
  },
  forgotPasswordContainer: {
    marginLeft: 10,
  },
  forgotPasswordText: {
    color: Colors.text.light,
    fontSize: 14,
  },
  socialContainer: {
    marginBottom: 10,
    marginTop: 20,
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
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  registerText: {
    color: Colors.text.light,
    fontSize: 14,
  },
  registerLink: {
    color: Colors.secondary.main,
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    color: Colors.text.light,
    paddingHorizontal: 20,
  },
  errorText: {
    color: Colors.error.light,
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
