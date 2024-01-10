import { DimensionValue, Image } from "react-native";

export default function CustomImage({
  uri,
  size,
  height,
  width,
}: {
  uri: string;
  size?: DimensionValue;
  height?: DimensionValue;
  width?: DimensionValue;
}) {
  if (!size && !width && !height) {
    throw new Error("Custom Image need size, height or width");
  }
  return (
    <Image
      source={{ uri: uri }}
      style={{ width: width ?? size, height: height ?? size }}
    ></Image>
  );
}
