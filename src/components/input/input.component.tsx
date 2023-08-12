import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../infrastructure/theme";
import React from "react";
const CustomInput = styled.TextInput`
  padding-right: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-top: ${(props) => props.theme.space[4]};
  padding-bottom: ${(props) => props.theme.space[4]};
  background: ${(props) => props.theme.colors.bg.secondary};
  border-radius: ${(props) => props.theme.borderRadius.large};
  font-family: ${(props) => props.theme.fonts.latoBold};
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) => props.theme.colors.text.primary};
`;
const CustomInputIcon = styled(Ionicons)`
  position: absolute;
  right: ${(props) => props.theme.space[3]};
  top: ${(props) => props.theme.space[4]};
`;
const CustomInputWrapper = styled.View``;
export const Input = ({
  value,
  setValue,
  iconName,
  keyboardType,

  placeholder,
}: {
  value: string;
  setValue: (value) => void;
  iconName?: string;
  keyboardType: string;

  placeholder: string;
}) => {
  return (
    <CustomInputWrapper>
      <CustomInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.muted}
        onChangeText={setValue}
        onChange={({ nativeEvent: { eventCount, target, text } }) => {
          setValue(text);
        }}
        keyboardType={keyboardType}
      />
      <CustomInputIcon
        color={theme.colors.text.primary}
        size={20}
        name="ios-logo-euro"
      ></CustomInputIcon>
    </CustomInputWrapper>
  );
};
