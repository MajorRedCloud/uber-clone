import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list';
import { useUser } from '@clerk/clerk-expo';
import { useFetch } from '@/lib/fetch';
import { MarkerData, Ride } from '@/types/type';
import RideCard from '@/components/RideCard';
import { images } from '@/constants';

const History = () => {
    const { user } = useUser();
    const { data: recentRides, loading } = useFetch<Ride[]>(`/(api)/(ride)/${user?.id}`);

  return (
    <SafeAreaView>
      <View className='flex h-screen'>
        <FlashList
          data={recentRides as Ride[]}
          estimatedItemSize={250}
          renderItem={({ item }) => <RideCard item={item} />}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingBottom: 70,
            paddingTop: 20,
          }}
          ListEmptyComponent={() => (
            <View className="items-center justify-center">
              {!loading ? (
                <>
                  <Image
                    source={images.noResult}
                    className="w-40 h-40"
                    alt="No result found"
                    resizeMode="contain"
                  />
                  <Text className="text-sm font-JakartaMedium">
                    No recent rides found
                  </Text>
                </>
              ) : (
                <>
                  <View className="items-center justify-center h-screen">
                    <ActivityIndicator size="large" color="black" />
                    <Text className="mt-4 text-lg font-JakartaBold">
                      Loading
                    </Text>
                  </View>
                </>
              )}
            </View>
          )}
          ListHeaderComponent={() => (
            <>
              <Text className="text-2xl font-JakartaBold mb-3">All Rides</Text>
            </>
          )}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </SafeAreaView>
  );
}

export default History