import React from 'react';
import { Box, Tooltip, Typography, useTheme } from '@mui/material';
import { formatNZD } from 'src/shared/utils/formatters';

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
    children?: React.ReactNode;
}

// const ResultBox: React.FC<{ label: string, heading: string, paragraph?: string }> = ({ label, heading, paragraph }) => {
const ResultBox: React.FC<ResultBoxState> = ({ label, heading, bulletPoints, paragraph, linkText, linkURL, children }) => {
    const theme = useTheme();
    
    // const headingString = typeof heading === 'number' ? `$${heading.toFixed(2)}` : heading;

    // const formatNZD = (value: number | undefined) => {
    //     if (value === undefined) return '';
    //     // return ` $${value.toLocaleString('en-NZ')}`;
    //     // return ` $${value.toFixed(2)}`;
    //     return ` $${Number(value.toFixed(2)).toLocaleString('en-NZ')}`;
    // };

    return (
        <Box
            sx={{
                // padding: '1rem 0',
                margin: '1.2rem 0'
            }}
        >
            <Typography variant="h6" sx={{ textTransform: 'uppercase' }}>
                {label}
            </Typography>
            <Typography variant="h2"
                sx={{
                    margin: '0.8rem 0 0.2rem 0'
                }}>
                {heading}
            </Typography>
            {bulletPoints && (
                <Box
                    component="ul"
                    sx={{
                        listStyleType: 'disc',
                        paddingLeft: '1.5rem',
                        marginBottom: '1.5rem'
                    }}
                >
                    {bulletPoints.map((point, i) => (
                        <Typography
                            key={i}
                            component="li"
                            variant="body2"
                            sx={{
                                lineHeight: '1.5rem' 
                            }}
                            >
                            <span style={{ 
                                fontWeight: 'bold',
                                }}>
                                {point.label}: 
                            </span>
                            {formatNZD(point.value)}
                        </Typography>
                    ))}
                </Box>
            )}

            {paragraph && (
                <Typography variant="body2">
                    {paragraph}
                </Typography>
            )}

            {children}

            {/* {linkText && (
                <Tooltip title="Electric Vehicles" arrow>                
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
                </Tooltip>
            )} */}
        </Box>
    );
};


export default ResultBox;