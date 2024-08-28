import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { ReactNode, useRef } from 'react'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import { icons } from '@/constants'
import Map from './Map'
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const RideLayout = ({title, children, snapPoints}: {children: ReactNode, title?:string, snapPoints?:string[]}) => {

    const router = useRouter()
    const bottomSheetRef = useRef<BottomSheet>(null)

  return (
    <GestureHandlerRootView>

        <View className="flex-1 bg-white">
          <View className="flex flex-col flex-1 bg-blue-500">
            <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
              <TouchableOpacity onPress={() => router.back()}>
                <View className="w-10 h-10 bg-white rounded-full items-center justify-center">
                  <Image
                    source={icons.backArrow}
                    className="w-6 h-6"
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>

              <Text className="text-xl font-JakartaSemiBold ml-5">
                {title || "Go back"}
              </Text>
            </View>

            <Map />
          </View>

          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints || ["45%", "85%"]}
            index={0}
          >
            <BottomSheetView style={{ flex: 1, padding: 20 }}>
              {children}
            </BottomSheetView>
          </BottomSheet>
        </View>
        <StatusBar style="dark" />
    </GestureHandlerRootView>
  );
}

export default RideLayout