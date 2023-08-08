import styled from "styled-components/native";
import { ActivityIndicator, Button, Card, Colors } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { View } from "react-native";
import { Text } from "../../../components/typography/text.component";
export const ChipWrapper = styled.View`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 999;
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;
export const ApartmentPhoto = styled.View`
  margin: ${(props) => props.theme.space[2]};
  width: 50%;
  padding: 0;
  border-radius: ${(props) => props.theme.borderRadius.large};
`;
export const RatingNumber = styled(Text).attrs({ variant: "caption" })`
  font-family: ${(props) => props.theme.fonts.montserratSemiBold};
`;
export const ApartmentCard = styled(View)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: ${(props) => props.theme.borderRadius.large};
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
`;
export const PriceContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
export const Price = styled.Text`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-family: ${(props) => props.theme.fonts.montserratSemiBold};
`;
export const Month = styled(Text).attrs({ variant: "caption" })`
  font-family: ${(props) => props.theme.fonts.montserratMedium};
  margin-bottom: 3px;
`;
export const ApartmentCardCover = styled(Card.Cover)`

  border-radius: ${(props) => props.theme.borderRadius.large};
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const Address = styled(Text).attrs({ variant: "body" })`
  color: ${(props) => props.theme.colors.text.muted};
`;

export const Info = styled.View`
  flex: 1;
  width: 50%;
  text-align: left;
  padding: ${(props) => props.theme.space[3]};
  padding-left:  ${(props) => props.theme.space[2]};
`;

export const Rating = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const Section = styled.View`
  /* flex-direction: row;
  align-items: center; */
  flex: 1;
`;

export const Location = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;
export const OrderButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  width: 80%;
  align-self: center;
`;
export const PaymentProcessing = styled(ActivityIndicator).attrs({
  size: 128,
  animating: true,
  color: Colors.blue300,
})`
  position: absolute;
  top: 50%;
  left: 35%;
  z-index: 999;
`;
