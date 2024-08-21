import React, { useEffect } from 'react';
import { Box, Button, Divider, FormControl, FormHelperText, Input, InputLabel, styled, TextField, Typography, useTheme } from '@mui/material';
// import useHouseholdData from 'src/hooks/useHouseholdData';
// import useHouseholdData from '../../hooks/useHouseholdData/useHouseholdData';
import useHouseholdData from '../../hooks/useHouseholdData/useHouseholdData';
import ResultBox from './ResultBox';
// import { Savings } from 'src/shared/api/household-calculator-client';
import { FDivider } from 'src/pages/Home/Home.styles';
import heatpump from '../../assets/images/heatpump.png'; 
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpfrontCost } from 'src/shared/api/household-calculator-client';



interface Email {
    email: string;
}




const EmailForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    '& .MuiInputBase-root': {
        color: theme.palette.text.disabled,
        backgroundColor: theme.palette.background.paper
    },
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        gap: '1rem'
    },
    '& .MuiFormControl-root': {
        flexBasis: '100%',
        [theme.breakpoints.up('sm')]: {
            flexBasis: '66%'
        }
    },
    '& .MuiButtonBase-root': {
        flexBasis: '100%',
        fontFamily: theme.typography,
        [theme.breakpoints.up('sm')]: {
            flexBasis: '33%',
            margin: '0 auto'
        }
    }
}));











// const HouseholdSavings: React.FC<Savings> = ( savingsData ) => {
const HouseholdSavings: React.FC = () => {
    const theme = useTheme();
    
    const { householdData, updateHouseholdData, getSavingsData, loadingData, errorData } = useHouseholdData();
    const savingsData = getSavingsData();
    
    useEffect(() => {
        console.log("HouseholdSavings useEffect householdData:", householdData);
        console.log("HouseholdSavings useEffect savingsData:", savingsData);
        console.log("HouseholdSavings useEffect loadingData:", loadingData);
        // console.log("HouseholdSavings useEffect errorData:", errorData);
    // }, [ householdData, savingsData, loadingData, errorData]);
    }, [ householdData, updateHouseholdData, savingsData, loadingData ]);


    const { register, handleSubmit } = useForm<Email>();
    const onSubmit: SubmitHandler<Email> = (data) => console.log('HouseholdSavings: ', data);


    const formatNZD = (value: number | undefined | UpfrontCost) => {
        if (value === undefined) return '';
        if (typeof value === 'number') return `$${value.toLocaleString('en-NZ')}`;
        if (typeof value === 'object') {
            const total = Object.values(value).reduce((acc, val) => acc + val, 0);
            return `$${total.toLocaleString('en-NZ')}`;
        }
    };
    
    return (
        <Box
            sx={{
                padding: '1rem',
                backgroundColor: theme.palette.primary.main,
                // margin: '1rem',
                // borderRadius: '0.5rem',
                borderRadius: 1,
                minWidth: '28vw',
                position: 'relative',
                // width: '100%',
                // [theme.breakpoints.up('md')]: {
                //     minWidth: '33vw'
                //     // position: 'fixed',
                //     // top: 0,
                //     // right: 0,
                //     // maxWidth: '33vw'
                // }
            }}
            >
            








            <Box sx={{
                margin: '0 0.1rem'
                }}>
                <Typography variant="h1">Your Savings</Typography>
                <Typography variant="subtitle2">By switching to electric appliances and installing solar panels, we estimate you could save:</Typography>
            </Box>


            <Box
                sx={{
                    padding: '1rem',
                    backgroundColor: theme.palette.background.paper,
                    margin: '1rem 0',
                    borderRadius: 1,
                }}
                >

                <ResultBox label="Energy Bill" heading={`$${savingsData?.opex?.perWeek?.difference} per week`} />

                <FDivider />
                
                <ResultBox label="Co2 Emissions" heading={`${savingsData?.emissions?.perWeek?.difference} % of emissions`} />
                
                <FDivider />

                {/* <ResultBox label="" heading={`$${savingsData?.upfrontCost?.spaceHeating} total`} /> */}
                <ResultBox label="" heading={`${formatNZD(savingsData?.upfrontCost)} total`} />

            </Box>














            {/* Next Steps */}

            <Box
                sx={{
                    padding: '1rem',
                    backgroundColor: theme.palette.secondary.main,
                    margin: '1rem 0',
                    // display: 'flex',
                    borderRadius: 1,
                    color: theme.palette.secondary.contrastText
                }}
                >     
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                    > 
                    <Box
                        sx={{
                            // color: theme.palette.secondary.contrastText
                        }}
                    >
                        <Typography variant="h2" sx={{ color: theme.palette.secondary.contrastText }}>
                            Next steps
                        </Typography>
                        <Typography variant="subtitle2">
                            Swap out your gas heater for electric heat pumps.
                        </Typography>

                        <Button variant="contained" color="info" sx={{
                            textTransform: 'initial',
                            margin: '.7rem 0',
                            borderRadius: '0.25rem'
                            }}
                            >
                            <Typography variant="h3" sx={{ color: theme.palette.info.contrastText }}>
                                Show me how
                            </Typography>                             
                        </Button>

                    </Box>

                    {/* margin: 1rem 0.5rem 0.5rem 1.1rem; */}
                    <Box
                        sx={{
                            margin: '1rem 0.5rem 0.5rem 1.1rem'
                        }}
                        >
                        <img src={heatpump} alt="logo" />
                    </Box>

                </Box>

                <Typography variant="body1">
                    Sign me up to the mailing list for updates & toolkits for electrification:
                </Typography>



                {/* <form onSubmit={handleSubmit(onSubmit)}  */}
                <EmailForm onSubmit={handleSubmit(onSubmit)}>
                    {/* <FormControl error={!!errors.email}> */}
                    <FormControl>
                        {/* <InputLabel htmlFor="email">name@example.com</InputLabel> */}
                        {/* <Input 
                            id="email" 
                            {...register("email")}                                                   
                            placeholder="name@example.com"/> */}
                        <TextField 
                            id="email" 
                            // label="Outlined" 
                            {...register("email")}                                                   
                            placeholder="name@example.com"
                            variant="outlined" />
                        {/* <FormHelperText id="email">We'll never share your email.</FormHelperText> */}
                    </FormControl>
                    
                    <Button variant="outlined" type="submit"
                        sx={{
                            textTransform: 'initial',
                            margin: '.7rem 0',
                            color: "info"
                            }}
                        >
                        <Typography 
                            variant="h3" 
                            sx={{ 
                                color: theme.palette.secondary.contrastText,
                                borderWidth: '0.1rem'
                            }}
                            >
                            Submit
                        </Typography>                        
                    </Button>
                </EmailForm>



            </Box>



            
        </Box>
    );
};

export default HouseholdSavings;