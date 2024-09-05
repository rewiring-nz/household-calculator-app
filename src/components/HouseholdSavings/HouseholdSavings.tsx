import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MailchimpForm from '../MailChimpForm/MailChimpForm';


// ----------------- Data -------------------
// import useHouseholdData from '../../hooks/useHouseholdData/useHouseholdData';
// Now passed as props

// ----------------- Styles & Material UI -------------------
import { Box, Button, Typography, useTheme, Link, Tooltip, styled } from '@mui/material';
import { FDivider } from 'src/shared/styles/FDivider';
// import { HouseLink } from './HouseholdSavings.styles';

// ----------------- Components -------------------
import ResultBox from './ResultBox';

// ----------------- Images -------------------
import heatpump from '../../assets/images/heatpump.png'; 


// ----------------- Models & Interfaces -------------------
import { Savings, UpfrontCost } from '../../shared/api/openapi-client';
import { electricVehicleURL } from 'src/shared/links';
import { recommendationActions } from 'src/components/HouseholdSavings/data/HouseholdSavings.text';







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

const SavingsFrameBox = styled(Box)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    padding: '0 1.6rem',                    
    // margin: '1rem 0',
    // display: 'flex',
}));




const HouseholdSavings: React.FC<SavingsProps> = ({ savingsData, loadingData, appliances }) => {
    const theme = useTheme();
    
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
    const { getDescription, buttonText } =  recommendationKey ?  recommendationActions[recommendationKey] : { getDescription: () => '', buttonText: '' };   
    const currentAppliance = appliances.currentSpaceHeater || appliances.currentWaterHeater || appliances.currentCooktop;
    const description = getDescription({ currentAppliance });










    
    return (
            <Box className="HouseholdSavings"
                sx={{
                    padding: '1.25rem',
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
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1rem',
                }}
                >






            <Box className="ResultsHeader"
                sx={{
                    margin: '0 0.1rem'
                }}>
                <Typography variant="h1">Your Savings</Typography>
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
                    <Tooltip title="Methodology" arrow>
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
            <SavingsFrameBox className='Results'
                sx={{
                    backgroundColor: theme.palette.background.paper,
                }}>

                <ResultBox 
                    label="Energy Bill" 
                    heading={`$${(savingsData?.opex?.perWeek?.difference || 0) *-1} per week`} 
                    />

                <FDivider />
                
                <ResultBox 
                    label="Co2 Emissions" 
                    heading={`${(savingsData?.emissions?.perWeek?.difference || 0) *-1} % of emissions`} 
                    />
                
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
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '0.4rem 0'
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
                        {/* <Typography variant="subtitle2">
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
                        </Button> */}
                        <Typography variant="subtitle2">
                            {description}
                        </Typography>

                        {buttonText && (
                            <Button variant="contained" color="info" sx={{
                                textTransform: 'initial',
                                margin: '.7rem 0',
                                borderRadius: '0.25rem',
                                boxShadow: 'none'
                            }}>
                                <Typography variant="h3" sx={{ color: theme.palette.info.contrastText }}>
                                    {buttonText}
                                </Typography>
                            </Button>
                        )}

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