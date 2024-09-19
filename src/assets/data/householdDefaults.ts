import { 
    Household, 
    Savings, 
    LocationEnum, 
    SpaceHeatingEnum, 
    WaterHeatingEnum, 
    CooktopEnum, 
    VehicleFuelTypeEnum
 } from 'src/shared/api/openapi-client';



export const defaultHouseholdData: Household = {
    location: LocationEnum.AucklandNorth,
    occupancy: 2,
    spaceHeating: SpaceHeatingEnum.Wood,
    waterHeating: WaterHeatingEnum.Gas,
    cooktop: CooktopEnum.Gas,
    vehicles: [
        {
            fuelType: VehicleFuelTypeEnum.Hybrid,
            kmsPerWeek: 200,
            switchToEV: true
        },
        {
            fuelType: VehicleFuelTypeEnum.Petrol,
            kmsPerWeek: 50,
            switchToEV: true
        }
    ],
    solar: {
        hasSolar: false,
        size: 7,
        installSolar: true
    },
    battery: {
        hasBattery: false,
        capacity: 10,
        installBattery: true
    }
};


// export const defaultSavingsData: Savings = {
//     "emissions": {
//         "perWeek": {
//             "before": 500.5,
//             "after": 100.1,
//             "difference": -55.98
//         },
//         "perYear": {
//             "before": 500.5,
//             "after": 100.1,
//             "difference": -400.4
//         },
//         "overLifetime": {
//             "before": 500.5,
//             "after": 100.1,
//             "difference": -400.4
//         },
//         "operationalLifetime": 15
//     },
//     "opex": {
//         "perWeek": {
//             "before": 500.5,
//             "after": 100.1,
//             "difference": -33.84
//         },
//         "perYear": {
//             "before": 500.5,
//             "after": 100.1,
//             "difference": -400.4
//         },
//         "overLifetime": {
//             "before": 500.5,
//             "after": 100.1,
//             "difference": -400.4
//         },
//         "operationalLifetime": 15
//     },
//     "upfrontCost": {
//         "solar": 15944.44,
//         "battery": 10000,
//         "cooktop": 2695,
//         "waterHeating": 6999,
//         "spaceHeating": 3778
//     }
// }
export const defaultSavingsData: Savings = {
    "emissions": {
      "perWeek": {
        "before": 71.16,
        "after": 15.18,
        "difference": -55.98
      },
      "perYear": {
        "before": 3712.79,
        "after": 792.01,
        "difference": -2920.78
      },
      "overLifetime": {
        "before": 55691.83,
        "after": 11880.08,
        "difference": -43811.75
      },
      "operationalLifetime": 15
    },
    "opex": {
      "perWeek": {
        "before": 103.47,
        "after": 69.63,
        "difference": -33.84
      },
      "perYear": {
        "before": 5936.81,
        "after": 3632.77,
        "difference": -2304.04
      },
      "overLifetime": {
        "before": 89199.13,
        "after": 54491.53,
        "difference": -34707.6
      },
      "operationalLifetime": 15
    },
    "upfrontCost": {
      "solar": 15944.44,
      "battery": 10000,
      "cooktop": 2695,
      "waterHeating": 6999,
      "spaceHeating": 3778
    },
    "recommendation": {
      "action": "SOLAR",
      "url": "https://www.rewiring.nz/electrification-guides/solar"
    }
  }