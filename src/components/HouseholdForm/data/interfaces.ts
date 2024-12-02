import {
  LocationEnum,
  SpaceHeatingEnum,
  WaterHeatingEnum,
  CooktopEnum,
  VehicleFuelTypeEnum,
} from "../../../shared/api/openapi-client";
import { VehicleOptionType } from "./householdForm.text";

export type UsageType = "Low" | "Medium" | "High";

export interface UsageOption {
  type: UsageType;
  value: number;
  unit: "< 100 km/wk" | "100-300 km/wk" | "300+ km/wk" | string;
}

export interface VehicleOptions {
  amount: OptionNumber[];
  fuelTypeOptions: Option<VehicleFuelTypeEnum>[];
  usageOptions: UsageOption[]; // Use UsageOption interface here
}

export interface VehicleObject {
  id: number | string;
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
    installSolar: boolean | undefined;
    // dontWantSolar: boolean; // if true, then installSolar is false. Question logic different, gets changed before POST request.
    unit?: string;
  };
  battery: {
    hasBattery: boolean;
    capacity: number;
    installBattery: boolean | undefined;
    // dontWantBattery: boolean; // if true, then installBattery is false. Question logic different, gets changed before POST request.
    unit?: string;
  };
}

// ----------------------------------------------


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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OptionNumber extends Option<number> {}

export interface OptionYesNo extends Option<boolean> {
  text: "Yes" | "No";
}
