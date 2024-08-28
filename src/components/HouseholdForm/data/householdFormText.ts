import { 
    Household, 
    HouseholdCooktopEnum, 
    HouseholdLocationEnum, 
    HouseholdSpaceHeatingEnum, 
    HouseholdWaterHeatingEnum, 
    VehicleFuelTypeEnum,
     } from '../../../shared/api/household-calculator-client';
// import { 
//     locationMapping,
//     spaceHeatingMapping,
//     waterHeatingMapping,
//     cooktopMapping,
//     vehicleMapping,
//      } from './householdFormMappings';
// import { FormText } from './interfaces';
import { HouseholdFormState, Option, OptionNumber, OptionYesNo, UsageOptions, UsageType, VehicleOptions } from './interfaces';





// -------------------- Mappings --------------------
// const locationMapping: Record<HouseholdLocationEnum, string> = { // apparently the same as below
export const locationMapping: { [key in HouseholdLocationEnum]: string } = {
    [HouseholdLocationEnum.Northland]: 'Northland',
    [HouseholdLocationEnum.AucklandNorth]: 'Auckland / Tāmaki Makaurau',
    [HouseholdLocationEnum.AucklandCentral]: 'Auckland / Tāmaki Makaurau',
    [HouseholdLocationEnum.AucklandEast]: 'Auckland / Tāmaki Makaurau',
    [HouseholdLocationEnum.AucklandWest]: 'Auckland / Tāmaki Makaurau',
    [HouseholdLocationEnum.AucklandSouth]: 'Auckland / Tāmaki Makaurau',
    [HouseholdLocationEnum.Waikato]: 'Waikato',
    [HouseholdLocationEnum.BayOfPlenty]: 'Bay of Plenty',
    [HouseholdLocationEnum.Gisborne]: 'Gisborne',
    [HouseholdLocationEnum.HawkesBay]: 'Hawke\'s Bay',
    [HouseholdLocationEnum.Taranaki]: 'Taranaki',
    [HouseholdLocationEnum.ManawatuWanganui]: 'Manawatu-Wanganui',
    [HouseholdLocationEnum.Wellington]: 'Wellington',
    [HouseholdLocationEnum.Tasman]: 'Tasman',
    [HouseholdLocationEnum.Nelson]: 'Nelson',
    [HouseholdLocationEnum.Marlborough]: 'Marlborough',
    [HouseholdLocationEnum.WestCoast]: 'West Coast',
    [HouseholdLocationEnum.Canterbury]: 'Canterbury',
    [HouseholdLocationEnum.Otago]: 'Otago',
    [HouseholdLocationEnum.Southland]: 'Southland',
    [HouseholdLocationEnum.StewartIsland]: 'Stewart Island',
    [HouseholdLocationEnum.ChathamIslands]: 'Chatham Islands',
    [HouseholdLocationEnum.GreatBarrierIsland]: 'Great Barrier Island',
    [HouseholdLocationEnum.Overseas]: 'Overseas',
    [HouseholdLocationEnum.Other]: 'Other'
};
console.log('householdFormText locationMapping:', locationMapping);

export const spaceHeatingMapping: { [key in HouseholdSpaceHeatingEnum]: string } = {
    [HouseholdSpaceHeatingEnum.ElectricResistance]: 'Electric resistive heaters (e.g. oil column, fan, wall)',
    [HouseholdSpaceHeatingEnum.ElectricHeatPump]: 'Heat pump(s)',
    [HouseholdSpaceHeatingEnum.Wood]: 'Wood fire',
    [HouseholdSpaceHeatingEnum.Gas]: 'Piped/ducted gas heater',
    [HouseholdSpaceHeatingEnum.Lpg]: 'Bottled LPG heater',
    [HouseholdSpaceHeatingEnum.DontKnow]: 'Not sure'
};

export const waterHeatingMapping: { [key in HouseholdWaterHeatingEnum]: string } = {
    [HouseholdWaterHeatingEnum.ElectricResistance]: 'Electric resistive',
    [HouseholdWaterHeatingEnum.ElectricHeatPump]: 'Heat pump',
    [HouseholdWaterHeatingEnum.Gas]: 'Piped/ducted gas',
    [HouseholdWaterHeatingEnum.Lpg]: 'Bottled LPG',
    [HouseholdWaterHeatingEnum.Solar]: 'Solar',
    [HouseholdWaterHeatingEnum.DontKnow]: 'Not sure'
};

export const cooktopMapping: { [key in HouseholdCooktopEnum]: string } = {
    [HouseholdCooktopEnum.ElectricResistance]: 'Electric resistive/Ceramic',
    [HouseholdCooktopEnum.Gas]: 'Piped/ducted gas',
    [HouseholdCooktopEnum.Lpg]: 'Bottled LPG',
    [HouseholdCooktopEnum.ElectricHeatPump]: 'Induction', // NB error in api, needs updating to Induction
    [HouseholdCooktopEnum.DontKnow]: 'Not sure'
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


let locationList: string[] = Object.values(HouseholdLocationEnum)
    .map((location:  HouseholdLocationEnum) => locationMapping[location]);
console.log('householdFormText locationList:', locationList);

const locationSet: string[] = [...new Set(locationList)];
console.log('householdFormText locationSet:', locationSet);

const locationEntries = Object.entries(locationMapping);
// export const locationOptions = Object.entries(locationMapping).map(([key, value]) => ({
export const locationOptions = locationSet.map((locationName) => ({
        value: locationEntries.find(([key, value]) => value === locationName)![0] as HouseholdLocationEnum,
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
    value: key as HouseholdSpaceHeatingEnum,
    text: value
})) as Option[];
    

const waterHeatingMap_noSolar = { // Temp work around until API is updated
    [HouseholdWaterHeatingEnum.ElectricResistance]: 'Electric resistive',
    [HouseholdWaterHeatingEnum.ElectricHeatPump]: 'Heat pump',
    [HouseholdWaterHeatingEnum.Gas]: 'Piped/ducted gas',
    [HouseholdWaterHeatingEnum.Lpg]: 'Bottled LPG',
    [HouseholdWaterHeatingEnum.DontKnow]: 'Not sure'
};
export const waterHeatingOptions = Object.entries(waterHeatingMap_noSolar).map(([key, value]) => ({
    value: key as HouseholdWaterHeatingEnum,
    text: value
})) as Option[];

export const cooktopOptions = Object.entries(cooktopMapping).map(([key, value]) => ({
    value: key as HouseholdCooktopEnum,
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
        { type: 'Low', value: 80, unit: '<100 km/wk' },
        { type: 'Medium', value: 200, unit: '100-300 km/wk' },
        { type: 'High', value: 500, unit: '300+ km/wk' }
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
// export const defaultValues: Household = {
export const defaultValues: HouseholdFormState = {
    location: HouseholdLocationEnum.AucklandNorth,
    occupancy: 3,
    spaceHeating: HouseholdSpaceHeatingEnum.Wood,
    waterHeating: HouseholdWaterHeatingEnum.Gas,
    cooktop: HouseholdCooktopEnum.Gas,
    numberOfVehicles: 2,
    // vehicles: [
    //     {
    //         fuelType: VehicleFuelTypeEnum.Hybrid,
    //         kmsPerWeek: 150,
    //         switchToEV: true
    //     },
    //     {
    //         fuelType: VehicleFuelTypeEnum.Petrol,
    //         kmsPerWeek: 200,
    //         switchToEV: true
    //     }
    // ],
    vehicleObjs: [
        {
            id: 1,
            fuelType: VehicleFuelTypeEnum.Hybrid,
            // usage: vehicleOptions.usageOptions[1]
            usageType: ('Medium' as UsageType),
        },
        {
            id: 2,
            fuelType: VehicleFuelTypeEnum.Petrol,
            // usage: vehicleOptions.usageOptions[0]
            usageType: ('Low' as UsageType),
        }
    ],
    solar: {
        hasSolar: false,
        size: 7,
        installSolar: false,
        unit: 'kW'
    },
    battery: {
        hasBattery: false,
        capacity: 7,
        unit: 'kWh'
    }
};

// -----------------------------------------------------









// -------------------- Tooltip Text --------------------

const tooltipText = {
    // location: 'Select the region where you live.',
    // occupancy: 'Select the number of people living in your household.',
    spaceHeating: 'If you have multiple ways of heating your house, pick the one that you use the most.',
    waterHeating: 'How your hot water tank is heated.',
    cooktop: 'If you have multiple cooktops, pick the one that you use the most.',
    solar: {
        hasSolar: 'If you have any solar panels in use (whether on roof or ground), select Yes. If you don’t have solar yet, select whether you would like to calculate your savings based on getting solar.',
        size: 'The total capacity of your solar panel system. 9 kW is the average in Australia and enough for 2 EVs, 7 kW is enough for 1 EV.',
    },
    battery: {
        hasBattery: 'If you have a home battery, select Yes. If you don’t have a battery yet, select whether you would like to calculate your savings based on getting one.',
        capacity: 'The total capacity of your home battery system. A Tesla Powerwall is 5 kW.'
    }
    // vehicle: {
    //     amount: 'Select the number of vehicles in your household.',
    //     fuelType: 'Select the fuel type of your vehicle(s).',
    // }
};
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
    defaultValues: HouseholdFormState;
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
    defaultValues: defaultValues,
    tooltipText: tooltipText
};

// -----------------------------------------------------



// -----------------------------------------------------

































// let locations = Object.values(HouseholdLocationEnum)
//     .map((location:  HouseholdLocationEnum) => locationMapping[location]);
// const locationOptions = [...new Set(locations)];

// let spaceHeatingOptions = Object.values(HouseholdSpaceHeatingEnum)
//     .map((spaceHeating: HouseholdSpaceHeatingEnum) => spaceHeatingMapping[spaceHeating]);

// let waterHeatingOptions = Object.values(HouseholdWaterHeatingEnum)
//     .map((waterHeating: HouseholdWaterHeatingEnum) => waterHeatingMapping[waterHeating]);

// let cooktopOptions = Object.values(HouseholdCooktopEnum)
//     .map((cooktop: HouseholdCooktopEnum) => cooktopMapping[cooktop]);

// let vehicleOptions = Object.values(VehicleFuelTypeEnum)
//     .map((vehicle: VehicleFuelTypeEnum) => vehicleMapping[vehicle]);

// console.log('householdFormText locations:', locations);
// console.log('householdFormText spaceHeatingOptions:', spaceHeatingOptions);
// console.log('householdFormText waterHeatingOptions:', waterHeatingOptions);
// console.log('householdFormText cooktopOptions:', cooktopOptions);
// console.log('householdFormText vehicleOptions:', vehicleOptions);

// const numberOptions = (Array.from(Array(10).keys()));

// export const formText: FormText = {
//     location: {
//         options: locationOptions,
//         default: locationOptions[1],
//     },
//     occupancy:{ 
//         options: Array.from(Array(15).keys()),
//         default: 2
//     },
//     spaceHeating: {
//         options: spaceHeatingOptions,
//         default: spaceHeatingOptions[0],
//     },
//     waterHeating: {
//         options: waterHeatingOptions,
//         default: waterHeatingOptions[0],
//     },
//     cooktop: {
//         options: cooktopOptions,
//         default: cooktopOptions[0],
//     },
//     vehicle: {        
//         amount: {
//             options: Array.from(Array(4).keys()),
//             default: 2
//         },
//         fuelType: {
//             options: vehicleOptions,
//             default: [ vehicleOptions[2], vehicleOptions[1]]
//         }
//     },
//     solar: {
//         haveSolar: {
//             options: ['No', 'Yes'],
//             default: false,
//         },
//         solarSize: {
//             options: Array.from(Array(20).keys()),
//             default: 7,
//         },
//     },
//     battery: {
//         haveBattery: {
//             options: ['No', 'Yes'],
//             default: false,
//         },
//         batterySize: {
//             options: Array.from(Array(20).keys()),
//             default: 7,
//         },
//     },
// }




//   const { register, handleSubmit, formState: { errors }, reset } = useForm<Household>({
//     defaultValues,
//   });









