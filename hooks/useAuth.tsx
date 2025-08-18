import { ClerkError } from "@/types/common";
import { useSignIn, useSignUp, useUser } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../types/user";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  pendingVerification: boolean;
  // login: (email: string, password: string) => Promise<boolean>;
  onSignUpPress: (
    emailAddress: string,
    password: string,
    confirmPassword: string
  ) => Promise<boolean>;
  onVerifyPress: (code: string) => Promise<boolean>;
  onSignInPress: (emailAddress: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isLoaded: isSignUpLoaded, signUp, setActive: setActiveSignUp } = useSignUp();
  const { isLoaded: isSignInLoaded, signIn, setActive: setActiveSignIn } = useSignIn();
  const { user: clerkUser } = useUser()
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingVerification, setPendingVerification] = React.useState(false);



  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (err) {
        console.error("Failed to load user data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

   // Handle the submission of the sign-in form
   const onSignInPress = async (emailAddress: string, password: string) => {
    if (!isSignInLoaded) return false;

    try {
      setLoading(true);
      setError(null);

      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActiveSignIn({ session: signInAttempt.createdSessionId })
        router.replace('/(tabs)')
        return true;
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
        return false;
      }
    } catch (err) {
      const errorMessage = err as ClerkError;
      alert(errorMessage.errors[0].message);
      setError(errorMessage.errors[0].message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  const onSignUpPress = async (
    emailAddress: string,
    password: string,
    confirmPassword: string
  ) => {
    if (!isSignUpLoaded) return false;

    try {
      setLoading(true);
      setError(null);

      if (!emailAddress || !password) {
        throw new Error("Email and password are required");
      }
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
      return true;
    } catch (err) {
      const errorMessage = err as ClerkError;
      alert(errorMessage.errors[0].message);
      setError(errorMessage.errors[0].message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async (code: string) => {
    if (!isSignUpLoaded) return false;

    try {
      setLoading(true);
      setError(null);

      if (!code) {
        throw new Error("Verification code is required");
      }

      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActiveSignUp({ session: signUpAttempt.createdSessionId });
        return true;
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        return false;
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      if (!user) return false;
      const updatedUser = { ...user, ...userData };
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      return true;
    } catch (err) {
      console.error("Failed to update profile:", err);
      return false;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);

      if (!email) throw new Error("Email is required");

      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Password reset failed";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        pendingVerification,
        onSignUpPress,
        onVerifyPress,
        onSignInPress,
        logout,
        updateProfile,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
