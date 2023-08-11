import React from "react";

import { Favourite } from "../../../components/favourites/favourite.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AntDesign } from "@expo/vector-icons";
import { Apartment as ApartmentType } from "../../../types/apartments/apartment";
import {
  ApartmentCard,
  ApartmentCardCover,
  Info,
  Section,
  Rating,
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
  isMap = false,
}: {
  apartment: ApartmentType;
  isMap?: boolean;
}) => {
  const {
    title = "Sky Dandelions Apartment",
    photos = [
      "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg",
      "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg",
    ],
    address = "100 some random street",
    rating = 4,
    apartmentPrice,
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
          />
        </ChipWrapper>
        <ApartmentCardCover
          isMap={isMap}
          key={title}
          source={{ uri: photos[0], headers: { Accept: "image/*" } }}
        />
      </ApartmentPhoto>
      <Info>
        <Text variant="subtitle">{title}</Text>
        <Section>
          <Rating>
            <Spacer position="right" size="small">
              <AntDesign color={theme.colors.ui.yellow} size={16} name="star" />
            </Spacer>
            <RatingNumber variant="caption">{rating}</RatingNumber>
          </Rating>
          {!isMap && (
            <Location>
              <Spacer position="right" size="small">
                <AntDesign
                  color={theme.colors.ui.primary}
                  size={16}
                  name="enviroment"
                />
              </Spacer>

              <Address variant="body">{address}</Address>
            </Location>
          )}
        </Section>
        <PriceContainer>
          <Price>€ {apartmentPrice}</Price>
          <Month>/month</Month>
        </PriceContainer>
      </Info>
    </ApartmentCard>
  );
};
