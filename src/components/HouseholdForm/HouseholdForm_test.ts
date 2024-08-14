import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HouseholdForm from './HouseholdForm';
import '@testing-library/jest-dom/extend-expect';

// describe('HouseholdForm', () => {
//   test('renders the form correctly', () => {
//     render(<HouseholdForm />);
//     expect(screen.getByText('Dwelling')).toBeInTheDocument();
//   });

//   test('submits the form', () => {
//     console.log = jest.fn(); // Mock console.log
//     render(<HouseholdForm />);
//     const submitButton = screen.getByRole('button', { name: /submit/i });
//     fireEvent.click(submitButton);
//     expect(console.log).toHaveBeenCalledWith(expect.stringContaining('HouseholdForm onSubmit formData:'));
//   });

//   test('adds and removes vehicles', () => {
//     render(<HouseholdForm />);
//     const vehicleInput = screen.getByLabelText('Number of Vehicles');
//     fireEvent.change(vehicleInput, { target: { value: 2 } });
//     expect(screen.getAllByTestId('vehicle')).toHaveLength(2);

//     fireEvent.change(vehicleInput, { target: { value: 1 } });
//     expect(screen.getAllByTestId('vehicle')).toHaveLength(1);
//   });

//   test('resets the form', () => {
//     console.log = jest.fn(); // Mock console.log
//     render(<HouseholdForm />);
//     const resetButton = screen.getByRole('button', { name: /reset/i });
//     fireEvent.click(resetButton);
//     expect(console.log).toHaveBeenCalledWith(expect.stringContaining('HouseholdForm watch value:'));
//   });
// });