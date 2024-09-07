import React from 'react';
import heatPumpImage from 'src/assets/images/next-step_heat-pump-x2.png';
import waterHeatingImage from 'src/assets/images/next-step_waterheating-x2.png';
import cooktopImage from 'src/assets/images/next-step_cooktop-x2.png';
import evImage from 'src/assets/images/next-step_ev-x2.png';
import solarImage from 'src/assets/images/next-step_solar-x2.png';
import batteryImage from 'src/assets/images/next-step_battery-x2.png';

const imageMap = {
    heatPump: heatPumpImage,
    waterHeating: waterHeatingImage,
    cooktop: cooktopImage,
    ev: evImage,
    solar: solarImage,
    battery: batteryImage,
};

interface RecommendationImageProps {
    type: keyof typeof imageMap;
    alt: string;
}

const RecommendationImage: React.FC<RecommendationImageProps> = ({ type, alt }) => {
    return <img src={imageMap[type]} alt={alt} />;
};

export default RecommendationImage;