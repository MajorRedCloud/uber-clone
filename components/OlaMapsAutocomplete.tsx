import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchPredictions } from '@/lib/fetch'
import { OlaInputProps, Prediction } from '@/types/type'
import { icons, randomize } from '@/constants'

const OlaMapsAutocomplete = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  isHome,
  handlePress,
}: OlaInputProps) => {
  const [query, setQuery] = useState(initialLocation || '');
  const [predictions, setPredictions] = useState([]);

  // for test
  const latitude = 22.724843;
  const longitude = 75.921226;
  const radius = 100000;

  useEffect(() => {
    if (query.length < 3) {
      setPredictions([]);
      return;
    }

    const fetchData = async () => {
      const response = await fetchPredictions({
        query,
        latitude,
        longitude,
        radius,
      });
      if (response) {
        setPredictions(response.predictions);
      }
    };

    fetchData();
  }, [query]);

  return (
    <View className={`flex flex-1 relative ${containerStyle} justify-center`}>
      <Image
        source={icon ? icon : icons.search}
        className="w-6 h-6 absolute left-2 top-2 transform"
        resizeMode="contain"
      />
      <View className="flex flex-1 align-center justify-center rounded-xl mx-4 relative">
        <TextInput
          className="flex-1 text-[14px] w-full font-JakartaSemiBold my-1 ml-6 "
          placeholder="Where do you want to go?"
          value={query}
          onChangeText={(value) => setQuery(value)}
        />

        {predictions.length > 0 && (
          <FlatList
            data={predictions}
            keyExtractor={(item: Prediction) => randomize(item.place_id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={(data, details = null) => {
                  handlePress({
                    latitude: item?.geometry.location.lat!,
                    longitude: item?.geometry.location.lng!,
                    address: item.description,
                  });
                }}
              >
                <View className="flex flex-1 p-2 flex-row items-center">
                  <Image
                    source={icons.point}
                    className="w-6 h-6"
                    resizeMode="contain"
                  />
                  <View className="flex-1 space-y-1 ml-4">
                    <Text className="font-JakartaBold text-base">
                      {item.structured_formatting.main_text}
                    </Text>
                    <Text
                      className="text-gray-400 text-ellipsis whitespace-nowrap overflow-hidden "
                      numberOfLines={1}
                    >
                      {item.structured_formatting.secondary_text}
                    </Text>
                  </View>
                </View>
                <View className="border-[0.5px] border-gray-300" />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default OlaMapsAutocomplete