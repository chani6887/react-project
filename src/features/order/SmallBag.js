import { List, ListItem, Typography } from "@mui/material";
import OneProductInSmallBag from "./OneProductInSmallBag";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const SmallBag = () => {
    const bag = useSelector(state => state.order.bag);
    const numProductsInBag = useSelector(state => state.order.numProductsInBag);
    const amountToPay = useSelector(state => state.order.amountToPay);
    useEffect(() => { }, [bag]);
    return (<>
        <List sx={{ width: '100%', maxWidth: 600 }}>
            {bag.map((oneProduct, index) => {
                return (
                    <ListItem key={index} disablePadding>
                        <OneProductInSmallBag oneProduct={oneProduct} />
                    </ListItem>)
            })}
        </List>
        <Typography>{`הוזמנו ${numProductsInBag} מוצרים`}</Typography>
        <Typography>{`סכום לתשלום: ${amountToPay}`} </Typography></>);
}

export default SmallBag;