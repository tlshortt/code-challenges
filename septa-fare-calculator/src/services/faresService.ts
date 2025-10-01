/* uses the useGetFares hook and transforms the data as needed */
/* this can be tested independently of the UI */

import { useGetFares } from "../hooks/useGetFares";
import { uniq } from "lodash";

export const useFaresService = (url: string): {
    zoneOptions: string[];
    timeOptions: string[];
    purchaseTypeOptions: string[];
    loading: boolean;
    error: unknown;
} => {
  const { data, loading, error } = useGetFares(url);

  console.log("raw fares:", data);


  /* in the below code, the zones[0] part is a hack, based on the assumption that the type and purchase 
    attributes in the json are represented the same way for all zones, and that they are all there.
    leaving it for now, because I need to get to the actual calculation part. */
  return { 
    zoneOptions: data ? uniq(data.zones.map((zone: { name: string; }) => zone.name )) : [], 
    timeOptions: data ? uniq(data.zones[0].fares.map((fare: { type: string }) => fare.type)) : [], 
    purchaseTypeOptions: data ? uniq(data.zones[0].fares.map((fare: { purchase: string }) => fare.purchase)) : [], 
    loading, 
    error 
  };
};