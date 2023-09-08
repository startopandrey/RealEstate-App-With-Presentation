import React, { useRef, useState } from "react";
import { ScrollView } from "react-native";
import { MapFilterWrapper } from "./apartments-map.styles";
import {
  ApartmentTypeWrapper,
  ApplyButtonWrapper,
  Header,
  PriceWrapper,
} from "./map-filter.styles";
import { Text } from "../../../components/typography/text.component";
import { Chip } from "../../../components/chip/chip.component";
import { CategoriesList } from "../../../features/apartments/components/apartment.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Input } from "../../../components/input/input.component";
import { Button } from "../../../components/button/button.component";

import { CustomBottomSheet } from "../../../components/bottom-sheet/bottom-sheet.component";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { apartmentCategories } from "../../../../mockData";
import { isValidNumber, isValidStringLength } from "../../../utils/tests.test";

export const MapFilter = ({ isOpen, setIsOpen }) => {
  const [priceFrom, setPriceFrom] = React.useState("");
  const [priceTo, setPriceTo] = React.useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const allCategory = { id: 0, name: "All" };
  const [selectedCategory, setSelectedCategory] = useState(allCategory);

  return (
    <MapFilterWrapper isOpen={isOpen}>
      <CustomBottomSheet
        ref={bottomSheetRef}
        onClose={() => {
          setIsOpen(false);
          bottomSheetRef.current?.close();
        }}
        isOpen={isOpen}
      >
        <Spacer position="top" size="xl" />
        <Header>
          <Text variant="title">Filter</Text>
          <Chip
            isButton={true}
            onPress={() => null}
            size="large"
            isSelected={true}
            title="Reset"
          />
        </Header>
        <ScrollView>
          <ApartmentTypeWrapper>
            <Text variant="title">Property type</Text>
            <Spacer position="top" size={"large"} />
            <CategoriesList
              data={[allCategory, ...apartmentCategories]}
              horizontal={true}
              renderItem={({ item }: { item: any }) => {
                const isSelected = selectedCategory
                  ? selectedCategory.id === item.id
                  : false;
                return (
                  <Spacer position="right" size={"medium"}>
                    <Chip
                      isSelected={isSelected}
                      onPress={() => setSelectedCategory(item)}
                      title={item.name}
                      isButton={true}
                      size={"large"}
                    />
                  </Spacer>
                );
              }}
              keyExtractor={(item: any) => item?.key}
            />
          </ApartmentTypeWrapper>
          <PriceWrapper>
            <Text variant="title">Price ( € )</Text>
            <Spacer position="top" size={"large"} />
            <Input
              setValue={(value) => isValidNumber(value) && setPriceFrom(value)}
              value={`${priceFrom}`}
              iconName="ios-logo-euro"
              placeholder="From"
              keyboardType="numeric"
            />
            <Spacer position="top" size="large" />
            <Input
              setValue={(value) =>
                Number(value) <= Number(priceFrom)
                  ? setPriceTo(value)
                  : setPriceTo((el) => el)
              }
              value={`${priceTo}`}
              iconName="ios-logo-euro"
              placeholder="To"
              keyboardType="numeric"
            />
          </PriceWrapper>
          <ApplyButtonWrapper>
            <Button
              title="Apply Filter"
              onPress={() => {
                bottomSheetRef.current?.close();
              }}
            />
          </ApplyButtonWrapper>
          <Spacer position="top" size={"xxl"} />
          <Spacer position="top" size={"xl"} />
        </ScrollView>
      </CustomBottomSheet>
    </MapFilterWrapper>
  );
};
