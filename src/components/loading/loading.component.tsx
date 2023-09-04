import { BlurView } from "expo-blur";
import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { Animated } from "react-native";
import { theme } from "../../infrastructure/theme";
import styled from "styled-components/native";
import LottieView from "lottie-react-native";

const LoadingWrapper = styled.View`
  width: 160px;
  height: 160px;
  z-index: 9999;
`;
export const Loading: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  const animatedValue = useRef(new Animated.Value(0));

  useEffect(() => {
    if (isOpen) {
      Animated.spring(animatedValue.current, {
        toValue: 0.8,
        // duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue.current, {
        toValue: 0,
        // duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [animatedValue, isOpen]);
  if (!isOpen) {
    return;
  }
  const zIndexAnim = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [-1, 9],
  });
  const blurAnim = animatedValue.current.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 0],
  });

  return (
    <AnimatedBlurView
      intensity={blurAnim}
      style={[
        StyleSheet.absoluteFillObject,
        {
          zIndex: zIndexAnim,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity: animatedValue.current,
            zIndex: zIndexAnim,
            backgroundColor: theme.colors.ui.primary,
          },
        ]}
      />
      <LoadingWrapper>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../assets/loadingAnimation.json")}
        />
      </LoadingWrapper>
    </AnimatedBlurView>
  );
};
