import MapView from "react-native-maps";
import styled from "styled-components/native";
import { Animated } from "react-native";

import { INNER_CARD_WIDTH, OUTER_CARD_WIDTH } from "../../../utils/constants";
export const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;
export const MapApartmentCardsWrapper = styled.View`
  flex: 1;
  width: ${OUTER_CARD_WIDTH}px;
  align-items: "center";
  flex-direction: "row";
  background-color: "transparent";

  z-index: 999;
  position: absolute;
  bottom: 20px;
`;
export const MapApartmentItem = styled.TouchableOpacity`
  width: ${OUTER_CARD_WIDTH}px;
  justify-content: center;
`;
export const MapApartmentCards = styled(Animated.FlatList)``;
export const ApartmentInfoCardWrapper = styled.View`
  width: ${INNER_CARD_WIDTH}px;
  align-self: center;
`;
export const Header = styled.View`
  padding: ${(props) => props.theme.space[3]};
  position: absolute;
  /* flex-direction: row; */
  align-items: center;
  justify-content: flex-end;
  z-index: 99;
  top: 40px;
  width: 100%;
`;
