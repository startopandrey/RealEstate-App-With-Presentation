import React, { useContext, useState } from "react";

import { AccountStackNavigatorParamList } from "src/types/accout";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import {
  AuthSwitch,
  AuthContainer,
  AuthForm,
  FormRow,
  AuthBannerWrapper,
  AuthBanner,
  AuthSwitchText,
  AuthButton,
} from "../components/account.styles";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Title } from "../../../components/title/title.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { Input } from "../../../components/input/input.component";
import { isValidLogin, isValidRegister } from "../../../utils/tests.test";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
type Props = NativeStackScreenProps<AccountStackNavigatorParamList, "Login">;

export const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);
  const showPassword = () => {
    setIsPasswordShowed((pwd) => !pwd);
  };
  return (
    <SafeArea isBottomHidden={true}>
      <AuthContainer>
        <AuthBannerWrapper>
          <AuthBanner
            resizeMode="contain"
            source={require("../../../../assets/auth_bg.png")}
          />
        </AuthBannerWrapper>
        <AuthForm>
          <Spacer position="top" size="xl" />
          <Title
            titleArray={[
              { text: "Let’s", fontWeight: "normal" },
              { text: " Sign In", fontWeight: "bold" },
            ]}
          />
          <Spacer position="top" size="large" />
          <Text variant="body">
            quis nostrud exercitation ullamco laboris nisi ut
          </Text>
          <Spacer position="top" size="xl" />
          <Input
            setValue={setEmail}
            value={email}
            textTransform={"lowercase"}
            iconName="mail-outline"
            keyboardType="email-address"
            placeholder={"Email"}
          />
          <Spacer position="top" size="large" />
          <Input
            isPasswordShowed={isPasswordShowed}
            setValue={setPassword}
            value={password}
            iconName="lock-closed-outline"
            keyboardType="default"
            placeholder={"Password"}
          />
          <Spacer position="top" size="large" />
          <FormRow>
            <TouchableOpacity>
              <Text variant="subtitle">Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={showPassword}>
              <Text variant="subtitle">{`${
                !isPasswordShowed ? "Hide" : "Show"
              } password`}</Text>
            </TouchableOpacity>
          </FormRow>
          <Spacer position="top" size="xl" />
          <AuthButton
            disabled={!isValidLogin(email, password)}
            title="Login"
            onPress={() => onLogin(email, password)}
          ></AuthButton>
        </AuthForm>
        <AuthSwitch onPress={() => navigation.navigate("Register")}>
          <AuthSwitchText>
            <Text variant="body">Don’t have an account? </Text>
            <Text variant="subtitle">Register</Text>
          </AuthSwitchText>
        </AuthSwitch>
      </AuthContainer>
    </SafeArea>
  );
};
