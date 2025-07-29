import { View, Text, StatusBar, Pressable, GestureResponderEvent } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import "../styles/global.css"
import SunIcon from '../assets/icons/sun.svg'
import CartIcon from '../assets/icons/cart.svg'


export default function RootLayout() {


  const handlePress = () => {


  };
  return (
    <SafeAreaProvider>
      <SafeAreaView >
        <StatusBar
          animated={true}
          // backgroundColor="#61dafb"
          hidden={true}
        />
        <View className='bg-gray-200 h-1/4 shadow flex-row justify-center items-center px-3 py-2' >

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

      </SafeAreaView>
    </SafeAreaProvider>
  );
}
