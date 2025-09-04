import React, { useState } from 'react';
import { View, Text, StatusBar, Pressable, Image, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import "../styles/global.css"
import SunIcon from '../assets/icons/sun.svg'
import CartIcon from '../assets/icons/cart.svg'
import TrashIcon from '../assets/icons/trash.svg'
import AddIcon from '../assets/icons/add.svg'
import CoffeeCupIcon from '../assets/icons/coffeeCup.svg'

const initialItems = [
  { key: '1', size: 's', name: 'Small', isPressed: false, price: '1$', width: '26', height: '26' },
  { key: '2', size: 'm', name: 'Medium', isPressed: false, price: '2$', width: '34', height: '34' },
  { key: '3', size: 'l', name: 'Large', isPressed: false, price: '3$', width: '40', height: '40' },
  { key: '4', size: 'xl', name: 'XLarge', isPressed: false, price: '4$', width: '44', height: '44' },
  { key: '5', size: 'xxl', name: 'Custom', isPressed: false, price: '5$', width: '34', height: '34' },

];

export default function RootLayout() {
  const [pressedArticle, setPressedArticle] = useState({});
  const [productQuantity, setProductQuantity] = useState(0);
  const [makeCoffee, setMakeCoffee] = useState(false);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));




  const handlePress = (item: React.SetStateAction<{}>) => {
    setPressedArticle(item);
  };

  const addProductQuantity = () => {
    setProductQuantity(productQuantity + 1);
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
          backgroundColor="#230e91"
          hidden={true}
        />
        <View className='min-h-[100%] bg-white flex flex-col'>
          <View className='flex-row bg-gray-200 min-h-[5%] shadow  gap-x-32 px-3 py-2' >

            <View className=' items-start bg-red' >
              <Pressable onPress={handlePress}>
                <SunIcon width={20} height={20} stroke="#facc15" ></SunIcon>
              </Pressable>
            </View>

            <View className='items-center '>
              <Text className='text-xl font-bold'>Hello World!</Text>
            </View>

            <View className=' items-end' >
              <View className='flex-row items-end justify-end' >
                <View className='' >

                  <Pressable onPress={handlePress}>
                    <CartIcon width={25} height={25} stroke="#facc15" ></CartIcon>
                  </Pressable>
                </View>
                <View className='' >
                  {pressedArticle != null && (
                    <Text  >
                      1            </Text>
                  )}

                </View>
              </View>



            </View>

          </View>

          <View className=' justify-center items-center max-h-[65%]  ' >
            <Image
              source={require('../assets/images/machine-coffee.png')}
              className="rounded-xl shadow   w-full"
              resizeMode="contain"
            />
          </View>


          <View className=' min-h-[30%]  max-h-[30%] shadow flex-col  px-3 py-2 justify-around' >

            <View className='flex-row  justify-between' >
              <Text className='justify-start items-start font-bold text-black '  >
                Size options
              </Text>
              <Text className='justify-end items-end text-2xl font-extrabold text-black' >{pressedArticle.price}</Text>

            </View>

            <View className='flex-row  items-center  justify-center   gap-x-3 ' >
              {initialItems.map((element) => {
                const isPressed = pressedArticle?.key === element.key;
                return (
                  <View className='flex-col'>

                    <View
                      key={element.key}
                      className={`w-20 h-20 p-4 rounded-full items-center justify-center  ${isPressed ? 'bg-green-700' : ''
                        }`}
                    >
                      <Pressable className=' '
                        onPress={() => handlePress(element)}
                      >
                        <CoffeeCupIcon width={element.width} height={element.height} />
                      </Pressable>
                    </View>

                    <View className=' items-center'>

                      <Text className='font-bold text-black  '  >
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
                    <TrashIcon width={30} height={45} stroke="#" ></TrashIcon>
                  </Pressable>
                </View>

                <View className=' justify-center items-center ' >

                  <Text className='text-center text-xl' >
                    {productQuantity}            </Text>


                </View>
                <View className=' justify-center items-center' >
                  <Pressable onPress={addProductQuantity}>
                    <AddIcon width={30} height={45} stroke="#" ></AddIcon>
                  </Pressable>
                </View>


              </View>
              <View className=' min-w-[70%] max-w-[70%]  justify-center items-center' >
                <Pressable
                  onPress={startCoffeeMaking}
                  className={` w-full rounded-full justify-center items-center px-4 py-3 ${makeCoffee ? 'bg-coffee ' :'bg-green-700'
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
