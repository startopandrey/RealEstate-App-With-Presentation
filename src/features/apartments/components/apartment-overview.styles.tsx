import { Text } from "@src/components/typography/text.component";
import styled from "styled-components/native";
import Image from "react-native-image-progress";
export const ApartmentOverviewCard = styled.View`
  height: 450px;
  border-radius: ${(props) => props.theme.borderRadius.xl};
  background: ${(props) => props.theme.colors.bg.primary};
  margin-left: ${(props) => props.theme.space[1]};
  margin-right: ${(props) => props.theme.space[1]};
  /* flex: 1; */
`;

export const ApartmentPhotoWrapper = styled.View`
  flex: 1;
  border-radius: ${(props) => props.theme.borderRadius.xl};
`;
export const ApartmentPhoto = styled(Image)`
  /* background: rgba(0, 0, 0, 1); */
  border-radius: ${(props) => props.theme.borderRadius.xl};
  flex: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const HeaderEnd = styled.View`
  flex-direction: row;
  flex: 0.45;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  z-index: 999;
`;
export const Footer = styled.View`
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
export const ApartmentTypeWrapper = styled.View`
  padding: ${(props) => props.theme.space[3]};
  align-self: flex-end;
  border-radius: ${(props) => props.theme.borderRadius.large};
  background: ${(props) => props.theme.colors.ui.primary};
  color: ${(props) => props.theme.colors.text.inverse};
  text-transform: capitalize;
`;
export const FooterLeft = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
export const GalleryButton = styled.TouchableOpacity`
  width: 60px;
  border-radius: ${(props) => props.theme.borderRadius.medium};
  background: ${(props) => props.theme.colors.bg.primary};
  border: 3px ${(props) => props.theme.colors.text.inverse} solid;
  height: 60px;
  align-items: center;
  justify-content: center;
`;
export const GalleryPhotoWrapper = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  flex: 1;
`;
export const GalleryPhoto = styled.Image`
  border-radius: ${(props) => props.theme.borderRadius.medium};
  flex: 1;
  width: 100%;

  height: 100%;
  object-fit: cover;
`;
export const GalleryPhotoOverlay = styled.View`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: ${(props) => props.theme.borderRadius.medium};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
export const GalleryText = styled(Text)`
  font-family: ${(props) => props.theme.fonts.montserratBold};
`;
