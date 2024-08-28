import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Box, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Tooltip, Typography, useTheme } from '@mui/material';
import './HouseholdForm.css';
// import logo from '../../assets/logos/RewiringAotearoa_logo.svg';
import { Battery, Household, Solar, Vehicle, VehicleFuelTypeEnum } from '../../shared/api/household-calculator-client';
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
  // defaultValues,
  // tooltipText
  formText
 } from './data/householdFormText';
import { HouseholdFormState, Option, OptionNumber, OptionYesNo, UsageType, VehicleObject } from './data/interfaces';
import questionIcon from '../../assets/icons/question.svg';
import resetIcon from '../../assets/icons/carbon-reset.svg';
import { FormBox, HalfWidthFormBox, FormContainer, FormSection, ResetButton, tooltipPoppers } from './HouseholdForm.styles';
// import { IFormState } from 'src/shared/interfaces/IFormState';

import useHouseholdData from '../../hooks/useHouseholdData/useHouseholdData';
import { FDivider } from 'src/pages/Home/Home.styles';
import VehicleBox from './components/HouseholdVehicle';


// const formBox = {
//     display: 'grid',
//     align-items: 'center',
//     justify-content: 'center',
//     margin: 'auto',
//     min-width: '300px'
//   }




const HouseholdForm: React.FC = () => {
  const theme = useTheme();
  
  const { householdData, updateHouseholdData, getSavingsData, loadingData, errorData } = useHouseholdData();
  const savingsData = getSavingsData();

  

  const defaultValues = formText.defaultValues;
  const tooltipText = formText.tooltipText;


  // To do: Move completely to data service?
  const merged_defaultFormValues: HouseholdFormState = {
    location: householdData?.location ?? defaultValues.location,
    occupancy: householdData?.occupancy ?? defaultValues.occupancy,
    spaceHeating: householdData?.spaceHeating ?? defaultValues.spaceHeating,
    waterHeating: householdData?.waterHeating ?? defaultValues.waterHeating,
    cooktop: householdData?.cooktop ?? defaultValues.cooktop,
    numberOfVehicles: householdData?.vehicles?.length ?? defaultValues.vehicleObjs.length,
    // vehicles: householdData?.vehicles ?? defaultValues.vehicleObjs,
    vehicleObjs: defaultValues.vehicleObjs,
    solar: { 
      hasSolar: householdData?.solar?.hasSolar ?? defaultValues.solar.hasSolar,
      size: householdData?.solar?.size ?? defaultValues.solar.size,
      installSolar: householdData?.solar?.installSolar ?? defaultValues.solar.installSolar
    },
    battery: {
      hasBattery: householdData?.battery?.hasBattery ?? defaultValues.battery.hasBattery,
      capacity: householdData?.battery?.capacity ?? defaultValues.battery.capacity
    }
  };

  // const { register, handleSubmit, watch, control, formState: { errors }, reset } = useForm<Household>({
  const { register, handleSubmit, watch, control, formState: { errors }, reset, setValue } = useForm<HouseholdFormState>({
    defaultValues: merged_defaultFormValues,
  });

  const watchAllFields: HouseholdFormState = watch();
 
  


  
  // ----------------- useHouseholdData useEffect -------------------
 React.useEffect(() => {
    console.log('HouseholdForm useEffect householdData:', householdData);
    console.log('HouseholdForm useEffect savingsData:', savingsData);
    console.log('HouseholdForm useEffect loadingData:', loadingData);
 }, [householdData, savingsData, loadingData]);
//  }, [householdData, loadingData]);
// -------------------------------------------------------------------

 
 
 
 
 
 
 // ----------------- Manage the number of vehicles -------------------

  const { fields, append, remove } = useFieldArray({
    control,
    // name: 'vehicles',
    name: 'vehicleObjs',
  });
   
  const numberOfVehicles = watch('numberOfVehicles');

  React.useEffect(() => {
    const currentLength = fields.length;
    const fuelTypes = Object.values(VehicleFuelTypeEnum);

    if (numberOfVehicles > currentLength) {
      for (let i = currentLength; i < numberOfVehicles; i++) {
        // append({ fuelType: fuelTypes[i % fuelTypes.length] });
        // append({ id: (i + 1), fuelType: fuelTypes[i % fuelTypes.length], usage: { name: 'Medium', value: 200, unit: '100-300 km/wk' } });
        console.log('HouseholdForm useEffect append vehicle:', { id: (i + 1), fuelType: fuelTypes[i % fuelTypes.length], usageType: 'Medium' as UsageType });
        append({ 
          id: (i + 1), 
          fuelType: fuelTypes[i % fuelTypes.length], 
          usageType: 'Medium' as UsageType
        });
      }
    } else {
      for (let i = currentLength; i > numberOfVehicles; i--) {
        remove(i - 1);
      }
    }
  }, [numberOfVehicles, append, remove, fields.length]);

  const handleVehicleDelete = (index: number) => {
    remove(index);
    // if (numberOfVehicles && numberOfVehicles > 0) {
    //   reset({ numberOfVehicles: numberOfVehicles - 1 });
    // }
    if (numberOfVehicles && numberOfVehicles > 0) {
      setValue('numberOfVehicles', numberOfVehicles - 1);
    }
  };
  // -------------------------------------------------------------------








  // ----------------- Watch for changes in the form -------------------
  React.useEffect(() => {
    const subscription = watch((value , { name, type }) => {
      console.log('HouseholdForm watch value:', value);
      console.log('HouseholdForm watch name:', name);
      console.log('HouseholdForm watch type:', type);


      if(value) {        

        let householdDataOut: Household = {
          location: value.location || defaultValues.location,
          occupancy: value.occupancy || defaultValues.occupancy,
          spaceHeating: value.spaceHeating || defaultValues.spaceHeating,
          waterHeating: value.waterHeating || defaultValues.waterHeating,
          cooktop: value.cooktop || defaultValues.cooktop,
          // vehicles: (value.vehicles || defaultValues.vehicles) as Vehicle[],
          vehicles: (value.vehicleObjs || defaultValues.vehicleObjs)
            .filter((vehicle): vehicle is VehicleObject => vehicle !== undefined)
              .map((vehicle: VehicleObject) => {
                return {
                  fuelType: vehicle.fuelType,
                  usage: formText.options.vehicle.usageOptionsList.find(option => 
                    option.type === vehicle.usageType ) 
                    ||  { type: 'Medium', value: 200, unit: '100-300 km/wk' }
                }
              }) as Vehicle[],
          solar: (value.solar || defaultValues.solar) as Solar,
          battery: (value.battery || defaultValues.battery) as Battery
        };
        console.log('HouseholdForm watch householdDataOut:', householdDataOut);
        
        updateHouseholdData(householdDataOut);

      }



    });
    return () => subscription.unsubscribe();
  }, [watch, updateHouseholdData]);
// -------------------------------------------------------------------


  


  // const handleReset = (data: any) => {
    const onSubmit = (formData: Household) => {
      console.log('HouseholdForm onSubmit formData:', formData);
    };
  














  return (
    // <Box 
    //   sx={{
    //     padding: '1rem',
    //     backgroundColor: theme.palette.background.default, 
    //     [theme.breakpoints.up('md')]: {
    //       width: '60vw'
    //     }      
    //   }}
    //   >
    //   <img src={logo} className="Home-logo" alt="logo" />

    //   <Typography variant="h1">How much could you save by going electric?</Typography>
    //   <Typography variant="subtitle1">Enter your household information to find out</Typography>



      <form onSubmit={handleSubmit(onSubmit)}>


      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
        >
        <ResetButton theme={theme} type="button" onClick={() => reset()}>
          <img src={resetIcon} className="Home-logo" alt="logo" />
          <Typography variant="body2">Reset</Typography>
        </ResetButton>
      </Box>


      <FormContainer theme={theme} className='formContainer'>


        
        
        <FormBox theme={theme} className='formBox'>
          
        {/* <Divider /> */}
        <FDivider />


        <Typography variant="h3">Dwelling</Typography>

        <FormSection theme={theme} className='formSection'>
        <FormControl 
              className="fullFormControl"
              error={!!errors.location}>
          <FormLabel className='mainLabels'>Location</FormLabel>
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
                {/* {locationOptions.map((option: Option, i: number) => ( */}
                {formText.options.location.map((option: Option, i: number) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.text}
                  </MenuItem>
                ))}

          </Select>
           {/* )}
          /> */}
          {errors.location && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
        {/* </FormSection>

        <FormSection> */}
        <FormControl 
              className="fullFormControl"
              error={!!errors.occupancy}>
          <FormLabel className='mainLabels'>Number of occupants</FormLabel>
          <Select 
            labelId="occupancy-label"
            id="occupancy"
            value={watchAllFields.occupancy}
            {...register('occupancy', { required: true })}
            // defaultValue={formText.occupancy.default}
          >
            {/* {occupancyOptions.map((option: OptionNumber) => ( */}
            {formText.options.occupancy.map((option: OptionNumber) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
          {errors.occupancy && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
        </FormSection>
      </FormBox>
      {/* </div> */}


















      <FormBox theme={theme} className='formBox'>
        <FDivider />

        <Typography variant="h3">Appliances</Typography>


        <FormSection theme={theme} className='formSection'>
        <FormControl 
              className="fullFormControl"
              error={!!errors.spaceHeating}>
          <Box display="flex" alignItems="center">
            <FormLabel className='mainLabels'>House heating</FormLabel>            
            <Tooltip title={tooltipText.spaceHeating} placement="top">
            {/* <Tooltip title={tooltipText.spaceHeating} placement="top" PopperProps={tooltipPoppers}> */}
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
            {/* {spaceHeatingOptions.map((option: Option, i: number) => ( */}
            {formText.options.spaceHeating.map((option: Option, i: number) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
          {errors.spaceHeating && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
        

        <FormControl 
              className="fullFormControl"
              error={!!errors.waterHeating}>
          <Box display="flex" alignItems="center">
            <FormLabel className='mainLabels'>Water heating</FormLabel>
            <Tooltip title={tooltipText.waterHeating} placement="top">
              <img src={questionIcon} className="tooltip-logo" alt="logo" />
            </Tooltip>
          </Box>
          
          <Select 
            labelId="waterHeating-label"
            id="waterHeating"
            value={watchAllFields.waterHeating}
            {...register('waterHeating', { required: true })}            
          >
            {/* {waterHeatingOptions.map((option: Option, i: number) => ( */}
            {formText.options.waterHeating.map((option: Option, i: number) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
          {errors.waterHeating && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>

        
        <FormControl 
              className="fullFormControl"
              error={!!errors.cooktop}>
          <Box display="flex" alignItems="center">            
            <FormLabel className='mainLabels'>Cooktop</FormLabel>
            <Tooltip title={tooltipText.cooktop} placement="top">
              <img src={questionIcon} className="tooltip-logo" alt="logo" />
            </Tooltip>
          </Box>
          <Select
            labelId="cooktop-label"
            id="cooktop"
            value={watchAllFields.cooktop}
            {...register('cooktop', { required: true })}
          >
            {/* {cooktopOptions.map((option: Option, i: number) => ( */}
            {formText.options.cooktop.map((option: Option, i: number) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
          {errors.cooktop && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
        </FormSection>

      </FormBox>















      
      <HalfWidthFormBox theme={theme} className='halfWidthFormBox'>
        <FDivider />

        <Typography variant="h3">Solar</Typography>


          <FormSection theme={theme} className='formSection'>
        
          <FormControl 
              className="fullFormControl"
              error={!!errors.solar}>
            <Box display="flex" alignItems="center">                        
              <FormLabel className='mainLabels'>Do you have solar panels?</FormLabel>
              <Tooltip title={tooltipText.solar.hasSolar} placement="top">
                <img src={questionIcon} className="tooltip-logo" alt="logo" />
              </Tooltip>
            </Box>
            <Controller
              name="solar.hasSolar"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                >
                  {/* {solarOptions.hasSolar.map((option: OptionYesNo) => ( */}
                  {formText.options.solar.hasSolar.map((option: OptionYesNo) => (
                    <FormControlLabel key={option.text} value={option.value} control={<Radio />} label={option.text} />
                  ))}
                </RadioGroup>
              )}
            />
          </FormControl>
        </FormSection>

        <FormSection theme={theme} className='formSection'>
          <FormControl 
              className="fullFormControl"
              error={!!errors.solar}>
            <Box display="flex" alignItems="center">            
              <FormLabel className='mainLabels'>What size?</FormLabel>            
              <Tooltip title={tooltipText.solar.size} placement="top">
                <img src={questionIcon} className="tooltip-logo" alt="logo" />
              </Tooltip>
            </Box>
            <Select
              labelId="solarSize-label"
              id="solarSize"
              value={watchAllFields.solar?.size}
              {...register('solar.size', { required: true })}
            >
              {/* {solarOptions.sizeList.map((option: OptionNumber, i: number) => ( */}
              {formText.options.solar.sizeList.map((option: OptionNumber, i: number) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.text}
                </MenuItem>
              ))}
            </Select>
            {errors.solar && <FormHelperText>This field is required</FormHelperText>} 
          </FormControl>
        </FormSection>

      </HalfWidthFormBox>














      <HalfWidthFormBox theme={theme} className='halfWidthFormBox'>
        <FDivider />

        <Typography variant="h3">Battery</Typography>

        <FormSection theme={theme} className='formSection'>
        <FormControl 
              className="fullFormControl"
              error={!!errors.battery}>
          <Box display="flex" alignItems="center">            
            <FormLabel className='mainLabels'>Do you have a battery?</FormLabel>            
            <Tooltip title={tooltipText.battery.hasBattery} placement="top">
              <img src={questionIcon} className="tooltip-logo" alt="logo" />
            </Tooltip>
          </Box>
          <Controller
            name="battery.hasBattery"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <RadioGroup
                {...field}
              >
                {/* {batteryOptions.hasBattery.map((option: OptionYesNo) => ( */}
                {formText.options.battery.hasBattery.map((option: OptionYesNo) => (
                  <FormControlLabel key={option.text} value={option.value} control={<Radio />} label={option.text} />
                ))}
              </RadioGroup>
            )}
          />
        </FormControl>
        </FormSection>

        <FormSection theme={theme} className='formSection'>
        <FormControl 
              className="fullFormControl"
              error={!!errors.battery}>
          <Box display="flex" alignItems="center">            
            <FormLabel className='mainLabels'>What size?</FormLabel>            
            {/* <Tooltip title={tooltipText.battery.capacity} placement="top" PopperProps={tooltipPoppers}> */}
            <Tooltip title={tooltipText.battery.capacity} placement="top">
              <img src={questionIcon} className="tooltip-logo" alt="logo" />
            </Tooltip>
          </Box>
          <Select
            labelId="batterySize-label"
            id="batterySize"
            value={watchAllFields.battery?.capacity}
            {...register('battery.capacity', { required: true })}
          >
            {/* {batteryOptions.capacity.map((option: OptionNumber, i: number) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))} */}
            {/* {batteryOptions.capacityList.map((option: OptionNumber, i: number) => ( */}
            {formText.options.battery.capacityList.map((option: OptionNumber, i: number) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>
          {errors.battery && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
        </FormSection>
        
        </HalfWidthFormBox>




        {/* </FormSection> */}











          <HalfWidthFormBox theme={theme} className='halfWidthFormBox'>
            <FDivider />
            
            <Typography variant="h3">Transport</Typography>

                
            <FormSection theme={theme} className='formSection'>
            {/* <FormSection> */}
            <FormControl 
              className="fullFormControl"
              error={!!errors.vehicleObjs}>
              <FormLabel className='mainLabels'>Number of vehicles</FormLabel>
              {/* <Controller
                name="numberOfVehicles"
                control={control}
                render={({ field }) => (
                <Select
                  labelId="number-of-vehicles-label"
                  {...field}
                >                
                {formText.options.vehicle.amount.map((option: OptionNumber) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.text}
                  </MenuItem>
                ))}
              </Select>
                )}
              /> */}
              {/* <Input type="number" {...register('numberOfVehicles', { required: true })} /> */}
              <TextField
                  id="outlined-number"
                  // label="Number"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('numberOfVehicles', { required: true })}
                />
              {errors.vehicleObjs && <FormHelperText>This field is required</FormHelperText>}
            </FormControl>
            </FormSection>

{/* 

            <FormSection theme={theme} className='formSection'>
              <Box display="flex" alignItems="center">               
                {watchAllFields.vehicles?.map((vehicle: any, index: number) => (
                  <FormControl error={!!errors.vehicles} key={`Car-${index}`}>
                      <InputLabel sx={theme.typography.h3}>Car {index + 1}</InputLabel>
                      <Select
                        labelId={`vehicles-fuelType-label-${index}`}
                        id={`vehicles-fuelType-${index}`}
                        value={vehicle.fuelType || ''}
                        {...register(`vehicles.${index}.fuelType`, { required: true })}
                      >
                        {formText.options.vehicle.fuelType.map((option: Option) => (
                       
                          <MenuItem key={`fuelType-${option.value}`} value={option.value}>
                            {option.text}
                          </MenuItem>
                        ))} 
                      </Select>
                      {errors.vehicles && <FormHelperText>This field is required</FormHelperText>}
                  </FormControl>          
                ))}
              </Box>
            </FormSection> */}


            <FormSection theme={theme} className='formSection'>
              {/* <Box display="flex" alignItems="center">                */}
              <Box className="VehicleBoxContainer"
                sx={{
                  margin: '0.5rem 0',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  // '& .MuiFormControl-root': {
                  //     width: '100%',
                  //     flexBasis: '100%'
                  // },
                }}
                >
                
                {watchAllFields.vehicleObjs?.map((vehicle: any, index: number) => (                  
                  <VehicleBox key={`Car-${index}`} 
                    index={index} 
                    {...vehicle} 
                    errors={errors} 
                    register={register}
                    onDelete={() => handleVehicleDelete(index)}
                    fuelTypes={formText.options.vehicle.fuelType} 
                    usageOptionsList={formText.options.vehicle.usageOptionsList}
                    // defaultObject={defaultValues.vehicleObjs[index] || formText.options.vehicle.usageOptionsList[index]}
                    defaultType={'Medium'}
                    />                  
                ))}

              </Box>
            </FormSection>

          
            
          </HalfWidthFormBox>

        </FormContainer>      

      </form>
    // </Box>
  );
};

export default HouseholdForm;