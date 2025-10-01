import type { Fare, FareState } from "../utils/types";

export const calculateFare = (state: FareState): number => {
  const { selectedZone, selectedTime, selectedPurchaseType, numberOfRides, faresData } = state;

  if (!selectedZone || !selectedTime || !selectedPurchaseType || !faresData) {
    return 0;
  }

  const zone = faresData.find((z) => z.zone === selectedZone.value);
  if (!zone) return 0;

  /* For 10+ rides using station kiosk, use bulk pricing */
  /* 'Anytime' doesn't just mean that bit in the json, it means all time types */
  /* that is, if you buy >=10 rides under "advance_purchase" */
  /* and "anytime" is not part of the logic */
  /* any option under "When are you riding" is valid */
  if (numberOfRides >= 10 && selectedPurchaseType.value === "advance_purchase") {

    /* but I need to use "anytime" below to find price */
    /* once I've passed the above check */
    const bulkFare = zone.fares.find(
      (fare: Fare) =>
        fare.type === "anytime" && 
        fare.purchase === "advance_purchase" &&
        fare.trips === 10
    );

    if (bulkFare) {
      const passesNeeded = Math.ceil(numberOfRides / 10);
      const bulkCost = passesNeeded * bulkFare.price;
      return bulkCost; 
    }
  }

  if (numberOfRides < 1) return 0;

  const singleTripFare = zone.fares.find(
    (fare: Fare) =>
      fare.type === selectedTime.value &&
      fare.purchase === selectedPurchaseType.value &&
      fare.trips === 1
  );

  if (!singleTripFare) return 0;

  return singleTripFare.price * numberOfRides;
};