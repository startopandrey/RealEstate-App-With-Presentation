import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { theme } from "../../../infrastructure/theme";
import styled from "styled-components/native";
import { Avatar } from "react-native-paper";
const Marker = styled.View`
  flex: 1;
`;
const MarkerPhoto = styled(Avatar.Image)`
  position: absolute;
  z-index: 999;
  right: 18px;
  background-color: ${(props) => props.theme.colors.brand.primary};
  top: 10px;
`;
export const CustomMarker = ({
  image,
}: {
  image: string | null;
}): React.JSX.Element => {
  return (
    <Marker>
      <MarkerPhoto
        size={35}
        source={{
          uri: image ? image : undefined,
        }}
      />
      <Ionicons
        color={theme.colors.brand.primary}
        size={70}
        name="location-sharp"
      />
    </Marker>
  );
};
