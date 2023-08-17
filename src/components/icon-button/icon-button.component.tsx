import styled from "styled-components/native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../infrastructure/theme";
import { StyleSheet } from "react-native";
const IconWrapper = styled.TouchableOpacity<{ backgroundColor: string }>`
  align-self: flex-start;
  background: ${(props) => props.backgroundColor};
  padding: ${(props) => props.theme.space[3]};
  border-radius: 50%;
`;
const Icon = styled(Ionicons)``;
export const IconButton = ({
  iconName = "chevron-back-outline",
  iconColor = theme.colors.text.primary,
  backgroundColor = theme.colors.bg.secondary,
  onPress,
}: {
  iconName?: string;
  iconColor?: string;
  backgroundColor?: string;
  onPress: () => void;
}) => {
  return (
    <IconWrapper onPress={onPress} backgroundColor={backgroundColor}>
      <Icon style={styles.icon} name={iconName} size={20} color={iconColor} />
    </IconWrapper>
  );
};
const styles = StyleSheet.create({
  icon: {
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowOffset: { width: 0, height: 2 },
  },
});
