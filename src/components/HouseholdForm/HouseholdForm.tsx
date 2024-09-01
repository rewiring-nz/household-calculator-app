import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Box, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Input, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Tooltip, Typography, useTheme, Checkbox } from '@mui/material';
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
import TooltipModal from './components/TooltipDialog';
import TooltipDialog from './components/TooltipDialog';
import HouseholdTooltip from './components/HouseholdTooltip';
import { HouseRadio, HouseCheck } from './components/HouseCheckRadio';


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

  
  const defaultFormData = formText.defaultValues;


  // ------------- Tooltip -------------------
  const tooltipText = formText.tooltipText;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openTooltips, setOpenTooltips] = useState<Record<string, boolean>>({});

  const handleOpenTooltip = (tooltipKey: string) => (event: React.MouseEvent<HTMLImageElement>) => {
    setOpenTooltips((prevState) => ({ ...prevState, [tooltipKey]: true }));
    setDialogOpen(true);
  };

  const handleCloseTooltip = (tooltipKey: string) => () => {
      setOpenTooltips((prevState) => ({ ...prevState, [tooltipKey]: false }));
      setDialogOpen(false);
  };
  // -----------------------------------------


  // To do: Move completely to data service?
  const merged_defaultFormValues: HouseholdFormState = {
    location: householdData?.location ?? defaultFormData.location,
    occupancy: householdData?.occupancy ?? defaultFormData.occupancy,
    spaceHeating: householdData?.spaceHeating ?? defaultFormData.spaceHeating,
    waterHeating: householdData?.waterHeating ?? defaultFormData.waterHeating,
    cooktop: householdData?.cooktop ?? defaultFormData.cooktop,
    numberOfVehicles: householdData?.vehicles?.length ?? defaultFormData.vehicleObjs.length,  
    vehicleObjs: defaultFormData.vehicleObjs,
    solar: { 
      hasSolar: householdData?.solar?.hasSolar ?? defaultFormData.solar.hasSolar,
      size: householdData?.solar?.size ?? defaultFormData.solar.size,
      dontWantSolar: householdData?.solar?.installSolar === undefined 
        ? defaultFormData.solar.dontWantSolar 
        : !householdData.solar.installSolar
    },
    battery: {
      hasBattery: householdData?.battery?.hasBattery ?? defaultFormData.battery.hasBattery,
      capacity: householdData?.battery?.capacity ?? defaultFormData.battery.capacity,
      dontWantBattery: householdData?.battery?.installBattery === undefined 
        ? defaultFormData.battery.dontWantBattery 
        : !householdData.battery.installBattery
    }
  };

  

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
// -------------------------------------------------------------------

 
 







 
 
 
 
 // ----------------- Manage the number of vehicles -------------------

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vehicleObjs',
  });
   
  const numberOfVehicles = watch('numberOfVehicles');

  useEffect(() => {
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


  // This is used with onBlur to stop the form updating while the user is typing
  const [numVehicles, setNumVehicles] = useState('2');
  const [batteryCapacity, setBatteryCapacity] = useState<number | string>(defaultFormData.battery.capacity);
  const [solarSize, setSolarSize] = useState<number | string>(defaultFormData.solar.size);
  // -------------------------------------------------------------------











  // ----------------- Watch for changes in the form -------------------
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log('HouseholdForm watch value:', value);
      console.log('HouseholdForm watch name:', name);
      console.log('HouseholdForm watch type:', type);


      if(value) {        

        const householdDataOut: Household = {
          location: value.location ?? defaultFormData.location,
          occupancy: value.occupancy ?? defaultFormData.occupancy,
          spaceHeating: value.spaceHeating ?? defaultFormData.spaceHeating,
          waterHeating: value.waterHeating ?? defaultFormData.waterHeating,
          cooktop: value.cooktop ?? defaultFormData.cooktop,
          vehicles: (value.vehicleObjs ?? defaultFormData.vehicleObjs)
            .filter((vehicle): vehicle is VehicleObject => vehicle !== undefined)
            .map((vehicle: VehicleObject) => {
              return {
                fuelType: vehicle.fuelType,
                usage: formText.options.vehicle.usageOptionsList.find(option => 
                  option.type === vehicle.usageType ) 
                  ?? { type: 'Medium', value: 200, unit: '100-300 km/wk' }
              }
            }) as Vehicle[],
          solar: {
            hasSolar: value.solar?.hasSolar ?? defaultFormData.solar.hasSolar,
            size: value.solar?.size ?? defaultFormData.solar.size,
            installSolar: (value.solar?.dontWantSolar ?? defaultFormData.solar.dontWantSolar) ? false : true
          },
          battery: {
            hasBattery: value.battery?.hasBattery ?? defaultFormData.battery.hasBattery,
            capacity: value.battery?.capacity ?? defaultFormData.battery.capacity,
            installBattery: (value.battery?.dontWantBattery ?? defaultFormData.battery.dontWantBattery) ? false : true
          }
        };
        console.log('HouseholdForm watch householdDataOut:', householdDataOut);
        
        updateHouseholdData(householdDataOut);

      }



    });
    return () => subscription.unsubscribe();
  }, [watch, updateHouseholdData, defaultFormData]);
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
            {/* <Tooltip title={tooltipText.spaceHeating} placement="top">
              <img src={questionIcon} className="tooltip-logo" alt="logo" />
            </Tooltip> */}
            <HouseholdTooltip 
              title={tooltipText.spaceHeating} 
              placement="top"
              open={openTooltips.spaceHeating} 
              // open={openTooltips === 'spaceHeating'}
              onClose={handleCloseTooltip('spaceHeating')}
              // disableHoverListener
              // disableFocusListener
              // disableTouchListener
              >              
              <img
                  src={questionIcon}
                  className="tooltip-logo"
                  alt="logo"
                  onClick={handleOpenTooltip('spaceHeating')}
              />
            </HouseholdTooltip>
             {/* <Box className="TooltipBox" >
              <img
                  src={questionIcon}
                  className="tooltip-logo"
                  alt="logo"
                  onClick={handleOpenTooltip('spaceHeating')}
              />
              <TooltipDialog
                  open={openTooltips.spaceHeating}
                  // open={dialogOpen}
                  handleClose={handleCloseTooltip('spaceHeating')}
                  text={tooltipText.spaceHeating}
                  // mouseX={mousePosition.x}
                  // mouseY={mousePosition.y}
              />              
            </Box>   */}
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
            <HouseholdTooltip 
              title={tooltipText.waterHeating} 
              placement="top"
              open={openTooltips.waterHeating} 
              onClose={handleCloseTooltip('waterHeating')}
              >              
              <img
                  src={questionIcon}
                  className="tooltip-logo"
                  alt="logo"
                  onClick={handleOpenTooltip('waterHeating')}
              />
            </HouseholdTooltip>
            {/* <Box className="TooltipBox" >
              <img
                  src={questionIcon}
                  className="tooltip-logo"
                  alt="logo"
                  onClick={handleOpenTooltip('waterHeating')}
              />
              <TooltipDialog
                  open={openTooltips.waterHeating}
                  handleClose={handleCloseTooltip('waterHeating')}
                  text={tooltipText.waterHeating}                  
                  // mouseX={mousePosition.x}
                  // mouseY={mousePosition.y}
              />              
            </Box>   */}
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
            <HouseholdTooltip 
              title={tooltipText.cooktop} 
              placement="top"
              open={openTooltips.cooktop} 
              onClose={handleCloseTooltip('cooktop')}
              >              
              <img
                  src={questionIcon}
                  className="tooltip-logo"
                  alt="logo"
                  onClick={handleOpenTooltip('cooktop')}
              />
            </HouseholdTooltip>
            {/* <Box className="TooltipBox" >
              <img
                  src={questionIcon}
                  className="tooltip-logo"
                  alt="logo"
                  onClick={handleOpenTooltip('cooktop')}
              />
              <TooltipDialog
                  open={openTooltips.cooktop}
                  handleClose={handleCloseTooltip('cooktop')}
                  text={tooltipText.cooktop}
                  // mouseX={mousePosition.x}
                  // mouseY={mousePosition.y}
              />              
            </Box>   */}
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
            <Box display="flex" alignItems="center">                        
              <FormLabel className='mainLabels'>Do you have solar panels?</FormLabel>
              <HouseholdTooltip 
              title={tooltipText.hasSolar} 
              placement="top"
              open={openTooltips.hasSolar} 
              onClose={handleCloseTooltip('hasSolar')}
              >              
              <img
                  src={questionIcon}
                  className="tooltip-logo"
                  alt="logo"
                  onClick={handleOpenTooltip('hasSolar')}
              />
            </HouseholdTooltip>
              {/* <Box className="TooltipBox" >
                <img
                    src={questionIcon}
                    className="tooltip-logo"
                    alt="logo"
                    onClick={handleOpenTooltip('hasSolar')}
                />
                <TooltipDialog
                    open={openTooltips.hasSolar}
                    handleClose={handleCloseTooltip('hasSolar')}
                    text={tooltipText.hasSolar}
                    // mouseX={mousePosition.x}
                    // mouseY={mousePosition.y}
                />              
              </Box>   */}
            </Box>
          </FormSection>










          <FormSection theme={theme} className='formSection'>
          <Box>
          {/* <FormControl 
              className="fullFormControl"
              error={!!errors.solar}>
            <Controller
              name="solar.hasSolar"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                >                 
                 {formText.options.solar.hasSolar.map((option: OptionYesNo) => (
                    <FormControlLabel key={option.text} value={option.value} control={<Radio />} label={option.text} />
                  ))}
                </RadioGroup>
              )}
            />
          </FormControl> */}
          <FormControl 
                  className="fullFormControl"
                  error={!!errors.solar}>          
                <Controller
                  name="solar.hasSolar"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                    >
                    {formText.options.solar.hasSolar.map((option: OptionYesNo) => (
                      <FormControlLabel 
                        key={option.text} 
                        value={option.value} 
                        control={
                          <HouseRadio />
                          } label={option.text} />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.solar && <FormHelperText>This field is required</FormHelperText>}
              </FormControl>

          <FormControl>
            <Controller
              // name="solar.installSolar"
              name="solar.dontWantSolar"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControlLabel
                  control={<HouseCheck {...field}/>}
                  label="I don’t want solar"
                />
              )}
            />
            {errors.solar && <FormHelperText>This field is required</FormHelperText>}
          </FormControl>
          
          </Box>
        </FormSection>

        <FormSection theme={theme} className='formSection'>
          <FormControl 
              className="fullFormControl"
              error={!!errors.solar}>
            <Box display="flex" alignItems="center">            
              <FormLabel className='mainLabels'>What size?</FormLabel>            
              <Box className="TooltipBox" >
                <img
                    src={questionIcon}
                    className="tooltip-logo"
                    alt="logo"
                    onClick={handleOpenTooltip('solarSize')}
                />
                <TooltipDialog
                    open={openTooltips.solarSize}
                    handleClose={handleCloseTooltip('solarSize')}
                    text={tooltipText.solarSize}
                />              
              </Box>  
            </Box>


            <Controller
                name="solar.size"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    id="outlined-number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={solarSize}
                    // value={numVehicles || value}
                    onChange={(e) => {
                      setSolarSize(e.target.value);
                      // onChange(e);
                    }}
                    onBlur={() => {
                      onChange({ target: { value: solarSize } });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onChange({ target: { value: solarSize } });
                      }
                    }}
                    inputRef={ref}
                    InputProps={{ 
                      endAdornment: <InputAdornment position="end">{formText.defaultValues.solar.unit}</InputAdornment>,
                      inputProps: { style: { textAlign: 'right' } }
                    }}
                  />
                )}
              />
            {errors.solar && <FormHelperText>This field is required</FormHelperText>} 
          </FormControl>
        </FormSection>

      </HalfWidthFormBox>














      <HalfWidthFormBox theme={theme} className='halfWidthFormBox'>
        <FDivider />





        <Typography variant="h3">Battery</Typography>







        <FormSection theme={theme} className='formSection'>
          <Box display="flex" alignItems="center">            
            <FormLabel className='mainLabels'>Do you have a battery?</FormLabel>            
            <HouseholdTooltip 
              title={tooltipText.hasBattery} 
              placement="top"
              open={openTooltips.hasBattery} 
              onClose={handleCloseTooltip('hasBattery')}
              >              
              <img
                  src={questionIcon}
                  className="tooltip-logo"
                  alt="logo"
                  onClick={handleOpenTooltip('hasBattery')}
              />
            </HouseholdTooltip>
            {/* <Box className="TooltipBox" >
              <img
                  src={questionIcon}
                  className="tooltip-logo"
                  alt="logo"
                  onClick={handleOpenTooltip('hasBattery')}
              />
              <TooltipDialog
                  open={openTooltips.hasBattery}
                  handleClose={handleCloseTooltip('hasBattery')}
                  text={tooltipText.hasBattery}
              />              
            </Box>   */}
          </Box>
          </FormSection>












          <FormSection theme={theme} className='formSection'>
            <Box>



              <FormControl 
                  className="fullFormControl"
                  error={!!errors.battery}>          
                <Controller
                  name="battery.hasBattery"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                    >
                    {formText.options.battery.hasBattery.map((option: OptionYesNo) => (
                      <FormControlLabel 
                        key={option.text} 
                        value={option.value} 
                        control={
                          <HouseRadio />
                          } label={option.text} />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.battery && <FormHelperText>This field is required</FormHelperText>}
              </FormControl>









            <FormControl>
              <Controller
                // name="battery.installBattery"
                name="battery.dontWantBattery"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControlLabel
                    control={<HouseCheck {...field} />}
                    // control={<HouseCheck {...field} checked={!field.value} />}
                    label="I don't want a battery"
                  />
                )}
              />
              {errors.battery && <FormHelperText>This field is required</FormHelperText>}
            </FormControl>



          </Box>        
        </FormSection>












        <FormSection theme={theme} className='formSection'>
        <FormControl 
              className="fullFormControl"
              error={!!errors.battery}>
          <Box display="flex" alignItems="center">            
            <FormLabel className='mainLabels'>What size?</FormLabel>            
            <Box className="TooltipBox" >
              <img
                  src={questionIcon}
                  className="tooltip-logo"
                  alt="logo"
                  onClick={handleOpenTooltip('batteryCapacity')}
              />
              <TooltipDialog
                  open={openTooltips.batteryCapacity}
                  handleClose={handleCloseTooltip('batteryCapacity')}
                  text={tooltipText.batteryCapacity}
                  // mouseX={mousePosition.x}
                  // mouseY={mousePosition.y}
              />              
            </Box>  
          </Box>
          {/* <Select
            labelId="batterySize-label"
            id="batterySize"
            value={watchAllFields.battery?.capacity}
            {...register('battery.capacity', { required: true })}
          >
            {formText.options.battery.capacityList.map((option: OptionNumber, i: number) => (
              <MenuItem key={option.value} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select> */}

          <Controller
                name="battery.capacity"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    id="outlined-number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={batteryCapacity}
                    // value={numVehicles || value}
                    onChange={(e) => {
                      setBatteryCapacity(e.target.value);
                      // onChange(e);
                    }}
                    onBlur={() => {
                      onChange({ target: { value: batteryCapacity } });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onChange({ target: { value: batteryCapacity } });
                      }
                    }}
                    inputRef={ref}
                    InputProps={{ 
                      endAdornment: <InputAdornment position="end">{formText.defaultValues.battery.unit}</InputAdornment>,
                      inputProps: { style: { textAlign: 'right' } }
                    }}
                  />
                )}
              />
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
              <Controller
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
              />
              {/* <Input type="number" {...register('numberOfVehicles', { required: true })} /> */}
              {/* <Controller
                name="numberOfVehicles"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    id="outlined-number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={numVehicles}
                    // value={numVehicles || value}
                    onChange={(e) => {
                      setNumVehicles(e.target.value);
                      // onChange(e);
                    }}
                    onBlur={() => {
                      onChange({ target: { value: numVehicles } });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onChange({ target: { value: numVehicles } });
                      }
                    }}
                    inputRef={ref}
                  />
                )}
              /> */}
              {errors.vehicleObjs && <FormHelperText>This field is required</FormHelperText>}
            </FormControl>
            </FormSection>
          
                   {/* type="number"
                   InputLabelProps={{
                     shrink: true,
                  }}
                   {...register('numberOfVehicles', { required: true })}
                 /> */}
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