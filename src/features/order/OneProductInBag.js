import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button, ButtonGroup, ListItemButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { changeAmount, deleteProductFromBag } from './orderSlice';
import { useDispatch } from 'react-redux';
import { pink } from '@mui/material/colors';

const OneProductInBag = ({ oneProduct, index }) => {
    const dispatch = useDispatch();

    const incAmount = (index) => {
        let changeDetailes = {
            index,
            amount: 1
        }
        dispatch(changeAmount(changeDetailes));
    }
    const decAmount = (index) => {
        let changeDetailes = {
            index,
            amount: -1
        }
        dispatch(changeAmount(changeDetailes));
    }
    const deletePtoduct = (index) => {
        dispatch(deleteProductFromBag(index));
    }
    return (<>
        <ListItemAvatar>
            <Avatar alt="תמונת המוצר" src={oneProduct.imageUrl} />
        </ListItemAvatar>
        <ListItemText primary={oneProduct.productName} secondary={`price: ${oneProduct.price}, amount: ${oneProduct.amount}, total payment: ${oneProduct.price * oneProduct.amount}`} />
        <ListItemButton>
            <ButtonGroup variant="outlined" size='small' aria-label="Basic button group" >
                <Button
                    onClick={() => { incAmount(index) }}>
                    < AddIcon />
                </Button>
                <Button
                    onClick={() => { decAmount(index) }}>
                    < RemoveIcon />
                </Button>
                <Button
                    onClick={() => { deletePtoduct(index) }}>
                    < DeleteIcon />
                </Button>
            </ButtonGroup>
        </ListItemButton>
    </>
    );
}

export default OneProductInBag;