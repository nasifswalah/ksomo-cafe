import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Colors from "@/constants/colors";
import { useAuth } from "@/hooks/useAuth";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const { resetPassword, loading, error } = useAuth();

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
    
    return isValid;
  };

  const handleResetPassword = async () => {
    if (validateForm()) {
      const result = await resetPassword(email);
      if (result) {
        setSuccess(true);
      }
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
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          testID="back-button"
        >
          <AntDesign name="arrowleft" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Recover Password</Text>
          
          {success ? (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>
                Password reset instructions have been sent to your email.
              </Text>
              <Button
                title="Back to Login"
                onPress={() => router.replace("/login")}
                style={styles.backToLoginButton}
                testID="back-to-login-button"
              />
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Input
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                error={emailError}
                testID="email-input"
              />
              
              {error && <Text style={styles.errorText}>{error}</Text>}
              
              <Button
                title="Recover Password"
                onPress={handleResetPassword}
                loading={loading}
                style={styles.recoverButton}
                variant="secondary"
                testID="recover-button"
              />
              
              <View style={styles.createAccountContainer}>
                <Text style={styles.createAccountText}>Don&apos;t have an account? </Text>
                <Link href="/register" asChild>
                  <TouchableOpacity>
                    <Text style={styles.createAccountLink}>Create one</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )}
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
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 24,
    textAlign: "center",
  },
  formContainer: {
    marginBottom: 24,
  },
  recoverButton: {
    marginTop: 16,
  },
  createAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  createAccountText: {
    color: Colors.text.secondary,
    fontSize: 14,
  },
  createAccountLink: {
    color: Colors.primary.main,
    fontSize: 14,
    fontWeight: "600",
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  successContainer: {
    alignItems: "center",
  },
  successText: {
    fontSize: 16,
    color: Colors.text.primary,
    textAlign: "center",
    marginBottom: 24,
  },
  backToLoginButton: {
    width: "100%",
  },
});