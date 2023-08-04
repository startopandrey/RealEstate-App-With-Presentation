import React from "react";
import styled from "styled-components/native";
import WebView from "react-native-webview";
import { Platform } from "react-native";

import { Text } from "../typography/text.component";
import { Apartment } from "src/types/apartments/apartment";

const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactWebview = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

const isAndroid: boolean = Platform.OS === "android";

export const CompactApartmentInfo = ({
  apartment,
  isMap = false,
}: {
  apartment: Apartment;
  isMap?: boolean;
}) => {
  const Image = isAndroid && isMap ? CompactWebview : CompactImage;

  return (
    <Item>
      <Image source={{ uri: apartment?.photos[0]?.photo_url }} />
      <Text variant="caption" numberOfLines={3}>
        {apartment.name}
      </Text>
    </Item>
  );
};
