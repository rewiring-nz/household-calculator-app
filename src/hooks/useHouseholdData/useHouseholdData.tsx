import { useState, useEffect } from 'react';
import HouseholdDataService from '../../services/householdDataService';
import { Household, Savings } from '../../shared/api/openapi-client';
// import { defaultSavingsData } from '../../assets/data/householdDefaults';
import useSavingsData from './useSavingsData';

const useHouseholdData = () => {
    const [householdData, setHouseholdData] = useState<Household>();
    const { savingsData, updateSavingsData, loadingData: savingsLoading, errorData: savingsError } = useSavingsData();
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [errorData, setErrorData] = useState<any>(null);

   const getHouseholdData = () => {
        HouseholdDataService.getHouseholdData()
            .then((data: Household) => {
                setHouseholdData(data);
                setLoadingData(false);
            })
            .catch((error: any) => {
                setErrorData(error);
                setLoadingData(false);
            });
    };
    
    useEffect(() => {
        getHouseholdData();
    } , []);

    const updateHouseholdData = (data: Household) => {
        setHouseholdData(data);
        HouseholdDataService.postHouseholdData(data)
            .then((savings: Savings | undefined) => {
                console.log('HouseholdDataService savings:', savings);
                if (savings) {
                    updateSavingsData(savings);
                }
            })
            .catch((error) => {
                setErrorData(error);
            });
    };

    return { 
        householdData, 
        updateHouseholdData, 
        savingsData, 
        loadingData: savingsLoading, 
        errorData: savingsError 
    };
};

export default useHouseholdData;