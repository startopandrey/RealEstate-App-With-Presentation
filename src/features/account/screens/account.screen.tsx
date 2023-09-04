import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";

import { Spacer } from "../../../components/spacer/spacer.component";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AccountStackNavigatorParamList } from "src/types/accout";
import styled from "styled-components/native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Button } from "../../../components/button/button.component";
import { Title } from "../../../components/title/title.component";
import { Text } from "../../../components/typography/text.component";
import { IconButton } from "../../../components/icon-button/icon-button.component";
import { Animated } from "react-native";
type Props = NativeStackScreenProps<AccountStackNavigatorParamList, "Main">;
const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[2]};
`;
const LogoWrapper = styled.View`
  width: 100px;
  height: 100px;
`;
const Logo = styled.Image`
  width: 100%;
  height: 100%;
`;
const Onboarding = styled.View`
  flex: 1;
  justify-content: space-between;
  align-content: flex-end;
`;
const SmallButtonText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.montserratMedium};
  letter-spacing: 2%;
`;
const SmallButton = styled.TouchableOpacity`
  padding-top: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[4]};
  padding-left: ${(props) => props.theme.space[4]};
  border-radius: ${(props) => props.theme.borderRadius.large};
  background: ${(props) => props.theme.colors.ui.gray};
  align-self: center;
`;
const Description = styled(Text)``;
const ApartmentPhotoWrapper = styled.View`
  height: 500px;
  padding: ${(props) => props.theme.space[2]};
`;
const ApartmentPhoto = styled.Image`
  flex: 1;
  border-radius: ${(props) => props.theme.borderRadius.xl};
  object-fit: fill;
`;
const NavigationOverlay = styled.View`
  position: absolute;
  bottom: 40px;
  width: 70%;
  align-self: center;
  justify-content: center;
`;
const OverlayButtons = styled.View`
  align-self: center;
  flex-direction: row;
`;
const ProgressBarWrapper = styled.View`
  background: rgba(255, 255, 255, 0.4);
  height: 5px;
  align-self: center;
  width: 150px;
`;

const SkipButton = () => {
  return (
    <SmallButton>
      <SmallButtonText variant="body">Skip</SmallButtonText>
    </SmallButton>
  );
};
const OnboardingBody = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;
const Header = () => {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Logo source={require("../../../../assets/app_logo.png")} />
      </LogoWrapper>
      <Spacer position="right" size="large">
        <SkipButton />
      </Spacer>
    </HeaderWrapper>
  );
};
export const AccountScreen = ({ navigation }: Props) => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const blocks = [
    {
      titleArray: [
        { text: "Find best place to stay in", fontWeight: "normal" },
        { text: "good price", fontWeight: "bold" },
      ],
      photoUrl:
        "https://www.thenordroom.com/wp-content/uploads/2022/03/small-dark-blue-living-room-bay-window-fireplace-built-in-bookshelves-nordroom-1500x1000.jpg",
      isSelected: true,
    },
    { isSelected: false },
    { isSelected: false },
  ];
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 10,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [progress]);
  return (
    <SafeArea isBottomHidden={true}>
      <Onboarding>
        <Header />
        <OnboardingBody>
          <Title
            titleArray={[
              { text: "Find best place to stay in", fontWeight: "normal" },
              { text: "good price", fontWeight: "bold" },
            ]}
          />
          <Spacer position="top" size="large"></Spacer>
          <Description variant="body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.
          </Description>
        </OnboardingBody>
        <ApartmentPhotoWrapper>
          <ApartmentPhoto
            source={{
              uri: "https://www.thenordroom.com/wp-content/uploads/2022/03/small-dark-blue-living-room-bay-window-fireplace-built-in-bookshelves-nordroom-1500x1000.jpg",
            }}
          ></ApartmentPhoto>
        </ApartmentPhotoWrapper>
        <NavigationOverlay>
          <ProgressBarWrapper>
            <Animated.View
              style={{ width: progress, backgroundColor: "#fff", height: 4 }}
            ></Animated.View>
          </ProgressBarWrapper>
          <Spacer position="top" size="large"></Spacer>
          <OverlayButtons>
            <Spacer position="right" size="large">
              <IconButton
                onPress={() => null}
                iconName="arrow-back-outline"
              ></IconButton>
            </Spacer>
            <Button onPress={() => null} title="Next"></Button>
          </OverlayButtons>
        </NavigationOverlay>
      </Onboarding>
    </SafeArea>
  );
};
