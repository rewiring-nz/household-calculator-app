import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MailchimpForm from '../MailChimpForm/MailChimpForm';


// ----------------- Data -------------------
// import useHouseholdData from '../../hooks/useHouseholdData/useHouseholdData';
// Now passed as props

// ----------------- Styles & Material UI -------------------
import { Box, Button, Typography, useTheme, Link, Tooltip, styled, Grid, useMediaQuery } from '@mui/material';
import { FDivider } from 'src/shared/styles/FDivider';
// import { HouseLink } from './HouseholdSavings.styles';

// ----------------- Components -------------------
import ResultBox from './ResultBox';

// ----------------- Images -------------------
import heatpump from '../../assets/images/heatpump.png'; 


// ----------------- Models & Interfaces -------------------
import { Savings, UpfrontCost } from '../../shared/api/openapi-client';
import { electricVehicleURL } from 'src/shared/links';
import { recommendationActions } from './data/RecommendationActions';

import { formatNZD } from 'src/shared/utils/formatters';
import { SavingsFrameBox } from './HouseholdSavings.styles';






interface SavingsProps {
    savingsData: Savings;
    loadingData: boolean;
    // currentAppliance: string;
    appliances: {
        currentSpaceHeater: string;
        currentWaterHeater: string;
        currentCooktop: string;
    }
    // recommendation: RecommendationActionEnum;
}






const HouseholdSavings: React.FC<SavingsProps> = ({ savingsData, loadingData, appliances }) => {
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
        
    // const { 
    //     householdData,
    //     getSavingsData,
    //     savingsData,
    //     loadingData,
    //     errorData
    // } = useHouseholdData();

    // const savings = getSavingsData();
    // const [savings, setSavings] = useState(getSavingsData());
    const [upfrontCostTotal, setUpfrontCostTotal] = useState('0');

    useEffect(() => {
        console.log("HouseholdSavings useEffect triggered");
        // console.log("HouseholdSavings Previous savingsData:", savings);
        // console.log("HouseholdSavings New savingsData:", savingsData);
        // console.log("HouseholdSavings useEffect householdData:", householdData);

        // setSavings(savingsData);
        const total = savingsData?.upfrontCost ? Object.values(savingsData.upfrontCost).reduce((acc, val) => acc + val, 0) : 0;
        const totalString = `$${Number(total.toFixed(2)).toLocaleString('en-NZ')}`;
        setUpfrontCostTotal(totalString);

        // console.log("HouseholdSavings useEffect savings:", savings);
        console.log("HouseholdSavings useEffect savingsData:", savingsData);
        console.log("HouseholdSavings useEffect upfrontCostTotal:", total);
        console.log("HouseholdSavings useEffect loadingData:", loadingData);
    }, [ savingsData, loadingData ]);


    // const { register, handleSubmit } = useForm<Email>();
    // const onSubmit: SubmitHandler<Email> = (data) => console.log('HouseholdSavings: ', data);

    // const formatNZD = (value: number | undefined) => {
    //     if (value === undefined) return '';
    //     return `$${value.toLocaleString('en-NZ')}`;
    // };

    const getApplianceCost = (upfrontCost: UpfrontCost | undefined): number => {
        const spaceHeating = upfrontCost?.spaceHeating || 0;
        const waterHeating = upfrontCost?.waterHeating || 0;
        const cooktop = upfrontCost?.cooktop || 0;
        return spaceHeating + waterHeating + cooktop;        
    };







    // --------------------  Next Steps --------------------
    const recommendationKey = savingsData?.recommendation?.action;
    const { getDescription, buttonText, imageComponent } =  recommendationKey ?  recommendationActions[recommendationKey] : { getDescription: () => '', buttonText: '', imageComponent: '' };
    const currentAppliance = appliances.currentSpaceHeater || appliances.currentWaterHeater || appliances.currentCooktop;
    const description = getDescription({ currentAppliance });




    const formatTonnes = (value: number | undefined): string => {
        // (savingsData?.emissions?.perYear?.difference || 0) *-1
        if (value === undefined) return '';
        return `${(value*-1).toFixed(0)}`;
    }






    
    return (
            <Box className="HouseholdSavings"
                sx={{
                    padding: '1.25rem',
                    backgroundColor: theme.palette.primary.main,
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    borderRadius: 0,
                    [theme.breakpoints.up('sm')]: {
                        borderRadius: 1,
                    }
                }}
                aria-label="Household Savings Section"
                >






            <Box className="ResultsHeader"
                sx={{
                    margin: '0 0.1rem'
                }}>
                <Typography 
                    variant="h1"
                    aria-label="Your Savings"
                    >
                    Your Savings
                </Typography>
                <Typography variant="subtitle2">By switching to electric appliances and installing solar panels, we estimate you could save:</Typography>
                <Typography variant="subtitle2"
                    sx={{
                        color: theme.palette.secondary.contrastText
                    }}
                    >
                    {/* <Link href="#"tertiary"secondary"> */}
                    {/* <HouseLink component={RouterLink} to="/methodology" className="link" theme={theme}>
                        How did we calculate this?
                    </HouseLink> */}
                    <Tooltip 
                        title="Methodology"
                        aria-label="Methodology"
                        arrow
                        >
                        <Link 
                            component={RouterLink} 
                            to="/methodology"
                            sx={{
                                color: '#2D62FF',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                            >
                            How did we calculate this?
                        </Link>
                    </Tooltip>
                </Typography>
                
            </Box>


            {/* <Box
                sx={{
                    padding: '1rem',
                    backgroundColor: theme.palette.background.paper,
                    margin: '1rem 0',
                    borderRadius: 1,
                }}
                > */}
            <SavingsFrameBox className='Results' aria-label="Results"
                sx={{
                    backgroundColor: theme.palette.background.paper,
                }}>

                <ResultBox 
                    label="Energy Bill" 
                    heading={`$${(savingsData?.opex?.perWeek?.difference || 0) *-1} per week`} 
                    // paragraph={`on energy bills. That's $${(savingsData?.opex?.perYear?.difference || 0) *-1} per year.`}
                    >   
                    <Typography variant="body1">
                        on energy bills. That's 
                        <span style={{ fontWeight: '600' }}>
                           {` ${formatNZD(savingsData?.opex?.perYear?.difference, 0)} per year.`}
                        </span>
                    </Typography>
                </ResultBox>                    

                <FDivider />
                
                <ResultBox 
                    label="Co2 Emissions" 
                    heading={`${(savingsData?.emissions?.perWeek?.difference || 0) *-1} % of emissions`} 
                    // paragraph={`${formatTonnes(savingsData?.emissions?.perYear?.difference)} tonnes of CO2e a year!`}
                    >   
                    <Typography variant="body1">                    
                        <span style={{ fontWeight: '600' }}>
                            {`${formatTonnes(savingsData?.emissions?.perYear?.difference)} tonnes `}
                        </span> 
                        of CO2e a year!
                    </Typography>            
                    
                </ResultBox>

                
                <FDivider />

                
                {/* <ResultBox label="" heading={`${formatNZD(savings?.upfrontCost)} total`} /> */}
                <ResultBox 
                    label="Upfront Cost*" 
                    // heading={`$${upfrontCostTotal.toLocaleString('en-NZ')}`} 
                    heading={upfrontCostTotal} 
                    bulletPoints={[
                        { label: 'Appliances (total)', value: getApplianceCost(savingsData?.upfrontCost) },                        
                        { label: 'Solar', value: savingsData?.upfrontCost?.solar },
                        { label: 'Battery', value: savingsData?.upfrontCost?.battery },
                    ]}
                    paragraph="*Vehicle costs excluded due to large price range." 
                    linkText="Learn more here"
                    linkURL={electricVehicleURL}
                    />            

            {/* </Box> */}
            </SavingsFrameBox>














            {/* Next Steps */}

            {/* <Box
                sx={{
                    padding: '1.25rem',                    
                    backgroundColor: theme.palette.secondary.main,
                    margin: '1rem 0',
                    // display: 'flex',
                    borderRadius: 1,
                    color: theme.palette.secondary.contrastText
                }}
                >      */}
            <SavingsFrameBox className='NextSteps'
                sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText
                }}
                >
                {/* <Box className="FrameBox"
                    sx={{
                        margin: '0.4rem 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                    >  */}
                <Grid container 
                    // spacing={2} 
                    sx={{ 
                        margin: '0.4rem 0', 
                        padding: '0',
                        boxSizing: 'border-box'
                    }}
                    >
                    <Grid item xs={12} md={8} 
                        sx={{
                            padding: '0',
                            boxSizing: 'border-box',
                            paddingRight: '0',
                            [theme.breakpoints.up('md')]: {
                                paddingRight: '1rem'
                            }
                        }}
                        >
                        <Box className="TopBox" 
                            sx={{
                                display: 'flex',
                                // flexDirection: { xs: 'column', md: 'row' },
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                padding: '0',
                                boxSizing: 'border-box'
                            }}
                            >
                            <Box className="TextBox"
                                sx={{ 
                                    flex: 1,
                                    padding: '0',
                                    boxSizing: 'border-box',
                                    paddingRight: '1rem'
                                }}
                                >
                                <Typography 
                                    variant="h2" 
                                    sx={{ 
                                        color: theme.palette.secondary.contrastText 
                                    }}
                                    aria-label="Next steps"
                                    >
                                    Next steps
                                </Typography>

                                <Typography 
                                    variant="subtitle2"
                                    >
                                    {description}
                                </Typography>
                            </Box>

                            {!isMdUp && (
                                <Box className="ImageBox"
                                    sx={{
                                        flexShrink: 0,
                                        marginLeft: { md: '1rem' }, 
                                        marginTop: { xs: '1rem', md: 0 },
                                        margin: '1.4rem 0'
                                    }}
                                    >
                                    {imageComponent}                            
                                </Box>
                            )}
                        </Box>

                        <Grid item xs={12} sm={12} md={8}
                            sx={{
                                padding: '0',
                                boxSizing: 'border-box'
                            }}
                            >
                            {buttonText && (
                            <Button
                                variant="contained"
                                color="info"
                                sx={{
                                textTransform: 'initial',
                                margin: '.7rem 0',
                                borderRadius: '0.25rem',
                                boxShadow: 'none',
                                width: '100%',
                                padding: '0',
                                boxSizing: 'border-box'
                                }}
                                >
                                <Typography variant="h3" sx={{ color: theme.palette.info.contrastText }}>
                                    {buttonText}
                                </Typography>
                            </Button>
                            )}
                        </Grid>

                    </Grid>



                    {isMdUp && (
                        <Grid item xs={12} md={4} 
                            sx={{
                                padding: '0',
                                boxSizing: 'border-box'
                            }}
                            >
                            <Box className="ImageBox" 
                                sx={{ 
                                    // padding: '0',
                                    // boxSizing: 'border-box'
                                    margin: '1.4rem 0',
                                    display: 'flex',
                                    // alignItems: 'flex-start',
                                    justifyContent: 'end'
                                }}
                                >
                                {imageComponent}
                            </Box>
                        </Grid>
                    )}
{/* 

                    <Grid item xs={12} sm={12} md={6}
                        sx={{
                            padding: '0',
                            boxSizing: 'border-box'
                        }}
                        >
                        {buttonText && (
                        <Button
                            variant="contained"
                            color="info"
                            sx={{
                            textTransform: 'initial',
                            margin: '.7rem 0',
                            borderRadius: '0.25rem',
                            boxShadow: 'none',
                            width: '100%',
                            padding: '0',
                            boxSizing: 'border-box'
                            }}
                            >
                            <Typography variant="h3" sx={{ color: theme.palette.info.contrastText }}>
                                {buttonText}
                            </Typography>
                        </Button>
                        )}
                    </Grid> */}


                   

                    
                   
                </Grid>


                

                    

                <Typography variant="body1">
                    Sign me up to the mailing list for updates & toolkits for electrification:
                </Typography>



               
                <Box
                    sx={{
                        margin: '0.6rem 0 1.5rem 0'
                    }}
                    >
                    <MailchimpForm theme={theme} />
                </Box>


            {/* </Box> */}
            </SavingsFrameBox>



            
        </Box>
    );
};

export default HouseholdSavings;