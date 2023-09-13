import { FlatList } from "react-native";
import { Chip } from "../chip/chip.component";
import { apartmentCategories } from "../../../mockData";
import { Spacer } from "../spacer/spacer.component";
import React, { useContext } from "react";
import { ApartmentsContext } from "../../services/apartments/apartments.context";
export const CategoryRow = () => {
  const { setFilterOptions, filterOptions } = useContext(ApartmentsContext);
  const allCategory = { id: 0, name: "All" };
  console.log(typeof filterOptions.categoryId === "undefined");
  return (
    <FlatList
      data={[allCategory, ...apartmentCategories]}
      horizontal={true}
      renderItem={({ item }: { item: any }) => {
        const isSelected =
          filterOptions.categoryId == item.id ||
          (typeof filterOptions.categoryId === "undefined" && item.id === 0);

        return (
          <Spacer position="right" size={"medium"}>
            <Chip
              isSelected={isSelected}
              onPress={() =>
                setFilterOptions((filter) => ({
                  ...filter,
                  ...(item.id >= 0 && {
                    categoryId: item.id,
                  }),
                }))
              }
              title={item.name}
              isButton={true}
              size={"large"}
            />
          </Spacer>
        );
      }}
      keyExtractor={(item: any) => item?.key}
    />
  );
};
