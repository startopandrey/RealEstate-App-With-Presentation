import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled.View`
  flex: 1;
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius.large};
`;
const CustomSearchbar = styled(Searchbar)`
  border-radius: ${(props) => props.theme.borderRadius.large};
  background: ${(props) => props.theme.colors.bg.secondary};
  padding: ${(props) => props.theme.space[2]};
  font-family: ${(props) => props.theme.fonts.ralewayMedium};
  font-size: ${(props) => props.theme.fontSizes.body};
`;
export const Search = () => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);
  return (
    <SearchContainer>
      <CustomSearchbar
        placeholder="Search for a location"
        // icon="search"

        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
