import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const FlagCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    width: "200px",
    flexDirection: 'column',
    cursor: 'pointer'
}));

const FlagDisplay = styled(Box)(({ flagcolor }) => ({
    width: 80,
    height: 60,
    backgroundColor: flagcolor,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px auto',
    border: '1px solid #ddd',
    overflow: 'hidden',
}));

const FlagGrid = () => {
    const [flags, setFlags] = useState([]);

    useEffect(() => {
        async function getData(url, index) {
            try {
                const response = await fetch(
                    "https://xcountries-backend.labs.crio.do/all"
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFlags(data);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        getData();
    }, [])


    return (
        <Container maxWidth="xl" sx={{ py: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Grid container spacing={2}>
                {flags.map((country, index) => (
                    <Grid
                        item
                        key={index}
                    >
                        <FlagCard elevation={2} sx={{ borderRadius: "7px" }}>
                            <CardContent
                                sx={{
                                    textAlign: 'center',
                                    p: 2,
                                    '&:last-child': { pb: 2 },
                                }}
                            >
                                <FlagDisplay >
                                    <img alt={country.abbr} src={country.flag} />
                                </FlagDisplay>

                                <Typography
                                    variant="body2"
                                    component="h3"
                                    sx={{
                                        fontWeight: 700,
                                        color: 'text.primary',
                                        lineHeight: 1.3,
                                        minHeight: 40,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        wordBreak: 'break-word'
                                    }}
                                >
                                    {country.name}
                                </Typography>
                            </CardContent>
                        </FlagCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default FlagGrid;