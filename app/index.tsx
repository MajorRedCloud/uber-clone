import React from 'react'
import { Redirect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@clerk/clerk-expo';

const Index = () => {
  const { isSignedIn } = useAuth();
  console.log(isSignedIn)

  if (isSignedIn) {
    return <Redirect href={"/(root)/(tabs)/home"} />;
  }
  return (
      <Redirect href="/(auth)/welcome"/>
  )
}

export default Index