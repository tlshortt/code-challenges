/* uses the useGetFares hook and transforms the data as needed */
/* this can be tested independently of the UI */

import { useGetFares } from "../hooks/useGetFares";
import { uniq } from "lodash";
import { useMemo } from "react";
import { TravelTime, PurchaseType } from "../utils/enums";
import type { Fare, Zone, Option, FareInfo, TimeHelperInfo, PurchaseHelperInfo } from "../utils/types"; 

export const useFaresService = (url: string): {
    fullData: any;
    zoneOptions: Option[];
    timeOptions: Option[];
    purchaseTypeOptions: Option[];
    timeHelperInfo: TimeHelperInfo | null;
    purchaseHelperInfo: PurchaseHelperInfo | null;
    bulkPriceMinimum: number;
    loading: boolean;
    error: unknown;
} => {
  const { data, loading, error } = useGetFares(url);
  
  const faresData = useMemo(() => {
    if (!data) {
        return { 
            fullData: null,
            zoneOptions: [], 
            timeOptions: [], 
            purchaseTypeOptions: [],
            timeHelperInfo: null,
            purchaseHelperInfo: null,
            bulkPriceMinimum: getBulkPriceMinimum(),
        };
    }

    /* in the code below, the zones[0] part is a hack, based on the assumption that the type and purchase 
    attributes in the json are represented the same way for all zones, and that they are all there.
    leaving it for now, because I need to get to the actual calculation part. */
    return { 
        fullData: data,
        zoneOptions: getZoneOptions(data.zones as Zone[]), 
        timeOptions: getTimeOptions(data.zones[0].fares as Fare[]), 
        timeHelperInfo: getTimeHelperInfo(data.info as FareInfo),
        purchaseHelperInfo: getPurchaseHelperInfo(data.info as FareInfo),
        purchaseTypeOptions: getPurchaseTypeOptions(data.zones[0].fares as Fare[]),
        bulkPriceMinimum: getBulkPriceMinimum(data.zones[0].fares as Fare[])
    };
  }, [data]);

  return {
    ...faresData,
    loading,
    error
  };
};

const getZoneOptions = (zones: Zone[]): Option[] =>
  uniq(zones.map((z) => ({ name: z.name, value: z.zone })));

const getTimeOptions = (fares: Fare[]): Option[] => {
  /* leave out "anytime", as that won't be an option in the dropdown, 
     but someone is going to tell me I'm wrong about that LOL.
     in real life, I would seek clarification. */
  const singleTripTypes = fares
    .filter(f => f.trips === 1) 
    .map(f => f.type); 

  const uniqueTypes = uniq(singleTripTypes);

  return uniqueTypes.map(type => ({
    name: TravelTime[type],
    value: type
  }));
};


const getPurchaseTypeOptions = (fares: Fare[]): Option[] => {
  const uniquePurchases = uniq(fares.map((f) => f.purchase));
  return uniquePurchases.map((purchase) => ({
    name: PurchaseType[purchase],
    value: purchase
  }));
};

const getTimeHelperInfo = (info: FareInfo): TimeHelperInfo => {
    return {
        anytime: info.anytime,
        evening_weekend: info.evening_weekend,
        weekday: info.weekday
    };
};

const getPurchaseHelperInfo = (info: FareInfo): PurchaseHelperInfo => {
    return {
        advance_purchase: info.advance_purchase,
        onboard_purchase: info.onboard_purchase,
    };
};

/* derive it from json, default to 1 */
const getBulkPriceMinimum = (fares?: Fare[]): number => {
  if (!fares) return 1;

  const x = fares.find(f => f.trips > 1);
  return x ? x?.trips: 1;
};
