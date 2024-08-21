import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'
import { icons } from '@/constants'

const OAuth = () => {

    const handleGoogleSignIn = async () => {

    }

  return (
    <View>
        <View className='flex flex-row justify-center items-center mt-4 gap-x-3' >
        <View className='flex-1 h-[1px] bg-general-100'/>
        <Text className='text-lg'>or</Text>
        <View className='flex-1 h-[1px] bg-general-100'/>
        </View>

        <CustomButton 
        title='Log in with Google'
        className='mt-5 w-full shadow-none '
        IconLeft={() => {
            return(
            <Image source={icons.google} className='w-5 h-5 mx-3 justify-center items-cente' resizeMode='contain'/>
            )
        }}
        bgVariant='outline'
        textVariant='primary'
        onPress={handleGoogleSignIn}
        />
    </View>

  )
}

export default OAuth