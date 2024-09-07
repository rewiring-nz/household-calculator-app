import React from 'react';
import { RecommendationActionEnum } from 'src/shared/api/openapi-client';
import RecommendationImage from './RecommendationImage';

export interface RecommendationAction {
    getDescription: (params: Record<string, string>) => string;
    buttonText: string | null;
    imageComponent?: React.ReactNode;
}


export const recommendationActions: Record<RecommendationActionEnum, RecommendationAction> = {
    [RecommendationActionEnum.SpaceHeating]: {
        getDescription: ({ currentSpaceHeater }) => `Swap out your ${currentSpaceHeater} for electric heat pumps.`,
        buttonText: "Show me how",
        imageComponent: <RecommendationImage type="heatPump" alt="Heat Pump" />
    },
    [RecommendationActionEnum.WaterHeating]: {
        getDescription: ({ currentWaterHeater }) => `Swap out your ${currentWaterHeater} for an electric heat pump water heater.`,
        buttonText: "Show me how",
        imageComponent: <RecommendationImage type="waterHeating" alt="Water Heating" />
    },
    [RecommendationActionEnum.Cooking]: {
        getDescription: ({ currentCooktop }) => `Swap out your ${currentCooktop} for an induction cooktop.`,
        buttonText: "Show me how",
        imageComponent: <RecommendationImage type="cooktop" alt="Cooktop" />
    },
    [RecommendationActionEnum.Vehicle]: {
        getDescription: () => `Swap out one of your non-electric vehicles for an EV.`,
        buttonText: "Show me how",
        imageComponent: <RecommendationImage type="ev" alt="Electric Vehicle" />
    },
    [RecommendationActionEnum.Solar]: {
        getDescription: () => `Install rooftop solar to save money on power.`,
        buttonText: "Show me how",
        imageComponent: <RecommendationImage type="solar" alt="Solar Panels" />
    },
    [RecommendationActionEnum.Battery]: {
        getDescription: () => `Install a home battery for power bill savings & better resilience.`,
        buttonText: "Show me how",
        imageComponent: <RecommendationImage type="battery" alt="Home Battery" />
    },
    [RecommendationActionEnum.FullyElectrified]: {
        getDescription: () => `You're fully electrified! Boost your impact by subscribing to our newsletter. We'll update you with ways to bring electrification to your community.`,
        buttonText: null // Hide button so it flows straight into newsletter signup
        // Also no image for this one
    }
};