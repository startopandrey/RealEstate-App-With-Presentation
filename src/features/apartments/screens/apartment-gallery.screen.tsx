import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, Image, Text, View } from "react-native";
import React from "react";
import { ApartmentStackNavigatorParamList } from "../../../types/apartments";
import { FlatList, StyleSheet } from "react-native";
import styled from "styled-components/native";
// import Gallery from "react-native-awesome-gallery";
import { ListRenderItem } from "react-native";
// import Gallery from 'react-native-gallery';
const { width, height } = Dimensions.get("screen");
type Props = NativeStackScreenProps<
  ApartmentStackNavigatorParamList,
  "ApartmentGallery"
>;
const GalleryList = styled.FlatList`
  flex: 1;
  width: 100%;

  height: 100%;
`;
const GalleryItem = styled.View`
  flex: 1;

  width: 100%;
  height: 100%;
`;
const Photo = styled.Image`
  height: 100%;

  object-fit: contain;
`;
const ApartmentGallery = styled.View`
  flex: 1;
  width: 100%;

  height: 100%;
`;
export const ApartmentGalleryScreen = ({ navigation, route }: Props) => {
  const { photos } = route.params;
  const renderItem: ListRenderItem<string> = ({ item }: { item: string }) => (
    <GalleryItem style={{ width: width, height: height }}>
      <Photo
        style={{ resizeMode:'contain'}}
        source={{
          uri: item,
        }}
      />
    </GalleryItem>
  );

  return (
    <ApartmentGallery>
      <GalleryList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
      {/* <Gallery
        style={{ flex: 1, backgroundColor: "black" }}
        images={[
          "http://p10.qhimg.com/t019e9cf51692f735be.jpg",
          "http://ww2.sinaimg.cn/mw690/714a59a7tw1dxqkkg0cwlj.jpg",
          "http://www.bz55.com/uploads/allimg/150122/139-150122145421.jpg",
        ]}
      /> */}
    </ApartmentGallery>
  );
};
