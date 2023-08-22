import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../infrastructure/theme";
import React from "react";
import { Text, View } from "react-native";
const CustomInput = styled.TextInput<{ textSize: "medium" | "large" }>`
  padding-right: ${(props) => props.theme.space[3]};
  padding-left: ${(props) => props.theme.space[3]};
  padding-top: ${(props) => props.theme.space[4]};
  padding-bottom: ${(props) => props.theme.space[4]};
  background: ${(props) => props.theme.colors.bg.secondary};
  border-radius: ${(props) => props.theme.borderRadius.large};
  font-family: ${(props) =>
    props.textSize == "large"
      ? props.theme.fonts.latoBold
      : props.theme.fonts.latoRegular};
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) => props.theme.colors.text.primary};
  line-height: 27px;

`;
const CustomInputIcon = styled(Ionicons)`
  position: absolute;
  right: ${(props) => props.theme.space[3]};
  top: ${(props) => props.theme.space[4]};
`;
const CustomInputWrapper = styled.View`
  width: 100%;
`;
export const Input = ({
  value,
  setValue,
  iconName,
  keyboardType = "default",

  disabled = false,
  defaultValue,
  placeholder,
  multiline = false,
  textSize = "large",
}: {
  value?: string;
  setValue?: (value) => void;
  iconName?: string;
  defaultValue?: string;
  keyboardType?: string;
  disabled?: boolean;
  placeholder?: string;
  multiline?: boolean;
  textSize?: "medium" | "large";
}) => {
  return (
    <CustomInputWrapper>
      <CustomInput
        placeholder={placeholder}
        editable={!disabled}
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
        <Text style={{ lineHeight: 27, height: 27 }}>{value}</Text>
      </CustomInput>
      <CustomInputIcon
        color={theme.colors.text.primary}
        size={20}
        name={iconName}
      ></CustomInputIcon>
    </CustomInputWrapper>
  );
};
