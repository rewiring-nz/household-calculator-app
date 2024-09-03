import {     
    LocationEnum, 
    SpaceHeatingEnum, 
    WaterHeatingEnum,
    CooktopEnum, 
    VehicleFuelTypeEnum,
     } from '../../../shared/api/openapi-client';

import { HouseholdFormState, Option, OptionNumber, OptionYesNo, UsageOptions, UsageType, VehicleOptions } from './interfaces';





// -------------------- Mappings --------------------
// const locationMapping: Record<HouseholdLocationEnum, string> = { // apparently the same as below
export const locationMapping: { [key in LocationEnum]: string } = {
    [LocationEnum.Northland]: 'Northland',
    [LocationEnum.AucklandNorth]: 'Auckland / Tāmaki Makaurau',
    [LocationEnum.AucklandCentral]: 'Auckland / Tāmaki Makaurau',
    [LocationEnum.AucklandEast]: 'Auckland / Tāmaki Makaurau',
    [LocationEnum.AucklandWest]: 'Auckland / Tāmaki Makaurau',
    [LocationEnum.AucklandSouth]: 'Auckland / Tāmaki Makaurau',
    [LocationEnum.Waikato]: 'Waikato',
    [LocationEnum.BayOfPlenty]: 'Bay of Plenty',
    [LocationEnum.Gisborne]: 'Gisborne',
    [LocationEnum.HawkesBay]: 'Hawke\'s Bay',
    [LocationEnum.Taranaki]: 'Taranaki',
    [LocationEnum.ManawatuWanganui]: 'Manawatu-Wanganui',
    [LocationEnum.Wellington]: 'Wellington',
    [LocationEnum.Tasman]: 'Tasman',
    [LocationEnum.Nelson]: 'Nelson',
    [LocationEnum.Marlborough]: 'Marlborough',
    [LocationEnum.WestCoast]: 'West Coast',
    [LocationEnum.Canterbury]: 'Canterbury',
    [LocationEnum.Otago]: 'Otago',
    [LocationEnum.Southland]: 'Southland',
    [LocationEnum.StewartIsland]: 'Stewart Island',
    [LocationEnum.ChathamIslands]: 'Chatham Islands',
    [LocationEnum.GreatBarrierIsland]: 'Great Barrier Island',
    [LocationEnum.Overseas]: 'Overseas',
    [LocationEnum.Other]: 'Other'
};
console.log('householdFormText locationMapping:', locationMapping);

export const spaceHeatingMapping: { [key in SpaceHeatingEnum]: string } = {
    [SpaceHeatingEnum.ElectricResistance]: 'Electric resistive heaters (e.g. oil column, fan, wall)',
    [SpaceHeatingEnum.ElectricHeatPump]: 'Heat pump(s)',
    [SpaceHeatingEnum.Wood]: 'Wood fire',
    [SpaceHeatingEnum.Gas]: 'Piped/ducted gas heater',
    [SpaceHeatingEnum.Lpg]: 'Bottled LPG heater',
    [SpaceHeatingEnum.DontKnow]: 'Not sure'
};

export const waterHeatingMapping: { [key in WaterHeatingEnum]: string } = {
    [WaterHeatingEnum.ElectricResistance]: 'Electric resistive',
    [WaterHeatingEnum.ElectricHeatPump]: 'Heat pump',
    [WaterHeatingEnum.Gas]: 'Piped/ducted gas',
    [WaterHeatingEnum.Lpg]: 'Bottled LPG',
    [WaterHeatingEnum.Solar]: 'Solar',
    [WaterHeatingEnum.DontKnow]: 'Not sure'
};

export const cooktopMapping: { [key in CooktopEnum]: string } = {
    [CooktopEnum.ElectricResistance]: 'Electric resistive/Ceramic',
    [CooktopEnum.Gas]: 'Piped/ducted gas',
    [CooktopEnum.Lpg]: 'Bottled LPG',
    [CooktopEnum.Wood]: 'Wood',
    [CooktopEnum.ElectricInduction]: 'Induction', // NB error in api, needs updating to Induction
    [CooktopEnum.DontKnow]: 'Not sure'
};

export const vehicleMapping: { [key in VehicleFuelTypeEnum]: string } = {
    [VehicleFuelTypeEnum.Electric]: 'Electric',
    [VehicleFuelTypeEnum.PlugInHybrid]: 'Plug-in Hybrid',
    [VehicleFuelTypeEnum.Hybrid]: 'Hybrid',
    [VehicleFuelTypeEnum.Petrol]: 'Petrol',
    [VehicleFuelTypeEnum.Diesel]: 'Diesel'
};


// -----------------------------------------------------







// -------------------- Options --------------------


let locationList: string[] = Object.values(LocationEnum)
    .map((location:  LocationEnum) => locationMapping[location]);
console.log('householdFormText locationList:', locationList);

const locationSet: string[] = [...new Set(locationList)];
console.log('householdFormText locationSet:', locationSet);

const locationEntries = Object.entries(locationMapping);
// export const locationOptions = Object.entries(locationMapping).map(([key, value]) => ({
export const locationOptions = locationSet.map((locationName) => ({
        value: locationEntries.find(([key, value]) => value === locationName)![0] as LocationEnum,
        text: locationName
    })) as Option[];




const getOccupancyString = (occupancy: number): string => {
    if (occupancy === 1) {
        return '1 person';
    } else {
        return occupancy + ' people';
    }
};

export const occupancyOptions = Array.from(Array(20).keys()).map((occupancy) => (    
    { value: (occupancy + 1), text: getOccupancyString((occupancy + 1)) })) as OptionNumber[];

export const spaceHeatingOptions = Object.entries(spaceHeatingMapping).map(([key, value]) => ({
    value: key as SpaceHeatingEnum,
    text: value
})) as Option[];
    

const waterHeatingMap_noSolar = { // Temp work around until API is updated
    [WaterHeatingEnum.ElectricResistance]: 'Electric resistive',
    [WaterHeatingEnum.ElectricHeatPump]: 'Heat pump',
    [WaterHeatingEnum.Gas]: 'Piped/ducted gas',
    [WaterHeatingEnum.Lpg]: 'Bottled LPG',
    [WaterHeatingEnum.DontKnow]: 'Not sure'
};
export const waterHeatingOptions = Object.entries(waterHeatingMap_noSolar).map(([key, value]) => ({
    value: key as WaterHeatingEnum,
    text: value
})) as Option[];

export const cooktopOptions = Object.entries(cooktopMapping).map(([key, value]) => ({
    value: key as CooktopEnum,
    text: value
})) as Option[];


export const vehicleOptions: VehicleOptions = {
    amount: Array.from(Array(6).keys()).map((amount) => (
        { value: amount, text: amount.toString() })
        ) as OptionNumber[],
    fuelType: Object.entries(vehicleMapping).map(([key, value]) => (
        {value: key as VehicleFuelTypeEnum, text: value}
        )) as Option[],
    usageOptionsList: [
        { type: 'Low', value: 50, unit: '<100 km/wk' },
        { type: 'Medium', value: 200, unit: '100-300 km/wk' },
        { type: 'High', value: 400, unit: '300+ km/wk' }
    ]
}


export const solarOptions = {
    hasSolar: [
        { value: false, text: 'No' },
        { value: true, text: 'Yes' }
        ] as OptionYesNo[],
    sizeList: Array.from(Array(20).keys()).map((size) => (
        { value: size, text: size.toString() + ' kW' })
        // { value: size, text: size.toString() })
    ) as OptionNumber[]
}

export const batteryOptions = {
    hasBattery: [
        { value: false, text: 'No' },
        { value: true, text: 'Yes' }
        ] as  OptionYesNo[],
    capacityList: Array.from(Array(20).keys()).map((size) => (
        { value: size, text: size.toString() + ' kWh' })
        // { value: size, text: size.toString() })
    ) as OptionNumber[]
};

console.log('householdFormText locationOptions:', locationOptions);
console.log('householdFormText spaceHeatingOptions:', spaceHeatingOptions);
console.log('householdFormText waterHeatingOptions:', waterHeatingOptions);
console.log('householdFormText cooktopOptions:', cooktopOptions);
console.log('householdFormText vehicleOptions:', vehicleOptions);
console.log('householdFormText solarOptions:', solarOptions);
console.log('householdFormText batteryOptions:', batteryOptions);
// -----------------------------------------------------









// ------------------- Default State -------------------
// Initial values for the form, todo: update defaults from API

export const defaultFormState: HouseholdFormState = {
    location: LocationEnum.AucklandNorth,
    occupancy: 3,
    spaceHeating: SpaceHeatingEnum.Wood,
    waterHeating: WaterHeatingEnum.Gas,
    cooktop: CooktopEnum.Gas,
    numberOfVehicles: 2,
    vehicleObjs: [
        {
            id: 1,
            fuelType: VehicleFuelTypeEnum.Hybrid,
            usageType: ('Medium' as UsageType),
            switchToEV: true
        },
        {
            id: 2,
            fuelType: VehicleFuelTypeEnum.Petrol,
            usageType: ('Low' as UsageType),
            switchToEV: true
        }
    ],
    solar: {
        hasSolar: false,
        size: 7,
        installSolar: true,
        // dontWantSolar: false,
        unit: 'kW'
    },
    battery: {
        hasBattery: false,
        capacity: 10,
        installBattery: true,
        // dontWantBattery: false,
        unit: 'kWh'
    }
};

// -----------------------------------------------------









// -------------------- Tooltip Text --------------------
// Text that appears when hovering over the question mark icons
const tooltipText: Record<string, string> = {
    spaceHeating: 'If you have multiple ways of heating your house, pick the one that you use the most.',
    waterHeating: 'How your hot water tank is heated.',
    cooktop: 'If you have multiple cooktops, pick the one that you use the most.',
    hasSolar: 'If you have any solar panels in use (whether on roof or ground), select Yes. If you don’t have solar yet, select whether you would like to calculate your savings based on getting solar.',
    solarSize: 'The total capacity of your solar panel system. 9 kW is the average in Australia and enough for 2 EVs, 7 kW is enough for 1 EV.',
    hasBattery: 'If you have a home battery, select Yes. If you don’t have a battery yet, select whether you would like to calculate your savings based on getting one.',
    batteryCapacity: 'The total capacity of your home battery system. A Tesla Powerwall is 5 kW.',
    vehicleNumber: "Just count the number of vehicles that you use reasonably regularly."
};

export default tooltipText;
// -----------------------------------------------------























// ---------------------------------------------------

// -------------------- Form Text --------------------

export interface FormText {
    options: {
        location: typeof locationOptions;
        occupancy: typeof occupancyOptions;
        spaceHeating: typeof spaceHeatingOptions;
        waterHeating: typeof waterHeatingOptions;
        cooktop: typeof cooktopOptions;
        vehicle: typeof vehicleOptions;
        solar: typeof solarOptions;
        battery: typeof batteryOptions;
    };
    defaultFormState: HouseholdFormState;
    tooltipText: typeof tooltipText;
}


export const formText: FormText = {
    options: {
        location: locationOptions,
        occupancy: occupancyOptions,
        spaceHeating: spaceHeatingOptions,
        waterHeating: waterHeatingOptions,
        cooktop: cooktopOptions,
        vehicle: vehicleOptions,
        solar: solarOptions,
        battery: batteryOptions
    },
    defaultFormState: defaultFormState,
    tooltipText: tooltipText
};

// -----------------------------------------------------



// -----------------------------------------------------



