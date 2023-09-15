import styled from "styled-components/native";
import { Text } from "@src/components/typography/text.component";
import { SwipeListView } from "react-native-swipe-list-view";
import { Ionicons } from "@expo/vector-icons";

export const ApartmentList = styled(SwipeListView)`
  padding: ${(props) => props.theme.space[3]};
`;

export const Header = styled.View`
  padding: ${(props) => props.theme.space[3]};
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
export const InfoRow = styled.View`
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
export const NoFavourites = styled.View`
  justify-content: center;
  text-align: center;
`;
export const NoFavouritesWrapper = styled.View`
  flex: 1;
  align-items: center;
  align-self: center;
  justify-content: center;
`;
export const NoFavouritesImage = styled.Image`
  width: 150px;
  height: 150px;
  align-self: center;
`;
export const Title = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-family: ${(props) => props.theme.fonts.latoBold};
  text-align: center;
`;
export const Description = styled(Text)`
  text-align: center;
`;
export const RemoveItem = styled.TouchableOpacity`
  background: ${(props) => props.theme.colors.ui.primary};
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.borderRadius.large};
  margin-bottom: ${(props) => props.theme.space[3]};
`;
export const RemoveIcon = styled(Ionicons)`
  align-self: flex-end;
  padding: ${(props) => props.theme.space[4]};
`;
