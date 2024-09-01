import { HouseholdCooktopEnum, HouseholdLocationEnum, HouseholdSpaceHeatingEnum, HouseholdWaterHeatingEnum, Vehicle, VehicleFuelTypeEnum } from "../../../shared/api/household-calculator-client";









export type UsageType =  'Low' | 'Medium' | 'High' ;


export interface UsageOptions {
    // name:  'Low' | 'Medium' | 'High' ;
    type:  UsageType
    value: number;
    unit: '<100 km/wk' | '100-300 km/wk' | '300+ km/wk' | string;
}


export interface VehicleOptions {
    amount: OptionNumber[];
    fuelType: Option[];
    usageOptionsList: UsageOptions[];
}


export interface VehicleObject {
    id: number;
    fuelType: VehicleFuelTypeEnum;
    // usage: Usage
    usageType: UsageType;
}


export interface HouseholdFormState {
    location: HouseholdLocationEnum;
    occupancy: number;
    spaceHeating: HouseholdSpaceHeatingEnum;
    waterHeating: HouseholdWaterHeatingEnum;
    cooktop: HouseholdCooktopEnum;
    numberOfVehicles: number;
    // vehicles: Vehicle[];
    vehicleObjs: VehicleObject[];
    solar: {
        hasSolar: boolean;
        size: number;
        // installSolar?: boolean;
        dontWantSolar: boolean; // if true, then installSolar is false. Question logic different, gets changed before POST request.
        unit?: string;
    };
    battery: {
        hasBattery: boolean;
        capacity: number;
        // installBattery: boolean;
        dontWantBattery: boolean; // if true, then installBattery is false. Question logic different, gets changed before POST request.
        unit?: string;
    };
}

// ----------------------------------------------






// export interface FormText {
//     location: StringInput;
//     occupancy: NumberInput;
//     spaceHeating: StringInput;
//     waterHeating: StringInput;
//     cooktop: StringInput;
//     vehicle: {
//         amount: NumberInput;
//         fuelType: vehicleInput;
//     };
//     solar: {
//         haveSolar: YesNoInput;
//         solarSize: NumberInput;
//     };
//     battery: {
//         haveBattery: YesNoInput;
//         batterySize: NumberInput;
//     };
// }

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
