import { Button, Card, CardActions, CardContent, CardMedia, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addProductToBag } from "../order/orderSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { forwardRef, useState } from "react";
import { deleteProductById } from "./productApi";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const OneProduct = ({ product, index, handleDrawerOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    let user = useSelector(st => st.user.currentUser);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const confirm = async() => {
        handleClose();
        let deletedproduct=await deleteProductById(product, user.token);
    }

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

    return (<>

        <Card sx={{ flexGrow: 1, overflow: 'hidden', px: 3, maxWidth: 345, margin: 7, direction: "row", alignItems: "center" }}>
            <Link to={`/${index + 1}`} state={product} style={{ textDecoration: 'none' }}>
                <CardMedia
                    component="img"
                    alt="תמונת המוצר"
                    height='400'
                    width='30%'
                    image={product.imageUrl}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {product.price}₪
                    </Typography>
                </CardContent>
            </Link>
            <CardActions>
                {user ? (
                    user.role === 'ADMIN' ? (<>
                        <Button size="large" onClick={() => { navigate('/edit') }}>עריכה</Button>
                        <Button size="large" onClick={() => { handleClickOpen() }}>מחק</Button>
                    </>
                    ) : (<Button onClick={() => { addToBag(product) }}>הוספה לסל</Button>)
                ) : (<Button onClick={() => { addToBag(product) }}>הוספה לסל</Button>)}
            </CardActions>
        </Card>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Are you sure you want to delete the product?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    המוצר ימחק לצמיתות ממסד הנתונים.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { confirm() }}>Delete</Button>
                <Button onClick={() => { handleClose() }}>Cancel</Button>
            </DialogActions>
        </Dialog>
    </>);
}

export default OneProduct;



// const [open, setOpen] = React.useState(false);

// const handleClickOpen = () => {
//   setOpen(true);
// };

// const handleClose = () => {
//   setOpen(false);
// };

// return (
//   <React.Fragment>
//     <Button variant="outlined" onClick={handleClickOpen}>
//       Slide in alert dialog
//     </Button>
//     <Dialog
//       open={open}
//       TransitionComponent={Transition}
//       keepMounted
//       onClose={handleClose}
//       aria-describedby="alert-dialog-slide-description"
//     >
//       <DialogTitle>{"Use Google's location service?"}</DialogTitle>
//       <DialogContent>
//         <DialogContentText id="alert-dialog-slide-description">
//           Let Google help apps determine location. This means sending anonymous
//           location data to Google, even when no apps are running.
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleClose}>Disagree</Button>
//         <Button onClick={handleClose}>Agree</Button>
//       </DialogActions>
//     </Dialog>
//   </React.Fragment>