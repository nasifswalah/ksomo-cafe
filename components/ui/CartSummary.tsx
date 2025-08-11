import { Colors } from '@/constants/colors';
import { useCart } from '@/hooks/useCart';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CartSummary() {
  const { items, getTotal } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return null;
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = getTotal();

  const handlePress = () => {
    router.push('/(tabs)/cart');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="cart-outline"
              size={24}
              color={Colors.text.light}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          </View>
          <Text style={styles.itemsText}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </Text>
        </View>
        
        <View style={styles.rightSection}>
          <Text style={styles.totalText}>${total.toFixed(2)}</Text>
          <Text style={styles.viewCartText}>View Cart</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'web' ? 20 : 20,
    left: 16,
    right: 16,
    zIndex: 1000,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
    }),
  },
  button: {
    backgroundColor: Colors.primary.main,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    position: 'relative',
    marginRight: 12,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.text.light,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: Colors.primary.main,
    fontSize: 12,
    fontWeight: '600' as const,
    lineHeight: 16,
  },
  itemsText: {
    color: Colors.text.light,
    fontSize: 16,
    fontWeight: '500' as const,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  totalText: {
    color: Colors.text.light,
    fontSize: 18,
    fontWeight: '700' as const,
    marginBottom: 2,
  },
  viewCartText: {
    color: Colors.text.light,
    fontSize: 12,
    opacity: 0.9,
  },
});