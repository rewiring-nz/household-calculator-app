import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';



// ----------------- Styles & Material-UI -------------------
import { Box, FormControl, FormControlLabel, FormHelperText, FormLabel, Input, InputAdornment, InputLabel, Radio, RadioGroup, Select, TextField, Tooltip, Typography, useTheme, Checkbox } from '@mui/material';
// import { ReactComponent as TickIcon } from 'src/assets/icons/tick.svg';
import './HouseholdForm.css';
import { FDivider } from 'src/shared/styles/FDivider';

// ----------------- Models & Interfaces -------------------
import { CooktopEnum, Household, LocationEnum, SpaceHeatingEnum, Vehicle, VehicleFuelTypeEnum, WaterHeatingEnum } from '../../shared/api/openapi-client';
import { HouseholdFormState, Option, OptionNumber, OptionYesNo, UsageType, VehicleObject } from './data/interfaces';


// ----------------- Data -------------------
import useHouseholdData from '../../hooks/useHouseholdData/useHouseholdData';
import { formText, LocationOptionType } from './data/householdForm.text';


// ----------------- Icons -------------------
import questionIcon from '../../assets/icons/question.svg';
import resetIcon from '../../assets/icons/carbon-reset.svg';
import { ReactComponent as chevronDown} from '../../assets/icons/chevron-down.svg';

// ----------------- Components -------------------
import { FormBox, HalfWidthFormBox, FormContainer, FormSection, ResetButton, tooltipPoppers, SwitchLabel, HouseSelect, HouseInputAdornment, LabelBox } from './HouseholdForm.styles';
import VehicleBox from './components/HouseholdVehicle';
import TooltipModal from './components/TooltipDialog';
import TooltipDialog from './components/TooltipDialog';
import HouseholdTooltip from './components/HouseholdTooltip';
import { HouseRadio, HouseCheck } from './components/HouseCheckRadio';
import { HouseSwitch } from './components/HouseSwitch';
import HouseMenuItem from './components/HouseMenuItem';


interface HouseholdFormProps {
  householdData: Household;
  updateHouseholdData: (data: Household) => void;
}




const HouseholdForm: React.FC<HouseholdFormProps> = ({ householdData, updateHouseholdData }) => {
  const theme = useTheme();
  
  // const { 
  //   householdData, 
  //   updateHouseholdData, 
  //   savingsData,
  //   getSavingsData, 
  //   loadingData, 
  //   errorData 
  // } = useHouseholdData();
  
  // const savingsData = getSavingsData();

  
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
      // dontWantSolar: householdData?.solar?.installSolar === undefined 
      //   ? defaultFormData.solar.dontWantSolar 
      //   : !householdData.solar.installSolar
    },
    battery: {
      hasBattery: Boolean(householdData?.battery?.hasBattery ?? defaultFormData.battery.hasBattery),
      capacity: householdData?.battery?.capacity ?? defaultFormData.battery.capacity,
      installBattery: householdData?.battery?.installBattery ?? defaultFormData.battery.installBattery,
      // dontWantBattery: householdData?.battery?.installBattery === undefined 
      //   ? defaultFormData.battery.dontWantBattery 
      //   : !householdData.battery.installBattery
    }
  };

  

  const { register, handleSubmit, watch, control, formState: { errors }, reset, setValue } = useForm<HouseholdFormState>({
    defaultValues: merged_defaultFormValues,
  });

  const watchAllFields: HouseholdFormState = watch();
 
  // const hasSolar = watch('solar.hasSolar');
  // const hasBattery = watch('battery.hasBattery');
  // const [showSolarToggle, setShowSolarToggle] = useState(true);
  // const [showBatteryToggle, setShowBatteryToggle] = useState(true);
  const [disableSolarToggle, setDisableSolarToggle] = useState(false);
  const [disableBatteryToggle, setDisableBatteryToggle] = useState(false);

  const watchHasSolar = watch('solar.hasSolar');
  const watchHasBattery = watch('battery.hasBattery');

  // solar state
  useEffect(() => {
    console.log('HouseholdForm useEffect watchHasSolar:', watchHasSolar);
    // setShowSolarToggle(!(watchHasSolar ?? true));
    if(watchHasSolar) {
      // setShowSolarToggle(false);
      setDisableSolarToggle(true);
      setValue('solar.installSolar', false);
    } else {
      // const showSolar = showSolarToggle;
      // setShowSolarToggle(true);   
      setDisableSolarToggle(false);   
      // if (showSolar !== showSolarToggle) {
        // setValue('solar.installSolar', true);
      // }
    }
  // }, [watchHasSolar, setValue, showSolarToggle]);
  }, [watchHasSolar, setValue, disableSolarToggle]);
// -------------------------------------------------------------------



  // battery state
  useEffect(() => {
    console.log('HouseholdForm useEffect watchHasBattery:', watchHasBattery);
    // setShowBatteryToggle(!(watchHasBattery ?? true));
    if(watchHasBattery) {
      // setShowBatteryToggle(false);
      setDisableBatteryToggle(true);
      setValue('battery.installBattery', false);
    } else {
      // const showBattery = showBatteryToggle;
      // setShowBatteryToggle(true);
      setDisableBatteryToggle(false);
      // if (showBattery !== showBatteryToggle) {
        // setValue('battery.installBattery', true);
      // }
    }
  // }, [watchHasBattery, setValue, showBatteryToggle]);
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
    const fuelTypes = Object.values(VehicleFuelTypeEnum);

    if (numberOfVehicles > currentLength) {
      for (let i = currentLength; i < numberOfVehicles; i++) {
        // append({ fuelType: fuelTypes[i % fuelTypes.length] });
        // append({ id: (i + 1), fuelType: fuelTypes[i % fuelTypes.length], usage: { name: 'Medium', value: 200, unit: '100-300 km/wk' } });
        console.log('HouseholdForm useEffect append vehicle:', { id: (i + 1), fuelType: fuelTypes[i % fuelTypes.length], usageType: 'Medium' as UsageType });
        append({ 
          id: (i + 1), 
          fuelType: fuelTypes[i % fuelTypes.length], 
          usageType: 'Medium' as UsageType,
          switchToEV: true
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
    // fields.forEach((field, index) => {
    //   setValue(`vehicleObjs.${index}.id`, index + 1);
    // });
    console.log('HouseholdForm handleVehicleDelete numberOfVehicles:', numberOfVehicles);
    console.log('HouseholdForm vehicleObjs fields:', fields);    
  };

  // useEffect(() => {
  //   // Update the id of each VehicleBox after an item is removed
  //   fields.forEach((field, index) => {
  //       setValue(`vehicleObjs.${index}.id`, index + 1);
  //   });
  // }, [fields, setValue]);


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

      // setShowSolarToggle(!(value.solar?.hasSolar ?? defaultFormData.solar.hasSolar));
      // setShowBatteryToggle(!(value.battery?.hasBattery ?? defaultFormData.battery.hasBattery));
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
                kmsPerWeek: formText.options.vehicle.usageOptionsList.find(option => 
                  option.type === vehicle.usageType )?.value ?? 200,
                switchToEV: vehicle.switchToEV ?? false,
              };
              return vehicleOut;
              // return {
                // fuelType: vehicle.fuelType,
                // usage: formText.options.vehicle.usageOptionsList.find(option => 
                //   option.type === vehicle.usageType ) 
                //   ?? { type: 'Medium', formValue: 200, unit: '100-300 km/wk' }
              // }
            }),
          solar: {
            hasSolar: Boolean(formValue.solar?.hasSolar ?? defaultFormData.solar.hasSolar),
            size: formValue.solar?.size ?? defaultFormData.solar.size,
            installSolar: formValue.solar?.installSolar ?? defaultFormData.solar.installSolar
            // installSolar: (formValue.solar?.dontWantSolar ?? defaultFormData.solar.dontWantSolar) ? false : true
          },
          battery: {
            hasBattery: Boolean(formValue.battery?.hasBattery ?? defaultFormData.battery.hasBattery),
            capacity: formValue.battery?.capacity ?? defaultFormData.battery.capacity,
            installBattery: formValue.battery?.installBattery ?? defaultFormData.battery.installBattery
            // installBattery: (formValue.battery?.dontWantBattery ?? defaultFormData.battery.dontWantBattery) ? false : true
          }
        };

        if (formValue.solar?.hasSolar && householdDataOut.solar) {
          householdDataOut.solar.installSolar = null;
        }
        if (formValue.battery.hasBattery && householdDataOut.battery) {
          householdDataOut.battery.installBattery = null;
        }

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


        <Typography variant="h3">Dwelling</Typography>

        <FormSection theme={theme} className='formSection'>
        <FormControl 
              className="fullFormControl"
              error={!!errors.location}>
          <LabelBox>
            <FormLabel className='mainLabels'>Location</FormLabel>
          </LabelBox>
            <HouseSelect
              // {...field}
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
                    // open={openTooltips.location}
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
        {/* </FormSection>

        <FormSection> */}
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
            // defaultValue={formText.occupancy.default}
          >
            {/* {occupancyOptions.map((option: OptionNumber) => ( */}
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
          {/* <Box display="flex" alignItems="center"> */}
          <LabelBox>
            <FormLabel className='mainLabels'>House heating</FormLabel>
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
          </LabelBox>

          <HouseSelect
            IconComponent={chevronDown}
            labelId="spaceHeating-label"
            id="spaceHeating"
            value={watchAllFields.spaceHeating}
            {...register('spaceHeating', { required: true })}
            // defaultValue={spaceHeatingOptions.default}
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
            {/* {waterHeatingOptions.map((option: Option, i: number) => ( */}
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
          </LabelBox>

          <HouseSelect
            IconComponent={chevronDown}
            labelId="cooktop-label"
            id="cooktop"
            value={watchAllFields.cooktop}
            {...register('cooktop', { required: true })}
          >
            {/* {cooktopOptions.map((option: Option, i: number) => ( */}
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
        </FormSection>

      </FormBox>

















      
      <FormSection theme={theme} className='formSection'
        sx={{
          margin: 0
        }}
        >
      <HalfWidthFormBox theme={theme} className='halfWidthFormBox'>
        <FDivider />







        <Typography variant="h3">Solar</Typography>





          <FormSection theme={theme} className='formSection'>
              {/* <FormLabel className='mainLabels'>Do you have solar panels?</FormLabel> */}
              {/* <FormQuestionLabel className='FormQuestionLabel'>
                Do you have solar panels?
                </FormQuestionLabel> */}
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
              </LabelBox>
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
                      // <HouseRadio />
                      <Radio />
                      } label={option.text} />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.solar && <FormHelperText>This field is required</FormHelperText>}
          </FormControl>

          {/* <FormControl>
            <Controller
              name="solar.installSolar"
              // name="solar.dontWantSolar"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControlLabel
                  control={<HouseCheck {...field}/>}
                  label="I'd like solar"
                />
              )}
            />
            {errors.solar && <FormHelperText>This field is required</FormHelperText>}
          </FormControl> */}
          
          </Box>
        </FormSection>







        {/* {showSolarToggle && ( */}
        <FormSection theme={theme} className='formSection'>
            <FormControl className="fullFormControl"
              error={!!errors.solar}
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
                    defaultChecked 
                    size="small" 
                    theme={theme} 
                    disabled={disableSolarToggle}
                    />
                )}
              />
            </FormControl>
        </FormSection>
      {/* )} */}









        
        <FormSection theme={theme} className='formSection-2'
          sx={{
            margin: '1.5rem 0 0.4rem 0'
          }}
          >
          <FormControl 
              className="fullFormControl"
              error={!!errors.solar}>
            <LabelBox>
              <FormLabel className='mainLabels'>What size?</FormLabel>            
              {/* <Box className="TooltipBox" >
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
              </Box>   */}
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
                      setSolarSize(numericValue);
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
                      endAdornment: <HouseInputAdornment position="end">{formText.defaultFormState.solar.unit}</HouseInputAdornment>,
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
          <LabelBox>
            <FormLabel className='mainLabels'>Do you have a battery?</FormLabel>
            {/* <FormQuestionLabel className='FormQuestionLabel'>
              Do you have a battery?
            </FormQuestionLabel> */}
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
          </LabelBox>
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
                          // <HouseRadio />
                          <Radio />
                          } label={option.text} />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.battery && <FormHelperText>This field is required</FormHelperText>}
              </FormControl>
          </Box>        
        </FormSection>


        {/* {watchAllFields.vehicleObjs?.map((vehicle: any, index: number) => ( */}
        {/* {!(watchAllFields.battery?.hasBattery) && ( */}
      {/* {showBatteryToggle && ( */}
        <FormSection theme={theme} className='formSection'>
          {/* <Box>         */}
            <FormControl className="fullFormControl"
              error={!!errors.battery}
              sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // margin: '0.4rem 0 0.8rem 0'
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
                  // <HouseSwitch {...field} />
                  <HouseSwitch
                    {...field} 
                    defaultChecked 
                    size="small" 
                    theme={theme}
                    disabled={disableBatteryToggle}
                    />
                )}
              />
            </FormControl>
          {/* </Box>         */}
        </FormSection>
      {/* )} */}

        











        <FormSection theme={theme} className='formSection-2'          
          sx={{
            margin: '1.5rem 0 0.4rem 0'
          }}
          >
        <FormControl 
              className="fullFormControl"
              error={!!errors.battery}>
          <LabelBox>          
            <FormLabel className='mainLabels'>What size?</FormLabel>            
            {/* <Box className="TooltipBox" >
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
            </Box>   */}
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
          {/* <Select
            labelId="batterySize-label"
            id="batterySize"
            value={watchAllFields.battery?.capacity}
            {...register('battery.capacity', { required: true })}
          >
            {formText.options.battery.capacityList.map((option: OptionNumber, i: number) => (
              <StyledMenuItem key={option.value} value={option.value}>
                {option.text}
              </StyledMenuItem>
            ))}
          </Select> */}

          <Controller
                name="battery.capacity"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <TextField
                    id="outlined-number"
                    type="number"
                    inputMode="numeric"
                    value={batteryCapacity}
                    // value={numVehicles || value}
                    onChange={(e) => {
                      const numericValue = parseFloat(e.target.value);
                      setBatteryCapacity(numericValue);
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
                      endAdornment: 
                        <HouseInputAdornment position="end">
                          {formText.defaultFormState.battery.unit}</HouseInputAdornment>,
                      inputProps: { 
                        style: { textAlign: 'right' },
                        pattern: "[0-9]*" 
                      }
                    }}
                  />
                )}
              />
          {errors.battery && <FormHelperText>This field is required</FormHelperText>}
        </FormControl>
        </FormSection>
        
        </HalfWidthFormBox>




        </FormSection>








        {/* Transport section */}

        <FormBox theme={theme} className='formBox'>

          <HalfWidthFormBox theme={theme} className='halfWidthFormBox'>
            <FDivider />
            
            <Typography variant="h3">Transport</Typography>

                
            <FormSection theme={theme} className='formSection'>
            {/* <FormSection> */}
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
          
          </HalfWidthFormBox>
            




          {/* <FormBox theme={theme} className='formBox'> */}
            <FormSection theme={theme} className='formSection'
              sx={{
                margin: '1.8rem 0',
                width: '100%',
                // display: 'flex',
                // flexDirection: 'row',
                // flexWrap: 'wrap',
                // justifyContent: 'space-between',
                // alignItems: 'flex-start',
                // alignContent: 'flex-start',
                display: 'grid',
                // gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gridTemplateColumns: 'repeat(1, 1fr)',
                [theme.breakpoints.up('sm')]: {
                  gridTemplateColumns: 'repeat(2, 1fr)',
                },
                gridGap: '2rem',
                alignItems: 'start',
                // gridAutoFlow: 'dense',
                gridAutoRows: 'max-content',
              }}
              >      
                  
                
                {watchAllFields.vehicleObjs?.map((vehicle: any, index: number) => (
                  <VehicleBox key={`Car-${index}`} 
                    index={index} 
                    id={index + 1}
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

              {/* </Box> */}
            </FormSection>
            

          

          </FormBox>

        </FormContainer>      

      </form>
    // </Box>
  );
};

export default HouseholdForm;