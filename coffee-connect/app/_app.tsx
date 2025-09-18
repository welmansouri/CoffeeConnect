// app/_app.tsx
import { Slot } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '@/context/appContext';
export default function AppLayout() {
  return (
    <AppProvider>

      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </AppProvider>

  );
}
