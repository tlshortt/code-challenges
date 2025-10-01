import { create } from "zustand";
import type { FareState } from "../utils/types";
import { calculateFare } from "./calculateFare";

const initialState: FareState = {
  selectedZone: null,
  selectedTime: null,
  selectedPurchaseType: null,
  numberOfRides: 1,
  calculatedFare: null,
  faresData: null,
  setSelectedZone: () => {},
  setSelectedTime: () => {},
  setSelectedPurchaseType: () => {},
  setNumberOfRides: () => {},
  setFaresData: () => {},
};

export const useFareStore = create<FareState>((set) => ({
  ...initialState,

  setSelectedZone: (zone) =>
    set((state) => {
      const newState = { ...state, selectedZone: zone };
      return { ...newState, calculatedFare: calculateFare(newState) };
    }),

  setSelectedTime: (time) =>
    set((state) => {
      const newState = { ...state, selectedTime: time };
      return { ...newState, calculatedFare: calculateFare(newState) };
    }),

  setSelectedPurchaseType: (type) =>
    set((state) => {
      const newState = { ...state, selectedPurchaseType: type };
      return { ...newState, calculatedFare: calculateFare(newState) };
    }),

  setNumberOfRides: (rides) =>
    set((state) => {
      const newState = { ...state, numberOfRides: rides };
      return { ...newState, calculatedFare: calculateFare(newState) };
    }),

  setFaresData: (data) =>
    set((state) => {
      const newState = { ...state, faresData: data };
      return { ...newState, calculatedFare: calculateFare(newState) };
    }),
}));
