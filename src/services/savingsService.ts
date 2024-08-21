import { BehaviorSubject } from 'rxjs';
import { Savings } from '../shared/api/household-calculator-client/models/Savings';
import { defaultSavingsData } from '../assets/data/householdDefaults';

const savingsSubject = new BehaviorSubject<Savings>(defaultSavingsData);

export const savingsService = {
    getSavings: () => savingsSubject.asObservable(),
    setSavings: (data: Savings) => savingsSubject.next(data),
};