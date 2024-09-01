import axios from 'axios';
import { defaultHouseholdData, defaultSavingsData } from 'src/assets/data/householdDefaults';
import { Household, HouseholdCooktopEnum, HouseholdLocationEnum, HouseholdSpaceHeatingEnum, HouseholdWaterHeatingEnum, Savings, VehicleFuelTypeEnum } from 'src/shared/api/household-calculator-client';

// const householdAPI_URL = 'https://household-model.onrender.com/savings';
// const householdAPI_URL = 'https://household-model.onrender.com';
// const householdSavingsAPI_URL = 'http://localhost:3001/savings';
const householdSavingsAPI_URL = 'https://household-model.onrender.com/savings';



// const dummySavingsData: Savings = {
//     "emissions": {
//         "perWeek": {
//             "before": 500.5,
//             "after": 100.1,
//             "difference": 401.4
//         },
//         "perYear": {
//             "before": 500.5,
//             "after": 100.1,
//             "difference": 400.4
//         },
//         "overLifetime": {
//             "before": 500.5,
//             "after": 100.1,
//             "difference": 400.4
//         },
//         "operationalLifetime": 15
//     },
//     "opex": {
//         "perWeek": {
//             "before": 500.5,
//             "after": 100.1,
//             "difference": 402.4
//         },
//         "perYear": {
//             "before": 500.5,
//             "after": 100.1,
//             "difference": 400.4
//         },
//         "overLifetime": {
//             "before": 500.5,
//             "after": 100.1,
//             "difference": 400.4
//         },
//         "operationalLifetime": 15
//     },
//     "upfrontCost": {
//         "solar": 0,
//         "battery": 0,
//         "cooktop": 0,
//         "waterHeating": 0,
//         "spaceHeating": 0
//     }
// }


// export const  getHouseholdData = async (): Promise<Household> => {
//     try {
//         const response = await axios.get(`${householdAPI_URL}/defaults`);
//         if (!response.data) {
//             return defaultHouseholdData;
//         }
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };
export const getHouseholdData = async (): Promise<Household> => {
    try {
        // console.log('HouseholdDataService trying to get data');
        // const response = await axios.get(`${householdAPI_URL}/defaults`);
        // if (!response.data) {
            console.log('HouseholdDataService no data, returning defaultHouseholdData');
            return defaultHouseholdData;
        // }
        // return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getDefaultSavingsData = async (): Promise<Savings> => {
    try {
        // console.log('HouseholdDataService trying to get data');
        // const response = await axios.get(`${householdAPI_URL}/defaults`);
        // if (!response.data) {
            console.log('HouseholdDataService no data, returning dummySavingsData');
            return defaultSavingsData;
        // }
        // return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// export const getSavingsData = async (): Promise<Savings> => {
//     try {
//         console.log('HouseholdDataService trying to get data');
//         const response = await axios.get(`${householdAPI_URL}/savings`);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         // throw error;
//         return dummySavingsData;
//     }
// }



const postHouseholdData = async (data: Household): Promise<Savings> => {
    console.log('HouseholdDataService trying to post data', data);
    try {
        console.log('HouseholdDataService try to post data', data);
        // const response = await axios.post(`${householdAPI_URL}/savings`, data);
        // const response = await axios.post(`${householdAPI_URL}/savings`, data, {
        // const response = await axios.post('https://household-model.onrender.com/savings', data, {
        const response = await axios.post(householdSavingsAPI_URL, data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // This is often set by the server, but you can include it here
            }
        });
        console.log('HouseholdDataService postHouseholdData response:', response.data);
        if (!response.data) {
            return defaultSavingsData;
        }
        return response.data;
    } catch (error) {
        console.error(error);
        return defaultSavingsData;
        // throw error;
    }
};


// export const saveHouseholdData = async (data: Household) => {
//     await postHouseholdData(data);
// };

const HouseholdDataService = {
    getHouseholdData,
    getDefaultSavingsData,
    postHouseholdData
};

export default HouseholdDataService;


