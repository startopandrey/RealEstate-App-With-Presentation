import styled from "styled-components/native";
import React, { forwardRef } from "react";
import { Text } from "../typography/text.component";
import { Button } from "../button/button.component";
import { Spacer } from "../spacer/spacer.component";
import { CustomBottomSheet } from "../bottom-sheet/bottom-sheet.component";
import { Title } from "../title/title.component";
import { TitleType } from "../title/title.d";

const CustomBottomSheetWrapper = styled.View<{ isOpen?: boolean }>`
  z-index: ${(props) => (props.isOpen ? 99999 : -1)};
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;

  bottom: 0;
`;

const AlertPhoto = styled.Image`
  width: 180px;
  height: 180px;
`;
const AlertTitle = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-family: ${(props) => props.theme.fonts.latoRegular};
  text-transform: inherit;
`;
const AlertTitleBold = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.h5};
  text-transform: lowercase;
`;
const AlertWrapper = styled.View`
  border-radius: ${(props) => props.theme.borderRadius.xl};
  justify-content: space-between;
  padding: ${(props) => props.theme.space[3]};

  /* flex-direction: column; */
  align-content: center;
  align-items: center;

  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
const AlertTitleWrapper = styled.Text`
  width: 70%;
`;
const ButtonsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

interface Button {
  textColor: string;
  backgroundColor: string;
  onPress: () => void;
  title: string;
}
interface Props {
  type: "success" | "error";
  isOpen: boolean;
  onClose: () => void;
  snapPointPercent: string;
  titleArray: TitleType[];
  buttonsArray: Button[];
}
export const Alert = forwardRef(
  (
    {
      type = "success",
      isOpen,
      onClose,
      snapPointPercent,
      titleArray,
      buttonsArray,
    }: Props,
    ref
  ): React.ReactElement => {
    const ICONS = {
      success: {
        uri: require("../../../assets/success-icon.png"),
      },
      error: {
        uri: require("../../../assets/error-icon.png"),
      },
    };

    return (
      <CustomBottomSheetWrapper isOpen={isOpen}>
        <CustomBottomSheet
          ref={ref}
          snapPointPercent={snapPointPercent}
          onClose={onClose}
          isOpen={isOpen}
        >
          <AlertWrapper>
            <Spacer position="top" size="large" />
            <AlertPhoto source={ICONS[type].uri} />
            <AlertTitleWrapper>
              <Title titleArray={titleArray}></Title>
            </AlertTitleWrapper>
            <Spacer position="top" size="xl" />
            <ButtonsWrapper>
              {buttonsArray.map((button: Button) => (
                <Button
                  spacing={1}
                  title={button.title}
                  onPress={button.onPress}
                  backgoundColor={button.backgroundColor}
                  textColor={button.textColor}
                />
              ))}
            </ButtonsWrapper>
            <Spacer position="top" size="xl" />
          </AlertWrapper>
        </CustomBottomSheet>
      </CustomBottomSheetWrapper>
    );
  }
);
