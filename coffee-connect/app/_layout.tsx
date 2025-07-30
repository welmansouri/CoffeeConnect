import { View, Text, StatusBar, Pressable, Image, Button } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import "../styles/global.css"
import SunIcon from '../assets/icons/sun.svg'
import CartIcon from '../assets/icons/cart.svg'


export default function RootLayout() {


  const handlePress = () => {


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

          <View className=' justify-center items-center max-h-[65%] bg-yellow-400  ' >
            <Image
              source={require('../assets/images/machine-coffee.png')}
              className="rounded-xl shadow   w-full"
              resizeMode="contain"
            />
          </View>


          <View className='bg-gray-200 min-h-[30%]  shadow flex-col  items-center px-3 py-2 justify-between' >

            <View className='' >
              <View className='justify-end items-end float-end' >
               <Text >
            helloi
          </Text>
              </View>

            </View>

            <View className='flex-row ' >
              <View className='flex-1 items-end' >
                <Pressable onPress={handlePress}>
                  <CartIcon width={25} height={25} stroke="#facc15" ></CartIcon>
                </Pressable>
              </View>
              <View className='flex-1 items-end' >
                <Pressable onPress={handlePress}>
                  <CartIcon width={25} height={25} stroke="#facc15" ></CartIcon>
                </Pressable>
              </View>
              <View className='flex-1 items-end' >
                <Pressable onPress={handlePress}>
                  <CartIcon width={25} height={25} stroke="#facc15" ></CartIcon>
                </Pressable>
              </View>
              <View className='flex-1 items-end' >
                <Pressable onPress={handlePress}>
                  <CartIcon width={25} height={25} stroke="#facc15" ></CartIcon>
                </Pressable>
              </View>
            </View>

            <View className='' >
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
