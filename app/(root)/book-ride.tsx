import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import RideLayout from '@/components/RideLayout'
import { useDriverStore, useLocationStore } from '@/store'
import { icons } from '@/constants'
import CustomButton from '@/components/CustomButton'
import Payments from '@/components/Payments'
import { StripeProvider } from "@stripe/stripe-react-native";
import { useUser } from '@clerk/clerk-expo'

const BookRide = () => {

  const {drivers, selectedDriver} = useDriverStore()
  const {userAddress, destinationAddress} = useLocationStore()
  const {user} = useUser()

  const driverDetails = drivers.find(driver => driver.id === selectedDriver)

  const title = `${driverDetails?.first_name} ${driverDetails?.last_name}`

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!} // required for Stripe
      merchantIdentifier="merchant.uber.com" // required for Apple Pay
      urlScheme="myapp" // required for 3D Secure and bank redirects
    >
    <RideLayout title="Confirm Ride" snapPoints={["85%"]}>
      <View className="flex flex-1">
        <Text className="text-2xl font-JakartaBold">Ride Information</Text>

        <View className="border-[0.5px] w-full border-gray-200 mt-4" />

        <View className="flex flex-col w-full items-center justify-center mt-6">
          <Image
            source={{ uri: driverDetails?.profile_image_url }}
            resizeMode="cover"
            className="w-20 h-20 rounded-full items-center"
          />
          <View className="space-x-3 flex flex-row mt-2">
            <Text className="text-xl font-JakartaBold">{title}</Text>
            <View className="flex flex-row items-center space-x-1">
              <Image
                source={icons.star}
                resizeMode="contain"
                className="w-5 h-5"
              />
              <Text className="text-gray-600 text-base font-JakartaSemiBold">
                {driverDetails?.rating}
              </Text>
            </View>
          </View>
        </View>

        {/* ride price, pickup time, car seats view*/}
        <View className="flex flex-col mt-4 mb-3 bg-general-600 rounded-full">
          <View className="flex flex-row items-center justify-between px-3 py-4 bg-general-600 rounded-md border-b border-white">
            <Text className="text-lg font-JakartaMedium">Ride Price</Text>
            <Text className="text-green-500 text-lg font-JakartaSemiBold">
              {`$${parseInt(`${driverDetails?.price}`) || 60}`}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between px-3 py-4 bg-general-600 rounded-md border-b border-white">
            <Text className="text-lg font-JakartaMedium">Pickup Time</Text>
            <Text className=" text-lg font-JakartaSemiBold">
              {`${parseInt(`${driverDetails?.time}`) || 10} Min`}
            </Text>
          </View>

          <View className="flex flex-row items-center justify-between px-3 py-4 bg-general-600 rounded-md">
            <Text className="text-lg font-JakartaMedium">Car Seats</Text>
            <Text className="text-lg font-JakartaSemiBold">
              {`${driverDetails?.car_seats || 4}`}
            </Text>
          </View>
        </View>

        <View className="border-[0.5px] w-full border-gray-200 my-3" />

        <View className="flex flex-row py-1 items-center space-x-3 justify-start">
          <Image source={icons.to} resizeMode="contain" className="w-5 h-5 " />
          <Text
            numberOfLines={2}
            className="text-base capitalize text-ellipsis font-JakartaSemiBold "
          >
            {destinationAddress}
          </Text>
        </View>

        <View className="border-[0.5px] w-full border-gray-200 my-3" />

        <View className="flex flex-row py-1 items-center space-x-3 justify-start">
          <Image
            source={icons.point}
            resizeMode="contain"
            className="w-5 h-5 "
          />
          <Text
            numberOfLines={2}
            className="text-base capitalize text-ellipsis font-JakartaSemiBold "
          >
            {userAddress}
          </Text>
        </View>

        <View className="border-[0.5px] w-full border-gray-200 my-3" />

        <Payments 
          fullName={user?.fullName!}
          email={user?.emailAddresses[0].emailAddress!}
          amount={driverDetails?.price!}
          driverId={driverDetails?.id!}
          rideTime={driverDetails?.time!}
        />
      </View>
    </RideLayout>
    </StripeProvider>
  );
}

export default BookRide