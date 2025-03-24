import { useState } from "react";
import { DimensionValue, Image, View } from "react-native";
import LoadingText from "../text/LoadingText";

export default function CustomImage({
  uri,
  size,
  height,
  width,
  onError,
  minimizeOnError,
  noSkeletonOnLoading,
}: {
  uri: string;
  size?: DimensionValue;
  height?: DimensionValue;
  width?: DimensionValue;
  onError?: () => void;
  minimizeOnError?: boolean;
  noSkeletonOnLoading?: boolean;
}) {
  if (!size && !width && !height) {
    throw new Error("Custom Image need size or height and width");
  }

  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <View
        style={[
          {
            width: hasError && minimizeOnError ? 0 : width ?? size,
            height: hasError && minimizeOnError ? 0 : height ?? size,
          },
        ]}
      >
        <Image
          source={{ uri: uri }}
          style={{
            width: "100%",
            height: "100%",
          }}
          onError={() => {
            onError && onError();
            setHasError(true);
            setIsLoaded(true);
          }}
          onLoadEnd={() => {
            setIsLoaded(true);
          }}
        ></Image>
        {!isLoaded && !noSkeletonOnLoading && (
          <LoadingText
            viewContainerStyle={[
              {
                position: "absolute",
                top: 0,
                left: 0,
                width: width ?? size,
                height: height ?? size,
              },
            ]}
            width={width ?? size}
            height={width ?? size}
          ></LoadingText>
        )}
      </View>
    </>
  );
}
