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
        capacity: 10,
        installBattery: true
    }
};


export const defaultSavingsData: Savings = {
    "emissions": {
        "perWeek": {
            "before": 500.5,
            "after": 100.1,
            "difference": -55.98
        },
        "perYear": {
            "before": 500.5,
            "after": 100.1,
            "difference": -400.4
        },
        "overLifetime": {
            "before": 500.5,
            "after": 100.1,
            "difference": -400.4
        },
        "operationalLifetime": 15
    },
    "opex": {
        "perWeek": {
            "before": 500.5,
            "after": 100.1,
            "difference": -33.84
        },
        "perYear": {
            "before": 500.5,
            "after": 100.1,
            "difference": -400.4
        },
        "overLifetime": {
            "before": 500.5,
            "after": 100.1,
            "difference": -400.4
        },
        "operationalLifetime": 15
    },
    "upfrontCost": {
        "solar": 15944.44,
        "battery": 10000,
        "cooktop": 2695,
        "waterHeating": 6999,
        "spaceHeating": 3778
    }
}