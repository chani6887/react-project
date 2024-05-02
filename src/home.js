import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import wine1 from './images/IMG_0371_1500x1000.jpg';
import wine2 from './images/KH-9235.jpg';
import wine3 from './images/NIM_8257.jpg';
import wine4 from './images/oregon-vine_1_.jpg'
import wine5 from './images/sherry_blog_cover.png';
import wine6 from './images/small-local-wineries.jpg';
import { useTheme } from '@emotion/react';


const HomePage = () => {
    const naviget = useNavigate();
    const theme = useTheme();
    return (
        <Container>

            <Box position="relative" display="inline-block">
                <Carousel autoPlay interval={5000} infiniteLoop transitionTime={400} showThumbs={false} stopOnHover={false} style={{ marginTop: '0rem', width: "100%" }}>
                    <Typography>
                        <img src={wine1} alt="Wine 1" />
                    </Typography>
                    <Typography>
                        <img src={wine2} alt="Wine 2" />
                    </Typography>
                    <Typography>
                        <img src={wine3} alt="Wine 3" />
                    </Typography>
                    <Typography>
                        <img src={wine4} alt="Wine 4" style={{ width: '107%' }} />
                    </Typography>
                    <Typography>
                        <img src={wine5} alt="Wine 5" style={{ width: '107%' }} />
                    </Typography>
                    <Typography>
                        <img src={wine6} alt="Wine 6" style={{ width: '107%' }} />
                    </Typography>
                </Carousel>
                <Box
                    position="absolute"
                    top="25%"
                    left="0%"
                    transform="translate(-50%, -50%)"
                    bgcolor="rgba(0, 0, 0, 0)"
                    p={2}
                >
                    <Typography variant="h1" align="center" sx={{ color: 'white', marginTop: '2rem' }}>
                        Welcome to our Wine Store
                    </Typography>
                    <Typography variant="h1" align="center" sx={{ marginTop: '10%' }}>
                        <Button onClick={() => naviget('/shop')} size="large" sx={{ color: 'white' }}>buy-now</Button>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default HomePage;
