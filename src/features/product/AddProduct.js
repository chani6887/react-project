import { Backdrop, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import "./formStyle.css";
import Swal from "sweetalert2";
import { addProduct } from "./productApi";
import { useState } from "react";
import { useSelector } from "react-redux";

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false);
    const user = useSelector(st => st.user.currentUser);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const sendData = async (data) => {
        console.log(data);
        // let { productName, description, productionDate, imageUrl, price } = data;
        // console.log(productName, description, productionDate, imageUrl, price);
        handleOpen()
        try {
            let res = await addProduct(data, user.token);
            console.log(res);
            if (!res.error)
                Swal.fire({
                    icon: 'info',
                    title: `המוצר נוסף בהצלחה`,
                    showConfirmButton: false,
                    timer: 3000
                })
            handleClose();
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: `sorry,cannot add product`,
                showConfirmButton: false,
                timer: 3000
            })
            handleClose();
        }
    };

    return (<>
        <div className="form-container">
            <h2>הוספת מוצר למלאי</h2>
            <form className="form" onSubmit={handleSubmit(sendData)}>
                <div className="form-group">
                    <TextField
                        id="productName"
                        label="שם המוצר"
                        variant="outlined"
                        {...register('productName', { required: true })}
                        error={!!errors.productName}
                        helperText={errors.productName ? 'שם מוצר הינו חובה' : ''}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        id="description"
                        label="תיאור המוצר"
                        variant="outlined"
                        {...register('description')}
                    />
                </div>
                <div className="form-group">
                    <Typography>תאריך ייצור</Typography>
                    <TextField
                        id="productionDate"
                        type="date"
                        variant="outlined"
                        {...register('productionDate')}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        id="imageUrl"
                        label="כתובת תמונה"
                        variant="outlined"
                        {...register('imageUrl')}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        id="price"
                        label="מחיר"
                        variant="outlined"
                        {...register('price', { required: true })}
                        error={!!errors.price}
                        helperText={errors.price ? 'מחיר הינו חובה' : ''}
                    />
                </div>
                <Button type="submit" variant="contained" color="primary">הוספת המוצר</Button>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </form>

        </div>

    </>);
}

export default AddProduct;