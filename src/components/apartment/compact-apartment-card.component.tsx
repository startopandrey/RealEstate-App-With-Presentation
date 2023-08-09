import React from "react";
import styled from "styled-components/native";
import WebView from "react-native-webview";
import { Platform } from "react-native";

import { Text } from "../typography/text.component";
import { Apartment } from "src/types/apartments/apartment";
import { Chip } from "../chip/chip.component";
import { Favourite } from "../favourites/favourite.component";
import { Card } from "react-native-paper";
import { Spacer } from "../spacer/spacer.component";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../../infrastructure/theme/index";
const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactWebview = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;
const CompactApartmentPhoto = styled.View`
  width: 100%;
  padding: 0;
  border-radius: ${(props) => props.theme.borderRadius.large};
`;
const ApartmentInfo = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;
const ApartmentCard = styled.TouchableOpacity`
  margin: ${(props) => props.theme.space[1]};
  padding: ${(props) => props.theme.space[2]};
  border-radius: ${(props) => props.theme.borderRadius.large};
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;
const Rating = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;
const Address = styled(Text).attrs({ variant: "body" })`
  color: ${(props) => props.theme.colors.text.muted};
  width: 70%;
`;
const ChipWrapper = styled.View`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 999;
`;
const ApartmentCardCover = styled(Card.Cover)`
  border-radius: ${(props) => props.theme.borderRadius.large};
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;
const ApartmentInfoRow = styled.View`
  flex-direction: row;
`;
const Location = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;
const RatingNumber = styled(Text).attrs({ variant: "caption" })`
  font-family: ${(props) => props.theme.fonts.montserratSemiBold};
`;
const PriceContainer = styled.View`
  background: ${(props) => props.theme.colors.ui.primary};
  padding: ${(props) => props.theme.space[1]};
  border-radius: ${(props) => props.theme.borderRadius.small};
  flex-direction: row;
  align-items: flex-end;
`;
const Price = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.subtitle};
  font-family: ${(props) => props.theme.fonts.montserratSemiBold};
  color: ${(props) => props.theme.colors.text.inverse};
`;
const Month = styled.Text`
  font-family: ${(props) => props.theme.fonts.montserratMedium};
  font-size: ${(props) => props.theme.fontSizes.small} !important;
  color: ${(props) => props.theme.colors.text.inverse};
  margin-bottom: 1px;
`;
const isAndroid: boolean = Platform.OS === "android";

export const CompactApartmentCard = ({
  apartment,
  isMap = false,
  onPress,
}: {
  onPress: () => void;
  apartment: Apartment;
  isMap?: boolean;
  children?: React.ReactNode;
}) => {
  const Image = isAndroid && isMap ? CompactWebview : CompactImage;
  const { rating = 4.5, address, apartmentPrice, title = "sdf" } = apartment;
  return (
    <ApartmentCard onPress={onPress}>
      <CompactApartmentPhoto>
        <Favourite apartment={apartment} />
        <ChipWrapper>
          <PriceContainer>
            <Price>€ {apartmentPrice}</Price>
            <Month>/month</Month>
          </PriceContainer>
        </ChipWrapper>
        <ApartmentCardCover key={title} source={{ uri: apartment.photos[0] }} />
      </CompactApartmentPhoto>
      <ApartmentInfo>
        <Text variant={"caption"}>{title}</Text>
        <ApartmentInfoRow>
          <Rating>
            <Spacer position="right" size="small">
              <AntDesign
                color={theme.colors.ui.yellow}
                size={16}
                name="star"
              ></AntDesign>
            </Spacer>
            <RatingNumber variant="caption">{rating}</RatingNumber>
          </Rating>
          <Spacer position="right" size="small"></Spacer>
          <Location>
            <Spacer position="right" size="small">
              <AntDesign
                color={theme.colors.ui.primary}
                size={16}
                name="enviroment"
              ></AntDesign>
            </Spacer>
            <Address numberOfLines={1} variant="body">
              {address}
            </Address>
          </Location>
        </ApartmentInfoRow>
      </ApartmentInfo>
    </ApartmentCard>
  );
};
