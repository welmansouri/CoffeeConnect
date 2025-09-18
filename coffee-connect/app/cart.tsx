import { FlatList, } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, StatusBar, Pressable, Image, StyleSheet, Button } from 'react-native';
import { router } from 'expo-router';
import { useContext } from "react";
import { AppContext } from "@/context/appContext";
import "../styles/global.css"
import SunIcon from '../assets/icons/sun.svg'
import HomeIcon from '../assets/icons/home.svg'
import TrashIcon from '../assets/icons/trash.svg'
import AddIcon from '../assets/icons/add.svg'
import CoffeeCupIcon from '../assets/icons/coffeeCup.svg'
import DarkIcon from '../assets/icons/dark.svg'
type CartItem = {
  id: number;
  selectedProduct: any;
  productQuantity: number;
};



export default function CartScreen() {
  const { theme, toggleTheme, cart,removeFromCart,makeCoffee } = useContext(AppContext);


  const total = cart.reduce(
    (sum, item) => sum + item.selectedProduct.price * item.productQuantity,
    0
  );

  const  makeCoffeeAndGoToHome = () => {
    router.push('/')
    makeCoffee()
  };

  const goToHomeView = () =>{
    router.push('/')
  }
  const renderItem = ({ item }: { item: CartItem }) => (
    <View className="flex-row justify-between px-4 py-2 border-b border-gray-200">
      <Text className="text-base font-medium dark:text-white">{item.selectedProduct.name} x{item.productQuantity}</Text>
      <View className='flex-row justify-center items-center'>
      <Text className="text-base font-bold dark:text-white">{(item.selectedProduct.price * item.productQuantity).toFixed(2)} $</Text>
      <Pressable onPress={() => removeFromCart(item.id)}  hitSlop={10} className="p-2 ">
        <TrashIcon width={30} height={30} stroke={theme === "light" ? "#ffffff" : "#000000"} />
      </Pressable>
      </View>
    </View>
  );

  return (

    <SafeAreaProvider >
      <SafeAreaView >
        <StatusBar
          animated={true}
          backgroundColor={"#0a0a0a"}
          hidden={true}
        />
        <View className='min-h-[100%]  bg-white text-black dark:bg-black dark:text-white flex flex-col'>
          <View className="flex-row items-center justify-between bg-gray-100  dark:bg-black min-h-[60px] px-3 py-2" style={{ minHeight: 60, zIndex: 50, elevation: 6 }}>
            <Pressable onPress={toggleTheme} hitSlop={10} className="p-2">
              {theme === 'light' ? <SunIcon width={30} height={30} stroke="#ffffff" /> : <DarkIcon width={30} height={30} stroke="#000000" />}

            </Pressable>

            <View className="flex-1 items-center">
              <Text className="text-xl font-bold dark:text-white text-black">Your cart</Text>
            </View>
            <View className="flex-row items-center">
              <Pressable onPress={goToHomeView} hitSlop={10} className="p-2 ">
                <HomeIcon width={30} height={30} stroke={theme === "light" ? "#ffffff" : "#000000"} />
              </Pressable>
            </View>
          </View>


          <View className=' min-h-[80%]  max-h-[80%] shadow flex-col  px-3 py-2 justify-around' >


            <FlatList
              data={cart}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              className="mt-4 dark:text-white"
            />
            <View className="border-t border-gray-300 px-4 py-3">
              <View className="flex-row justify-between mb-4">
                <Text className="text-lg font-semibold dark:text-white">Total</Text>
                <Text className="text-lg font-bold dark:text-white">{total.toFixed(2)} €</Text>
              </View>

              <Pressable className="w-full rounded-full justify-center items-center px-4 py-3 bg-green-700 " onPress={makeCoffeeAndGoToHome}>
                <Text className="text-white font-semibold text-base">Commander</Text>
              </Pressable>
            </View>
          </View>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}
