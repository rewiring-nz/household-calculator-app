import axios from 'axios';
import { defaultHouseholdData, defaultSavingsData } from 'src/assets/data/householdDefaults';
import { Household, Savings } from 'src/shared/api/openapi-client';


let householdSavingsAPI_URL = 'https://household-model.onrender.com/savings';

if (process.env.NODE_ENV === 'development') {
    householdSavingsAPI_URL = 'http://127.0.0.1:8000/savings';
}



// For future when default is defined in API
export const getHouseholdData = async (): Promise<Household> => {
    try {
        // const response = await axios.get(`${householdAPI_URL}/defaults`);
        // if (!response.data) {
            return defaultHouseholdData;
        // }
        // return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getDefaultSavingsData = (): Savings => {
    return defaultSavingsData;
};




const postHouseholdData = async (data: Household): Promise<Savings | undefined> => {
    try {
        const response = await axios.post(householdSavingsAPI_URL, data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // This is often set by the server, but you can include it here
            }
        });
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


