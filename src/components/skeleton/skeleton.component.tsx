import { useEffect, useRef } from "react";
import React from "react";
import { Animated, StyleSheet } from "react-native";
import { theme } from "../../infrastructure/theme";
import { BorderRadiusType } from "../../infrastructure/theme/borderRadius";
interface SkeletonProps {
  width: string | number;
  height: string | number;
  borderRadius?: BorderRadiusType | null;
  isLoading: boolean;
}
export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius = 0,

  isLoading,
}) => {
  const opacity = useRef(new Animated.Value(0.2));
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 0.2,
          useNativeDriver: true,
          duration: 400,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.05,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.2,
          useNativeDriver: true,
          duration: 400,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          opacity: opacity.current,
          width: width,
          height: height,
          borderRadius: borderRadius ?? 0,
        },
        styles.skeleton,
      ]}
    />
  );
};
const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: theme.colors.ui.secondary,
  },
});
