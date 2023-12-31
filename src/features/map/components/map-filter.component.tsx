import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import { MapFilterWrapper } from "./apartments-map.styles";
import {
  ApartmentTypeWrapper,
  ApplyButtonWrapper,
  Header,
  PriceWrapper,
} from "./map-filter.styles";
import { Text } from "@src/components/typography/text.component";
import { Chip } from "@src/components/chip/chip.component";
import { Spacer } from "@src/components/spacer/spacer.component";
import { Input } from "@src/components/input/input.component";
import { Button } from "@src/components/button/button.component";

import { CustomBottomSheet } from "@src/components/bottom-sheet/bottom-sheet.component";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { ApartmentsContext } from "@src/services/apartments/apartments.context";

import { CategoryRow } from "@src/components/category-row/category-row.component";
import { FilterOptionsType } from "@src/types/apartments/apartment";

export const MapFilter = ({ isOpen, setIsOpen }) => {
  const [priceFrom, setPriceFrom] = React.useState("");
  const [priceTo, setPriceTo] = React.useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const allCategory = { id: 0, name: "All" };
  const [selectedCategory, setSelectedCategory] = useState(allCategory);
  const { setFilterOptions, filterOptions } = useContext(ApartmentsContext);

  useEffect(() => {
    const { price } = filterOptions;

    if (price) {
      const formattedPrice: string[] = String(price).split(",");
      const priceFrom = formattedPrice[0];
      const priceTo = formattedPrice[1];
      setPriceFrom(priceFrom ?? 0);
      setPriceTo(priceTo ?? 0);
      return;
    }
  }, [filterOptions]);

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
            <CategoryRow></CategoryRow>
          </ApartmentTypeWrapper>
          <PriceWrapper>
            <Text variant="title">Price ( € )</Text>
            <Spacer position="top" size={"large"} />
            <Input
              setValue={(value) => Number(value) && setPriceFrom(value)}
              value={`${priceFrom}`}
              iconName="ios-logo-euro"
              placeholder="From"
              keyboardType="numeric"
            />
            <Spacer position="top" size="large" />
            <Input
              setValue={(value) => Number(value) && setPriceTo(value)}
              value={`${priceTo}`}
              iconName="ios-logo-euro"
              placeholder="To"
              keyboardType="numeric"
            />
          </PriceWrapper>
          <ApplyButtonWrapper>
            <Button
              title="Apply Filter"
              isFullWidth={true}
              onPress={() => {
                bottomSheetRef.current?.close();
                console.log(selectedCategory.id);
                const newFilter = {
                  ...filterOptions,
                  ...((priceFrom || priceTo) && {
                    price: `${priceFrom},${priceTo}`,
                  }),
                };
                console.log(newFilter, "new Filter");
                setFilterOptions(newFilter);
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
