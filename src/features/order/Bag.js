import * as React from 'react';
import { Button, Typography } from '@mui/material';
import List from '@mui/material/List';
import OneProductInBag from './OneProductInBag';
import { useSelector } from 'react-redux';
import ListItem from '@mui/material/ListItem';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pink } from '@mui/material/colors';
import './Bag.css';

const Bag = () => {
    const navigate = useNavigate();
    const bag = useSelector(state => state.order.bag);
    const numProductsInBag = useSelector(state => state.order.numProductsInBag);
    const amountToPay = useSelector(state => state.order.amountToPay);
    useEffect(() => { }, [bag]);

    return (
        <div>
            <List sx={{ width: '100%', maxWidth: 600 }}>
                {bag.map((oneProduct, index) => {
                    return (
                        <ListItem key={index} >
                            <OneProductInBag oneProduct={oneProduct} index={index} />
                        </ListItem>)
                })}
            </List>
            <Typography>{`הוזמנו ${numProductsInBag} מוצרים`}</Typography>
            <Typography>{`סכום לתשלום: ${amountToPay}`} </Typography>
            <Button
                variant='outlined'
                onClick={() => { navigate('/order') }}
            >לתשלום
            </Button>
            <Button
                variant='outlined'
                onClick={() => { navigate('/Shop') }}
            >חזרה לחנות
            </Button>
        </div>

    );
}

export default Bag;


/* <IconButton aria-label="cart">
                <StyledBadge badgeContent={4} color="secondary">
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton> */



/* <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
            >
                <Item>סה"כ מוצרים</Item>
                <Item>סה"כ לתשלום</Item>
            </Stack> */


            // import Badge from '@mui/material/Badge';
// import { styled } from '@mui/material/styles';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { Stack } from '@mui/material';
// import { Divider } from '@mui/material';
// import Paper from '@mui/material/Paper';

// const StyledBadge = styled(Badge)(({ theme }) => ({
//     '& .MuiBadge-badge': {
//         right: -3,
//         top: 13,
//         border: `2px solid ${theme.palette.background.paper}`,
//         padding: '0 4px',
//     },
// }));
// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));