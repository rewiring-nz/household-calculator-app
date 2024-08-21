import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Opex } from 'src/shared/api/household-calculator-client';




// const ResultBox = styled('div')(( { title, opex }: { title: string, opex: Opex }) => ({
const ResultBox: React.FC<{ label: string, heading: string, paragraph?: string }> = ({ label, heading, paragraph }) => {
    return (
        <Box
            sx={{
                padding: '1rem',
                margin: '1rem 0'
            }}
        >
            <Typography variant="h4" sx={{ textTransform: 'uppercase' }}>
                {label}
            </Typography>
            <Typography variant="h2">
                {heading}
            </Typography>
            <Typography variant="body1">
                {paragraph}
            </Typography>
        </Box>
    );
};


export default ResultBox;