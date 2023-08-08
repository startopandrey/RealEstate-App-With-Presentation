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
const ApartmentOverviewCard = styled.View`
  height: 450px;
  border-radius: ${(props) => props.theme.borderRadius.xl};
  background: ${(props) => props.theme.colors.bg.primary};
  margin-left: ${(props) => props.theme.space[1]};
  margin-right: ${(props) => props.theme.space[1]};
  /* flex: 1; */
`;
const ApartmentOverviewGallery = styled.View``;
const ApartmentPhotoWrapper = styled.View`
  flex: 1;
  border-radius: ${(props) => props.theme.borderRadius.xl};
`;
const ApartmentPhoto = styled.Image`
  background: rgba(0, 0, 0, 1);
  border-radius: ${(props) => props.theme.borderRadius.xl};
  flex: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const HeaderEnd = styled.View`
  flex-direction: row;
  flex: 0.45;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  z-index: 999;
`;
const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: ${(props) => props.theme.space[3]};
  bottom: 10px;
  position: absolute;
  z-index: 999;
`;
export const Rating = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  padding: ${(props) => props.theme.space[3]};

  border-radius: ${(props) => props.theme.borderRadius.large};
  background: ${(props) => props.theme.colors.ui.primary};
`;

export const RatingNumber = styled(Text).attrs({ variant: "caption" })`
  font-family: ${(props) => props.theme.fonts.montserratBold};

  color: ${(props) => props.theme.colors.text.inverse};
`;
const ApartmentTypeWrapper = styled.View`
  padding: ${(props) => props.theme.space[3]};
  align-self: flex-end;
  border-radius: ${(props) => props.theme.borderRadius.large};
  background: ${(props) => props.theme.colors.ui.primary};
  color: ${(props) => props.theme.colors.text.inverse};
  text-transform: capitalize;
`;
const FooterLeft = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
const GalleryButton = styled.TouchableOpacity`
  width: 60px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background: ${(props) => props.theme.colors.bg.primary};
  border: 3px ${(props) => props.theme.colors.text.inverse} solid;
  height: 60px;
  align-items: center;
  justify-content: center;
`;
const GalleryPhotoWrapper = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  flex: 1;
`;
const GalleryPhoto = styled.Image`
  border-radius: ${(props) => props.theme.borderRadius.medium};
  flex: 1;
  width: 100%;

  height: 100%;
  object-fit: cover;
`;
const GalleryPhotoOverlay = styled.View`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const GalleryText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.montserratBold};
`;
export const ApartmentOverview = ({
  navigation,
  apartment,
}: {
  navigation: any;
  apartment: Apartment;
}) => {
  const { photos, apartmentPrice, rating = 4.1 } = apartment;
  console.log(photos)
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
