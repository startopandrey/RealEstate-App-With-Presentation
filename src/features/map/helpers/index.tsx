import { OUTER_CARD_WIDTH } from "../../../utils/constants";
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import React from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from "react-native-reanimated";
import { theme } from "../../../infrastructure/theme";
import { BlurView } from "expo-blur";
import { RefObject, useMemo } from "react";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
export const onScroll = (
  event,
  mapIndex,
  _map,
  apartmentsDisplayed,
  latDelta
) => {
  const xDistance = event.nativeEvent.contentOffset.x;
  if (xDistance % OUTER_CARD_WIDTH === 0) {
    // When scroll ends
    const index = xDistance / OUTER_CARD_WIDTH;
    if (mapIndex.current === index) {
      return;
    }

    mapIndex.current = index;
    const coordinate =
      apartmentsDisplayed[index] && apartmentsDisplayed[index].geometry;

    setTimeout(
      () =>
        _map.current?.animateToRegion(
          {
            latitude: coordinate.location.lat,
            longitude: coordinate.location.lng,
            latitudeDelta: latDelta,
            longitudeDelta: 0.01,
          },
          350
        ),
      10
    );
  }
};
interface CustomBackdropProps extends BottomSheetBackdropProps {
  bottomSheetRef: RefObject<BottomSheetMethods>;
}
export const CustomBackdrop = ({
  animatedIndex,
  style,
  bottomSheetRef,
}: CustomBackdropProps) => {
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

  const animatedProps = useAnimatedProps(() => {
    const intensity = interpolate(
      animatedIndex.value + 1,
      [0, 0, 60],
      [0, 0, 60],
      Extrapolate.CLAMP
    );

    return {
      intensity: 30 * intensity,
    };
  });
  // animated variables

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value + 1,
      [0, 0.5],
      [0, 0.5],
      Extrapolate.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: theme.colors.ui.primary,
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return (
    <AnimatedBlurView
      style={[StyleSheet.absoluteFillObject, {}]}
      //blurAmount={ 100}

      onTouchStart={() => bottomSheetRef.current?.close()}
      tint="dark"
      animatedProps={animatedProps}
    >
      <Animated.View style={containerStyle} />
    </AnimatedBlurView>
  );
};
