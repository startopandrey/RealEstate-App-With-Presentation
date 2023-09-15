import MapView from "react-native-maps";
import styled from "styled-components/native";
import { Animated } from "react-native";

import { INNER_CARD_WIDTH, OUTER_CARD_WIDTH } from "@src/utils/constants";
import { Text } from "@src/components/typography/text.component";
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
  bottom: 100px;
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

  position: absolute;
  /* flex-direction: row; */
  align-items: center;
  justify-content: flex-end;
  z-index: 99;
  top: 40px;
  width: 100%;
`;
export const HeaderButtons = styled.View`
  flex: 1;
  width: 100%;
  padding: ${(props) => props.theme.space[3]};
  padding-bottom: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const SearchText = styled(Text)`
  text-transform: inherit;
`;
export const SearchTextWrapper = styled.View`
  padding: ${(props) => props.theme.space[3]};
  background: ${(props) => props.theme.colors.bg.secondary};
  border-radius: ${(props) => props.theme.borderRadius.large};
`;
export const SearchWrapper = styled.View`

  flex: 1;
  width: 100%;
`;
export const MapFilterWrapper = styled.View<{ isOpen?: boolean }>`
  z-index: ${(props) => (props.isOpen ? 99999 : -1)};
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;

  bottom: 0;
`;
export const MapFilterOverlay = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  flex: 1;
  width: 120%;
  background: #0000003b;
  height: 100%;
  /* z-index: 99999; */
`;
