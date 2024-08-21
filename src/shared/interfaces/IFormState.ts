import { HouseholdCooktopEnum, HouseholdLocationEnum, HouseholdSpaceHeatingEnum, HouseholdWaterHeatingEnum, Vehicle } from "../api/household-calculator-client";

export interface IFormState {
    location: HouseholdLocationEnum;
    occupancy: number;
    spaceHeating: HouseholdSpaceHeatingEnum;
    waterHeating: HouseholdWaterHeatingEnum;
    cooktop: HouseholdCooktopEnum;
    numberOfVehicles: number;
    vehicles: Vehicle[];
    solar: {
        hasSolar: boolean;
        size: number;
        installSolar?: boolean;
    };
    battery: {
        hasBattery: boolean;
        capacity: number;
    };
}