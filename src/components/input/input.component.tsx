import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../infrastructure/theme";

import { KeyboardTypeOptions, Text } from "react-native";
type TextTransformType = "lowercase" | "capitalize" | "inherit";
const CustomInput = styled.TextInput<{
  textSize: "medium" | "large";
  textTransform: TextTransformType;
}>`
  padding-right: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-top: ${(props) => props.theme.space[4]};
  padding-bottom: ${(props) => props.theme.space[4]};
  background: ${(props) => props.theme.colors.bg.secondary};
  text-transform: ${(props) => props.textTransform};
  border-radius: ${(props) => props.theme.borderRadius.large};
  font-family: ${(props) =>
    props.textSize == "large"
      ? props.theme.fonts.latoBold
      : props.theme.fonts.latoRegular};
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) => props.theme.colors.text.primary};
`;

const CustomInputIcon = styled(Ionicons)`
  position: absolute;
  right: ${(props) => props.theme.space[3]};
  top: ${(props) => props.theme.space[4]};
`;
const CustomInputWrapper = styled.View`
  width: 100%;
`;

interface InputType {
  value?: string;
  setValue?: (value) => void;
  textTransform?: TextTransformType;
  isPasswordShowed?: boolean;
  iconName?: string;
  defaultValue?: string;
  keyboardType?: KeyboardTypeOptions;
  disabled?: boolean;
  placeholder?: string;
  multiline?: boolean;
  textSize?: "medium" | "large";
}
export const Input = ({
  value,
  textTransform = "inherit",
  setValue,
  iconName,
  keyboardType = "default",
  isPasswordShowed = false,
  disabled = false,
  defaultValue,
  placeholder,
  multiline = false,
  textSize = "large",
}: InputType): React.ReactElement => {
  return (
    <CustomInputWrapper>
      <CustomInput
        placeholder={placeholder}
        textTransform={textTransform}
        editable={!disabled}
        secureTextEntry={isPasswordShowed}
        selectTextOnFocus={!disabled}
        placeholderTextColor={theme.colors.ui.purple}
        onChangeText={setValue}
        onChange={({ nativeEvent: { eventCount, target, text } }) => {
          setValue(text);
        }}
        numberOfLines={2}
        multiline={multiline}
        defaultValue={defaultValue}
        contextMenuHidden={true}
        keyboardType={keyboardType}
        textSize={textSize}
      >
        <Text>{value}</Text>
      </CustomInput>
      <CustomInputIcon
        color={theme.colors.text.primary}
        size={20}
        name={iconName}
      ></CustomInputIcon>
    </CustomInputWrapper>
  );
};
