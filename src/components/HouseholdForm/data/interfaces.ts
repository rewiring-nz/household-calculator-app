import {
    LocationEnum,
    SpaceHeatingEnum,
    WaterHeatingEnum,
    CooktopEnum,
    VehicleFuelTypeEnum,
} from "../../../shared/api/openapi-client";
import { VehicleOptionType } from "./householdForm.text";
     









export type UsageType =  'Low' | 'Medium' | 'High' ;


export interface UsageOptions {
    // name:  'Low' | 'Medium' | 'High' ;
    type:  UsageType
    value: number;
    unit: '< 100 km/wk' | '100-300 km/wk' | '300+ km/wk' | string;
}


// export interface VehicleOptions {
//     amount: OptionNumber[];
//     // fuelType: Option[];
//     fuelType: {
//         value: VehicleFuelTypeEnum;
//         text: string;
//     }[];
//     usageOptionsList: UsageOptions[];
// }
export interface VehicleOptions {
    amount: OptionNumber[];
    fuelType: Option<VehicleFuelTypeEnum>[];
    usageOptionsList: {
        type: string;
        value: number;
        unit: string;
    }[];
}


export interface VehicleObject {
    id: number;
    fuelType: VehicleFuelTypeEnum;
    // usage: Usage
    usageType: UsageType;
    switchToEV: boolean;
}


export interface HouseholdFormState {
    location: LocationEnum;
    occupancy: number;
    spaceHeating: SpaceHeatingEnum;
    waterHeating: WaterHeatingEnum;
    cooktop: CooktopEnum;
    numberOfVehicles: number;
    // vehicles: Vehicle[];
    vehicleObjs: VehicleObject[];
    solar: {
        hasSolar: boolean;
        size: number;
        installSolar: boolean | null;
        // dontWantSolar: boolean; // if true, then installSolar is false. Question logic different, gets changed before POST request.
        unit?: string;
    };
    battery: {
        hasBattery: boolean;
        capacity: number;
        installBattery: boolean | null;
        // dontWantBattery: boolean; // if true, then installBattery is false. Question logic different, gets changed before POST request.
        unit?: string;
    };
}

// ----------------------------------------------



// See householdFormText.ts
// export interface FormText { 
//     options: {
//         location: typeof locationOptions;
//         occupancy: typeof occupancyOptions;
//         spaceHeating: typeof spaceHeatingOptions;
//         waterHeating: typeof waterHeatingOptions;
//         cooktop: typeof cooktopOptions;
//         vehicle: typeof vehicleOptions;
//         solar: typeof solarOptions;
//         battery: typeof batteryOptions;
//     };
//     defaultValues: HouseholdFormState;
//     tooltipText: typeof tooltipText;
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

// export interface Option {
//     value: LocationEnum | SpaceHeatingEnum | WaterHeatingEnum | CooktopEnum | VehicleFuelTypeEnum;
//     text: string;
// }
export interface Option<T> {
    value: T;
    text: string;
}

// export interface OptionNumber {
//     value: number;
//     text: string;
// }

// export interface OptionYesNo {
//     value: boolean;
//     text: 'Yes' | 'No';
// }



export interface OptionNumber extends Option<number> {}

export interface OptionYesNo extends Option<boolean> {
    text: 'Yes' | 'No';
}

