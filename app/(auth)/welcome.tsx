import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Swiper from 'react-native-swiper';
import { WelcomeArray } from '@/constants';
import CustomButton from '@/components/CustomButton';

const Welcome = () => {
  // eslint-disable-next-line
  const router = useRouter()

  const swiperRef = useRef<Swiper>(null)
  const [active, setActive] = useState(0)

  const isLastSlide = active === WelcomeArray.length - 1 

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        className="w-full flex justify-end
      items-end p-5"
      >
        <Text className="text-black text-lg font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActive(index)}
      >
        {WelcomeArray.map((item) => (
          <View key={item.id} className='flex items-center justify-center p-5'>
            <Image 
              source={item.image!}
              className="w-full h-[300px]"
              resizeMode='contain'
            />
            <View className='flex flex-row items-center justify-center w-full mt-10'>
              <Text className='text-black text-3xl font-bold mx-10 text-center'>
                {item.title}
              </Text>
            </View>

            <Text className='text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-5'>
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton 
      title={isLastSlide ? "Get Started" : "Next"} 
      className={'w-11/12 mt-10 mb-10'}
      onPress={() => isLastSlide ? router.replace('/(auth)/sign-up') : swiperRef.current?.scrollBy(1)}
      />

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

export default Welcome