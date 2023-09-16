import styled from "styled-components/native";
import Image from "react-native-image-progress";
import React, { useContext } from "react";
import { theme } from "../../infrastructure/theme";
import { Skeleton } from "../skeleton/skeleton.component";
import { Text } from "../typography/text.component";
import { AuthenticationContext } from "@src/services/authentication/authentication.context";
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
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 50%;
`;
interface AvatarProps {
  url?: string;
  size: number;
  name?: string;
  isUsername?: boolean;
}
export const Avatar = ({
  url,
  size = 50,
  name,
  isUsername = false,
}: AvatarProps) => {
  const { user } = useContext(AuthenticationContext);
  const isPhoto = !!url;
  const firstLetter = (isUsername ? user.username ?? "?" : name ?? "?").split(
    "",
    1
  )[0];
  return (
    <AvatarWrapper size={size}>
      {isPhoto ? (
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
      ) : (
        <Text variant="title">{firstLetter}</Text>
      )}
    </AvatarWrapper>
  );
};
