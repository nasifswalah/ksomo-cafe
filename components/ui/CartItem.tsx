import Colors from "@/constants/colors";
import { useCart } from "@/hooks/useCart";
import { CartItem as CartItemType } from "@/types/menu";
import { Octicons } from "@expo/vector-icons";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.item.id, item.quantity - 1);
    } else {
      removeFromCart(item.item.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.item.id);
  };

  return (
    <View style={styles.container} testID={`cart-item-${item.item.id}`}>
      <View style={styles.imageContainer}>
        {item.item.image ? (
          <Image 
            source={{ uri: item.item.image }} 
            style={styles.image} 
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{item.item.name}</Text>
        <Text style={styles.price}>₹{item.item.price.toFixed(1)}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={handleDecrement}
            testID={`decrement-${item.item.id}`}
          >
            <FontAwesome6 name="minus" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{item.quantity}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={handleIncrement}
            testID={`increment-${item.item.id}`}
          >
            <FontAwesome6 name="plus" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.rightContent}>
        <Text style={styles.totalPrice}>
          ₹{(item.item.price * item.quantity).toFixed(1)}
        </Text>
        
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={handleRemove}
          testID={`remove-${item.item.id}`}
        >
          <Octicons name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: Colors.background.paper,
  },
  imageContainer: {
    marginRight: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: Colors.divider,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  price: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.divider,
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    fontSize: 14,
    fontWeight: "600",
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: "center",
  },
  rightContent: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text.primary,
  },
  removeButton: {
    padding: 4,
  },
});

export default CartItem;