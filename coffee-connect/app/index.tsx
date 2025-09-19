
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Pressable, Image, StyleSheet, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { useContext } from "react";
import { AppContext } from "@/context/appContext";
import "../styles/global.css"
import SunIcon from '../assets/icons/sun.svg'
import CartIcon from '../assets/icons/cart.svg'
import TrashIcon from '../assets/icons/trash.svg'
import AddIcon from '../assets/icons/add.svg'
import CoffeeCupIcon from '../assets/icons/coffeeCup.svg'
import DarkIcon from '../assets/icons/dark.svg'

const initialItems = [
  { key: '1', size: 's', name: 'Small', isPressed: false, price: '1', width: '22', height: '22', valToAdd: '100', valBottom: '110' },
  { key: '2', size: 'm', name: 'Medium', isPressed: false, price: '2', width: '30', height: '30', valToAdd: '100', valBottom: '110' },
  { key: '3', size: 'l', name: 'Large', isPressed: false, price: '3', width: '36', height: '36', valToAdd: '100', valBottom: '110' },
  { key: '4', size: 'xl', name: 'XLarge', isPressed: false, price: '4', width: '42', height: '42', valToAdd: '100', valBottom: '110' },
  { key: '5', size: 'xxl', name: 'Custom', isPressed: false, price: '5', width: '36', height: '36', valToAdd: '100', valBottom: '110' },
];

export default function RootApp() {
  const { theme, toggleTheme, cart, addToCart, pressedArticle, setSelectedItem, coffeeIsMaking, cupStyle } = useContext(AppContext);

  const progress = useSharedValue(0);
  const [productQuantity, setProductQuantity] = useState(0);

    useEffect(() => {
    if (coffeeIsMaking) {
      progress.value = 0;
      progress.value = withTiming(1, { duration: 5000 });
    } else {
      progress.value = 0;
    }
  }, [coffeeIsMaking]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 110}%`,
    };
  });


  const handlePress = (item: React.SetStateAction<{}>) => {
    console.log(theme)
    setSelectedItem(item);
  };


  const goToCartView = () => {
    console.log("pressed cart");
    router.push('/cart')
  };


  const addProductQuantity = () => {
    if (!coffeeIsMaking) {
      setProductQuantity(productQuantity + 1);
    }
  };

  const addToCartHandle = () => {
    if (!coffeeIsMaking) {
      let newProduct = { id: Date.now(), selectedProduct: pressedArticle, productQuantity: productQuantity }
      if (productQuantity > 0) {
        addToCart(newProduct);
      }
      console.log(cart)
      setProductQuantity(0)
    }
  };

  const removeProduct = () => {
    if (!coffeeIsMaking) {
      setProductQuantity(productQuantity > 1 ? productQuantity - 1 : 0);
    }
  };


  return (
    <SafeAreaProvider >
      <SafeAreaView >
        <StatusBar
          animated={true}
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
          backgroundColor={theme === "dark" ? "#0a0a0a" : "#f3f4f6"}
          hidden={true}
        />
        <View className='min-h-[95%]  bg-white text-black dark:bg-black dark:text-white flex flex-col'>
          <View className="flex-row items-center justify-between bg-gray-100  dark:bg-black min-h-[60px] px-3 py-2" style={{ minHeight: 60, zIndex: 50, elevation: 6 }}>
            <Pressable onPress={toggleTheme} hitSlop={10} className="p-2">
              {theme === 'light' ? <DarkIcon width={30} height={30} stroke="#000000" /> : <SunIcon width={30} height={30} stroke="#ffffff" />}

            </Pressable>

            <View className="flex-1 items-center">
              <Text className="text-xl font-bold dark:text-white text-black">Hello World!</Text>
            </View>
            <View className="flex-row items-center">
              <Pressable onPress={goToCartView} hitSlop={10} className="p-2 ">
                <CartIcon width={30} height={30} stroke={theme === "dark" ? "#ffffff" : "#000000"} />
              </Pressable>
              <Text className="ml-1 dark:text-white text-black">{cart.length}</Text>
            </View>
          </View>
          <View className=' justify-center items-center max-h-[60%] min-h-[60%] w-full ' >
            <Image
              source={
                coffeeIsMaking
                  ? require('../assets/images/machine-making-coffee.png')
                  : require('../assets/images/machine-coffee.png')
              }
              className="rounded-xl shadow   w-full z-0"
              resizeMode="contain"
            />
            {pressedArticle && (
              <Animated.Image
                source={require("../assets/images/coffe-cup.png")}
                className="absolute z-50"
                style={[
                  {
                    width: Number(pressedArticle?.width) + Number(pressedArticle?.valToAdd),
                    height: Number(pressedArticle?.height) + Number(pressedArticle?.valToAdd),
                    bottom: Number(pressedArticle?.valBottom),
                  },
                  cupStyle,
                ]}
                resizeMode="contain"
              />
            )}


          </View>


          <View className=' min-h-[30%]  max-h-[30%] shadow flex-col  px-3 py-2 justify-around' >

            <View className='flex-row  justify-between' >
              <Text className='justify-start items-start font-bold text-black dark:text-white '  >
                Size options
              </Text>
              <Text className='justify-end items-end text-2xl font-extrabold text-black dark:text-white' >{pressedArticle?.price} $</Text>

            </View>

            <View className='flex-row  items-center  justify-center   gap-x-3 ' >
              {initialItems.map((element) => {
                const isPressed = pressedArticle?.key === element.key;
                return (
                  <View key={element.key} className='flex-col'>

                    <View
                      key={element.key}
                      className={`w-20 h-20 p-4 rounded-full items-center justify-center  ${isPressed ? 'bg-green-700' : ''
                        }`}
                    >
                      <Pressable className=' '
                        onPress={() => !coffeeIsMaking ? handlePress(element) : console.log('imp')}
                      >

                        <CoffeeCupIcon
                          width={element.width}
                          height={element.height}
                          stroke={theme === "light" ? "#000000" : "#ffffff"}
                        />
                      </Pressable>
                    </View>

                    <View className=' items-center'>

                      <Text className='font-bold text-black  dark:text-white '  >
                        {element.name}
                      </Text>
                    </View>
                  </View>

                );
              })}




            </View>

            <View className='flex-row  justify-between ' >
              <View className='flex-1 max-w-[25%]  min-w-[25%] flex-row  px-5 justify-center items-center' >
                <View className=' justify-center items-center' >
                  <Pressable onPress={removeProduct}>
                    <TrashIcon width={30} height={45} stroke={theme === "light" ? "#000000" : "#ffffff"} ></TrashIcon>
                  </Pressable>
                </View>

                <View className=' justify-center items-center ' >

                  <Text className='text-center text-black text-xl dark:text-white ' >
                    {productQuantity}            </Text>


                </View>
                <View className=' justify-center items-center' >
                  <Pressable onPress={addProductQuantity}>
                    <AddIcon width={30} height={45} stroke={theme === "light" ? "#000000" : "#ffffff"}></AddIcon>
                  </Pressable>
                </View>



              </View>
              <View className=' min-w-[70%] max-w-[70%]  justify-center items-center' >
                <Pressable
                  onPress={addToCartHandle}
                  className={` w-full rounded-full justify-center items-center px-4 py-3 ${coffeeIsMaking ? '' : ' bg-green-700'
                    }`}>
                  {coffeeIsMaking && (<Animated.View
                    style={[
                      {
                        ...StyleSheet.absoluteFillObject,
                      },
                      animatedStyle,
                    ]}
                    className="rounded-3xl bg-coffee "
                  />)}
                  <Text className="text-white font-semibold text-base   ">            {coffeeIsMaking ? 'Brewing...' : 'Add to Cart'}
                  </Text>
                </Pressable>
                <View style={{ height: 10, backgroundColor: "brown", borderRadius: 5, overflow: "hidden", marginVertical: 10 }}>
                </View>
              </View>

            </View>



          </View>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}
