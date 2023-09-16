import styled from "styled-components/native";
import Image from "react-native-image-progress";
import { Text } from "../typography/text.component";
export const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

export const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;
export const CompactApartmentPhoto = styled.View`
  width: 100%;
  padding: 0;
  border-radius: ${(props) => props.theme.borderRadius.large};
`;
export const ApartmentInfo = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;
export const ApartmentCard = styled.TouchableOpacity`
  margin: ${(props) => props.theme.space[1]};
  padding: ${(props) => props.theme.space[2]};
  border-radius: ${(props) => props.theme.borderRadius.large};
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;
export const Rating = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;
export const Address = styled(Text).attrs({ variant: "body" })`
  color: ${(props) => props.theme.colors.text.muted};
  width: 70%;
`;
export const ChipWrapper = styled.View`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 999;
`;
export const ApartmentPhoto = styled(Image)`
  border-radius: ${(props) => props.theme.borderRadius.large};
  background-color: ${(props) => props.theme.colors.bg.secondary};
  width: 100%;
  height: 200px;
`;
export const ApartmentInfoRow = styled.View`
  flex-direction: row;
`;
export const Location = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;
export const RatingNumber = styled(Text).attrs({ variant: "caption" })`
  font-family: ${(props) => props.theme.fonts.montserratSemiBold};
`;
export const PriceContainer = styled.View`
  background-color: rgba(35, 79, 104, 0.8);
  padding: ${(props) => props.theme.space[1]};
  border-radius: ${(props) => props.theme.borderRadius.small};
  flex-direction: row;
  align-items: flex-end;
`;
export const Price = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.subtitle};
  font-family: ${(props) => props.theme.fonts.montserratSemiBold};
  color: ${(props) => props.theme.colors.text.inverse};
`;
export const Month = styled.Text`
  font-family: ${(props) => props.theme.fonts.montserratMedium};
  font-size: ${(props) => props.theme.fontSizes.small} !important;
  color: ${(props) => props.theme.colors.text.inverse};
  margin-bottom: 1px;
`;
