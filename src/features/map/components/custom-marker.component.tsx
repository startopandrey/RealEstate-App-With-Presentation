import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
  top: 10px;
`;
export const CustomMarker = ({ image }) => {

  return (
    <Marker>
      <MarkerPhoto
        size={35}
        source={{
          uri: image,
        }}
      />
      <Ionicons
        color={theme.colors.brand.primary}
        size={70}
        name="location-sharp"
      ></Ionicons>
    </Marker>
  );
};
