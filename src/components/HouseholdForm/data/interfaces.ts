import { HouseholdCooktopEnum, HouseholdLocationEnum, HouseholdSpaceHeatingEnum, HouseholdWaterHeatingEnum, Vehicle, VehicleFuelTypeEnum } from "../../../shared/api/household-calculator-client";


export interface FormState {
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


export interface FormText {
    location: StringInput;
    occupancy: NumberInput;
    spaceHeating: StringInput;
    waterHeating: StringInput;
    cooktop: StringInput;
    vehicle: {
        amount: NumberInput;
        fuelType: vehicleInput;
    };
    solar: {
        haveSolar: YesNoInput;
        solarSize: NumberInput;
    };
    battery: {
        haveBattery: YesNoInput;
        batterySize: NumberInput;
    };
}

interface StringInput {
    options: string[];
    default: string;
}

interface NumberInput {
    options: number[];
    default: number;
}

interface vehicleInput {    
    options: string[];
    default: string[];
}

interface YesNoInput {
    options: string[];
    default: boolean;
}

export interface Option {
    value: HouseholdLocationEnum | HouseholdSpaceHeatingEnum | HouseholdWaterHeatingEnum | HouseholdCooktopEnum | VehicleFuelTypeEnum;
    text: string;
}

export interface OptionNumber {
    value: number;
    text: string;
}

export interface OptionYesNo {
    value: boolean;
    text: 'Yes' | 'No';
}
