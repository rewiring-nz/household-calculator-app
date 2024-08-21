import { 
    Household, 
    HouseholdCooktopEnum, 
    HouseholdLocationEnum, 
    HouseholdSpaceHeatingEnum, 
    HouseholdWaterHeatingEnum, 
    VehicleFuelTypeEnum,

     } from '../../../shared/api/household-calculator-client';



export  const locationMapping: { [key in HouseholdLocationEnum]: string } = {
    NORTHLAND: 'Northland',
    AUCKLAND_NORTH: 'Auckland / Tāmaki Makaurau',
    AUCKLAND_CENTRAL: 'Auckland / Tāmaki Makaurau',
    AUCKLAND_EAST: 'Auckland / Tāmaki Makaurau',
    AUCKLAND_WEST: 'Auckland / Tāmaki Makaurau',
    AUCKLAND_SOUTH: 'Auckland / Tāmaki Makaurau',
    WAIKATO: 'Waikato',
    BAY_OF_PLENTY: 'Bay of Plenty',
    GISBORNE: 'Gisborne',
    HAWKES_BAY: 'Hawke\'s Bay',
    TARANAKI: 'Taranaki',
    MANAWATU_WANGANUI: 'Manawatu-Wanganui',
    WELLINGTON: 'Wellington',
    TASMAN: 'Tasman',
    NELSON: 'Nelson',
    MARLBOROUGH: 'Marlborough',
    WEST_COAST: 'West Coast',
    CANTERBURY: 'Canterbury',
    OTAGO: 'Otago',
    SOUTHLAND: 'Southland',
    STEWART_ISLAND: 'Stewart Island',
    CHATHAM_ISLANDS: 'Chatham Islands',
    GREAT_BARRIER_ISLAND: 'Great Barrier Island',
    OVERSEAS: 'Overseas',
    OTHER: 'Other'
};

export const spaceHeatingMapping: { [key in HouseholdSpaceHeatingEnum]: string } = {
    ELECTRIC_RESISTANCE: 'Electric resistance heating',
    ELECTRIC_HEAT_PUMP: 'Heat pump',
    WOOD: 'Wood',
    GAS: 'Gas',
    LPG: 'LPG',
    DONT_KNOW: 'Not sure'
};

export const waterHeatingMapping: { [key in HouseholdWaterHeatingEnum]: string } = {
    ELECTRIC_RESISTANCE: 'Electric resistance',
    ELECTRIC_HEAT_PUMP: 'Heat pump',
    GAS: 'Gas',
    LPG: 'LPG',
    SOLAR: 'Solar',
    DONT_KNOW: 'Not sure'
};

export const cooktopMapping: { [key in HouseholdCooktopEnum]: string } = {
    ELECTRIC_RESISTANCE: 'Electric resistance/Ceramic',
    ELECTRIC_HEAT_PUMP: 'Induction', // Nb. this needs to change to 'Induction' in the API
    GAS: 'Gas stove',
    LPG: 'LPG',
    DONT_KNOW: 'Not sure'
};

export const vehicleMapping: { [key in VehicleFuelTypeEnum]: string } = {
    ELECTRIC: 'Electric',
    'PLUG-IN HYBRID': 'Plug-in hybrid',
    HYBRID: 'Hybrid',
    PETROL: 'Petrol',
    DIESEL: 'Diesel'
};

// -----------------------------------------------------












// // ------------------- Default values -------------------



// export const defaultValues: Household = {
//     location: HouseholdLocationEnum.AucklandCentral,
//     occupancy: 2,
//     spaceHeating: HouseholdSpaceHeatingEnum.DontKnow,
//     waterHeating: HouseholdWaterHeatingEnum.DontKnow,
//     cooktop: HouseholdCooktopEnum.DontKnow,
//     vehicles: [
//         {
//             fuelType: VehicleFuelTypeEnum.Hybrid,
//             kmsPerWeek: 0,
//             switchToEV: false
//         },
//         {
//             fuelType: VehicleFuelTypeEnum.Petrol,
//             kmsPerWeek: 0,
//             switchToEV: false
//         }
//     ],
//     solar: {
//         hasSolar: false,
//         size: 7,
//         installSolar: false
//     },
//     battery: {
//         hasBattery: false,
//         capacity: 0
//     }
// };