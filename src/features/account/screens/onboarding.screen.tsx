import React, { useEffect, useRef, useState } from "react";

import { Spacer } from "@src/components/spacer/spacer.component";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  AccountStackNavigatorParamList,
  OnboardingBlockType,
} from "@src/types/accout";
import styled from "styled-components/native";

import { SafeArea } from "@src/components/utility/safe-area.component";
import { Button } from "@src/components/button/button.component";
import { Title } from "@src/components/title/title.component";
import { IconButton } from "@src/components/icon-button/icon-button.component";
import { Animated } from "react-native";
import { initialOnboardingBlocks } from "@src/../mockData";
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
  ProgressBarAnimated,
} from "../components/account.styles";
type Props = NativeStackScreenProps<
  AccountStackNavigatorParamList,
  "Onboarding"
>;

const OnboardingBody = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;

export const OnboardingScreen = ({ navigation }: Props): React.JSX.Element => {
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
    if (onboardingBlocks.length) {
      setSelectedBlock(
        onboardingBlocks.find((el: OnboardingBlockType) => el?.isSelected) ??
          initialOnboardingBlocks[0]
      );
      setSelectedBlockIndex(onboardingBlocks.findIndex((el) => el.isSelected));
    }
  }, [onboardingBlocks]);

  const fadeOut = () => {
    Animated.timing(mainRef, {
      toValue: 0.4,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };
  const fadeIn = () => {
    setTimeout(() => {
      Animated.timing(mainRef, {
        toValue: 1,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }, 400);
  };

  const increaseBlock = () => {
    setTimeout(() => {
      const newOnboardingBlocks = onboardingBlocks.map((el, i) =>
        i !== selectedBlockIndex + 1
          ? { ...el, isSelected: false }
          : { ...el, isSelected: true }
      );

      setOnboardingBlocks(newOnboardingBlocks);
      const newProgressWidth =
        progressBarWidth * ((selectedBlockIndex + 2) / onboardingBlocks.length);
      Animated.timing(progress, {
        toValue: newProgressWidth,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }, 400);
  };
  const decreaseBlock = () => {
    setTimeout(() => {
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
    }, 400);
  };
  const onPressNext = () => {
    if (selectedBlockIndex + 1 == onboardingBlocks.length) {
      navigation.navigate("Login");
      return;
    }
    increaseBlock();
  };
  const onPressBack = () => {
    decreaseBlock();
  };
  return (
    <SafeArea isBottomHidden={true}>
      <Onboarding>
        <HeaderWrapper>
          <LogoWrapper>
            <Logo source={require("../../../../assets/app_logo.png")} />
          </LogoWrapper>
          <Spacer position="right" size="large">
            <SmallButton onPress={() => navigation.navigate("Login")}>
              <SmallButtonText variant="body">Skip</SmallButtonText>
            </SmallButton>
          </Spacer>
        </HeaderWrapper>
        <Animated.View style={{ opacity: mainRef }}>
          <OnboardingBody>
            <Title titleArray={selectedBlock?.titleArray} />
            <Spacer position="top" size="large" />
            <Description variant="body">
              {selectedBlock.description}
            </Description>
            <Spacer position="top" size="large" />
          </OnboardingBody>
          <ApartmentPhotoWrapper>
            <ApartmentPhoto
              source={{
                uri: selectedBlock.photoUrl,
              }}
              onLoadStart={() => fadeOut()}
              onLoadEnd={() => fadeIn()}
            />
          </ApartmentPhotoWrapper>
        </Animated.View>
        <NavigationOverlay>
          <ProgressBarWrapper>
            <ProgressBarAnimated style={{ width: progress }} />
          </ProgressBarWrapper>
          <Spacer position="top" size="large" />
          <OverlayButtons>
            {selectedBlockIndex !== 0 && (
              <Spacer position="right" size="large">
                <IconButton
                  onPress={onPressBack}
                  iconName="arrow-back-outline"
                />
              </Spacer>
            )}

            <Button onPress={onPressNext} title="Next" />
          </OverlayButtons>
        </NavigationOverlay>
      </Onboarding>
    </SafeArea>
  );
};
