import React, { useState } from 'react';
import { View, Text, StatusBar, Pressable, Image, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import "../styles/global.css"
import SunIcon from '../assets/icons/sun.svg'
import CartIcon from '../assets/icons/cart.svg'

const initialItems = [
  { key: '1', size: 's', name: 'Small', isPressed: false, price: '1$' },
  { key: '2', size: 'm', name: 'Medium', isPressed: false, price: '2$' },
  { key: '3', size: 'l', name: 'Large', isPressed: false, price: '3$' },
  { key: '4', size: 'xl', name: 'XLarge', isPressed: false, price: '4$' },
  { key: '5', size: 'xxl', name: 'Custom', isPressed: false, price: '5$' },

];

export default function RootLayout() {
  const [pressedArticle, setPressedArticle] = useState({});



  const handlePress = (item: React.SetStateAction<{}>) => {
    setPressedArticle(item);
  };

  return (
    <SafeAreaProvider >
      <SafeAreaView >
        <StatusBar
          animated={true}
          backgroundColor="#230e91"
          hidden={true}
        />
        <View className='bg-blue-600 min-h-[100%] flex flex-col'>
          <View className='bg-gray-200 min-h-[5%] shadow  flex-row justify-center items-center px-3 py-2' >

            <View className='flex-1 items-start' >
              <Pressable onPress={handlePress}>
                <SunIcon width={20} height={20} stroke="#facc15" ></SunIcon>
              </Pressable>
            </View>

            <View className='flex-1 items-center '>
              <Text className='text-xl font-bold'>Hello World!</Text>
            </View>

            <View className='flex-1 items-end' >
              <Pressable onPress={handlePress}>
                <CartIcon width={25} height={25} stroke="#facc15" ></CartIcon>
              </Pressable>
            </View>

          </View>

          <View className=' justify-center items-center max-h-[65%] bg-blue-400  ' >
            <Image
              source={require('../assets/images/machine-coffee.png')}
              className="rounded-xl shadow   w-full"
              resizeMode="contain"
            />
          </View>


          <View className='bg-gray-200 min-h-[30%]  max-h-[30%] shadow flex-col  px-3 py-2 justify-around' >

            <View className='flex-row  bg-yellow-300 justify-between' >
              <Text className='justify-start items-start font-extrabold '  >
                Size options
              </Text>

              <Text className='justify-end items-end text-2xl font-extrabold' >{pressedArticle.price}</Text>
              )


            </View>

            <View className='flex-row  items-center  justify-center   gap-x-2 bg-yellow-600' >
              {initialItems.map((element) => {
                const isPressed = pressedArticle.key == element.key;
                return (
                  <View className='flex-col'>

                    <View
                      key={element.key}
                      className={` p-4 rounded-full ${isPressed ? 'bg-yellow-400' : 'bg-gray-400'
                        }`}
                    >
                      <Pressable
                        onPress={() => handlePress(element)}
                      >
                        <CartIcon width={37} height={37} stroke="#facc15" />
                      </Pressable>
                    </View>

                    <View className=' items-center'>

                      <Text className='font-extrabold '  >
                        {element.name}
                      </Text>
                    </View>
                  </View>

                );
              })}




            </View>

            <View className=' bg-slate-600' >
              <View className='bg-black rounded-2xl min-w-[70%] px-2 py-2' >
                <Button
                  onPress={handlePress}
                  title="Learn More"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>

            </View>



          </View>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}
