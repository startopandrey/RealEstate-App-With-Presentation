import React, { useEffect, useRef, useState } from "react";
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
import { TitleType } from "../../../components/title/title.d";
import { initialOnboardingBlocks } from "../../../../mockData";
import {
  SmallButton,
  SmallButtonText,
  HeaderWrapper,
  LogoWrapper,
  Logo,
  Onboarding,
  Description,
  ApartmentPhotoWrapper,
  ApartmentPhoto,
  NavigationOverlay,
  OverlayButtons,
  ProgressBarWrapper,
} from "../components/account.styles";
import { theme } from "../../../infrastructure/theme";
type Props = NativeStackScreenProps<AccountStackNavigatorParamList, "Main">;

interface OnboardingBlockType {
  titleArray: TitleType[];
  description: string;
  photoUrl: string;
  isSelected: boolean;
}
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
export const  OnboardingScreen = ({ navigation }: Props) => {
  const progressBarWidth = 150;

  const [onboardingBlocks, setOnboardingBlocks] = useState<
    OnboardingBlockType[]
  >(initialOnboardingBlocks);
  const [selectedBlock, setSelectedBlock] = useState<OnboardingBlockType>(
    onboardingBlocks[0]
  );
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number>(0);
  const progress = useRef(
    new Animated.Value(progressBarWidth * (1 / onboardingBlocks.length))
  ).current;

  const mainRef = useRef(new Animated.Value(1))?.current;
  useEffect(() => {
    if (onboardingBlocks) {
      setSelectedBlock(onboardingBlocks.find((el) => el.isSelected));
      setSelectedBlockIndex(onboardingBlocks.findIndex((el) => el.isSelected));
    }
  }, [onboardingBlocks]);

  const fadeInOutAnim = () => {
    Animated.timing(mainRef, {
      toValue: 0.4,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      Animated.timing(mainRef, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }, 400);
  };
  const changeBlock = (type: "increase" | "decrease") => {
    fadeInOutAnim();
    setTimeout(() => {
      if (type == "increase") {
        const newOnboardingBlocks = onboardingBlocks.map((el, i) =>
          i !== selectedBlockIndex + 1
            ? { ...el, isSelected: false }
            : { ...el, isSelected: true }
        );

        setOnboardingBlocks(newOnboardingBlocks);
        const newProgressWidth =
          progressBarWidth *
          ((selectedBlockIndex + 2) / onboardingBlocks.length);
        Animated.timing(progress, {
          toValue: newProgressWidth,
          duration: 400,
          useNativeDriver: false,
        }).start();
      } else {
        const newProgressWidth =
          progressBarWidth * (selectedBlockIndex / onboardingBlocks.length);
        const newOnboardingBlocks = onboardingBlocks.map((el, i) =>
          i !== selectedBlockIndex - 1
            ? { ...el, isSelected: false }
            : { ...el, isSelected: true }
        );
        setOnboardingBlocks(newOnboardingBlocks);
        Animated.timing(progress, {
          toValue: newProgressWidth,
          duration: 400,
          useNativeDriver: false,
        }).start();
      }
    }, 400);
  };

  const onPressNext = () => {
    if (selectedBlockIndex + 1 == onboardingBlocks.length) {
      navigation.navigate("Login");
      return;
    }
    changeBlock("increase");
  };
  const onPressBack = () => {
    changeBlock("decrease");
  };
  return (
    <SafeArea isBottomHidden={true}>
      <Onboarding>
        <Header />
        <Animated.View style={{ opacity: mainRef }}>
          <OnboardingBody>
            <Title titleArray={selectedBlock?.titleArray} />
            <Spacer position="top" size="large"></Spacer>
            <Description variant="body">
              {selectedBlock.description}
            </Description>
            <Spacer position="top" size="large"></Spacer>
          </OnboardingBody>
          <ApartmentPhotoWrapper>
            <ApartmentPhoto
              source={{
                uri: selectedBlock.photoUrl,
              }}
            ></ApartmentPhoto>
          </ApartmentPhotoWrapper>
        </Animated.View>
        <NavigationOverlay>
          <ProgressBarWrapper>
            <Animated.View
              style={{
                width: progress,
                backgroundColor: "#fff",
                height: 5,
                borderRadius: theme.borderRadius.large,
              }}
            ></Animated.View>
          </ProgressBarWrapper>
          <Spacer position="top" size="large"></Spacer>
          <OverlayButtons>
            {selectedBlockIndex !== 0 && (
              <Spacer position="right" size="large">
                <IconButton
                  onPress={onPressBack}
                  iconName="arrow-back-outline"
                ></IconButton>
              </Spacer>
            )}

            <Button onPress={onPressNext} title="Next"></Button>
          </OverlayButtons>
        </NavigationOverlay>
      </Onboarding>
    </SafeArea>
  );
};
