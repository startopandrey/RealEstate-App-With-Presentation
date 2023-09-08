import React, { useState, useEffect, useContext } from "react";

import { AccountStackNavigatorParamList } from "src/types/accout";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import {
  AuthSwitch,
  AuthContainer,
  AuthForm,
  FormRow,
  AuthSwitchText,
  AuthButton,
  AuthBannerWrapper,
  AuthBanner,
} from "../components/account.styles";
import { LATITUDE_DELTA, LONGITUDE_DELTA } from "../../../utils/constants";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Title } from "../../../components/title/title.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { Input } from "../../../components/input/input.component";
import { isValidRegister } from "../../../utils/tests.test";
import { IconButton } from "../../../components/icon-button/icon-button.component";
import { initialRegion } from "../../../utils/constants";
import {
  getCurrentUserLoction,
  isLocationPermission,
} from "../../../services/helpers/location.helper";
import { registerRequest } from "../../../services/authentication/authentication.service";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Loading } from "../../../components/loading/loading.component";
type Props = NativeStackScreenProps<AccountStackNavigatorParamList, "Login">;

export const RegisterScreen = ({ navigation }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userLocation, setUserLocation] = useState(initialRegion);
  const [isPermissionsAccepted, setIsPermissionsAccepted] = useState(false);
  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const { onRegister, error, isLoading } = useContext(AuthenticationContext);
  const showPassword = () => {
    setIsPasswordShowed((pwd) => !pwd);
  };
  const getCurrentLocation = async () => {
    if (userLocation.latitude !== 0) {
      return;
    }
    const currentLocation = await getCurrentUserLoction();

    if (currentLocation) {
      setUserLocation({
        longitude: currentLocation?.coords?.latitude,
        latitude: currentLocation?.coords?.longitude,
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATITUDE_DELTA,
      });
    }
  };
  const getPermission = async () => { 
    const isLocationPermissionAccepted = await isLocationPermission();

    if (isLocationPermissionAccepted) {
      setIsPermissionsAccepted(true);
      return;
    }
    setIsPermissionsAccepted(false);
    return;
  };
  useEffect(() => {
    if (!isPermissionsAccepted) {
      getPermission();
    }
    getCurrentLocation();
  }, []);

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
              { text: "Create your", fontWeight: "normal" },
              { text: " account", fontWeight: "bold" },
            ]}
          />
          <Spacer position="top" size="large" />
          <Text variant="body">
            quis nostrud exercitation ullamco laboris nisi ut
          </Text>
          <Spacer position="top" size="xl" />
          <Input
            setValue={setUsername}
            value={username}
            iconName="person-outline"
            keyboardType="default"
            placeholder={"Full Name"}
          />
          <Spacer position="top" size="large" />
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
            title="Register"
            disabled={!isValidRegister(email, password, username)}
            onPress={() => onRegister(email, password, userLocation, username)}
          />
        </AuthForm>
        <AuthSwitch onPress={() => navigation.navigate("Login")}>
          <AuthSwitchText>
            <Text variant="body">Already have an account? </Text>
            <Text variant="subtitle">Log In</Text>
          </AuthSwitchText>
        </AuthSwitch>
      </AuthContainer>
      <Loading isOpen={isLoading}></Loading>
    </SafeArea>
  );
};
