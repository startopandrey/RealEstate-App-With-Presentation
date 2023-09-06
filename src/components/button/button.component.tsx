import { Button as MuiButton } from "react-native-paper";
import { theme } from "../../infrastructure/theme";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";
const CustomButton = styled(MuiButton)<{
  backgoundColor: string;
  disabled?: boolean;
  spacing?: number;
}>`
  margin: ${(props) => `${props.spacing ? props.spacing * 8 : 0}px`};
  /* flex: 1; */
  box-shadow: none;
  border: none;
  /* align-items: center; */
  /* justify-content: flex-start;
  /* align-self: flex-start; */
  width: 100%;
  /* height: 20px; */
  /* justify-content: center; */
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
}: {
  onPress: () => void;
  title: string;
  backgoundColor?: string;
  textColor?: string;
  disabled?: boolean;
  spacing?: number;
}): React.ReactElement => {
  return (
    <CustomButton
      compact={true}
      disabled={disabled}
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
