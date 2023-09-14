import styled from "styled-components/native";
import Image from "react-native-image-progress";
import React from "react";
import { theme } from "../../infrastructure/theme";
import { Skeleton } from "../skeleton/skeleton.component";
export const AvatarPhoto = styled(Image)<{ size: number }>`
  width: ${(props) => props.size};
  border-radius: "50%";
  height: ${(props) => props.size};
`;
export const AvatarWrapper = styled.View<{
  size: number;

}>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 50%;
`;
export const Avatar = ({ url, size = 50, borderRadius = 0 }) => {
  return (
    <AvatarWrapper size={size}>
      <AvatarPhoto
        size={size}
        renderIndicator={() => (
          <Skeleton
            isLoading={true}
            borderRadius={"50%"}
            width={size}
            height={size}
          />
        )}
        source={{ uri: url }}
        imageStyle={{ borderRadius: "50%" }}
      />
    </AvatarWrapper>
  );
};
