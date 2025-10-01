import type { PurchaseTypeKey, TravelTimeKey } from "./enums";

export type Fare = {
    type: TravelTimeKey;
    purchase: PurchaseTypeKey;
    trips: number;
    price: number;
};

export type Zone = {
  name: string;
  zone: number;
  fares: Fare[];
};

export type Option = {
  name: string;
  value: number | string;
}

export type FareInfo = TimeHelperInfo & PurchaseHelperInfo;

export type TimeHelperInfo = Record<string, string>;
export type PurchaseHelperInfo = Record<string, string>;

export type FareState = {
  selectedZone: Option | null;
  selectedTime: Option | null;
  selectedPurchaseType: Option | null;
  numberOfRides: number;
  calculatedFare: number | null;
  faresData: Zone[] | null;

  setSelectedZone: (zone: Option | null) => void;
  setSelectedTime: (time: Option | null) => void;
  setSelectedPurchaseType: (type: Option | null) => void;
  setNumberOfRides: (rides: number) => void;
  setFaresData: (data: Zone[]) => void;
}

