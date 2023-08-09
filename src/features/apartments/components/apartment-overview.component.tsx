/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import styled from "styled-components/native";
import { Apartment } from "../../../types/apartments/apartment";
import { IconButton } from "../../../components/icon-button/icon-button.component";
import { View } from "react-native";
import { Favourite } from "../../../components/favourites/favourite.component";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../infrastructure/theme";
import {
  ApartmentOverviewCard,
  Header,
  HeaderEnd,
  ApartmentPhotoWrapper,
  ApartmentPhoto,
  Footer,
  Rating,
  RatingNumber,
  FooterLeft,
  GalleryButton,
  GalleryPhotoWrapper,
  GalleryPhoto,
  GalleryPhotoOverlay,
  ApartmentTypeWrapper,
  GalleryText,
} from "./apartment-overview.styles";

export const ApartmentOverview = ({
  navigation,
  apartment,
}: {
  navigation: any;
  apartment: Apartment;
}) => {
  const { photos, apartmentPrice, rating = 4.1 } = apartment;

  return (
    <ApartmentOverviewCard>
      <Header>
        <IconButton
          onPress={() => navigation.goBack()}
          iconName="chevron-back-outline"
        />
        <HeaderEnd>
          <IconButton onPress={() => null} iconName="share-outline" />
          <Favourite size={"medium"} apartment={apartment} />
        </HeaderEnd>
      </Header>
      <ApartmentPhotoWrapper>
        <ApartmentPhoto source={{ uri: photos[0] }} />
      </ApartmentPhotoWrapper>
      <Footer>
        <FooterLeft>
          <Rating>
            <Spacer position="right" size="small">
              <Ionicons
                color={theme.colors.ui.yellow}
                size={16}
                name="star"
              ></Ionicons>
            </Spacer>
            <RatingNumber variant="caption">{rating}</RatingNumber>
          </Rating>
          <Spacer position="right" size="medium"></Spacer>
          <ApartmentTypeWrapper>
            <Text color={theme.colors.text.inverse} variant="body">
              {apartment.category.name}
            </Text>
          </ApartmentTypeWrapper>
        </FooterLeft>
        <GalleryButton
          onPress={() =>
            navigation.navigate("ApartmentGallery", { photos: photos })
          }
        >
          <GalleryPhotoWrapper>
            <GalleryPhoto blurRadius={2} source={{ uri: photos[0] }} />
            <GalleryPhotoOverlay></GalleryPhotoOverlay>
          </GalleryPhotoWrapper>
          <GalleryText color={theme.colors.text.inverse} variant="title">
            {photos.length - 1}+
          </GalleryText>
        </GalleryButton>
      </Footer>
    </ApartmentOverviewCard>
  );
};
