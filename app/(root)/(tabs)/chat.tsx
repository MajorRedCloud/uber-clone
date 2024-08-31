import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'

const chat = () => {
  return (
    <SafeAreaView className="flex flex-1 mb-28">
      <Text className="text-2xl m-5 font-JakartaBold">Chat List</Text>

      <View className=" flex flex-1 items-center justify-center ">
        <Image
          source={images.message}
          className="h-60 w-60"
          resizeMode="contain"
        />
        <Text className="text-center font-JakartaBold text-3xl">
          No Messages Yet
        </Text>
        <Text className="text-center font-JakartaMedium text-lg text-gray-400 mt-2">
          No messages in your inbox yet.
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default chat