import React from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import './HouseholdForm.css';
import { Household } from '../../shared/api/household-calculator-client';
// import { Household, HouseholdCooktopEnum, HouseholdLocationEnum, HouseholdSpaceHeatingEnum, HouseholdWaterHeatingEnum } from '@generated/household-calculator-client';
// import { SavingsApi } from '@generated/household-calculator-client';
import { householdFormText } from './data/householdFormText';






const HouseholdForm: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Household>();

  // const onSubmit = (data: any) => {
  const onSubmit = (formData: Household) => {
    console.log('Form formData:', formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='formContainer'>
      
      <div className='formBox'>
        <h4>Dwelling</h4>
        <label>Location</label>
        <FormControl sx={{ m: 1, minWidth: 120 }} error={!!errors.location}>
          {/* <InputLabel id="location-label">Location</InputLabel> */}
          <Select
            labelId="location-label"
            id="location"
            {...register('location', { required: true })}
            defaultValue=""
          >
            {householdFormText.location.options.map((location: string, i: number) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
          {errors.location && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
        <div>
          <label>Number of occupants</label>
          {/* <input {...register('occupancy', { required: true })} /> */}
          <select {...register('occupancy', { required: true })} id="occupancy">
            {/* <option value="" disabled selected>{householdFormText.occupancy}</option> */}
            {/* {householdFormText.locations.map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))} */}
            {Array.from(Array(10).keys()).map((occupant: number, i: number) => (
              <option key={occupant} value={occupant} selected={i === 2 ? true : false}>
                {occupant}
              </option>
            ))}
          </select> 
          {errors.occupancy && <span>This field is required</span>}
        </div>
      </div>

      <div className='formBox'>
        <h4>Appliances</h4>
        <div>
          <label>House heating</label>
          <select {...register('spaceHeating', { required: true })} id="spaceHeating">
            {/* <option value="" disabled selected>{householdFormText.spaceHeatingOptions[0]}</option> */}
            {householdFormText.spaceHeating.options.map((option: string, i: number) => ( 
              <option key={option} value={option} selected={i === 0 ? true : false}>
                {option}
              </option>
            ))}
          </select>
          {errors.spaceHeating && <span>This field is required</span>}
        </div>
        <div>
          <label>Water eating</label>
          <select {...register('waterHeating', { required: true })} id="waterHeating">
            {/* <option value="" disabled selected>{householdFormText.waterHeatingOptions[0]}</option> */}
            {householdFormText.waterHeating.options.map((option: string, i: number) => ( 
              <option key={option} value={option} selected={i === 0 ? true : false}>
                {option}
              </option>
            ))}
          </select>
          {errors.waterHeating && <span>This field is required</span>}
        </div>
        <div>
          <label>Cooktop</label>
          <select {...register('cooktop', { required: true })} id="cooktop">
            {/* <option value="" disabled selected>{householdFormText.cooktopOptions[0]}</option> */}
            {householdFormText.cooktop.options.map((option: string, i: number) => ( 
              <option key={option} value={option} selected={i === 0 ? true : false}>
                {option}
              </option>
            ))}
          </select>
          {errors.cooktop && <span>This field is required</span>}
        </div>
      </div>

      <div className='formBox'>
        <h4>Transport</h4>
        <div>
          <label>Number of vehicles</label>
          <textarea {...register('vehicles', { required: true })} />
          {errors.vehicles && <span>This field is required</span>}
        </div>
        {/* <div>          
          <textarea {...register('vehicle2', { required: false })} />          
        </div>
        <div>
          <textarea {...register('vehicle3', { required: false })} />
        </div> */}
      </div>

      <div className='formBox'>
        <h4>Solar</h4>
        <div>
          <label>Do you have solar panels?</label>
          <div>
            <label>
              <input type="radio" value="true" {...register('solar.hasSolar', { required: true })} />
              Yes
            </label>
            <label>
              <input type="radio" value="false" {...register('solar.hasSolar', { required: true })} />
              No
            </label>
            {errors.solar?.hasSolar && <span>This field is required</span>}
          </div>
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default HouseholdForm;