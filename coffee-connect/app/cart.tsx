import { View, Text, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const initialCart: CartItem[] = [
  { id: '1', name: 'Latte', price: 3.5, quantity: 2 },
  { id: '2', name: 'Cappuccino', price: 4, quantity: 1 },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(initialCart);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }: { item: CartItem }) => (
    <View className="flex-row justify-between px-4 py-2 border-b border-gray-200">
      <Text className="text-base font-medium">{item.name} x{item.quantity}</Text>
      <Text className="text-base font-bold">{(item.price * item.quantity).toFixed(2)} €</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <Text className="text-2xl font-bold text-center mt-6">🛒 Your Cart</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        className="mt-4"
      />

      <View className="border-t border-gray-300 px-4 py-3">
        <View className="flex-row justify-between mb-4">
          <Text className="text-lg font-semibold">Total</Text>
          <Text className="text-lg font-bold">{total.toFixed(2)} €</Text>
        </View>

        <Pressable className="bg-green-700 py-3 rounded-full items-center">
          <Text className="text-white font-semibold text-base">Commander</Text>
        </Pressable>
      </View>
    </View>
  );
}
