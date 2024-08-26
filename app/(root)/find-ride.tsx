import { View, Text } from 'react-native'
import React from 'react'
import { useLocationStore } from '@/store'
import RideLayout from '@/components/RideLayout'
import OlaMapsAutocomplete from '@/components/OlaMapsAutocomplete'
import { icons } from '@/constants'
import GoogleCustomInput from '@/components/GoogleCustomInput'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'

const FindRide = () => {

    const { userAddress, destinationAddress, setDestinationLocation, setUserLocation } = useLocationStore()

  return (
    <RideLayout title="Ride">
      <View>
        <View >
        <Text className="text-xl font-JakartaSemiBold mb-3">From</Text>
          <GoogleCustomInput
            isHome={false}
            icon={icons.target}
            initialLocation={userAddress!}
            containerStyle="bg-neutral-100 rounded-full"
            textInputBackgroundColor="#f5f5f5"
            handlePress={(location) => setUserLocation(location)}
          />
        </View>
        <View className='mb-6'>
            <Text className="text-xl font-JakartaSemiBold mb-3 mt-5">To</Text>
          <GoogleCustomInput
            isHome={false}
            icon={icons.map}
            initialLocation={destinationAddress!}
            containerStyle="bg-neutral-100 rounded-full"
            textInputBackgroundColor="transparent"
            handlePress={(location) => setDestinationLocation(location)}
          />
        </View>

        <CustomButton title='Find Now' onPressOut={() => router.push('/(root)/confirm-ride')} className='mt-2'/>

      </View>
    </RideLayout>
  );
}

export default FindRide