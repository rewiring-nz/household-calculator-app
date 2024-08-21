import { useEffect, useState } from 'react';
import { savingsService } from '../../services/savingsService';
import { Savings } from '../../shared/api/household-calculator-client/models/Savings';
import { defaultSavingsData } from 'src/assets/data/householdDefaults';
import { firstValueFrom } from 'rxjs';

export const useSavings = (): [Savings, (data: Savings) => void] => {
    const [savingsData, setSavingsData] = useState<Savings>(defaultSavingsData);
    


    useEffect(() => {
        const fetchInitialData = async () => {
            const initialData = await firstValueFrom(savingsService.getSavings());
            setSavingsData(initialData);
        };

        fetchInitialData();
        
        const subscription = savingsService.getSavings().subscribe(setSavingsData);
        return () => subscription.unsubscribe();
    }, []);

    return [savingsData, savingsService.setSavings];
};