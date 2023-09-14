import React, { useEffect, useState } from "react";

import { Favourite } from "../../../components/favourites/favourite.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AntDesign } from "@expo/vector-icons";
import { NewApartment } from "../../../types/apartments/apartment";
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
import { Skeleton } from "../../../components/skeleton/skeleton.component";

interface Props {
  apartment: NewApartment;
  isMap?: boolean;
  isLoading?: boolean;
}
export const ApartmentInfoCard = ({
  apartment,
  isMap = false,
  isLoading = false,
}: Props) => {
  const [isLoadingComponent, setIsLoadingComponent] = useState(true);

  useEffect(() => {
    if (apartment.isMock) {
      setIsLoadingComponent(true);
      return;
    }
    setIsLoadingComponent(isLoading);
  }, [isLoading, apartment]);

  const {
    title = "Sky Dandelions Apartment",
    photos,
    address = "100 some random street",
    price,
  } = apartment;

  const apartmentPhoto = apartment.isMock
    ? ""
    : photos[0]?.url ??
      "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg";
  return (
    <ApartmentCard>
      <ApartmentPhoto>
        {!isLoadingComponent && (
          <>
            <Favourite apartment={apartment} />
            <CategoryWrapper>
              <Category variant="caption">{apartment?.category?.name}</Category>
            </CategoryWrapper>
          </>
        )}
        {apartment.isMock ? (
          <Skeleton
            isLoading={isLoadingComponent}
            borderRadius={theme.borderRadius.large}
            width={"100%"}
            height={!isMap ? 190 : 140}
          ></Skeleton>
        ) : (
          <ApartmentCardCover
            isMap={isMap}
            renderIndicator={() => (
              <Skeleton
                isLoading={isLoadingComponent}
                borderRadius={theme.borderRadius.large}
                width={"100%"}
                height={!isMap ? 190 : 140}
              ></Skeleton>
            )}
            imageStyle={{ borderRadius: theme.borderRadius.large }}
            key={title}
            // indicator={{ process: 1 }}
            source={{ uri: apartmentPhoto }}
          />
        )}
      </ApartmentPhoto>
      <Info>
        {isLoadingComponent ? (
          <Skeleton
            isLoading={isLoadingComponent}
            borderRadius={theme.borderRadius.large}
            width={"100%"}
            height={20}
          ></Skeleton>
        ) : (
          <Text variant="subtitle">{title}</Text>
        )}

        <Section>
          <Rating>
            {isLoadingComponent ? (
              <Skeleton
                isLoading={isLoadingComponent}
                borderRadius={theme.borderRadius.large}
                width={"100%"}
                height={20}
              ></Skeleton>
            ) : (
              <>
                <Spacer position="right" size="small">
                  <AntDesign
                    color={theme.colors.ui.yellow}
                    size={16}
                    name="star"
                  />
                </Spacer>
                <RatingNumber variant="caption">{4.5}</RatingNumber>
              </>
            )}
          </Rating>
          {!isMap && (
            <Location>
              {isLoadingComponent ? (
                <Skeleton
                  isLoading={isLoadingComponent}
                  borderRadius={theme.borderRadius.large}
                  width={"100%"}
                  height={40}
                ></Skeleton>
              ) : (
                <>
                  <Spacer position="right" size="small">
                    <AntDesign
                      color={theme.colors.ui.primary}
                      size={16}
                      name="enviroment"
                    />
                  </Spacer>
                  <Address variant="body">{address}</Address>
                </>
              )}
            </Location>
          )}
        </Section>
        <PriceContainer>
          {isLoadingComponent ? (
            <Skeleton
              isLoading={isLoadingComponent}
              borderRadius={theme.borderRadius.large}
              width={"100%"}
              height={40}
            ></Skeleton>
          ) : (
            <>
              <Price>€ {price}</Price>
              <Month>/month</Month>
            </>
          )}
        </PriceContainer>
      </Info>
    </ApartmentCard>
  );
};
