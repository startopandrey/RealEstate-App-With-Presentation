import styled from "styled-components/native";
import { FlatList, TouchableOpacity } from "react-native";

export const ApartmentHorizontalList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
export const ApartmentHorizontalItem = styled(TouchableOpacity)`
  width: 320px;
`