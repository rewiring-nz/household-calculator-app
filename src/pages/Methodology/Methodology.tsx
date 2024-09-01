import { AppBar, Box, IconButton, styled, Toolbar, Typography, useTheme } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIcon from '../../assets/icons/arrow-back.svg';
import CloseIcon from '../../assets/icons/x-window1.svg';





const MethodParagraph = styled(Typography)(({ theme }) => ({
    maxWidth: '40rem',
  }));



const Methodology: React.FC = () => {
    const theme = useTheme();

    // const handleBack = () => {
    //   // Handle back action
    // };
  
    // const handleClose = () => {
    //   // Handle close action
    // };


    // return (
    //     <div>
    //         <AppBar position="static">
    //             <Toolbar
    //                 sx={{
    //                     backgroundColor: 'transparent',
    //                     color: theme.palette.text.secondary,
    //                     boxShadow: 'none'
    //                 }}
    //                 >
    //             <div style={{ display: 'flex', alignItems: 'center' }}>
    //                 <IconButton
    //                 edge="start"
    //                 color="inherit"
    //                 component={RouterLink}
    //                 to="/"
    //                 aria-label="back"
    //                 >
    //                 <img src={ArrowBackIcon} alt="Back" />
    //                 </IconButton>
    //                 <Typography
    //                 variant="h6"
    //                 component={RouterLink}
    //                 to="/"
    //                 sx={{ textDecoration: 'none', color: 'inherit', marginLeft: '8px' }}
    //                 >
    //                 Back
    //                 </Typography>
    //             </div>
    //             <IconButton 
    //                 edge="end" 
    //                 color="inherit"
    //                 component={RouterLink} 
    //                 to="/"
    //                 aria-label="close">
    //                 {/* <CloseIcon /> */}
    //                 <img src={CloseIcon} alt="Close" />
    //             </IconButton>
    //             </Toolbar>
    //         </AppBar>
    //         <div>
    //             Methodology
    //         </div>
    //     </div>
    // )
    return (
        <div>

        
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.6rem 1.5rem 0.6rem 1.7rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              component={RouterLink}
              to="/"
              aria-label="back"
            >
              <img src={ArrowBackIcon} alt="Back" />
            </IconButton>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ textDecoration: 'none', color: 'inherit', marginLeft: '8px' }}
            >
              Back
            </Typography>
          </div>
          <IconButton 
                edge="end" 
                color="inherit"
                component={RouterLink} 
                to="/"
                aria-label="close">
                <img src={CloseIcon} alt="Close" />
            </IconButton>
        </div>

        <Box className="content"
            sx={{
                // display: 'flex',
                // gap: '1rem',
                // flexWrap: 'wrap',
                // justifyContent: 'center'
                maxWidth: '30rem',
                padding: '1rem',
                // margin: '2.5rem auto',
                [theme.breakpoints.up('sm')]: {
                    maxWidth: '35rem',
                    margin: '2.5rem auto',
                },
                [theme.breakpoints.up('md')]: {
                    maxWidth: '80rem',
                    margin: '2.5rem 7rem'
                }
            }}
            >                
            <Typography variant="h1">How we calculated this result</Typography>
            <Typography variant="subtitle1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</Typography>
        

        <Typography variant="h2"
            sx={{
                margin: '3.1rem 0 0.9rem 0'
            }}
            >
            Overview</Typography>
        <Box className="paragraphs"
            sx={{
                display: 'flex',
                gap: '1rem',
                // flexWrap: 'wrap',
                // justifyContent: 'center'
                flexDirection: 'column',
                [theme.breakpoints.up('md')]: {
                    flexDirection: 'row',
                    gap: '2rem'
                }
            }}
            >
            <Box
                sx={{
                    maxWidth: '31rem'
                }}
                >
                <MethodParagraph variant="subtitle2">Maecenas turpis tristique mattis mauris diam interdum in. Tortor non ut dignissim rhoncus nam aliquam elementum habitant. Ante morbi lacus tellus et. Nisi ut penatibus et a suspendisse neque nascetur volutpat amet.</MethodParagraph>
                <MethodParagraph variant="subtitle2">Amet faucibus dolor ante mattis. Sit et pulvinar turpis blandit nisl felis semper. Sem ullamcorper tellus orci eu. Imperdiet volutpat ultricies sed facilisi. Sociis neque vitae congue cum ullamcorper</MethodParagraph>
                <MethodParagraph variant="subtitle2">Maecenas turpis tristique mattis mauris diam interdum in. Tortor non ut dignissim rhoncus nam aliquam elementum habitant. Ante morbi lacus tellus et. Nisi ut penatibus et a suspendisse neque nascetur volutpat amet.</MethodParagraph>
            </Box>
            <Box
                sx={{
                    maxWidth: '31rem'
                }}
                >
                <MethodParagraph variant="subtitle2">Amet faucibus dolor ante mattis. Sit et pulvinar turpis blandit nisl felis semper. Sem ullamcorper tellus orci eu. Imperdiet volutpat ultricies sed facilisi. Sociis neque vitae congue cum ullamcorper</MethodParagraph>
                <MethodParagraph variant="subtitle2">Maecenas turpis tristique mattis mauris diam interdum in. Tortor non ut dignissim rhoncus nam aliquam elementum habitant. Ante morbi lacus tellus et. Nisi ut penatibus et a suspendisse neque nascetur volutpat amet.</MethodParagraph>
            </Box>
        </Box>

        </Box>


      </div>
      );
}


export default Methodology