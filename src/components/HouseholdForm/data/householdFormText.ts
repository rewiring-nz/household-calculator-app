import { 
    Household, 
    HouseholdCooktopEnum, 
    HouseholdLocationEnum, 
    HouseholdSpaceHeatingEnum, 
    HouseholdWaterHeatingEnum, 
    VehicleFuelTypeEnum,
     } from '../../../shared/api/household-calculator-client';
import { 
    locationMapping,
    spaceHeatingMapping,
    waterHeatingMapping,
    cooktopMapping,
    vehicleMapping,
     } from './householdFormMappings';
  




let locations = Object.values(HouseholdLocationEnum)
    .map((location:  HouseholdLocationEnum) => locationMapping[location]);
locations = [...new Set(locations)];

let spaceHeatingOptions = Object.values(HouseholdSpaceHeatingEnum)
    .map((spaceHeating: HouseholdSpaceHeatingEnum) => spaceHeatingMapping[spaceHeating]);

let waterHeatingOptions = Object.values(HouseholdWaterHeatingEnum)
    .map((waterHeating: HouseholdWaterHeatingEnum) => waterHeatingMapping[waterHeating]);

let cooktopOptions = Object.values(HouseholdCooktopEnum)
    .map((cooktop: HouseholdCooktopEnum) => cooktopMapping[cooktop]);

let vehicleOptions = Object.values(VehicleFuelTypeEnum)
    .map((vehicle: VehicleFuelTypeEnum) => vehicleMapping[vehicle]);




export const householdFormText = {
    location: {
        options: locations,
        default: locations[1],
    },
    occupancy:{ 
        options: Array.from(Array(10).keys()),
        default: 2
    },
    spaceHeating: {
        options: spaceHeatingOptions,
        default: spaceHeatingOptions[0],
    },
    waterHeating: {
        options: waterHeatingOptions,
        default: spaceHeatingOptions[0],
    },
    cooktop: {
        options: cooktopOptions,
        default: spaceHeatingOptions[0],
    },
    vehicle: {        
        default: 2,
        car1: {
            vehicleOptions: vehicleOptions,
            default: vehicleOptions[2]
        },
        car2: {
            vehicleOptions: vehicleOptions,
            default: vehicleOptions[3]
        },
        car3: {
            vehicleOptions: vehicleOptions,
            default: vehicleOptions[0]
        }
    },
    solar: {
        haveSolar: {
            options: ['No', 'Yes'],
            default: 'No',
        },
        solarSize: {
            options: Array.from(Array(10).keys()),
            default: 7,
        },
    },
    battery: {
        haveBattery: {
            options: ['No', 'Yes'],
            default: 'No',
        },
        batterySize: {
            options: Array.from(Array(10).keys()),
            default: 7,
        },
    },
}