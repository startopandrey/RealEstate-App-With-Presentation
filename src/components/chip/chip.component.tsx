import styled from "styled-components/native";
import { Text } from "../typography/text.component";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../spacer/spacer.component";

const ChipView = styled.TouchableOpacity<{
  isSelected: boolean;
  disabled: boolean;
  title: string;
}>`
  flex-direction: row;
  align-items: center;
  border-radius: ${(props) => props.theme.borderRadius.large};
  background: ${(props) =>
    !props.isSelected
      ? props.theme.colors.ui.primary
      : props.theme.colors.bg.secondary};
  align-self: center;

  padding: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[4]};
  padding-right: ${(props) => props.theme.space[4]};
`;
const ChipText = styled.Text<{
  isSelected: boolean;
}>`
  color: ${(props) =>
    !props.isSelected
      ? props.theme.colors.text.inverse
      : props.theme.colors.text.primary};
  font-family: ${(props) =>
    props.isSelected == false
      ? props.theme.fonts.ralewayBold
      : props.theme.fonts.ralewayMedium};
  text-transform: capitalize;
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const Chip = ({
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
      title={title}
    >
      {iconName && (
        <Spacer position="right" size="medium">
          <Ionicons size={iconSize} color={iconColor} name={iconName} />
        </Spacer>
      )}
      <ChipText isSelected={!isSelected}>{title}</ChipText>
    </ChipView>
  );
};
