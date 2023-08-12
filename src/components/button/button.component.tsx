import { Button as MuiButton } from "react-native-paper";
import { theme } from "../../infrastructure/theme";
import styled from "styled-components/native";
const CustomButton = styled(MuiButton)<{ backgoundColor: string }>`
  padding: ${(props) => props.theme.space[2]};
  text-transform: capitalize;
  background: ${(props) => props.backgoundColor};
  font-family: ${(props) => props.theme.fonts.latoBold};
  border-radius: ${(props) => props.theme.borderRadius.small};
`;
export const Button = ({
  onPress,
  title,
  backgoundColor = theme.colors.brand.primary,
  textColor = theme.colors.text.inverse,
}: {
  onPress: () => void;
  title: string;
  backgoundColor?: string;
  textColor?: string;
}) => {
  return (
    <CustomButton
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
