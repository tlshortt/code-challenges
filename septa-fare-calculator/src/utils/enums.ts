/* these structures are used to map from the values in the JSON fare data to user-friendly strings */
/* e.g. I want the value in the dropdown to be evening_weekend, but the dropdown name/display to be "Evening or Weekend" */

export const TravelTime = {
    weekday: "Weekday",
    evening_weekend: "Evening or Weekend",
    anytime: "Anytime"
} as const;

export type TravelTimeKey = keyof typeof TravelTime; 

export const PurchaseType = {
    advance_purchase: "Station Kiosk",
    onboard_purchase: "Onboard"
} as const;

export type PurchaseTypeKey = keyof typeof PurchaseType;