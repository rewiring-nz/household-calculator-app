import { Household, Savings, HouseholdCooktopEnum, HouseholdLocationEnum, HouseholdSpaceHeatingEnum, HouseholdWaterHeatingEnum, VehicleFuelTypeEnum } from 'src/shared/api/household-calculator-client';



export const defaultHouseholdData: Household = {
    location: HouseholdLocationEnum.AucklandNorth,
    occupancy: 2,
    spaceHeating: HouseholdSpaceHeatingEnum.DontKnow,
    waterHeating: HouseholdWaterHeatingEnum.DontKnow,
    cooktop: HouseholdCooktopEnum.DontKnow,
    vehicles: [
        {
            fuelType: VehicleFuelTypeEnum.Hybrid,
            kmsPerWeek: 0,
            switchToEV: false
        },
        {
            fuelType: VehicleFuelTypeEnum.Petrol,
            kmsPerWeek: 0,
            switchToEV: false
        }
    ],
    solar: {
        hasSolar: false,
        size: 7,
        installSolar: true
        // dontWantSolar: false
    },
    battery: {
        hasBattery: false,
        capacity: 0,
        installBattery: true
        // dontWantBattery: false
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