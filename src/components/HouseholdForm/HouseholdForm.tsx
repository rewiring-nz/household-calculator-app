import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm, FormProvider } from 'react-hook-form';



// ----------------- Styles & Material-UI -------------------
import { Box, FormControl, FormControlLabel, FormHelperText, FormLabel, Input, InputAdornment, InputLabel, Radio, RadioGroup, Select, TextField, Tooltip, Typography, useTheme, Checkbox } from '@mui/material';
// import { ReactComponent as TickIcon } from 'src/assets/icons/tick.svg';
import './HouseholdForm.css';
import { FDivider } from 'src/shared/styles/FDivider';

// ----------------- Models & Interfaces -------------------
import { CooktopEnum, Household, LocationEnum, SpaceHeatingEnum, Vehicle, VehicleFuelTypeEnum, WaterHeatingEnum } from '../../shared/api/openapi-client';
import { HouseholdFormState, Option, OptionNumber, OptionYesNo, UsageOption, UsageType, VehicleObject } from './data/interfaces';


// ----------------- Data -------------------
// import useHouseholdData from '../../hooks/useHouseholdData/useHouseholdData';
import { formText } from './data/householdForm.text';


// ----------------- Icons -------------------
import questionIcon from '../../assets/icons/question.svg';
import resetIcon from '../../assets/icons/carbon-reset.svg';
import { ReactComponent as chevronDown} from '../../assets/icons/chevron-down.svg';

// ----------------- Components -------------------
import { FormBox, HalfWidthFormBox, FormContainer, FormSectionFlex, FormSectionGrid, ResetButton, tooltipPoppers, SwitchLabel, HouseSelect, HouseInputAdornment, LabelBox } from './HouseholdForm.styles';
import VehicleBox from './components/HouseholdVehicle';
// import TooltipModal from './components/TooltipDialog';
// import TooltipDialog from './components/TooltipDialog';
import HouseholdTooltip from './components/HouseholdTooltip';
import { HouseRadio } from './components/HouseCheckRadio';
import { HouseSwitch } from './components/HouseSwitch';
import HouseMenuItem from './components/HouseMenuItem';


interface HouseholdFormProps {
  householdData: Household;
  updateHouseholdData: (data: Household) => void;
}




const HouseholdForm: React.FC<HouseholdFormProps> = ({ householdData, updateHouseholdData }) => {
  const theme = useTheme();
  // const methods = useForm();
    
  const defaultFormData = formText.defaultFormState

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
      hasSolar: Boolean(householdData?.solar?.hasSolar ?? defaultFormData.solar.hasSolar),
      size: householdData?.solar?.size ?? defaultFormData.solar.size,
      installSolar: householdData?.solar?.installSolar ?? defaultFormData.solar.installSolar,
    },
    battery: {
      hasBattery: Boolean(householdData?.battery?.hasBattery ?? defaultFormData.battery.hasBattery),
      capacity: householdData?.battery?.capacity ?? defaultFormData.battery.capacity,
      installBattery: householdData?.battery?.installBattery ?? defaultFormData.battery.installBattery,
    }
  };

  

  const { register, handleSubmit, watch, control, formState: { errors }, reset, setValue } = useForm<HouseholdFormState>({
    defaultValues: merged_defaultFormValues,
  });

  const watchAllFields: HouseholdFormState = watch();
 
  const [disableSolarToggle, setDisableSolarToggle] = useState(false);
  const [disableBatteryToggle, setDisableBatteryToggle] = useState(false);

  const watchHasSolar = watch('solar.hasSolar');
  const watchHasBattery = watch('battery.hasBattery');

  // solar state
  useEffect(() => {
    console.log('HouseholdForm useEffect watchHasSolar:', watchHasSolar);
    if(watchHasSolar) {
      setDisableSolarToggle(true);
      setValue('solar.installSolar', false);
    } else {
      setDisableSolarToggle(false);   
    }
  }, [watchHasSolar, setValue, disableSolarToggle]);
// -------------------------------------------------------------------



  // battery state
  useEffect(() => {
    console.log('HouseholdForm useEffect watchHasBattery:', watchHasBattery);
    if(watchHasBattery) {
      setDisableBatteryToggle(true);
      setValue('battery.installBattery', false);
    } else {
      setDisableBatteryToggle(false);
    }
  }, [watchHasBattery, setValue, disableBatteryToggle]);
// ----------------------------------------------------------------



  
  // ----------------- useHouseholdData useEffect -------------------
 React.useEffect(() => {
    console.log('HouseholdForm useEffect householdData:', householdData);
    // console.log('HouseholdForm useEffect savingsData:', savingsData);
    // console.log('HouseholdForm useEffect loadingData:', loadingData);
 }, [householdData]);
// -------------------------------------------------------------------

 
 







 
 
 
 
 // ----------------- Manage the number of vehicles -------------------

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vehicleObjs',
  });
   
  const numberOfVehicles = watch('numberOfVehicles');

  useEffect(() => {
    const currentLength = fields.length;
    console.log('HouseholdForm useEffect currentLength:', currentLength);
    const fuelTypes = Object.values(VehicleFuelTypeEnum);

    if (numberOfVehicles > currentLength) {
      for (let i = currentLength; i < numberOfVehicles; i++) {
        const newVehicle: VehicleObject = {
          id: (i + 1) as number, 
          // fuelType: fuelTypes[i % fuelTypes.length], // random fuel type
          fuelType: VehicleFuelTypeEnum.Petrol, // 'PETROL'
          usageType: 'Medium' as UsageType,
          switchToEV: true
        };
        console.log('HouseholdForm useEffect newVehicle:', newVehicle);
        append(newVehicle);
        // setValue(`vehicleObjs.${i}`, newVehicle, { shouldValidate: true, shouldDirty: true });
        setValue('vehicleObjs',  [...fields, newVehicle], { shouldValidate: true, shouldDirty: true });
        
      }
    } else {
      for (let i = currentLength; i > numberOfVehicles; i--) {
        remove(i - 1);
      }
    }    
  }, [numberOfVehicles, append, remove, fields.length]);



  const handleVehicleDelete = (index: number) => {
    remove(index);

    if (numberOfVehicles && numberOfVehicles > 0) {
      // setValue('numberOfVehicles', numberOfVehicles - 1);
      setValue('numberOfVehicles', numberOfVehicles - 1, { shouldValidate: true, shouldDirty: true });
      setValue('vehicleObjs', fields.filter((field) => field !== fields[index]), { shouldValidate: true, shouldDirty: true });
    } else {
      setValue('numberOfVehicles', 0, { shouldValidate: true, shouldDirty: true });
      setValue('vehicleObjs', [], { shouldValidate: true, shouldDirty: true });
    }


    // fields.forEach((field, index: number) => {
    //   field.id = (index + 1) || 0;
    // });

    console.log('HouseholdForm handleVehicleDelete numberOfVehicles:', numberOfVehicles);
    console.log('HouseholdForm vehicleObjs fields:', fields);    
  };

  // -------------------------------------------------------------------




  // This is used with onBlur to stop the form updating while the user is typing
  // const [numVehicles, setNumVehicles] = useState('2');
  const [batteryCapacity, setBatteryCapacity] = useState<number | string>(defaultFormData.battery.capacity);
  const [solarSize, setSolarSize] = useState<number | string>(defaultFormData.solar.size);
  // -------------------------------------------------------------------











  // ----------------- Watch for changes in the form -------------------
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log('HouseholdForm watch value:', value);
      console.log('HouseholdForm watch name:', name);
      console.log('HouseholdForm watch type:', type);

      // console.log('HouseholdForm watch showSolarToggle:', showSolarToggle);
      // console.log('HouseholdForm watch showBatteryToggle:', showBatteryToggle);
      
      
      if(value) {        
        const formValue = value as HouseholdFormState;

        const householdDataOut: Household = {
          location: formValue.location ?? defaultFormData.location,
          occupancy: formValue.occupancy ?? defaultFormData.occupancy,
          spaceHeating: formValue.spaceHeating ?? defaultFormData.spaceHeating,
          waterHeating: formValue.waterHeating ?? defaultFormData.waterHeating,
          cooktop: formValue.cooktop ?? defaultFormData.cooktop,
          vehicles: (formValue.vehicleObjs ?? defaultFormData.vehicleObjs)
            .filter((vehicle): vehicle is VehicleObject => vehicle !== undefined)
            .map((vehicle: VehicleObject) => {
              const vehicleOut: Vehicle = {
                fuelType: vehicle.fuelType,
                kmsPerWeek: formText.options.vehicle.usageOptions.find((option: UsageOption) => 
                  option.type === vehicle.usageType )?.value ?? 200,
                switchToEV: vehicle.switchToEV ?? false,
              };
              return vehicleOut;
            }),
          solar: {
            hasSolar: Boolean(formValue.solar?.hasSolar ?? defaultFormData.solar.hasSolar),
            size: formValue.solar?.size ?? defaultFormData.solar.size,
            installSolar: formValue.solar?.installSolar ?? defaultFormData.solar.installSolar
          },
          battery: {
            hasBattery: Boolean(formValue.battery?.hasBattery ?? defaultFormData.battery.hasBattery),
            capacity: formValue.battery?.capacity ?? defaultFormData.battery.capacity,
            installBattery: formValue.battery?.installBattery ?? defaultFormData.battery.installBattery
          }
        };

        if (formValue.solar?.hasSolar && householdDataOut.solar) {
          householdDataOut.solar.installSolar = undefined;
        }
        if (formValue.battery.hasBattery && householdDataOut.battery) {
          householdDataOut.battery.installBattery = undefined;
        }

        console.log('HouseholdForm watch householdDataOut:', householdDataOut);
        
        updateHouseholdData(householdDataOut);

      }



    });
    return () => subscription.unsubscribe();
  }, [watch, updateHouseholdData, defaultFormData]);
  // -------------------------------------------------------------------


  


    const onSubmit = (formData: Household) => {
      console.log('HouseholdForm onSubmit formData:', formData);
    };
  





  // ------------------------------------
  return (
      // <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>


      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }}
        >
        <ResetButton theme={theme} type="button" onClick={() => reset()}
          sx={{
            width: 'fit-content',
          }}
          >
          <img src={resetIcon} className="Home-logo" alt="logo" />
          <Typography variant="body1">Reset</Typography>
        </ResetButton>
      </Box>


      <FormContainer theme={theme} className='formContainer'>


        
        
        <FormBox theme={theme} className='formBox'>
          
        <FDivider />


        <Typography variant="h3">Your home</Typography>

        <FormSectionFlex theme={theme} className='FormSectionFlex'
          sx={{
            '& .MuiFormControl-root': {
              width: '100%',
              flex: '1 1 100%',
              [theme.breakpoints.up('sm')]: {
                flex: '1 1 calc(50% - 1rem)',
                maxWidth: 'calc(50% - 1rem)',
              }
            }          
          }}
          >
          <FormControl 
              className="fullFormControl"
              error={!!errors.location}>
          <LabelBox>
            <FormLabel className='mainLabels'>Location</FormLabel>
          </LabelBox>
            <HouseSelect
              IconComponent={chevronDown}
              labelId="location-label"
              id="location"
              value={watchAllFields.location}
              {...register('location', { required: true })}
              >                
                {formText.options.location.map((option: Option<LocationEnum>) => (
                  <HouseMenuItem 
                    theme={theme} 
                    key={option.value} 
                    value={option.value}
                    selected={watchAllFields.location === option.value}
                    onClick={() => setValue('location', option.value)}
                    >
                    {option.text}
                  </HouseMenuItem>
                ))}

          </HouseSelect>
           {/* )}
          /> */}
          {errors.location && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>






        <FormControl 
              className="fullFormControl"
              error={!!errors.occupancy}>
          <LabelBox>
            <FormLabel className='mainLabels'>Number of occupants</FormLabel>
          </LabelBox>
          <HouseSelect
            IconComponent={chevronDown}
            labelId="occupancy-label"
            id="occupancy"
            value={watchAllFields.occupancy}
            {...register('occupancy', { required: true })}
            >
            {formText.options.occupancy.map((option: OptionNumber) => (
              <HouseMenuItem 
                theme={theme} 
                key={option.value} 
                value={option.value}
                selected={watchAllFields.occupancy === option.value}              
                >
                {option.text}
              </HouseMenuItem>
            ))}
          </HouseSelect>
          {errors.occupancy && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
        </FormSectionFlex>
      </FormBox>


















      <FormBox theme={theme} className='formBox'>
        <FDivider />



        <Typography variant="h3">Your household appliances</Typography>








        <FormSectionFlex theme={theme} className='FormSectionFlex'
          sx={{
            '& .MuiFormControl-root': {
              width: '100%',
              flex: '1 1 100%',
              [theme.breakpoints.up('sm')]: {
                flex: '1 1 calc(33.33% - 1rem)',
                maxWidth: 'calc(33.33% - 1rem)',
              }
            }           
          }}
          >
        <FormControl 
              className="fullFormControl"
              error={!!errors.spaceHeating}>
          <LabelBox>
            <FormLabel className='mainLabels'>Main house heating source</FormLabel>
            <HouseholdTooltip 
              title={tooltipText.spaceHeating} 
              placement="top"
              open={openTooltips.spaceHeating} 
              onClose={handleCloseTooltip('spaceHeating')}
              >              
              <img
                  src={questionIcon}
                  className="tooltip-logo"
                  alt="logo"
                  onClick={handleOpenTooltip('spaceHeating')}
              />
            </HouseholdTooltip>
          </LabelBox>

          <HouseSelect
            IconComponent={chevronDown}
            labelId="spaceHeating-label"
            id="spaceHeating"
            value={watchAllFields.spaceHeating}
            {...register('spaceHeating', { required: true })}
            >
            {formText.options.spaceHeating.map((option: Option<SpaceHeatingEnum>) => (
              <HouseMenuItem 
                theme={theme} 
                key={option.value} 
                value={option.value}
                selected={watchAllFields.spaceHeating === option.value}              
                >
                {option.text}
              </HouseMenuItem>
            ))}
          </HouseSelect>
          {errors.spaceHeating && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
        














        <FormControl 
              className="fullFormControl"
              error={!!errors.waterHeating}>
          <LabelBox>
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
          </LabelBox>
          
          <HouseSelect
            IconComponent={chevronDown} 
            labelId="waterHeating-label"
            id="waterHeating"
            value={watchAllFields.waterHeating}
            {...register('waterHeating', { required: true })}            
            >
            {formText.options.waterHeating.map((option: Option<WaterHeatingEnum>) => (
              <HouseMenuItem 
                theme={theme} 
                key={option.value} 
                value={option.value}
                selected={watchAllFields.waterHeating === option.value}              
                >
                {option.text}
              </HouseMenuItem>
            ))}
          </HouseSelect>
          {errors.waterHeating && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>

        


        <FormControl 
              className="fullFormControl"
              error={!!errors.cooktop}>
          <LabelBox>
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
          </LabelBox>

          <HouseSelect
            IconComponent={chevronDown}
            labelId="cooktop-label"
            id="cooktop"
            value={watchAllFields.cooktop}
            {...register('cooktop', { required: true })}
            >
            {formText.options.cooktop.map((option: Option<CooktopEnum>) => (
              <HouseMenuItem 
                theme={theme} 
                key={option.value} 
                value={option.value}
                selected={watchAllFields.cooktop === option.value}
                >
                {option.text}
              </HouseMenuItem>
            ))}
          </HouseSelect>
          {errors.cooktop && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
        </FormSectionFlex>

      </FormBox>

















      
      <FormSectionFlex theme={theme} className='FormSectionFlex'
        sx={{
          margin: 0
        }}
        >
      <HalfWidthFormBox theme={theme} className='halfWidthFormBox'>
        <FDivider />







        <Typography variant="h3">Solar panels</Typography>





          <FormSectionFlex theme={theme} className='FormSectionFlex'>
              <LabelBox>
                <FormLabel className='mainLabels'>
                  Do you have solar panels?
                </FormLabel>
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
              </LabelBox>
          </FormSectionFlex>



          <FormSectionFlex theme={theme} className='formSection'>
            <FormControl 
              className="fullFormControl"
              error={!!errors.solar}
              >
              <Controller
                name="solar.hasSolar"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    onChange={(e) => {
                      const value: boolean = e.target.value === 'true';
                      field.onChange(value);
                    }}
                  >
                  {formText.options.solar.hasSolar.map((option: OptionYesNo) => (
                    <FormControlLabel 
                      key={option.text} 
                      value={option.value} 
                      control={
                        <HouseRadio />
                        // <Radio />
                        } label={option.text} />
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.solar && <FormHelperText>This field is required</FormHelperText>}
            </FormControl>
          </FormSectionFlex>







        <FormSectionFlex theme={theme} className='FormSectionFlex'>
            <FormControl className="fullFormControl"
              error={!!errors.solar?.installSolar}
              sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  opacity: disableSolarToggle ? 0.5 : 1, // Grey out when disabled
              }}
              >
             <SwitchLabel className="installSolar-label" theme={theme}>
                I'd like solar {/* eslint-disable-line react/no-unescaped-entities */}
              </SwitchLabel>
              <Controller
                name="solar.installSolar"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <HouseSwitch 
                    {...field}
                    checked={field.value}
                    // disabled={disableSolarToggle}
                    size="small" 
                    theme={theme} 
                    />
                )}
              />
            </FormControl>
        </FormSectionFlex>









        
        <FormSectionFlex theme={theme} className='FormSectionFlex-2'
          sx={{
            margin: '1.5rem 0 0.4rem 0'
          }}
          >
          <FormControl 
              className="fullFormControl"
              error={!!errors.solar?.size}>
            <LabelBox>
              <FormLabel className='mainLabels'>What size of solar panel power output?</FormLabel>
              <HouseholdTooltip 
                title={tooltipText.solarSize} 
                placement="top"
                open={openTooltips.solarSize} 
                onClose={handleCloseTooltip('solarSize')}
                >              
                <img
                    src={questionIcon}
                    className="tooltip-logo"
                    alt="logo"
                    onClick={handleOpenTooltip('solarSize')}
                />
              </HouseholdTooltip>
            </LabelBox>

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
                    onChange={(e) => {
                      const numericValue = parseFloat(e.target.value);
                      if (numericValue >= 0 && numericValue <= 1000) {
                        setSolarSize(isNaN(numericValue) ? 0 : numericValue);                        
                      } else if (numericValue > 1000) {
                        setSolarSize(1000);
                      } else {
                        setSolarSize(0);
                      }
                    }}
                    onBlur={() => {
                      if (solarSize === '') {
                        onChange(0);
                      }
                      onBlur();
                    }}
                    onKeyDown={(e) => {
                      const currentSize = parseFloat(solarSize as string) || 0;
                      if (e.key === 'Enter') {
                        onChange({ target: { value: solarSize } });
                      }
                      if (e.key === 'ArrowUp') {
                        const newValue = Math.min(currentSize + 1, 1000);
                        onChange(newValue);
                      }
                      if (e.key === 'ArrowDown') {
                        const newValue = Math.max(currentSize - 1, 0);
                        onChange(newValue);
                      }
                    }}
                    inputRef={ref}
                    InputProps={{ 
                      endAdornment: <HouseInputAdornment position="end">{formText.defaultFormState.solar.unit}</HouseInputAdornment>,
                      inputProps: { 
                        style: { textAlign: 'right' },
                        min: 0,
                        max: 1000,
                      }
                    }}
                  />
                )}
              />
            {errors.solar?.size && <FormHelperText>This field is required</FormHelperText>} 
          </FormControl>
        </FormSectionFlex>

      </HalfWidthFormBox>














      <HalfWidthFormBox theme={theme} className='halfWidthFormBox'>
        <FDivider />





        <Typography variant="h3">Battery</Typography>







        <FormSectionFlex theme={theme} className='FormSectionFlex'>
          <LabelBox>
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
          </LabelBox>
          </FormSectionFlex>

          <FormSectionFlex theme={theme} className='FormSectionFlex'>
            <Box>
              <FormControl 
                  className="fullFormControl"
                  error={!!errors.battery?.hasBattery}>     
                <Controller
                  name="battery.hasBattery"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      onChange={(e) => {
                        const value: boolean = e.target.value === 'true';
                        field.onChange(value);
                      }}
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
                {errors.battery?.hasBattery && <FormHelperText>This field is required</FormHelperText>}
              </FormControl>
          </Box>        
        </FormSectionFlex>


        
        <FormSectionFlex theme={theme} className='FormSectionFlex'>        
            <FormControl className="fullFormControl"
              error={!!errors.battery?.installBattery}
              sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  opacity: disableBatteryToggle ? 0.5 : 1, // Grey out when disabled
              }}
              >
             <SwitchLabel className="installBattery-label" theme={theme}>
                I'd like a battery {/* eslint-disable-line react/no-unescaped-entities */}
              </SwitchLabel>
              <Controller
                name="battery.installBattery"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <HouseSwitch
                    {...field}
                    checked={field.value}
                    // disabled={disableBatteryToggle}                    
                    // defaultChecked 
                    size="small" 
                    theme={theme}
                    />
                )}
              />
              {errors.battery?.installBattery && <FormHelperText>This field is required</FormHelperText>}
            </FormControl>
        </FormSectionFlex>

        











        <FormSectionFlex theme={theme} className='FormSectionFlex-2'          
          sx={{
            margin: '1.5rem 0 0.4rem 0'
          }}
          >
        <FormControl 
              className="fullFormControl"
              error={!!errors.battery?.capacity}>
          <LabelBox>          
            <FormLabel className='mainLabels'>What battery capacity?</FormLabel>
            <HouseholdTooltip 
                title={tooltipText.batteryCapacity} 
                placement="top"
                open={openTooltips.batteryCapacity} 
                onClose={handleCloseTooltip('batteryCapacity')}
                >              
                <img
                    src={questionIcon}
                    className="tooltip-logo"
                    alt="logo"
                    onClick={handleOpenTooltip('batteryCapacity')}
                />
                </HouseholdTooltip>
          </LabelBox>

          <Controller
                name="battery.capacity"
                control={control}               
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    id="outlined-number"
                    // type="number" // This is causes the input to always have a 0 if empty
                    inputMode="numeric"
                    value={batteryCapacity ?? ''}
                    onChange={(e) => {
                      const numericValue = parseFloat(e.target.value);
                      if (numericValue >= 0 && numericValue <= 1000) {
                        setBatteryCapacity(isNaN(numericValue) ? 0 : numericValue);
                      } else if (numericValue > 1000) {
                        setBatteryCapacity(1000);
                      } else {
                        setBatteryCapacity(0);
                      }
                    }}
                    onBlur={(e) => {
                      console.log('HouseholdForm batteryCapacity onBlur e:', e);
                      if (e.target.value === '') {
                        console.log('HouseholdForm batteryCapacity onBlur e.target.value:', e.target.value);
                        onChange(0);
                      }
                      onBlur();
                    }}
                    onKeyDown={(e) => {
                      const currentCapacity = parseFloat(batteryCapacity as string) || 0;
                      if (e.key === 'Enter') {
                        onChange({ target: { value: batteryCapacity } });
                      }
                      if (e.key === 'ArrowUp') {
                        const newValue = Math.min(currentCapacity + 1, 1000);
                        setBatteryCapacity(newValue);
                        onChange(newValue);
                    }
                    if (e.key === 'ArrowDown') {
                        const newValue = Math.max(currentCapacity - 1, 0);
                        setBatteryCapacity(newValue);
                        onChange(newValue);
                    }
                    }}
                    inputRef={ref}
                    InputProps={{ 
                      endAdornment: 
                        <HouseInputAdornment position="end">
                          {formText.defaultFormState.battery.unit}</HouseInputAdornment>,
                      inputProps: { 
                        style: { textAlign: 'right' },
                        min: 0,
                        max: 1000,
                      }
                    }}
                    error={!!errors.battery?.capacity}
                    helperText={errors.battery?.capacity?.message}
                  />
                )}
              />
          {errors.battery?.capacity && (
            <FormHelperText>This field is required: {errors.battery.capacity.message}</FormHelperText>
          )}
        </FormControl>
        </FormSectionFlex>
        
        </HalfWidthFormBox>




        </FormSectionFlex>




        



        {/* Transport section */}

        <FormBox theme={theme} className='formBox'>
          <FDivider />
          <HalfWidthFormBox theme={theme} className='halfWidthFormBox'>
          
            
            <Typography variant="h3">Transport</Typography>

                
            <FormSectionFlex theme={theme} className='FormSectionFlex'>
            <FormControl 
              className="fullFormControl"
              error={!!errors.vehicleObjs}>
              <LabelBox>
                <FormLabel className='mainLabels'>Number of vehicles</FormLabel>
                <HouseholdTooltip 
                title={tooltipText.vehicleNumber} 
                placement="top"
                open={openTooltips.vehicleNumber} 
                onClose={handleCloseTooltip('vehicleNumber')}
                >              
                <img
                    src={questionIcon}
                    className="tooltip-logo"
                    alt="logo"
                    onClick={handleOpenTooltip('vehicleNumber')}
                />
              </HouseholdTooltip>
              </LabelBox>
              <Controller
                name="numberOfVehicles"
                control={control}
                render={({ field }) => (
                <HouseSelect
                  IconComponent={chevronDown}
                  labelId="number-of-vehicles-label"
                  {...field}
                  value={numberOfVehicles}
                >                
                {formText.options.vehicle.amount.map((option: OptionNumber) => (
                  <HouseMenuItem 
                    theme={theme} 
                    key={option.value} 
                    value={option.value}
                    selected={numberOfVehicles === option.value}              
                    >
                    {option.text}
                  </HouseMenuItem>
                ))}
              </HouseSelect>
                )}
              />
              {errors.vehicleObjs && <FormHelperText>This field is required</FormHelperText>}
            </FormControl>
            </FormSectionFlex>
          
          </HalfWidthFormBox>
            




          
            <FormSectionGrid theme={theme} className='FormSectionGrid'
              sx={{
                margin: '1.8rem 0',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                [theme.breakpoints.up('sm')]: {
                  gridTemplateColumns: 'repeat(2, 1fr)',
                },
                gridGap: '2rem',
                alignItems: 'start',
                gridAutoRows: 'max-content',
              }}
              >      
                  
                
                {watchAllFields.vehicleObjs?.map((vehicle: VehicleObject, index: number) => (
                  <VehicleBox key={`Car-${index}`} 
                    index={index} 
                    // id={index + 1}
                    defaultChecked={true}
                    {...vehicle} 
                    // register={methods.register}
                    // errors={methods.formState.errors}
                    errors={errors}
                    register={register}
                    control={control}
                    onDelete={() => handleVehicleDelete(index)}
                    fuelTypeOptions={formText.options.vehicle.fuelTypeOptions}
                    usageOptions={formText.options.vehicle.usageOptions}
                    defaultType={'Medium'}
                    />                  
                ))}

            </FormSectionGrid>
            

          

          </FormBox>

        </FormContainer>      
 
      </form>
  );
  {/* </FormProvider> */} 
};

export default HouseholdForm;