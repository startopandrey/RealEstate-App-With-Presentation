import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions, Text, View } from "react-native";
import React from "react";
import { ApartmentStackNavigatorParamList } from "@src/types/apartments";
import { FlatList, StyleSheet } from "react-native";
import Image from "react-native-image-progress";
import styled from "styled-components/native";
// import Gallery from "react-native-awesome-gallery";
import { ListRenderItem } from "react-native";
import { theme } from "@src/infrastructure/theme";
import { IconButton } from "@src/components/icon-button/icon-button.component";
import { Spacer } from "@src/components/spacer/spacer.component";
import { Skeleton } from "@src/components/skeleton/skeleton.component";
// import Gallery from 'react-native-gallery';
const { width, height } = Dimensions.get("screen");
type Props = NativeStackScreenProps<
  ApartmentStackNavigatorParamList,
  "ApartmentGallery"
>;
const GalleryList = styled.FlatList`
  flex: 1;
  width: 100%;
  position: absolute;
  height: 100%;
  z-index: -1;
`;
const GalleryItem = styled.View`
  padding-bottom: 80px;
`;
const Photo = styled(Image)`
  flex: 1;
  align-items: center;
  justify-content: center;
  object-fit: contain;
  padding-bottom: ${(props) => props.theme.space[4]};
`;
const ApartmentGallery = styled.View`
  flex: 1;
  width: 100%;

  height: 100%;
`;
const BackButton = styled(IconButton)``;
export const ApartmentGalleryScreen = ({ navigation, route }: Props) => {
  const { photos, go_back_key } = route.params;
  const renderItem: ListRenderItem<string> = ({ item }: { item: string }) => (
    <GalleryItem style={{ width: width, height: height }}>
      <Photo
        renderIndicator={() => (
          <Skeleton isLoading={true} width={"100%"} height={"50%"} />
        )}
        source={{ uri: item.url }}
        imageStyle={{ borderRadius: 0, width: "100%", resizeMode: "contain" }}
      />
    </GalleryItem>
  );

  return (
    <ApartmentGallery>
      <Spacer position="left" size="medium">
        <BackButton
          onPress={() => navigation.goBack(go_back_key)}
          iconColor={theme.colors.ui.primary}
          backgroundColor={theme.colors.bg.primary}
          iconName={"chevron-back-outline"}
        ></BackButton>
      </Spacer>
      <GalleryList
        data={photos}
        pagingEnabled={true}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={() => {}}
        renderItem={renderItem}
        keyExtractor={(item, i) => `item-${i}`}
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
