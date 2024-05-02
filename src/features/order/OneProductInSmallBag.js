import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
const OneProductInSmallBag = ({ oneProduct}) => {
    return (<>
        <ListItemAvatar>
            <Avatar alt="תמונת המוצר" src={oneProduct.imageUrl} />
        </ListItemAvatar>
        <ListItemText primary={oneProduct.productName} secondary={`price: ${oneProduct.price}, amount: ${oneProduct.amount}, total payment: ${oneProduct.price * oneProduct.amount}`} />
    </>
    );
}

export default OneProductInSmallBag;