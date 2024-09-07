import React from 'react';
import { Box, FormControl, FormHelperText, IconButton, MenuItem, Select, Typography, useTheme, Accordion, AccordionSummary, AccordionDetails, Switch, FormLabel  } from '@mui/material';
import { Option, VehicleObject, UsageOptions, UsageType } from '../data/interfaces';
import deleteIcon from 'src/assets/icons/x-window.svg';
import { FDivider } from 'src/shared/styles/FDivider';
import { HouseSwitch } from './HouseSwitch';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import { VehicleOptionType } from '../data/householdForm.text';
import { VehicleFuelTypeEnum } from 'src/shared/api/openapi-client';

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
}

const VehicleBox: React.FC<VehicleBoxProps> = ({ id, fuelType, fuelTypes, usageOptionsList, index, register, errors, onDelete, defaultType }) => {
    const theme = useTheme();
    const { setValue } = useForm();
    // console.log("VehicleBox usageOptionsList:", usageOptionsList);
    // console.log("VehicleBox defaultType:", defaultType);

    const [selectedUsageName, setSelectedUsageName] = useState<string | undefined>(undefined);
    // const usageMap = new Map<string, Usage>(usageOptions.map((option: Usage) => [option.name, option]));

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedValue = event.target.value as string;
        setSelectedUsageName(selectedValue);
        setValue(`vehicleObjs.${index}.usage`, selectedValue, { shouldValidate: true });
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
                [theme.breakpoints.up('sm')]: {
                  flexBasis: 'calc(50% - 3rem)', // 2 columns on medium and up screens
                  maxWidth: 'calc(50% - 3rem)'
                } 
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
            

            <Box className="VehicleBox-subheader"
                sx={{
                    // display: 'flex',
                    // flexDirection: 'row',
                    // // alignItems: 'center'
                    // justifyContent: 'space-between'
                }}
                >
                
                <Accordion
                    sx={{
                        border: 'none',
                        boxShadow: 'none',
                        // width: '42%',
                        backgroundColor: theme.palette.background.default,
                        // textDecoration: 'underline',
                        '& .MuiAccordionSummary-root': {
                            padding: '0',
                            // textDecoration: 'underline'
                        },
                    }}  
                    >

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            // padding: '0.5rem',
                            '&:hover': {
                                // backgroundColor: theme.palette.action.hover
                            }
                        }}
                        >

                            <AccordionSummary
                            // expandIcon={<ArrowDownwardIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            >
                            {/* <Box className="AccordionSummary-content"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    padding: '0.5rem',
                                    '&:hover': {
                                        backgroundColor: theme.palette.action.hover
                                    }
                                }}
                                > */}
                                <Typography
                                    sx={{
                                        textDecoration: 'underline'
                                    }}
                                    >
                                    Edit Usage
                                </Typography>                            
                            </AccordionSummary>


                            <Box className="VehicleBox-switchToEV"
                            sx={{
                                // display: 'flex',
                                // alignItems: 'center',
                                // marginLeft: 'auto',
                            }}
                            onClick={(event) => event.stopPropagation()}
                            >
                            <FormControl
                                sx={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                                >
                                {/* <FormLabel component="legend">Switch to EV</FormLabel> */}
                                <FormLabel className="VehicleBox-switchToEV-label" 
                                    sx={{
                                        display: 'inline-block',
                                        whiteSpace: 'nowrap',
                                        margin: '0.8rem 0.4rem',
                                        textDecoration: 'none',
                                        color: theme.palette.text.secondary,
                                        '&.Mui-focused': {
                                            color: theme.palette.text.primary,
                                        },
                                        '&.Mui-active': {
                                            color: theme.palette.text.primary,
                                        }
                                    }}
                                    >Switch to EV</FormLabel>
                                {/* <Switch  defaultChecked size="small" /> */}
                                <HouseSwitch  defaultChecked size="small" theme={theme} />
                            </FormControl>
                        </Box>

                    </Box>
                    

                    <AccordionDetails
                        sx={{
                            padding: '0',
                        }}
                        >
                        <Box className="AccordionDetails-content"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '.4em'
                            }}
                            >
                            {/* <Typography variant="body1">
                                {usage.name}
                            </Typography>
                            <Typography variant="body1">
                                {usage.value}
                            </Typography>
                            <Typography variant="body1">
                                {usage.unit}
                            </Typography> */}
                            <Typography variant="caption">
                                Usage per week
                            </Typography>

                            <FormControl className="VehicleBox-usage"
                                error={!!errors.vehicleObjs} 
                                key={`Car-${id}`}
                                sx={{
                                    // width: '33%',
                                    // flexBasis: '33%',
                                    // margin: '0 0.5rem',
                                    // flexBasis: '100%',
                                    // '& .MuiFormControl-root': {
                                    //     width: '33%',
                                    //     flexBasis: '33%',
                                    //     margin: '0 0.5rem',
                                    // },
                                }}
                                size="small"
                                >
                                <Select
                                    labelId={`vehicles-usages-label-${index}`}
                                    id={`vehicles-usages-${index}`}
                                    // value={usage.value || ''}
                                    // value={usage || ''}
                                    // defaultValue={defaultObject.usage}
                                    // value={usage || defaultObject.usage}
                                    value={selectedUsageName} 
                                    onChange={handleChange}
                                    // defaultValue={defaultObject.usageType}
                                    defaultValue={defaultType}
                                    {...register(`vehicleObjs.${index}.usage`, { required: true })}
                                    renderValue={(selectedType: UsageType) => {
                                        const selectedOption: UsageOptions | undefined = usageOptionsList.find(option => option.type === selectedType);
                                        return selectedOption ? (
                                          <Typography variant="body1">
                                            {selectedOption.type}
                                            <Typography component="span" variant="caption">
                                              {' ' + selectedOption.unit}
                                            </Typography>
                                          </Typography>
                                        ) : '';
                                      }}
                                    >
                                    {usageOptionsList.map((option: UsageOptions) => (
                                        <MenuItem key={`usage-${option.unit}`} value={option.type}>
                                        {/* // <MenuItem key={`usage-${option.unit}`}> */}
                                        <Typography variant="body1">    
                                            {option.type}  
                                            <Typography component="span" variant="caption">
                                                {' ' + option.unit}
                                            </Typography>
                                        </Typography>
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.vehicleObjs && <FormHelperText>This field is required</FormHelperText>}
                            </FormControl>
                        </Box>
                    </AccordionDetails>
                </Accordion>


                
               


            </Box>


          
            
        </Box>
    );
};


export default VehicleBox;