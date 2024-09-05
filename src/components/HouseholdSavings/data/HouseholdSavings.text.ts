import { RecommendationActionEnum } from 'src/shared/api/openapi-client';

export interface RecommendationAction {
    getDescription: (params: Record<string, string>) => string;
    buttonText: string | null;
}

export const recommendationActions: Record<RecommendationActionEnum, RecommendationAction> = {
    [RecommendationActionEnum.SpaceHeating]: {
        getDescription: ({ currentSpaceHeater }) => `Swap out your ${currentSpaceHeater} for electric heat pumps.`,
        buttonText: "Show me how"
    },
    [RecommendationActionEnum.WaterHeating]: {
        getDescription: ({ currentWaterHeater }) => `Swap out your ${currentWaterHeater} for an electric heat pump water heater.`,
        buttonText: "Show me how"
    },
    [RecommendationActionEnum.Cooking]: {
        getDescription: ({ currentCooktop }) => `Swap out your ${currentCooktop} for an induction cooktop.`,
        buttonText: "Show me how"
    },
    [RecommendationActionEnum.Vehicle]: {
        getDescription: () => `Swap out one of your non-electric vehicles for an EV.`,
        buttonText: "Show me how"
    },
    [RecommendationActionEnum.Solar]: {
        getDescription: () => `Install rooftop solar to save money on power.`,
        buttonText: "Show me how"
    },
    [RecommendationActionEnum.Battery]: {
        getDescription: () => `Install a home battery for power bill savings & better resilience.`,
        buttonText: "Show me how"
    },
    [RecommendationActionEnum.FullyElectrified]: {
        getDescription: () => `You're fully electrified! Boost your impact by subscribing to our newsletter. We'll update you with ways to bring electrification to your community.`,
        buttonText: null // Hide button so it flows straight into newsletter signup
    }
};