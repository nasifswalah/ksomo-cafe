import Colors from "@/constants/colors";
import { useCart } from "@/hooks/useCart";
import { MenuItem as MenuItemType } from "@/types/menu";
import Feather from '@expo/vector-icons/Feather';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item, 1);
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handleAddToCart}
      testID={`menu-item-${item.id}`}
    >
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price.toFixed(1)}</Text>
        {item.description && (
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        )}
      </View>
      <View style={styles.rightContent}>
        {/* {item.image && (
          <Image 
            source={{ uri: item.image }} 
            style={styles.image} 
            resizeMode="cover"
          />
        )} */}
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddToCart}
          testID={`add-to-cart-${item.id}`}
        >
          <Feather name="plus-circle" size={24} color={Colors.primary.main} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: Colors.background.paper,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  rightContent: {
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  addButton: {
    padding: 4,
  },
});

export default MenuItem;