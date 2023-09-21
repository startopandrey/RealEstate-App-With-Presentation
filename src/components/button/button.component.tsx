import { Button as MuiButton } from "react-native-paper";
import { theme } from "../../infrastructure/theme";
import React from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
const CustomButton = styled(MuiButton)<{
  backgoundColor: string;
  disabled?: boolean;
  spacing?: number;
  isFullWidth?: boolean;
}>`
  margin: ${(props) => `${props.spacing ? props.spacing * 8 : 0}px`};

  box-shadow: none;
  border: none;
  align-self: flex-start;
  ${(props) => (props.isFullWidth ? "width:100%;" : null)};
  flex: 1;
  height: 50px;
  background: ${(props) =>
    props.disabled ? props.theme.colors.ui.disabled : props.backgoundColor};

  border-radius: ${(props) => props.theme.borderRadius.small};
`;
export const Button = ({
  onPress,
  title,
  backgoundColor = theme.colors.brand.primary,
  textColor = theme.colors.text.inverse,
  disabled = false,
  spacing = 0,
  isFullWidth = false,
}: {
  onPress: () => void;
  title: string;
  backgoundColor?: string;
  textColor?: string;
  disabled?: boolean;
  spacing?: number;
  isFullWidth?: boolean;
}): React.ReactElement => {
  return (
    <CustomButton
      compact={true}
      disabled={disabled}
      isFullWidth={isFullWidth}
      spacing={spacing}
      style={styles.button}
      backgoundColor={backgoundColor}
      labelStyle={[
        styles.label,
        { color: textColor, fontFamily: theme.fonts.latoBold },
      ]}
      mode="contained"
      onPress={onPress}
    >
      {title}
    </CustomButton>
  );
};

const styles = StyleSheet.create({
  button: {
    shadowOpacity: 0,
  },
  label: {
    textTransform: "capitalize",
    padding: 10,
    lineHeight: 16,
    justifyContent: "center",
    flex: 1,

    // fontFamily: theme.fonts.latoBold,
  },
});
