import { FlatList } from "react-native";
import MapView from "react-native-maps";
import { Text } from "../../../components/typography/text.component";
import styled from "styled-components/native";

export const Header = styled.View`
  padding: ${(props) => props.theme.space[3]};
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
export const SectionTitle = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const SectionType = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const TypesWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
export const SectionCategory = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const ChipsWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
export const SectionLocation = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const LocationAddressWrapper = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[3]};
`;
export const MapLocationWrapper = styled.View`
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
export const CustomMarkerWrapper = styled.View`
  position: absolute;
  top: 50%;
  right: 50%;
  margin-right: -30px;
  margin-top: -40px;
`;
export const SectionPhotos = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const PhotosGridWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  height: 100%;
`;
export const PhotoWrapper = styled.View`
  border-radius: ${(props) => props.theme.borderRadius.large};
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.space[1]};
  flex: 1;
`;
export const Photo = styled.Image`
  border-radius: ${(props) => props.theme.borderRadius.large};
  position: absolute;

  width: 100%;
  flex: 1;
  height: 100%;
`;
export const LockedItemWrapper = styled.TouchableOpacity`
  background: ${(props) => props.theme.colors.bg.secondary};
  flex: 1;
  border-radius: ${(props) => props.theme.borderRadius.large};
  justify-content: center;
  margin: ${(props) => props.theme.space[2]};
  align-items: center;
`;
export const GridItem = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.bg.secondary};
  margin: ${(props) => props.theme.space[1]};
  border-radius: ${(props) => props.theme.borderRadius.large};
`;
export const DeleteButton = styled.TouchableOpacity`
  background: ${(props) => props.theme.colors.brand.primary};
  position: absolute;
  padding: ${(props) => props.theme.space[2]};
  top: 0px;
  border-radius: ${(props) => props.theme.borderRadius.large};
  right: 0px;
`;
export const SectionPrice = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const SectionFeatures = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const FeaturesList = styled(FlatList)``;
export const SectionRooms = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const SectionFacility = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const ApplyButtonWrapper = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const FeatureItem = styled.View`
  flex: 1;
  width: 100%;
  align-self: flex-end;
`;
export const SectionDescription = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;
export const HeaderPhotos = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const Address = styled(Text)`
  flex-wrap: wrap;
`;
