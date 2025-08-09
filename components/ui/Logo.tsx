import Colors from "@/constants/colors";
import { KosmosIcon3 } from "@/constants/icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface LogoProps {
  size?: "small" | "medium" | "large";
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = "medium", showText = true }) => {
  const logoSize = {
    small: 40,
    medium: 80,
    large: 300,
  };

  const textSize = {
    small: 16,
    medium: 24,
    large: 32,
  };

  return (
    <View style={styles.container}>
      <Image
        source={KosmosIcon3}
        style={[
          { width: logoSize[size], height: logoSize[size] },
        ]}
      />
      {showText && (
        <View style={styles.textContainer}>
          <Text
            style={[styles.logoText, { fontSize: textSize[size] }]}
          >
            KOSMO
          </Text>
          <Text
            style={[styles.cafeText, { fontSize: textSize[size] * 0.5 }]}
          >
            • CAFE •
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 16,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 8,
  },
  logoText: {
    fontWeight: "bold",
    color: Colors.secondary.main,
    letterSpacing: 2,
  },
  cafeText: {
    color: Colors.secondary.main,
    letterSpacing: 1,
  },
});

export default Logo;