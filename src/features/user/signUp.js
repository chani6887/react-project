import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // יבוא של חומרת react-hook-form
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './formStyle.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { userSignUp } from "./userApi";
import { useDispatch } from 'react-redux';
import { userIn } from "./userSlice";
import { Backdrop, CircularProgress } from '@mui/material';

const SignUp = () => {
  const dispach = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm(); // שימוש ב-hook של useForm מ react-hook-form
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
      let res = await userSignUp({ userName, email, password });
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
    catch {
      handleClose();
      Swal.fire({
        icon: 'info',
        title: `there is a user with thos details`,
        showConfirmButton: true,
        timer: 3000
      })
    }
  };


  return (
    <div className="form-container">
      <h2>Join our family❤️ </h2>
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
        <Button type="submit" variant="contained" color="primary">הרשמה</Button>
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

export default SignUp;


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

// export default SignUp