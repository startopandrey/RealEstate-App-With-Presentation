import { Button as MuiButton } from "react-native-paper";
import { theme } from "../../infrastructure/theme";
import React from "react";
import styled from "styled-components/native";
const CustomButton = styled(MuiButton)<{
  backgoundColor: string;
  disabled?: boolean;
}>`
  padding: ${(props) => props.theme.space[2]};
  text-transform: capitalize;
  background: ${(props) =>
    props.disabled ? props.theme.colors.ui.disabled : props.backgoundColor};
  font-family: ${(props) => props.theme.fonts.latoBold};
  border-radius: ${(props) => props.theme.borderRadius.small};
`;
export const Button = ({
  onPress,
  title,
  backgoundColor = theme.colors.brand.primary,
  textColor = theme.colors.text.inverse,
  disabled = false,
}: {
  onPress: () => void;
  title: string;
  backgoundColor?: string;
  textColor?: string;
  disabled?: boolean;
}): React.ReactElement => {
  return (
    <CustomButton
      disabled={disabled}
      backgoundColor={backgoundColor}
      labelStyle={{
        textTransform: "capitalize",
        fontFamily: theme.fonts.latoBold,
        color: textColor,
      }}
      mode="contained"
      onPress={onPress}
    >
      {title}
    </CustomButton>
  );
};
