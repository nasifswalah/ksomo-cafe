import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Logo from "@/components/ui/Logo";
import Colors from "@/constants/colors";
import { GoogleIcon } from "@/constants/icons";
import { useAuth } from "@/hooks/useAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
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
  const router = useRouter();

  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState("");

  const { onSignUpPress, onVerifyPress, error: authError, pendingVerification, loading } = useAuth();

  const validateForm = () => {
    let isValid = true;

    // Email validation
    if (!emailAddress) {
      setError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailAddress)) {
      setError("Email is invalid");
      isValid = false;
    } else {
      setError("");
    }

    // Password validation
    if (!password) {
      setError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setError("");
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
      const success = await onSignUpPress(emailAddress, password, confirmPassword);
      if(success) {
        router.replace('/(tabs)/profile');
      }
    }
  };

  const handleSocialLogin = (provider: string) => {
    // In a real app, this would integrate with social login providers
    console.log(`Register with ${provider}`);
  };

  // Handle submission of verification form
  const handleVerify = async () => {
    if(code) {
      await onVerifyPress(code);
    }
  }

  return (
     <View style={{ flex: 1, backgroundColor: Colors.primary.dark }}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Logo size="large" showText={false} />
        </View>

        <View style={styles.formContainer}>
          {!pendingVerification && (
            <>
              <Input
                placeholder="Email"
                value={emailAddress}
                onChangeText={setEmailAddress}
                keyboardType="email-address"
                autoCapitalize="none"
                error={error}
                testID="email-input"
                inputStyle={styles.input}
                borderRadius={100}
              />
              <Input
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                isPassword
                error={error}
                testID="password-input"
                inputStyle={styles.input}
                borderRadius={100}
              />
              <Input
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                isPassword
                error={confirmPasswordError}
                testID="confirm-password-input"
                inputStyle={styles.input}
                borderRadius={100}
              />
            </>
          )}

          {pendingVerification && (
            <Input
              placeholder="Verification code"
              value={code}
              onChangeText={setCode}
              error={error}
              testID="verification-code-input"
              inputStyle={styles.input}
              borderRadius={100}
            />
          )}

          {authError && <Text style={styles.errorText}>{authError}</Text>}

          {!pendingVerification ? (
            <Button
              title="Continue"
              onPress={handleRegister}
              loading={loading}
              style={styles.registerButton}
              testID="register-button"
              variant="primary"
            />
          ) : (
            <Button
              title="Verify"
              onPress={handleVerify}
              loading={loading}
              style={styles.registerButton}
              testID="verify-button"
              variant="primary"
            />
          )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.dark,
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
    justifyContent: "flex-start",
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
    width: "100%",
    alignSelf: "center",
    borderRadius: 100,
  },
  input: {
    color: Colors.text.light,
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
