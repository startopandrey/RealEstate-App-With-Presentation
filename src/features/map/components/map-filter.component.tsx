import React from "react";
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

export const MapFilter = ({ isOpen, setIsOpen }) => {
  const [priceFrom, setPriceFrom] = React.useState("");
  const [priceTo, setPriceTo] = React.useState("");

  return (
    <MapFilterWrapper isOpen={isOpen}>
      <CustomBottomSheet  onClose={() => setIsOpen(false)} isOpen={isOpen}>
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
              data={[
                { key: 1, category: { id: 1, name: "All" } },
                { key: 2, category: { id: 2, name: "House" } },
                { key: 3, category: { id: 3, name: "Apartment" } },
              ]}
              horizontal={true}
              renderItem={({ item }: { item: any }) => (
                <Spacer position="right" size={"medium"}>
                  <Chip
                    isSelected={item.category.name === "All"}
                    title={item.category.name}
                    isButton={true}
                    size={"large"}
                  />
                </Spacer>
              )}
              keyExtractor={(item: any) => item?.key}
            />
          </ApartmentTypeWrapper>
          <PriceWrapper>
            <Text variant="title">Price ( € )</Text>
            <Spacer position="top" size={"large"} />
            <Input
              setValue={setPriceFrom}
              value={`${priceFrom}`}
              iconName="ios-logo-euro"
              placeholder="From"
              keyboardType="numeric"
            />
            <Spacer position="top" size="large" />
            <Input
              setValue={setPriceTo}
              value={`${priceTo}`}
              iconName="ios-logo-euro"
              placeholder="To"
              keyboardType="numeric"
            />
          </PriceWrapper>
          <ApplyButtonWrapper>
            <Button title="Apply Filter" onPress={() => setIsOpen(false)} />
          </ApplyButtonWrapper>
          <Spacer position="top" size={"xxl"} />
          <Spacer position="top" size={"xl"} />
        </ScrollView>
      </CustomBottomSheet>
    </MapFilterWrapper>
  );
};
