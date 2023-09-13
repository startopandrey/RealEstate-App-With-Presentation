import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { theme } from "../../../infrastructure/theme";
import styled from "styled-components/native";
import { Avatar } from "react-native-paper";

import { Skeleton } from "../../../components/skeleton/skeleton.component";
const Marker = styled.View`
  flex: 1;
`;
const MarkerPhoto = styled(Avatar.Image)`
  position: absolute;
  z-index: 999;
  right: 17.5px;
  background-color: ${(props) => props.theme.colors.brand.primary};
  top: 10px;
`;
const SkeletonWrapper = styled.View`
  border-radius: ${(props) => props.theme.borderRadius.large};
  position: absolute;
  z-index: 9999;
  right: 17.5px;
  background-color: ${(props) => props.theme.colors.bg.primary};
  top: 10px;
`;
export const CustomMarker = ({
  image,
}: {
  image: string | null;
}): React.JSX.Element => {
  const [loaded, setLoaded] = useState(false);
  const markerSize = 35;
  return (
    <Marker>
      <>
        <SkeletonWrapper
          style={[loaded ? { width: 0 } : { width: markerSize }]}
        >
          <Skeleton
            isLoading={loaded}
            borderRadius={theme.borderRadius.large}
            width={"100%"}
            height={markerSize}
          ></Skeleton>
        </SkeletonWrapper>

        <MarkerPhoto
          size={markerSize}
          onLoadEnd={() => setLoaded(true)}
          // style={[!loaded ? { display: "none" } : { display: "flex" }]}
          // imageStyle={{ position: "absolute", right: 18, top: 10 }}
          // style={{ position: "absolute", right: 18, top: 10 }}
          // renderIndicator={() => (
          //   <Skeleton
          //     borderRadius={theme.borderRadius.large}
          //     width={35}
          //     height={35}
          //   ></Skeleton>
          // )}
          source={{
            uri: image,
          }}
        />
      </>
      <Ionicons
        color={theme.colors.brand.primary}
        size={70}
        name="location-sharp"
      />
    </Marker>
  );
};
