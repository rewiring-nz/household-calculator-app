import { Savings } from "src/shared/api/household-calculator-client";

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