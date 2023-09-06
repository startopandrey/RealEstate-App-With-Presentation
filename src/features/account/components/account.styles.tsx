import styled from "styled-components/native";
import { TextInput } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text.component";
import { Button } from "../../../components/button/button.component";
export const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[2]};
`;
export const LogoWrapper = styled.View`
  width: 100px;
  height: 100px;
`;
export const Logo = styled.Image`
  width: 100%;
  height: 100%;
`;
export const Onboarding = styled.View`
  flex: 1;
  justify-content: space-between;
  align-content: flex-end;
`;
export const SmallButtonText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.montserratMedium};
  letter-spacing: 2%;
`;
export const SmallButton = styled.TouchableOpacity`
  padding-top: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[4]};
  padding-left: ${(props) => props.theme.space[4]};
  border-radius: ${(props) => props.theme.borderRadius.large};
  background: ${(props) => props.theme.colors.ui.gray};
  align-self: center;
`;
export const Description = styled(Text)``;
export const ApartmentPhotoWrapper = styled.View`
  height: 500px;
  padding: ${(props) => props.theme.space[2]};
`;
export const ApartmentPhoto = styled.Image`
  flex: 1;
  border-radius: ${(props) => props.theme.borderRadius.xl};
  object-fit: fill;
`;
export const NavigationOverlay = styled.View`
  position: absolute;
  bottom: 40px;
  width: 70%;
  align-self: center;
  justify-content: center;
`;
export const OverlayButtons = styled.View`
  align-self: center;
  flex-direction: row;
`;
export const ProgressBarWrapper = styled.View`
  background: rgba(255, 255, 255, 0.4);
  height: 5px;
  border-radius: ${(props) => props.theme.borderRadius.large};
  align-self: center;
  width: 150px;
`;
export const AuthForm = styled.View`
  padding: ${(props) => props.theme.space[2]};
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;
export const AuthContainer = styled.View`
  flex: 1;

  align-items: flex-start;
`;
export const FormRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  /* align-items: center; */
`;
export const AuthSwitch = styled.TouchableOpacity`
  width: 100%;
  justify-content: space-between;
`;
export const AuthBanner = styled.Image`
  width: 100%;
  align-self: flex-start;
  justify-content: center;
  height: 150px;
  /* flex: 1; */
  object-fit: contain;
`;
export const AuthBannerWrapper = styled.View`
  align-self: flex-start;
  width: 100%;
`;
export const AuthSwitchText = styled.Text`
  text-align: center;
`;
export const AuthButton = styled(Button)`

  /* flex: 1; */
`;
