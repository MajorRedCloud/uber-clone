import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  return (
    <SafeAreaView>
      <View className="h-screen items-center justify-center flex ">
        <Text className="text-red-400">General Kenobi haha</Text>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Home;
