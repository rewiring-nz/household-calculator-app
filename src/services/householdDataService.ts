import axios from 'axios';
import { defaultHouseholdData, defaultSavingsData } from 'src/assets/data/householdDefaults';
import { Household, Savings } from 'src/shared/api/openapi-client';

// const householdAPI_URL = 'https://household-model.onrender.com/savings';
// const householdAPI_URL = 'https://household-model.onrender.com';
// const householdSavingsAPI_URL = 'http://localhost:3001/savings';
// const householdSavingsAPI_URL = 'https://household-model.onrender.com/savings';

let householdSavingsAPI_URL = 'https://household-model.onrender.com/savings';

if (process.env.NODE_ENV === 'development') {
    householdSavingsAPI_URL = 'http://127.0.0.1:8000/savings'; // http://127.0.0.1:8000
}


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

// export const getDefaultSavingsData = async (): Promise<Savings> => {
//     try {
//         // console.log('HouseholdDataService trying to get data');
//         // const response = await axios.get(`${householdAPI_URL}/defaults`);
//         // if (!response.data) {
//             console.log('HouseholdDataService no data, returning dummySavingsData');
//             return defaultSavingsData;
//         // }
//         // return response.data;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };
export const getDefaultSavingsData = (): Savings => {
    console.log('HouseholdDataService no data, returning dummySavingsData');
    return defaultSavingsData;
};




const postHouseholdData = async (data: Household): Promise<Savings | undefined> => {
    console.log('HouseholdDataService trying to post data', data);
    try {
        console.log('HouseholdDataService try to post data', data);
        console.log('HouseholdDataService householdSavingsAPI_URL:', householdSavingsAPI_URL);
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
        // if (!response.data) {
        //     return defaultSavingsData;
        // }
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
            console.error('Error response:', error.response);
            if (error.response?.status === 422) {
                console.error('Validation error details:', error.response.data.detail);
            }
        } else {
            console.error('Unexpected error:', error);
        }
        // return defaultSavingsData;
    }
};



const HouseholdDataService = {
    getHouseholdData,
    getDefaultSavingsData,
    postHouseholdData
};

export default HouseholdDataService;


