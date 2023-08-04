import React from "react";

import { CompactApartmentInfo } from "../../../components/apartment/compact-apartment-info.component";

export const MapCallout = ({ apartment }) => (
  <CompactApartmentInfo isMap apartment={apartment} />
);
