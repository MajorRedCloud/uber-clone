import React from 'react'
import { Redirect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
      <Redirect href="/(auth)/welcome" />
  )
}

export default index