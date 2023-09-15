import styled from "styled-components/native";
import { Text } from "@src/components/typography/text.component";
import MapView from "react-native-maps";
export const Header = styled.View`
  padding: ${(props) => props.theme.space[2]};
  padding-top: ${(props) => props.theme.space[4]};
`;
export const Title = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.h5};
`;
export const HeaderLocation = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
`;
export const SaleInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[2]};
`;
export const SaleType = styled.View`
  flex-direction: row;
`;
export const SalePriceWrapper = styled.View`
  justify-content: flex-end;
`;
export const SalePrice = styled(Text)`
  font-family: ${(props) => props.theme.fonts.montserratSemiBold};
  font-size: ${(props) => props.theme.fontSizes.h5};
`;
export const SaleMonth = styled(Text)`
  text-align: left;
  align-self: flex-end;
`;
export const AgentCard = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${(props) => props.theme.space[2]};
  padding: ${(props) => props.theme.space[3]};
  background: ${(props) => props.theme.colors.bg.secondary};
  border-radius: ${(props) => props.theme.borderRadius.medium};
`;
export const AgentInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const AgentContact = styled.View``;
export const AgentPhoto = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
export const FacilitiesList = styled.FlatList``;
export const ApartmentLocation = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const ApartmentAddressWrapper = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[3]};
`;
export const MapApartmentWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 300px;
  border-radius: ${(props) => props.theme.borderRadius.large};
`;
export const Map = styled(MapView)`
  border-radius: ${(props) => props.theme.borderRadius.large};
  height: 100%;
  width: 100%;
`;
export const MapRedirectButton = styled.View`
  position: absolute;
  bottom: 0;
  justify-content: center;
  border-bottom-left-radius: ${(props) => props.theme.borderRadius.large};
  border-bottom-right-radius: ${(props) => props.theme.borderRadius.large};
  align-items: center;
  width: 100%;
  height: 60px;
  background: ${(props) => props.theme.colors.bg.secondary};
`;
export const DescriptionWrapper = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const Description = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.subtitle};
`;
export const ApartmentFeatures = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const ChipsWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;