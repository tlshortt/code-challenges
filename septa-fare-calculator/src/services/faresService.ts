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
    if (!data) {
        return { zoneOptions: [], timeOptions: [], purchaseTypeOptions: [], loading, error };
    }

    /* in the below code, the zones[0] part is a hack, based on the assumption that the type and purchase 
    attributes in the json are represented the same way for all zones, and that they are all there.
    leaving it for now, because I need to get to the actual calculation part. */
    return { 
        zoneOptions: getZoneOptions(data.zones), 
        timeOptions: getTimeOptions(data.zones[0].fares), 
        purchaseTypeOptions: getPurchaseTypeOptions(data.zones[0].fares), 
        loading, 
        error 
    };
};

export enum TravelTime {
    weekday = "Weekday",
    evening_weekend = "Evening or Weekend",
    anytime = "Anytime"
}

export enum PurchaseType {
    advance_purchase = "Station Kiosk",
    onboard_purchase = "Onboard"
}

type Zone = {
  name: string;
  fares: Fare[];
};

type Fare = {
  type: keyof typeof TravelTime;
  purchase: keyof typeof PurchaseType;
};

// --- helpers --- //
const getZoneOptions = (zones: Zone[]) =>
  uniq(zones.map((z) => z.name));

const getTimeOptions = (fares: Fare[]) =>
  uniq(fares.map((f) => TravelTime[f.type]));

const getPurchaseTypeOptions = (fares: Fare[]) =>
  uniq(fares.map((f) => PurchaseType[f.purchase]));
