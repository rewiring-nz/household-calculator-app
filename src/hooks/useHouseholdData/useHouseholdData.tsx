import { useState, useEffect } from 'react';
import HouseholdDataService from '../../services/householdDataService';
import { Household, HouseholdCooktopEnum, HouseholdLocationEnum, HouseholdSpaceHeatingEnum, HouseholdWaterHeatingEnum, Savings, VehicleFuelTypeEnum } from 'src/shared/api/household-calculator-client';
// import { defaultSavingsData } from './HouseholdDefaults';
import { defaultSavingsData } from '../../assets/data/householdDefaults';
import { useSavings } from './useSavings';

const useHouseholdData = () => {
    const [householdData, setHouseholdData] = useState<Household>();
    // const [savingsData, setSavingsData] = useState<Savings>(defaultSavingsData);
    const [savingsData, setSavingsData] = useSavings();
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

    const getDefaultSavingsData = () => {
        // HouseholdDataService.getDefaultSavingsData()
        //     .then((data: Savings) => {
        //         console.log("useHouseholdData getDefaultSavingsData response:", data);
        //         setSavingsData(data);
        //         setLoadingData(false);
        //     })
        //     .catch((error: any) => {
        //         setErrorData(error);
        //         setLoadingData(false);
        //     });
        setSavingsData(defaultSavingsData);
    };

    useEffect(() => {
        getDefaultSavingsData();
    } , []);

    // const getSavingsData = () => {
    //     HouseholdDataService.getSavingsData()
    //         .then((data: Savings) => {
    //             setSavingsData(data);
    //             setLoadingData(false);
    //         })
    //         .catch((error: any) => {
    //             setErrorData(error);
    //             setLoadingData(false);
    //         });
    // }

    useEffect(() => {
        console.log("updateHouseholdData savingsData updated:", savingsData);
    }, [savingsData]);
    
    const updateHouseholdData = (data: Household) => {
        console.log("useHouseholdData updateHouseholdData:", data);
        setHouseholdData(data);
        HouseholdDataService.postHouseholdData(data)
                .then((data: Savings) => {                    
                    console.log(" updateHouseholdData postHouseholdDat response setSavingsData:", data);
                    setSavingsData(data);
                    // console.log(" updateHouseholdData savingsData:", savingsData); asynchronous issue
                    setLoadingData(false);
                })
                .catch((error: any) => {
                    setErrorData(error);
                    setLoadingData(false);
            });
    };

    // useEffect(() => {
    //     console.log("useHouseholdData useEffect householdData:", householdData);
    //     console.log("useHouseholdData useEffect savingsData:", savingsData);
    //     console.log("useHouseholdData useEffect loadingData:", loadingData);
    //     console.log("useHouseholdData useEffect errorData:", errorData);
    // }, [householdData, savingsData, loadingData, errorData]);

    // const getSavingsData = (): Savings => {
    //     if(savingsData) {
    //         return savingsData;
    //     } else {
    //         return defaultSavingsData;
    //     }
    // }
    const getSavingsData = (): Savings => {
        return savingsData;
    };
   

    return { householdData, updateHouseholdData, getSavingsData, loadingData, errorData };
};

export default useHouseholdData;