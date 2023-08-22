import React from "react";
import { View } from "react-native";
import { Text } from "../../../components/typography/text.component";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../infrastructure/theme";
import { Spacer } from "../../../components/spacer/spacer.component";
const CounterRowWrapper = styled.View`
  padding: ${(props) => props.theme.space[4]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: ${(props) => props.theme.borderRadius.large};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const CounterWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ButtonTrigger = styled.TouchableOpacity`
  padding: ${(props) => props.theme.space[2]};
  border-radius: ${(props) => props.theme.borderRadius.small};
  background: ${(props) => props.theme.colors.ui.purple};
`;
export const CounterRow = ({ label, value, onDecrease, onIncrease }) => {
  return (
    <CounterRowWrapper>
      <Text variant="title">{label}</Text>
      <CounterWrapper>
        <ButtonTrigger onPress={() => onIncrease(label)}>
          <Ionicons
            name="add-outline"
            size={20}
            color={theme.colors.text.inverse}
          />
        </ButtonTrigger>
        <Spacer position="right" size={"large"} />
        <Text variant="title">{value}</Text>
        <Spacer position="right" size={"large"} />
        <ButtonTrigger onPress={() => onDecrease(label)}>
          <Ionicons
            name="remove-outline"
            size={20}
            color={theme.colors.text.inverse}
          />
        </ButtonTrigger>
      </CounterWrapper>
    </CounterRowWrapper>
  );
};
