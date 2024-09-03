import { Box, Tooltip, Typography, useTheme } from '@mui/material';
// import { styled } from '@mui/system';
// import { Opex } from 'src/shared/api/openapi-client';

interface BulletPoint {
    label: string;
    value?: number;
}

interface ResultBoxState { 
    label: string;
    heading: string | number;
    bulletPoints?: BulletPoint[];
    paragraph?: string;
    linkText?: string;
    linkURL?: string;
}

// const ResultBox: React.FC<{ label: string, heading: string, paragraph?: string }> = ({ label, heading, paragraph }) => {
const ResultBox: React.FC<ResultBoxState> = ({ label, heading, bulletPoints, paragraph, linkText, linkURL }) => {
    const theme = useTheme();
    
    // const headingString = typeof heading === 'number' ? `$${heading.toFixed(2)}` : heading;

    const formatNZD = (value: number | undefined) => {
        if (value === undefined) return '';
        // return ` $${value.toLocaleString('en-NZ')}`;
        // return ` $${value.toFixed(2)}`;
        return ` $${Number(value.toFixed(2)).toLocaleString('en-NZ')}`;
    };

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
            {bulletPoints && (
                <Box
                    component="ul"
                    sx={{
                        listStyleType: 'disc',
                        paddingLeft: '1.5rem'
                    }}
                >
                    {bulletPoints.map((point, i) => (
                        <Typography
                            key={i}
                            component="li"
                            variant="body1"
                            >
                            <span style={{ fontWeight: 'bold' }}>
                                {point.label}: 
                            </span>
                            {formatNZD(point.value)}
                        </Typography>
                    ))}
                </Box>
            )}
            <Typography variant="body1">
                {paragraph}
            </Typography>
            {linkText && (
                <Tooltip title="Electric Vehicles" arrow>
                {/* <Typography variant="body1"> */}
                    <a 
                        href={linkURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: theme.palette.text.primary,
                            textDecoration: 'underline',
                        }}
                    >
                        {linkText}
                    </a>
                {/* </Typography> */}
                </Tooltip>
            )}
        </Box>
    );
};


export default ResultBox;