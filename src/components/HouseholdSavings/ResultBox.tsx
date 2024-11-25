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

  
const ResultBox: React.FC<ResultBoxState> = ({ label, heading, bulletPoints, paragraph, children }) => {
    const theme = useTheme();
    

    return (
        <Box
            sx={{
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

                            {typeof point.value === "string" ? point.value : formatNZD(point.value, 0)}

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

        </Box>
    );
};


export default ResultBox;