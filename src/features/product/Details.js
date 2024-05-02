import * as React from 'react';
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Card, CardActions, CardContent, Box, IconButton, Paper, Stack, ListItemButton } from '@mui/material';
import { CssBaseline, Divider, CardMedia, Drawer, Typography, Avatar, Button, ButtonGroup, } from '@mui/material/';
import { styled } from '@mui/material/styles';
import SmallBag from "../order/SmallBag";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import classes from "./Details.module.css";
import { addProductToBag } from "../order/orderSlice";

const Main = styled('main')(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const Details = () => {
    const theme = useTheme();
    const location = useLocation();
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    let { index } = useParams();
    const [open, setOpen] = useState(false);
    const state = location.state;
    const drawerWidth = 240;

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleGoBack = () => {
        navigate("/shop");
    };
    const addToBag = (product) => {
        handleDrawerOpen();
        let { _id, productName, imageUrl, price, productionDate, description } = product
        let amount = 1;
        let newProduct = {
            _id, productName, description, productionDate, imageUrl, price, amount
        }
        console.log(newProduct);
        dispatch(addProductToBag(newProduct));
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        maxWidth: 400,
    }));

    const message = `Truncation should be conditionally applicable on this long line of text
       as this is a much longer line than what the container can support.`;
    console.log("this is details page");
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <CssBaseline />
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <SmallBag />
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3, maxWidth: 345, margin: 0, direction: "row", alignItems: "center" }}>
                        <Item
                            sx={{
                                my: 1,
                                mx: 'auto',
                                p: 2,
                            }}
                        >
                            <Stack spacing={2} direction="row" alignItems="center">
                                <Stack>
                                    <Avatar>❤️</Avatar>
                                </Stack>
                                <Stack sx={{ minWidth: 0 }}>
                                    <Typography noWrap>קונים עכשיו ונהנים מהטבות החודש למוצר שאוהבים</Typography>
                                </Stack>
                            </Stack>
                        </Item>
                    </Box>

                    <Card sx={{ flexGrow: 1, overflow: 'hidden', px: 3, maxWidth: 345, margin: 15, direction: "row", alignItems: "center" }}>
                        <CardMedia
                            component="img"
                            alt="תמונת המוצר"
                            height="140"
                            image={state.imageUrl}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                { state.productName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {state.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <ListItemButton>
                                <ButtonGroup variant="outlined" size='small' aria-label="Basic button group" >
                                    <Button size="small" onClick={() => { addToBag(state) }}>הוסף לסל</Button>
                                    <Button size="small" onClick={()=>{handleGoBack()}}>Go Bake</Button>
                                </ButtonGroup>
                            </ListItemButton>
                        </CardActions>
                    </Card>
                </Main>
            </Box>
        </>

    );
}

export default Details;
