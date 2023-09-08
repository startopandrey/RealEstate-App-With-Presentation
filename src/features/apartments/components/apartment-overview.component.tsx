/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Apartment, NewApartment } from "../../../types/apartments/apartment";
import { IconButton } from "../../../components/icon-button/icon-button.component";
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
import { Share } from "react-native";
interface Props {
  navigation: any;
  apartment: NewApartment;
}
export const ApartmentOverview = ({
  navigation,
  apartment,
}: Props): React.ReactElement => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Foys | Build Apps",
        url: "https://focusonyoursoftware.com/",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const { photos, price, _id, category } = apartment;
  console.log(apartment, "over");
  const apartmentPhoto =
    photos[0]?.url ??
    "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg";
  return (
    <ApartmentOverviewCard>
      <Header>
        <IconButton
          onPress={() => navigation.goBack()}
          iconName="chevron-back-outline"
        />
        <HeaderEnd>
          <IconButton onPress={onShare} iconName="share-outline" />
          <Favourite size={"medium"} apartment={apartment} />
        </HeaderEnd>
      </Header>
      <ApartmentPhotoWrapper>
        <ApartmentPhoto
          source={{ uri: apartmentPhoto, headers: { Accept: "image/*" } }}
        />
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
            <RatingNumber variant="caption">{4.5}</RatingNumber>
          </Rating>
          <Spacer position="right" size="medium"></Spacer>
          <ApartmentTypeWrapper>
            <Text color={theme.colors.text.inverse} variant="body">
              {category.name}
            </Text>
          </ApartmentTypeWrapper>
        </FooterLeft>
        <GalleryButton
          onPress={() =>
            navigation.navigate("ApartmentGallery", {
              go_back_key: _id,
              photos: photos,
            })
          }
        >
          <GalleryPhotoWrapper>
            <GalleryPhoto blurRadius={2} source={{ uri: apartmentPhoto }} />
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
