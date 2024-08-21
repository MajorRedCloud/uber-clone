import { View, Text, Image } from "react-native";
import React, { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

    const [form, setForm] = useState({
      email: "",
      password: "",
    });

const onSignIn = useCallback(async () => {
  if (!isLoaded) {
    return;
  }

  try {
    const signInAttempt = await signIn.create({
      identifier: form.email,
      password: form.password,
    });

    if (signInAttempt.status === "complete") {
      await setActive({ session: signInAttempt.createdSessionId });
      router.replace("/(root)/(tabs)/home");
    } else {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(signInAttempt, null, 2));
    }
  } catch (err: any) {
    console.error(JSON.stringify(err, null, 2));
  }
}, [isLoaded, form.email, form.password]);


  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome to Uber
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Email Address"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter Password"
            icon={icons.eyecross}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            secureTextEntry={true}
          />
          <CustomButton
            title="Log In"
            onPress={() => {
              onSignIn();
            }}
            className="mt-7"
          />

          <OAuth />

          <Link
            href="/sign-up"
            className="text-lg text-center text-general-200 mt-4"
          >
            <Text>
              Don't Have an account?{" "}
              <Text className="text-primary-500">Sign Up</Text>
            </Text>
          </Link>

          {/* xx verification model */}
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
