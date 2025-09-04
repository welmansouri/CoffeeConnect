import React, { useState } from 'react';
import { View, Text, StatusBar, Pressable, Image, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useColorScheme } from "nativewind";

import 'react-native-reanimated';
import "../styles/global.css"
import SunIcon from '../assets/icons/sun.svg'
import CartIcon from '../assets/icons/cart.svg'
import TrashIcon from '../assets/icons/trash.svg'
import AddIcon from '../assets/icons/add.svg'
import CoffeeCupIcon from '../assets/icons/coffeeCup.svg'
import DarkIcon from '../assets/icons/dark.svg'

const initialItems = [
  { key: '1', size: 's', name: 'Small', isPressed: false, price: '1$', width: '26', height: '26' },
  { key: '2', size: 'm', name: 'Medium', isPressed: false, price: '2$', width: '34', height: '34' },
  { key: '3', size: 'l', name: 'Large', isPressed: false, price: '3$', width: '40', height: '40' },
  { key: '4', size: 'xl', name: 'XLarge', isPressed: false, price: '4$', width: '44', height: '44' },
  { key: '5', size: 'xxl', name: 'Custom', isPressed: false, price: '5$', width: '34', height: '34' },

];

export default function RootApp() {
  const [pressedArticle, setPressedArticle] = useState({});
  type CartItem = {
    selectedProduct: any;
    productQuantity: number;
  };
  const [myCart, setMyCart] = useState<CartItem[]>([]);

  const [productQuantity, setProductQuantity] = useState(0);
  const [makeCoffee, setMakeCoffee] = useState(false);
  const { colorScheme, setColorScheme } = useColorScheme();


  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


  const handlePress = (item: React.SetStateAction<{}>) => {
    setPressedArticle(item);
  };

  const toggleTheme = () => {
    console.log('hereeee')
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  const goToCartView = () => {
    console.log("pressed cart");

    router.push('/cart')
  };

  const addProductQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };

  const addToCart = () => {
    let newProduct = { selectedProduct: pressedArticle, productQuantity: productQuantity }
    if (productQuantity > 0) {
      setMyCart([...myCart, newProduct]);
    }
    setProductQuantity(0)
  };

  const removeProduct = () => {
    setProductQuantity(productQuantity > 1 ? productQuantity - 1 : 0);
  };

  const startCoffeeMaking = async () => {
    setMakeCoffee(true);
    await sleep(5000); // 3 secondes de simulation
    setMakeCoffee(false);
  };

  return (
    <SafeAreaProvider >
      <SafeAreaView >
        <StatusBar
          animated={true}
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
          backgroundColor={colorScheme === "dark" ? "#0a0a0a" : "#f3f4f6"}
          hidden={true}
        />
        <View className='min-h-[100%]  bg-white text-black dark:bg-black dark:text-white flex flex-col'>
          <View className="flex-row items-center justify-between bg-gray-100  dark:bg-black min-h-[60px] px-3 py-2" style={{ minHeight: 60, zIndex: 50, elevation: 6 }}>
            <Pressable onPress={toggleTheme} hitSlop={10} className="p-2">
              {colorScheme === 'dark' ? <DarkIcon width={30} height={30} stroke="#ffffff" /> : <SunIcon width={30} height={30} stroke="#000000" />}

            </Pressable>

            <View className="flex-1 items-center">
              <Text className="text-xl font-bold dark:text-white text-black">Hello World!</Text>
            </View>

            <View className="flex-row items-center">
              <Pressable onPress={goToCartView} hitSlop={10} className="p-2 ">
                <CartIcon width={30} height={30} stroke={colorScheme === "dark" ? "#ffffff" : "#000000"} />
              </Pressable>
              <Text className="ml-1 dark:text-white text-black">{myCart.length}</Text>
            </View>
          </View>
          <View className=' justify-center items-center max-h-[60%]  ' >
            <Image
              source={require('../assets/images/machine-coffee.png')}
              className="rounded-xl shadow   w-full"
              resizeMode="contain"
            />
          </View>


          <View className=' min-h-[30%]  max-h-[30%] shadow flex-col  px-3 py-2 justify-around' >

            <View className='flex-row  justify-between' >
              <Text className='justify-start items-start font-bold text-black dark:text-white '  >
                Size options
              </Text>
              <Text className='justify-end items-end text-2xl font-extrabold text-black dark:text-white' >{pressedArticle.price}</Text>

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
                        onPress={() => handlePress(element)}
                      >
                        <CoffeeCupIcon width={element.width} height={element.height} stroke={colorScheme === "dark" ? "#ffffff" : "#000000"} />
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
                    <TrashIcon width={30} height={45} stroke={colorScheme === "dark" ? "#ffffff" : "#000000"}  ></TrashIcon>
                  </Pressable>
                </View>

                <View className=' justify-center items-center ' >

                  <Text className='text-center text-black text-xl dark:text-white ' >
                    {productQuantity}            </Text>


                </View>
                <View className=' justify-center items-center' >
                  <Pressable onPress={addProductQuantity}>
                    <AddIcon width={30} height={45} stroke={colorScheme === "dark" ? "#ffffff" : "#000000"} ></AddIcon>
                  </Pressable>
                </View>


              </View>
              <View className=' min-w-[70%] max-w-[70%]  justify-center items-center' >
                <Pressable
                  onPress={addToCart}
                  className={` w-full rounded-full justify-center items-center px-4 py-3 ${makeCoffee ? 'bg-coffee ' : 'bg-green-700'
                    }`}>
                  <Text className="text-white font-semibold text-base   ">            {makeCoffee ? 'Brewing...' : 'Tap to fill'}
                  </Text>
                </Pressable>


              </View>

            </View>



          </View>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}
