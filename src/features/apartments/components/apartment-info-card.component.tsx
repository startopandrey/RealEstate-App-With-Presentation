import React from "react";
import { SvgXml } from "react-native-svg";
import { View } from "react-native";

import { Favourite } from "../../../components/favourites/favourite.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import star from "../../../../assets/star";
import open from "../../../../assets/open";
import { AntDesign } from "@expo/vector-icons";
import { Apartment as ApartmentType } from "../../../types/apartments/apartment";
import {
  ApartmentCard,
  ApartmentCardCover,
  Info,
  Section,
  Rating,
  Icon,
  Address,
  ApartmentPhoto,
  Location,
  RatingNumber,
  PriceContainer,
  Price,
  Month,
  ChipWrapper,
} from "./apartment-info-card.styles";
import { theme } from "../../../infrastructure/theme/index";
import { Chip } from "../../../components/chip/chip.component";

export const ApartmentInfoCard = ({
  apartment,
}: {
  apartment: ApartmentType;
}) => {
  console.log(apartment);
  const {
    title = "Sky Dandelions Apartment",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
    placeId,
    apartmentPrice,
    vicinity,
  } = apartment;

  return (
    <ApartmentCard>
      <ApartmentPhoto>
        <Favourite apartment={apartment} />
        <ChipWrapper>
          <Chip
            title="Home"
            size="medium"
            isSelected={true}
            isButton={false}
            onPress={() => {}}
          ></Chip>
        </ChipWrapper>
        <ApartmentCardCover key={title} source={{ uri: photos[0] }} />
      </ApartmentPhoto>
      <Info>
        <Text variant="subtitle">{title}</Text>
        <Section>
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
          <Location>
            <Spacer position="right" size="small">
              <AntDesign
                color={theme.colors.ui.primary}
                size={16}
                name="enviroment"
              ></AntDesign>
            </Spacer>
            <Address variant="body">{address}</Address>
          </Location>
        </Section>
        <PriceContainer>
          <Price>€ {apartmentPrice}</Price>
          <Month>/month</Month>
        </PriceContainer>
      </Info>
    </ApartmentCard>
  );
};
