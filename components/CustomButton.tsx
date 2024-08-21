import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant:ButtonProps['bgVariant']) => {
  switch (variant) {
    case "primary":
      return "bg-primary-500";
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    case "success":
      return "bg-green-500";
    default:
      return "bg-[#0286ff]";
  }
}

const getTextVariantStyle = (textVariant:ButtonProps['textVariant']) => {
  switch (textVariant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-500";
    default:
      return "text-white";
  }
}

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => {
  return (
  <TouchableOpacity onPress={onPress} className={` rounded-full p-3 flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`} {...props}>
    {IconLeft && <IconLeft />}
    <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>{title}</Text>
    {IconRight && <IconRight />}
  </TouchableOpacity>
)};

export default CustomButton;
