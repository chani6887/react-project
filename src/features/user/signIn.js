import React, { useState } from 'react';
import { TextField, Button,  CircularProgress, Backdrop } from '@mui/material';
import { userIn } from './userSlice';
import { userSignIn } from './userApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import './formStyle.css';

const SignIn = () => {
    const dispach = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const sendData = async (data) => {
        let { userName, email, password } = data;
        handleOpen()
        try {
            let res = await userSignIn({ userName, email, password });
            dispach(userIn(res.data));
            Swal.fire({
                icon: 'info',
                title: `hi! ${data.userName}`,
                showConfirmButton: false,
                timer: 3000
            })
            handleClose();
            navigate('/shop');
        }
        catch (error) {
            Swal.fire({
                icon: 'info',
                title: `There is no user with such details, please register first`,
                showConfirmButton: false,
                timer: 3000
            })
            handleClose();
            navigate("/signUp");
        }
    };
    return (
        <div className="form-container">
            <h2>wine-Line-Entry ❤️</h2>
            <form className="form" onSubmit={handleSubmit(sendData)}>
                <div className="form-group">
                    <TextField
                        id="userName"
                        label="שם משתמש"
                        variant="outlined"
                        {...register('userName', { required: true })}
                        error={!!errors.userName}
                        helperText={errors.userName ? 'שם משתמש הינו שדה חובה' : ''}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        id="email"
                        label="אימייל"
                        type="email"
                        variant="outlined"
                        {...register('email', { required: true })}
                        error={!!errors.email}
                        helperText={errors.email ? 'כתובת האימייל הינה שדה חובה' : ''}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        id="password"
                        label="סיסמה"
                        type="password"
                        variant="outlined"
                        {...register('password', {
                            required: true,
                            minLength: {
                                value: 8,
                                message: 'הסיסמה חייבת להכיל לפחות 8 תווים'
                            },
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,
                                message: 'הסיסמה חייבת להכיל לפחות אות אחת וספרה ולהיות באורך של לפחות 8 תווים'
                            }
                        })}
                        error={!!errors.password}
                        helperText={errors.password ? errors.password.message : ''}
                    />

                </div>
                <Button type="submit" variant="contained" color="primary">כניסה</Button>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </form>
        </div>
    );
};

export default SignIn;


// import React from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import './signIn.css';

// const SignUp = () => {
//   return (
//     <div className="form-container">
//       <h2>wine-Line-Entry our family❤️ </h2>
//       <form className="form">
//         <div className="form-group">
//           <TextField id="username" label="שם משתמש" variant="outlined" />
//         </div>
//         <div className="form-group">
//           <TextField id="email" label="אימייל" type="email" variant="outlined" />
//         </div>
//         <div className="form-group">
//           <TextField id="password" label="סיסמה" type="password" variant="outlined" />
//         </div>
//         <Button variant="contained" color="primary">הרשמה</Button>
//       </form>
//     </div>
//   );
// };
 // const toSend = async () => {
    //     if (userName && email && password) {
    //         try {
    //             let user = await userSignIn({ userName, email, password });
    //             if (user)
    //                 dispatch(userIn(user));
    //             else
    //                 navigate('./signUp');
    //         }
    //         catch (err) {
    //             console.log("error: " + err)
    //         }
    //     }


// return (
    // <div className="form-container">
    //     <h2>wine-Line-Entry❤️</h2>
    //     <form className="form">
    //         <div className="form-group">
    //             <TextField id="username" label="שם משתמש" variant="outlined" onBlur={(e) => { changeUserName(e) }} />
    //         </div>
    //         <div className="form-group">
    //             <TextField id="email" label="אמייל" type="email" variant="outlined" onBlur={(e) => { changeEmail(e) }} />
    //         </div>
    //         <div className="form-group">
    //             <TextField id="password" label="סיסמה" type="password" variant="outlined" onBlur={(e) => { changePassword(e) }} />
    //         </div>
    //         <Button variant="contained" color="primary" onClick={toSend()}>כניסה</Button>
    //     </form>
    // </div>

// export default SignUp