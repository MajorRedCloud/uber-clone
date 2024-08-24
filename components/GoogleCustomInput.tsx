import { View, Text } from 'react-native'
import React from 'react'
import { GoogleInputProps } from '@/types/type'
import Map from './Map';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { Image } from 'react-native';
import { icons } from '@/constants';
import OlaMapsAutocomplete from './OlaMapsAutocomplete';

// const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleCustomInput = ({
    icon,
    initialLocation,
    containerStyle,
    textInputBackgroundColor,
    handlePress
} : GoogleInputProps) => {
  return (
    <>
      <View
        className={`flex flex-row items-center justify-center relative z-50 rounded-sm ${containerStyle} mb-5 mx-1 bg-white p-2 shadow-md shadow-[#d4d4d4]`}
      >
        {/* <GooglePlacesAutocomplete
          fetchDetails={true}
          placeholder="Where do you want to go?"
          debounce={400}
          styles={{
            textInputContainer: {
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              marginHorizontal: 20,
              position: "relative",
              shadowColor: "#d4d4d4",
            },
            textInput: {
              backgroundColor: textInputBackgroundColor || "white",
              fontSize: 16,
              marginTop: 5,
              width: "100%",
              borderRadius: 200,
              fontWeight: "600",
            },
            listView: {
              backgroundColor: textInputBackgroundColor || "white",
              position: "relative",
              top: 0,
              width: "100%",
              borderRadius: 20,
              shadowColor: "#d4d4d4",
              zIndex: 99,
            },
          }}
          onPress={(data, details = null) => {
            handlePress({
              latitude: details?.geometry.location.lat!,
              longitude: details?.geometry.location.lng!,
              address: data.description,
            });
          }}
          query={{
            key: googlePlacesApiKey,
            language: "en",
          }}
          renderLeftButton={() => (
            <View className='justify-center items-center w-6 h-6'>
              <Image 
                source={icon ? icon : icons.search}
                className="w-6 h-6"
                resizeMode='contain'
              />
            </View>
          )}
          textInputProps={{
            placeholderTextColor: 'gray',
            placeholder: initialLocation ?? 'Where do you want to go?',
          }}
          onFail={(error) => console.error(error)}
        /> */}

        <OlaMapsAutocomplete /* xx might not work correctly*/handlePress={handlePress}/>
      </View>

      <View>
        <Text className="text-xl font-JakartaBold mt-2 mb-3">
          Your current location
        </Text>

        <View className="flex flex-row flex-1 items-center bg-transparent h-[300px]">
          <Map />
        </View>
      </View>

      <Text className="text-xl font-JakartaBold mt-2 mb-3">Recent Rides</Text>
    </>
  );
}

export default GoogleCustomInput