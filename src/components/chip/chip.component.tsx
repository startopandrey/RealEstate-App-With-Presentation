import styled from "styled-components/native";
import { Text } from "../typography/text.component";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../spacer/spacer.component";

const ChipView = styled.TouchableOpacity<{
  size: "medium" | "large";
  isSelected: boolean;
  disabled: boolean;
  title: string;
}>`
  flex-direction: row;
  align-items: center;
  border-radius: ${(props) =>
    props.size == "large"
      ? props.theme.borderRadius.large
      : props.theme.borderRadius.small};
  background: ${(props) =>
    !props.isSelected
      ? props.theme.colors.ui.primary
      : props.theme.colors.bg.secondary};
  align-self: center;

  padding: ${(props) =>
    props.size == "large" ? props.theme.space[3] : props.theme.space[2]};
  padding-left: ${(props) =>
    props.size == "large" ? props.theme.space[4] : props.theme.space[2]};
  padding-right: ${(props) =>
    props.size == "large" ? props.theme.space[4] : props.theme.space[2]};
`;
const ChipText = styled.Text<{
  isSelected: boolean;
  size: "medium" | "large";
}>`
  color: ${(props) =>
    !props.isSelected
      ? props.theme.colors.text.inverse
      : props.theme.colors.text.primary};
  font-family: ${(props) =>
    props.size == "large"
      ? props.theme.fonts.ralewayBold
      : props.theme.fonts.ralewayMedium};
  font-size: ${(props) =>
    props.size == "large"
      ? props.theme.fontSizes.body
      : props.theme.fontSizes.caption};
  font-weight: ${(props) =>
    props.size == "large"
      ? props.theme.fontWeights.bold
      : props.theme.fontWeights.regular};
`;

export const Chip = ({
  size = "large",
  isSelected = false,
  isButton = false,
  iconName,
  iconColor,
  iconSize = 14,
  title,
  onPress,
}: {
  size: "medium" | "large";
  iconName?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconSize?: number;
  isSelected?: boolean;
  isButton?: boolean;
  title: string;
  onPress?: () => void;
}) => {
  return (
    <ChipView
      onPress={onPress}
      isSelected={!isSelected}
      disabled={!isButton}
      size={size}
      title={title}
    >
      {iconName && (
        <Spacer position="right" size="medium">
          <Ionicons size={iconSize} color={iconColor} name={iconName} />
        </Spacer>
      )}
      <ChipText size={size} isSelected={!isSelected}>
        {title}
      </ChipText>
    </ChipView>
  );
};
