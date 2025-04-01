import { Stack } from "expo-router";
import './global.css'
import { StatusBar } from "react-native";
import { MovieProvider } from '@/utils/MovieContext'
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <>
    <MovieProvider>
      <StatusBar hidden />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false}} />
      </Stack>
    </MovieProvider>

    <Toast />
    </>
    
    
  )
}
