import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  runOnJS,


} from 'react-native-reanimated';
import React, { createContext, useState } from "react";
import { useColorScheme } from "nativewind";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const { colorScheme, setColorScheme } = useColorScheme();
  const [pressedArticle, setPressedArticle] = useState();
  const [cart, setCart] = useState([]);
  const [coffeeIsMaking, setCoffeeIsMaking] = useState(false);


  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));



  const animateToCart = () => {
    return new Promise<void>((resolve) => {
      scale.value = withSequence(
        withTiming(1.3, { duration: 600 }),
        withTiming(0.9, { duration: 400 }),
        withTiming(1, { duration: 400 })
      );

      setTimeout(() => {
        translateX.value = withTiming(150, { duration: 1200 });
        translateY.value = withTiming(-400, { duration: 1200 });
        opacity.value = withTiming(0, { duration: 1200 }, () => {
          scale.value = 1;
          translateX.value = 0;
          translateY.value = 0;
          opacity.value = 1;

          runOnJS(resolve)();
        });
      }, 1400);
    });
  };


  const cupStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
      opacity: opacity.value,
    };
  });


  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };


  const addToCart = (item: any) => {
    setCart((prev) => [...prev, item]);
  };


  const removeFromCart = (id: any) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const setSelectedItem = (item: any) => {
    setPressedArticle(item);
  };


  const makeCoffee = async () => {
    for (let i = 0; i < cart.length; i++) {
      for (let j = 0; j < cart[i].productQuantity; j++) {
        setPressedArticle(cart[i].selectedProduct);
        setCoffeeIsMaking(true);
        await sleep(5000);
        setCoffeeIsMaking(false);
        await sleep(200);
        await animateToCart();
      }
      removeFromCart(cart[i].id)
    }
    setCoffeeIsMaking(false);
    clearCart();
    setSelectedItem(null)

  };



  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        pressedArticle,
        setSelectedItem,
        makeCoffee,
        coffeeIsMaking,
        cupStyle
      }}
    >
      {children}
    </AppContext.Provider>
  );
}