import React from 'react';
import { Box, FormControl, FormHelperText, IconButton, MenuItem, Select, Typography, useTheme, Accordion, AccordionSummary, AccordionDetails, Switch, FormLabel, Button  } from '@mui/material';
import { Option, VehicleObject, UsageOptions, UsageType } from '../data/interfaces';
import deleteIcon from 'src/assets/icons/x-window.svg';
import { FDivider } from 'src/shared/styles/FDivider';
import { HouseSwitch } from './HouseSwitch';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { VehicleOptionType } from '../data/householdForm.text';
import { VehicleFuelTypeEnum } from 'src/shared/api/openapi-client';
import { SwitchLabel } from '../HouseholdForm.styles';
import chevronDown from 'src/assets/icons/chevron-down.svg';
import chevronUp from 'src/assets/icons/chevron-up.svg';

interface VehicleBoxProps extends VehicleObject {
    index: number;
    errors: any;
    register: any;
    fuelTypes: Option<VehicleFuelTypeEnum>[];
    // fuelTypes: VehicleOptionType[];
    onDelete: (index: number) => void;
    usageOptionsList: UsageOptions[];
    // defaultObject: VehicleObject;
    defaultType: UsageType;
    // showDetails: boolean;
    
}

const VehicleBox: React.FC<VehicleBoxProps> = ({ id, fuelType, fuelTypes, usageOptionsList, index, register, errors, onDelete, defaultType }) => {
    const theme = useTheme();
    const { setValue } = useForm();
    // console.log("VehicleBox usageOptionsList:", usageOptionsList);
    // console.log("VehicleBox defaultType:", defaultType);
    const [selectedUsageName, setSelectedUsageName] = useState<string | undefined>(undefined);
    // const usageMap = new Map<string, Usage>(usageOptions.map((option: Usage) => [option.name, option]));
    const [showDetails, setShowDetails] = useState(false);



    const handleUsageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedValue = event.target.value as string;
        setSelectedUsageName(selectedValue);
        setValue(`vehicleObjs.${index}.usage`, selectedValue, { shouldValidate: true });
    };


    const toggleDetails = () => {
        setShowDetails((prev) => !prev);
    };
    




    
    return (
        <Box className="VehicleBox"
            sx={{
                padding: '1rem 1rem',
                borderWidth: '1px', //'0.1rem', // 1.6px
                // borderRadius: '0.5rem', // 0.5rem = 8 '0.25rem',
                borderRadius: theme.shape.borderRadius + 'px',
                borderStyle: 'solid',
                borderColor: theme.palette.primary.dark,
                flexBasis: '100%',
                maxWidth: '100%',
                height: showDetails ? '13.2rem' : 'auto',
                overflow: 'hidden',
                // [theme.breakpoints.up('sm')]: {
                //   flexBasis: 'calc(50% - 3rem)', // 2 columns on medium and up screens
                //   maxWidth: 'calc(50% - 3rem)'
                // } 
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
                    variant="h5" 
                    sx={{ 
                        // textTransform: 'uppercase',
                        flexGrow: 1,
                        flexBasis: '30%'
                    }}
                    >
                    Car {id}
                </Typography>


                <FormControl className="VehicleBox-fuelType"
                    error={!!errors.vehicleObjs} 
                    key={`Car-${id}`}
                    sx={{
                        // width: '33%',
                        // flexBasis: '33%',
                        margin: '0 0.5rem',
                        flexBasis: '50%',
                        // '& .MuiFormControl-root': {
                        //     width: '33%',
                        //     flexBasis: '33%',
                        //     margin: '0 0.5rem',
                        // },
                    }}
                    size="small"
                    >
                    <Select
                        labelId={`vehicles-fuelType-label-${index}`}
                        id={`vehicles-fuelType-${index}`}
                        value={fuelType || ''}
                        {...register(`vehicleObjs.${index}.fuelType`, { required: true })}
                        >
                        {fuelTypes.map((option: Option<VehicleFuelTypeEnum>) => (
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
                        // position: 'absolute', top: '0.5rem', right: '0.5rem' 
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
                    margin: '0.5rem 0'
                }}
                />
            

            <Box className="VehicleBox-subheader">
                <Box className="VehicleBox-toggleBox"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        margin: '1.3rem 0'
                    }}
                    >
                    {/* <Button
                        variant="text" */}
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
                    <HouseSwitch
                        defaultChecked
                        size="small"
                        theme={theme}
                        {...register(`vehicleObjs.${index}.switchToEV`)}
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
                    >
                    <Select
                        labelId={`vehicles-usages-label-${index}`}
                        id={`vehicles-usages-${index}`}
                        value={selectedUsageName}
                        onChange={handleUsageChange}
                        defaultValue={defaultType}
                        {...register(`vehicleObjs.${index}.usage`, { required: true })}
                        renderValue={(selectedType: UsageType) => {
                        const selectedOption: UsageOptions | undefined = usageOptionsList.find(option => option.type === selectedType);
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
                        {usageOptionsList.map((option: UsageOptions) => (
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
                    {errors.vehicleObjs && <FormHelperText>This field is required</FormHelperText>}
                    </FormControl>
                </Box>
                )}
            </Box>


          
            
        </Box>
    );
};


export default VehicleBox;