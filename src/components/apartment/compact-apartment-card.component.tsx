import React from "react";

import { Text } from "../typography/text.component";
import { NewApartment } from "@src/types/apartments/apartment";
import { Favourite } from "../favourites/favourite.component";
import { Spacer } from "../spacer/spacer.component";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../../infrastructure/theme/index";
import { Skeleton } from "../skeleton/skeleton.component";
import {
  Address,
  ApartmentCard,
  ApartmentInfo,
  ApartmentInfoRow,
  ApartmentPhoto,
  ChipWrapper,
  CompactApartmentPhoto,
  Location,
  Month,
  Price,
  PriceContainer,
  Rating,
  RatingNumber,
} from "./compact-apartment-card.styles";

export const CompactApartmentCard = ({
  apartment,
  isMap = false,
  onPress,
}: {
  onPress: () => void;
  apartment: NewApartment;
  isMap?: boolean;
  children?: React.ReactNode;
}) => {
  const {
    rating = 4.5,
    address,
    price,
    title = "sdf",
    _id,
    photos,
  } = apartment;

  const apartmentPhoto =
    photos[0]?.url ??
    "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg";
  return (
    <ApartmentCard onPress={onPress}>
      <CompactApartmentPhoto>
        <Favourite apartment={apartment} />
        <ChipWrapper>
          <PriceContainer>
            <Price>€ {price}</Price>
            <Month>/month</Month>
          </PriceContainer>
        </ChipWrapper>
        <ApartmentPhoto
          renderIndicator={() => (
            <Skeleton
              borderRadius={theme.borderRadius.large}
              width={"100%"}
              height={"100%"}
            ></Skeleton>
          )}
          imageStyle={{ borderRadius: theme.borderRadius.large }}
          key={_id}
          // indicator={{ process: 1 }}
          source={{ uri: apartmentPhoto }}
        />
      </CompactApartmentPhoto>
      <ApartmentInfo>
        <Text variant={"caption"}>{title}</Text>
        <ApartmentInfoRow>
          <Rating>
            <Spacer position="right" size="small">
              <AntDesign color={theme.colors.ui.yellow} size={16} name="star" />
            </Spacer>
            <RatingNumber variant="caption">{rating}</RatingNumber>
          </Rating>
          <Spacer position="right" size="small" />
          <Location>
            <Spacer position="right" size="small">
              <AntDesign
                color={theme.colors.ui.primary}
                size={16}
                name="enviroment"
              />
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
