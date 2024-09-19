import React from 'react';
import { Box, FormControl, FormHelperText, IconButton, MenuItem, Select, Typography, useTheme, Accordion, AccordionSummary, AccordionDetails, Switch, FormLabel, Button, SelectChangeEvent  } from '@mui/material';
import { Option, VehicleObject, UsageType, UsageOption } from '../data/interfaces';
import deleteIcon from 'src/assets/icons/x-window.svg';
import { FDivider } from 'src/shared/styles/FDivider';
import { HouseSwitch } from './HouseSwitch';
import { useState } from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';
// import { VehicleOptionType } from '../data/householdForm.text';
import { VehicleFuelTypeEnum } from 'src/shared/api/openapi-client';
import { SwitchLabel } from '../HouseholdForm.styles';
import chevronDown from 'src/assets/icons/chevron-down.svg';
import chevronUp from 'src/assets/icons/chevron-up.svg';

interface VehicleBoxProps extends VehicleObject {
    index: number;
    id: number;
    errors: any;
    register: any;    
    control: any;
    fuelTypeOptions: Option<VehicleFuelTypeEnum>[];
    onDelete: (index: number) => void;
    usageOptions: UsageOption[];
    defaultType: UsageType;
    defaultChecked: boolean;
}

const VehicleBox: React.FC<VehicleBoxProps> = ({ id, fuelType, fuelTypeOptions, usageOptions, index, register, control, errors, onDelete, defaultType, defaultChecked }) => {
    const theme = useTheme();
    const { setValue } = useForm();
    // const { setValue, getValues, control } = useFormContext();
    // console.log("VehicleBox usageOptionsList:", usageOptionsList);
    // console.log("VehicleBox defaultType:", defaultType);
    const [selectedUsageName, setSelectedUsageName] = useState<string | undefined>(undefined);
    const [showDetails, setShowDetails] = useState(false);



    // const handleUsageChange = (event: SelectChangeEvent<UsageType>) => {
    //     const selectedValue = event.target.value as UsageType;
    //     setSelectedUsageName(selectedValue);
    //     setValue(`vehicleObjs.${index}.usageType`, selectedValue, { shouldValidate: true });
    // };
    const handleUsageTypeChange = (selectedType: UsageType) => {
        setSelectedUsageName(selectedType);
        setValue(`vehicleObjs.${index}.usageType`, selectedType, { shouldValidate: true});
    };


    const toggleDetails = () => {
        setShowDetails((prev) => !prev);
    };
    




    
    return (
        <Box className="VehicleBox"
            sx={{
                padding: '1rem 1rem',
                borderWidth: '1px',
                borderRadius: theme.shape.borderRadius + 'px',
                borderStyle: 'solid',
                borderColor: theme.palette.primary.dark,
                flexBasis: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
            }}
            >            
            <Box className="VehicleBox-header"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                >
                <Typography 
                    variant="h4" 
                    sx={{ 
                        flexGrow: 1,
                        flexBasis: '30%'
                    }}
                    >
                    {/* Car {id} */}
                    Car {index + 1}
                </Typography>


                <FormControl className="VehicleBox-fuelType"
                    error={!!errors.vehicleObjs} 
                    key={`Car-${index + 1}`}
                    sx={{
                        margin: '0 0.5rem',
                        flexBasis: '50%',
                    }}
                    size="small"
                    >
                    <Select
                        labelId={`vehicles-fuelType-label-${index}`}
                        id={`vehicles-fuelType-${index}`}
                        value={fuelType || ''}
                        {...register(`vehicleObjs.${index}.fuelType`, { required: true })}
                        >
                        {fuelTypeOptions.map((option: Option<VehicleFuelTypeEnum>) => (
                            <MenuItem key={`fuelType-${option.value}`} value={option.value}>
                            {option.text}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.vehicleObjs && <FormHelperText>This field is required</FormHelperText>}
                </FormControl>


                <IconButton
                    aria-label="delete"
                    onClick={() => onDelete(index)}
                    sx={{
                        flexBasis: '12%',
                        padding: '0',
                        '&:hover': {
                            backgroundColor: 'transparent',
                        }
                    }}
                >
                    <img src={deleteIcon} alt="delete" />
                </IconButton>

            </Box>

            
            <FDivider 
                sx={{
                    margin: '0.5rem 0 1.0rem 0'
                }}
                />
            

            <Box className="VehicleBox-subheader">
                <Box className="VehicleBox-toggleBox"
                    sx={{
                        display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '0.6rem',
                            justifyContent: 'space-between',                        
                        [theme.breakpoints.only('md')]: {
                            flexDirection: 'column-reverse',
                            gap: '0.6rem',
                            alignItems: 'start',
                            width: '100%',
                        }
                    }}
                    >
                    <Box
                        onClick={toggleDetails} 
                        sx={{ 
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                        >
                        <Typography variant="body2"
                            sx={{ 
                                cursor: 'pointer',
                                textDecoration: 'underline', 
                                color: theme.palette.text.primary 
                            }}
                            >
                            {showDetails ? 'Hide Usage' : 'Edit Usage'}
                        </Typography>
                        <img
                        src={showDetails ? chevronUp : chevronDown}
                        alt="toggle icon"
                        style={{
                            width: '0.8rem',
                            height: '0.8rem',
                            marginLeft: '0.5rem',
                        }}
                        />
                    </Box>

                    <Box
                        className="VehicleBox-switchToEV"
                        sx={{}}
                        onClick={(event) => event.stopPropagation()}
                    >
                    <FormControl
                    sx={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                    >
                    <SwitchLabel className="installSolar-label" theme={theme}>
                        Switch to EV
                    </SwitchLabel>
                    {/* <HouseSwitch
                        size="small"
                        theme={theme}
                        {...register(`vehicleObjs.${index}.switchToEV`)}
                        // {...register(`vehicleObjs.${id}.switchToEV`)}
                        // defaultChecked={defaultChecked}
                        /> */}
                        <Controller
                            name={`vehicleObjs.${index}.switchToEV`}
                            control={control}
                            defaultValue={defaultChecked}
                            render={({ field }) => (
                            <HouseSwitch
                                size="small"
                                theme={theme}
                                checked={field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                            />
                            )}
                        />
                    </FormControl>
                </Box>
                </Box>

                {showDetails && (
                <Box className="VehicleBox-details" 
                    sx={{ 
                        marginTop: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    >
                    <Typography variant="body2">Usage per week</Typography>

                    <FormControl
                        className="VehicleBox-usage"
                        error={!!errors.vehicleObjs}
                        key={`Car-${id}`}
                        size="small"
                        sx={{
                            '& .MuiInputBase-root': {
                                maxHeight: '2.438rem'
                            },
                        }}
                        >
                    {/* <Select
                        labelId={`vehicles-usages-label-${index}`}
                        id={`vehicles-usages-${index}`}
                        value={selectedUsageName}
                        onChange={handleUsageChange}
                        defaultValue={defaultType}
                        {...register(`vehicleObjs.${index}.usage`, { required: true })}
                        renderValue={(selectedType: UsageType) => {
                        const selectedOption: UsageOption | undefined = usageOptions.find((option: UsageOption) => option.type === selectedType);
                        return selectedOption ? (
                            <Typography variant="h5">
                            {selectedOption.type}
                            <Typography component="span" 
                                sx={{
                                    fontSize: '0.875rem',
                                    color: theme.palette.text.secondary,
                                }}
                                >
                                {' ' + selectedOption.unit}
                            </Typography>
                            </Typography>
                        ) : '';
                        }}
                    >
                        {usageOptions.map((option: UsageOption) => (
                        <MenuItem key={`usage-${option.unit}`} value={option.type}>
                            <Typography variant="h5">
                            {option.type}
                            <Typography component="span"
                            sx={{
                                fontSize: '0.875rem',
                                color: theme.palette.text.secondary,
                            }}
                            >
                                {' ' + option.unit}
                            </Typography>
                            </Typography>
                        </MenuItem>
                        ))}
                    </Select> */}
                     <Controller
                    name={`vehicleObjs.${index}.usageType`}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={defaultType}
                    render={({ field }) => (
                        <Select
                            labelId={`vehicles-usageType-label-${index}`}
                            id={`vehicles-usageType-${index}`}
                            value={field.value}
                            onChange={(e) => {
                                const selectedType = e.target.value as UsageType;
                                field.onChange(e);
                                handleUsageTypeChange(selectedType);
                            }}
                            renderValue={(selectedType: UsageType) => {
                                const selectedOption: UsageOption | undefined = usageOptions.find((option: UsageOption) => option.type === selectedType);
                                return selectedOption ? (
                                    <Typography variant="h5">
                                        {selectedOption.type}
                                        <Typography component="span" 
                                            sx={{
                                                fontSize: '0.875rem',
                                                color: theme.palette.text.secondary,
                                            }}
                                        >
                                            {' ' + selectedOption.unit}
                                        </Typography>
                                    </Typography>
                                ) : '';
                            }}
                        >
                            {usageOptions.map((option: UsageOption) => (
                                <MenuItem key={`usage-${option.unit}`} value={option.type}>
                                    <Typography variant="h5">
                                        {option.type}
                                        <Typography component="span"
                                            sx={{
                                                fontSize: '0.875rem',
                                                color: theme.palette.text.secondary,
                                            }}
                                        >
                                            {' ' + option.unit}
                                        </Typography>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                    {errors.vehicleObjs && <FormHelperText>This field is required</FormHelperText>}
                    </FormControl>
                </Box>
                )}
            </Box>

          
            
        </Box>
    );
};


export default VehicleBox;