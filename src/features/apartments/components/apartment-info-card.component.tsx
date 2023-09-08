import React from "react";

import { Favourite } from "../../../components/favourites/favourite.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AntDesign } from "@expo/vector-icons";
import { Apartment as ApartmentType, NewApartment } from "../../../types/apartments/apartment";
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
  CategoryWrapper,
  Category,
} from "./apartment-info-card.styles";
import { theme } from "../../../infrastructure/theme/index";

export const ApartmentInfoCard = ({
  apartment,
  isMap = false,
}: {
  apartment: NewApartment;
  isMap?: boolean;
}) => {
  console.log(apartment, "apo")
  const {
    title = "Sky Dandelions Apartment",
    photos,
    address = "100 some random street",
    rating = 4,
    price,
  } = apartment;

  const apartmentPhoto =
    photos[0]?.url ??
    "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg";
  return (
    <ApartmentCard>
      <ApartmentPhoto>
        <Favourite apartment={apartment} />
        <CategoryWrapper>
          <Category variant="caption">{apartment.category.name}</Category>
        </CategoryWrapper>
        <ApartmentCardCover
          isMap={isMap}
          key={title}
          source={{ uri: apartmentPhoto }}
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
          <Price>€ {price}</Price>
          <Month>/month</Month>
        </PriceContainer>
      </Info>
    </ApartmentCard>
  );
};
