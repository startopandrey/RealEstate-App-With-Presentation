import styled from "styled-components/native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../infrastructure/theme";
const IconWrapper = styled.TouchableOpacity<{ backgroundColor: string }>`
  align-self: flex-start;
  background: ${(props) => props.backgroundColor};
  padding: ${(props) => props.theme.space[3]};
  border-radius: 50%;
`;
const Icon = styled(Ionicons)``;
export const IconButton = ({
  iconName,
  iconColor = theme.colors.text.primary,
  backgroundColor = theme.colors.bg.secondary,
  onPress,
}: {
  iconName: string;
  iconColor?: string;
  backgroundColor?: string;
  onPress: () => void;
}) => {
  return (
    <IconWrapper onPress={onPress} backgroundColor={backgroundColor}>
      <Icon name={iconName} size={20} color={iconColor}></Icon>
    </IconWrapper>
  );
};