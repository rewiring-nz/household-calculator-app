import { useState, useEffect } from "react";
import HouseholdDataService from "../../services/householdDataService";
import { Household, Savings } from "../../shared/api/openapi-client";
import useSavingsData from "./useSavingsData";

const useHouseholdData = () => {
  const [householdData, setHouseholdData] = useState<Household>();
  const {
    savingsData,
    updateSavingsData,
    loadingData: savingsLoading,
    errorData: savingsError,
  } = useSavingsData();
  const [, setLoadingData] = useState<boolean>(true);
  const [, setErrorData] = useState(null);

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
  }, []);

  const updateHouseholdData = (data: Household) => {
    setHouseholdData(data);
    HouseholdDataService.postHouseholdData(data)
      .then((savings: Savings | undefined) => {
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
    errorData: savingsError,
  };
};

export default useHouseholdData;
