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
            switchToEV: false
        },
        {
            fuelType: VehicleFuelTypeEnum.Petrol,
            kmsPerWeek: 50,
            switchToEV: false
        }
    ],
    solar: {
        hasSolar: false,
        size: 7,
        installSolar: true
    },
    battery: {
        hasBattery: false,
        capacity: 7,
        installBattery: true
    }
};


export const defaultSavingsData: Savings = {
    "emissions": {
        "perWeek": {
            "before": 500.5,
            "after": 100.1,
            "difference": 401.4
        },
        "perYear": {
            "before": 500.5,
            "after": 100.1,
            "difference": 400.4
        },
        "overLifetime": {
            "before": 500.5,
            "after": 100.1,
            "difference": 400.4
        },
        "operationalLifetime": 15
    },
    "opex": {
        "perWeek": {
            "before": 500.5,
            "after": 100.1,
            "difference": 402.4
        },
        "perYear": {
            "before": 500.5,
            "after": 100.1,
            "difference": 400.4
        },
        "overLifetime": {
            "before": 500.5,
            "after": 100.1,
            "difference": 400.4
        },
        "operationalLifetime": 15
    },
    "upfrontCost": {
        "solar": 0,
        "battery": 0,
        "cooktop": 0,
        "waterHeating": 0,
        "spaceHeating": 0
    }
}