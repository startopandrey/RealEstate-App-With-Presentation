import React from "react";
import styled, { useTheme, DefaultTheme } from "styled-components/native";

type SpacerProps = {
  position?: "top" | "bottom" | "left" | "right";
  size?: "small" | "medium" | "large" | "xl" | "xxl";
  key?: any;
  // theme?:
  children?: React.ReactElement | string | JSX.Element | JSX.Element[] | null;
};
const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
  xl: 4,
  xxl: 5,
};

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
};
interface GetVariantProps extends SpacerProps {
  theme: DefaultTheme;
}
const getVariant = ({ position, size, theme }: GetVariantProps): string => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = theme.space[sizeIndex];

  return `${property}:${value}`;
};

const SpacerView = styled.View`
  ${({ variant }: { variant: string }): string => variant};
`;

export const Spacer = ({
  position,
  size,
  children,
  key = "key",
}: SpacerProps) => {
  const theme = useTheme();
  const variant = getVariant({ position, size, theme });
  return (
    <SpacerView key={key} variant={variant}>
      {children}
    </SpacerView>
  );
};

Spacer.defaultProps = {
  position: "top",
  size: "small",
};
