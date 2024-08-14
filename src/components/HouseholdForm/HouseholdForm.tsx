import React, { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Box, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, styled, SvgIcon, Tooltip, Typography, useTheme } from '@mui/material';
import './HouseholdForm.css';
import { Household, Vehicle, VehicleFuelTypeEnum } from '../../shared/api/household-calculator-client';
// import { Household, HouseholdCooktopEnum, HouseholdLocationEnum, HouseholdSpaceHeatingEnum, HouseholdWaterHeatingEnum } from '@generated/household-calculator-client';
// import { SavingsApi } from '@generated/household-calculator-client';
// import { formText } from './data/householdFormText';
import { 
  locationOptions,
  occupancyOptions,
  spaceHeatingOptions,
  waterHeatingOptions,
  cooktopOptions,
  vehicleOptions,
  solarOptions,
  batteryOptions,  
  defaultValues,
  tooltipText
 } from './data/householdFormText';
 import { FormState, Option, OptionNumber, OptionYesNo } from './data/interfaces';
import questionIcon from '../../assets/icons/question.svg';
import resetIcon from '../../assets/icons/carbon-reset.svg';
import FormBox, { FormContainer, ResetButton, tooltipPoppers } from './HouseholdForm.styles';

// const formBox = {
//     display: 'grid',
//     align-items: 'center',
//     justify-content: 'center',
//     margin: 'auto',
//     min-width: '300px'
//   }




const HouseholdForm: React.FC = () => {
  // const { register, handleSubmit, watch, control, formState: { errors }, reset } = useForm<Household>({
  const { register, handleSubmit, watch, control, formState: { errors }, reset } = useForm<FormState>({
    defaultValues,
  });

  const watchAllFields = watch();
  const theme = useTheme();

  
  // ----------------- Vehicle onChange -----------------
  // const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  // const [vehicleErrors, setErrors] = useState<{ vehicles?: boolean }>({});



  // React.useEffect(() => {
  //   if (vehicles) {
  //     watchAllFields.vehicles = vehicles;
  //   }
  // }, [vehicles, watchAllFields]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vehicles',
  });

  const numberOfVehicles = watch('numberOfVehicles');
  // const numberOfVehicles = watchAllFields.vehicles?.length || 0 ;

  React.useEffect(() => {
    const currentLength = fields.length;
    const fuelTypes = Object.values(VehicleFuelTypeEnum);

    if (numberOfVehicles > currentLength) {
      for (let i = currentLength; i < numberOfVehicles; i++) {
        // append({ fuelType: '' });
        append({ fuelType: fuelTypes[i % fuelTypes.length] });
      }
    } else {
      for (let i = currentLength; i > numberOfVehicles; i--) {
        remove(i - 1);
      }
    }
  }, [numberOfVehicles, append, remove, fields.length]);



  React.useEffect(() => {
    const subscription = watch((value , { name, type }) => {
      console.log('HouseholdForm watch value:', value);
      console.log('HouseholdForm watch name:', name);
      console.log('HouseholdForm watch type:', type);
    });
    return () => subscription.unsubscribe();
  });


  
  // const createVehicle = (count: number): Vehicle[] => {
  //   const fuelTypes = Object.values(VehicleFuelTypeEnum);
  //   return Array.from(Array(count).keys()).map((_, index) => ({
  //     fuelType: fuelTypes[index % fuelTypes.length]
  //   }));
  // }

  // const addVehicle = (count: number) => {
  //   setVehicles((prev) => [
  //     ...prev,
  //     ...createVehicle(count)
  //   ]);
  // };
      
  // const removeVehicle = (count: number) => {
  //   setVehicles((prevVehicles) => prevVehicles.slice(0, prevVehicles.length - count));
  // };


  // const handleVehiclesChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  // const handleVehiclesChange = (event: SelectChangeEvent<number>) => {
  //   const newAmount = event.target.value as number;
  //   if (newAmount > vehicles.length) {
  //     addVehicle(newAmount - vehicles.length);
  //   } else {
  //     removeVehicle(vehicles.length - newAmount);
  //   }
  // };

  // const handleReset = (data: any) => {
    const onSubmit = (formData: Household) => {
      console.log('HouseholdForm onSubmit formData:', formData);
    };
  


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <button type="button" onClick={() => reset()}>Reset</button> */}
      <ResetButton theme={theme} type="button" onClick={() => reset()}>
        <img src={resetIcon} className="Home-logo" alt="logo" />
        <Typography variant="body2">Reset</Typography>
      </ResetButton>

      <FormContainer theme={theme} className='formContainer'>

      {/* <div className='formBox'> */}

      {/* <Box sx={styles.box}> */}
      <FormBox theme={theme} className='formBox'>
        <Divider />
        <Typography variant="h3">Dwelling</Typography>

        <Box>
        {/* <label>Location</label> */}
        {/* <FormControl error={!!errors.location}> */}
        <FormControl error={!!errors.location}>
          {/* <InputLabel id="location-label">Location</InputLabel> */}
          <FormLabel>Location</FormLabel>
          {/* <Controller
                name="location"
                control={control}
                // defaultValue={defaultValues.location}                
                render={({ field }) => ( */}
                  <Select
                    // {...field}
                    labelId="location-label"
                    id="location"
                    value={watchAllFields.location}
                    {...register('location', { required: true })}
                    // defaultValue={defaultValues.location}
                    >
            {/* {formText.location.options.map((option: string, i: number) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))} */}
                {locationOptions.map((option: Option, i: number) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.text}
                  </MenuItem>
                ))}

          </Select>
           {/* )}
          /> */}
          {errors.location && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
        </Box>

        <Box>
        <FormControl error={!!errors.occupancy}>
          <FormLabel>Number of occupants</FormLabel>
          <Select 
            labelId="occupancy-label"
            id="occupancy"
            value={watchAllFields.occupancy}
            {...register('occupancy', { required: true })}
            // defaultValue={formText.occupancy.default}
          >
            {occupancyOptions.map((option: OptionNumber) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
          {errors.occupancy && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
        </Box>
      </FormBox>
      {/* </div> */}



      <FormBox theme={theme} className='formBox'>
        <Divider />

        <Typography variant="h3">Appliances</Typography>


        <Box>
        <FormControl error={!!errors.spaceHeating}>
          <Box display="flex" alignItems="center">
            <FormLabel>House heating</FormLabel>            
            <Tooltip title={tooltipText.spaceHeating} placement="right">
            {/* <Tooltip title={tooltipText.spaceHeating} placement="right" PopperProps={tooltipPoppers}> */}
              {/* <SvgIcon component={questionIcon as React.ElementType}> */}
              <img src={questionIcon} className="tooltip-logo" alt="logo" />
            </Tooltip>
          </Box>

          <Select
            labelId="spaceHeating-label"
            id="spaceHeating"
            value={watchAllFields.spaceHeating}
            {...register('spaceHeating', { required: true })}
            // defaultValue={spaceHeatingOptions.default}
          >
            {spaceHeatingOptions.map((option: Option, i: number) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
          {errors.spaceHeating && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
        </Box>

        <Box>
        <FormControl error={!!errors.waterHeating}>
          <Box display="flex" alignItems="center">
            <FormLabel>Water heating</FormLabel>
            <Tooltip title={tooltipText.waterHeating} placement="right">
              <img src={questionIcon} className="tooltip-logo" alt="logo" />
            </Tooltip>
          </Box>
          
          <Select 
            labelId="waterHeating-label"
            id="waterHeating"
            value={watchAllFields.waterHeating}
            {...register('waterHeating', { required: true })}            
          >
            {waterHeatingOptions.map((option: Option, i: number) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
          {errors.waterHeating && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
        </Box>

        <Box>
        <FormControl error={!!errors.cooktop}>
          <Box display="flex" alignItems="center">            
            <FormLabel>Cooktop</FormLabel>
            <Tooltip title={tooltipText.cooktop} placement="right">
              <img src={questionIcon} className="tooltip-logo" alt="logo" />
            </Tooltip>
          </Box>
          <Select
            labelId="cooktop-label"
            id="cooktop"
            value={watchAllFields.cooktop}
            {...register('cooktop', { required: true })}
          >
            {cooktopOptions.map((option: Option, i: number) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
          {errors.cooktop && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
        </Box>

      </FormBox>







      <FormBox theme={theme} className='formBox'>
        <Divider />
        
        <Typography variant="h3">Transport</Typography>

            
        <Box>
        <FormControl error={!!errors.vehicles}>
          <FormLabel>Number of vehicles</FormLabel>
          {/* <Label id="location-label">Car 1</Label> */}
          {/* <Select
            labelId="vehicles-label"
            id="numberOfVehicles"
            value={numberOfVehicles}
            // defaultValue={defaultValues.vehicles?.length || 2}
            // onChange={handleVehiclesChange}
            // value={watchAllFields.vehicles?.length || formText.vehicle.amount.default}
            // value={watchAllFields.vehicles?.length}
            // {...register('vehicles', { required: true })}
            // defaultValue={formText.vehicle.amount.default}
          > */}
          <Controller
            name="numberOfVehicles"
            control={control}
            render={({ field }) => (
            <Select
              labelId="number-of-vehicles-label"
              {...field}
            >

            {vehicleOptions.amount.map((option: OptionNumber) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
            )}
          />
          {errors.vehicles && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
        </Box>

        <Box>        
        {/* {Array.from(Array(watchAllFields.vehicles).keys()).map((_, index: number) => ( */}
        {watchAllFields.vehicles?.map((vehicle: any, index: number) => (
          <div key={`Car-${index}`}>
            {/* <FormControl error={!!errors.vehicles?.[index]?.fuelType}> */}
            <FormControl error={!!errors.vehicles}>
              <FormLabel>Car {index + 1}</FormLabel>
              <Select
                labelId={`vehicles-fuelType-label-${index}`}
                id={`vehicles-fuelType-${index}`}
                // value={watchAllFields.vehicles?.[index]?.fuelType}
                value={vehicle.fuelType || ''}
                {...register(`vehicles.${index}.fuelType`, { required: true })}
              >
                {vehicleOptions.fuelType.map((option: Option) => (
                  // <MenuItem key={option.value} value={option.value}>
                  <MenuItem key={`fuelType-${option.value}`} value={option.value}>
                    {option.text}
                  </MenuItem>
                ))} 
                
                  {/* <MenuItem key={selectedVehicle} value={selectedVehicle}>
                    {selectedVehicle}
                  </MenuItem> */}
                
              </Select>
              {errors.vehicles && <FormHelperText>This field is required</FormHelperText>}
            </FormControl>
          </div>
        ))}
        </Box>
      </FormBox>


      <FormBox theme={theme} className='formBox'>
        <Divider />

        <Typography variant="h3">Solar</Typography>


        <Box>
        <FormControl error={!!errors.solar}>
          <Box display="flex" alignItems="center">                        
            <FormLabel>Do you have solar panels?</FormLabel>
            <Tooltip title={tooltipText.solar.hasSolar} placement="right">
              <img src={questionIcon} className="tooltip-logo" alt="logo" />
            </Tooltip>
          </Box>
          <RadioGroup
            aria-label="hasSolar"
            // value={watchAllFields.solar?.hasSolar && formText.solar.haveSolar.default}
            value={watchAllFields.solar?.hasSolar}            
            {...register('solar.hasSolar', { required: true })}
          >            
            {solarOptions.hasSolar.map((option: OptionYesNo, i: number) => (
              <FormControlLabel value={option.value} control={<Radio />} label={option.text} />
            ))}
          </RadioGroup>
        </FormControl>
        </Box>

        <Box>
        <FormControl error={!!errors.solar}>
          <Box display="flex" alignItems="center">            
            <FormLabel>What size?</FormLabel>            
            <Tooltip title={tooltipText.solar.size} placement="right">
              <img src={questionIcon} className="tooltip-logo" alt="logo" />
            </Tooltip>
          </Box>
          <Select
            labelId="solarSize-label"
            id="solarSize"
            value={watchAllFields.solar?.size}
            {...register('solar.size', { required: true })}
          >
            {solarOptions.size.map((option: OptionNumber, i: number) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
          {errors.solar && <FormHelperText>This field is required</FormHelperText>} 
        </FormControl>
        </Box>

      </FormBox>


      <FormBox theme={theme} className='formBox'>

        <Box>
        <FormControl error={!!errors.battery}>
          <Box display="flex" alignItems="center">            
            <FormLabel>Do you have a battery?</FormLabel>            
            <Tooltip title={tooltipText.battery.hasBattery} placement="right">
              <img src={questionIcon} className="tooltip-logo" alt="logo" />
            </Tooltip>
          </Box>

          <RadioGroup
            // aria-label="hasBattery"
            // labelId="hasBattery-label"
            id="hasBattery"
            value={watchAllFields.battery?.hasBattery}
            {...register('battery.hasBattery', { required: true })}
          >
            {batteryOptions.hasBattery.map((option: OptionYesNo, i: number) => (
              <FormControlLabel value={option.value} control={<Radio />} label={option.text} />
            ))}
          </RadioGroup>
        </FormControl>
        </Box>

        <Box>
        <FormControl error={!!errors.battery}>
          <Box display="flex" alignItems="center">            
            <FormLabel>What size?</FormLabel>            
            <Tooltip title={tooltipText.battery.capacity} placement="right" PopperProps={tooltipPoppers}>
              <img src={questionIcon} className="tooltip-logo" alt="logo" />
            </Tooltip>
          </Box>
          <Select
            labelId="batterySize-label"
            id="batterySize"
            value={watchAllFields.battery?.capacity}
            {...register('battery.capacity', { required: true })}
          >
            {batteryOptions.capacity.map((option: OptionNumber, i: number) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
          {errors.battery && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
        </Box>
        
      </FormBox>


      </FormContainer>      
    </form>
  );
};

export default HouseholdForm;