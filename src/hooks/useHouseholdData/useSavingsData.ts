import { useState, useEffect } from 'react';
import { Savings } from '../../shared/api/openapi-client';
import { defaultSavingsData } from '../../assets/data/householdDefaults';
import HouseholdDataService from '../../services/householdDataService';

const useSavingsData = () => {
    const [savingsData, setSavingsData] = useState<Savings>(defaultSavingsData);
    const [loadingData, setLoadingData] = useState<boolean>(true);
    const [errorData, setErrorData] = useState<any>(null);

    const getDefaultSavingsData = async () => {
        try {
            const data = await HouseholdDataService.getDefaultSavingsData();
            setSavingsData(data);
        } catch (error) {
            setErrorData(error);
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        getDefaultSavingsData();
    }, []);

    const updateSavingsData = (savings: Savings) => {
        setSavingsData(savings);
    };
        

    return { savingsData, updateSavingsData, loadingData, errorData };
};

export default useSavingsData;