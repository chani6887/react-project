import React, { useState } from 'react';
import { Typography, Button, Grid, TextField, Box, MenuItem } from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const OrderDetailsScreen = ({ token }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [orderAddress, setOrderAddress] = useState('');
    const [dueDate, setDueDate] = useState('');

    const cities = [
        { value: 'city1', label: 'ירושלים' },
        { value: 'city2', label: 'מעלה אדומים' },
        { value: 'city3', label: 'בית שמש' },
        { value: 'city3', label: 'מטולה' }
    ];

    const onSubmit = (data) => {
        // Save order logic here (send data to server)
        console.log(data);
        Swal.fire({
            icon: 'success',
            title: 'פרטיך נשמרו בהצלחה',
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            navigate('/payment'); // Use navigate to redirect
        });
    };
    const handleOrderDetails = () => {
        navigate('/shop'); // Navigate to the order details page
    };
    return (


        <Box p={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" align="center" gutterBottom sx={{ color: '#B03060', marginTop: '2rem' }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ color: '#B03060', marginTop: '2rem' }}>
                        פרטי ההזמנה
                    </Typography>
                    <Grid container justifyContent="center" spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} >
                            <TextField
                                label="תאריך רצוי לקבלת ההזמנה"
                                type="date"
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...register('dueDate', { required: true })}
                                error={!!errors.dueDate}
                                helperText={errors.dueDate ? 'שדה זה הינו חובה' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="שם מלא"
                                variant="outlined"
                                fullWidth
                                {...register('ordererName', { required: true })}
                                error={!!errors.ordererName}
                                helperText={errors.ordererName ? 'שדה זה הינו חובה' : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="מספר תעודת זהות"
                                variant="outlined"
                                fullWidth
                                {...register('idCardNumber', {
                                    required: true,
                                    pattern: {
                                        value: /^\d{9}$/,
                                        message: 'מספר תעודת הזהות חייב להכיל 9 ספרות'
                                    }
                                })}
                                error={!!errors.idCardNumber}
                                helperText={errors.idCardNumber ? errors.idCardNumber.message : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="מספר טלפון"
                                variant="outlined"
                                fullWidth
                                {...register('phoneNumber', {
                                    required: true,
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: 'מספר הטלפון חייב להכיל 10 ספרות'
                                    }
                                })}
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="כתובת האימייל"
                                variant="outlined"
                                fullWidth
                                {...register('email', {
                                    required: true,
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'כתובת האימייל אינה חוקית'
                                    }
                                })}
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ''}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                label="עיר"
                                variant="outlined"
                                fullWidth
                                {...register('city', { required: true })}
                                error={!!errors.city}
                                helperText={errors.city ? 'This field is required' : ''}
                            >
                                {cities.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>


                        </Grid>
                    </Grid>
                    <Box mt={4}>
                        <Button type="submit" variant="contained" color="primary" onClick={handleOrderDetails}>
                            המשך לקנייה
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleSubmit(onSubmit)} style={{ marginLeft: 16 }}>
                            סיום הזמנה
                        </Button>
                    </Box>
                </Typography>
            </form>


        </Box>
    );
};

export default OrderDetailsScreen;