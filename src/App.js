import './App.css';
import { Routes, Route } from "react-router-dom";
import SignUp from './features/user/signUp';
import SignIn from './features/user/signIn';
import Shop from './features/product/shop';
// import Bag from './features/order/Bag';
import Payment from './features/order/payment';
import Details from './features/product/Details';
import NavBar from './navBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomePage from "./home"
// import OrderDetailsScreen from './features/order/FinishOrder';
import About from './About.js';
import Bag from './features/order/Bag';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {getUserFromStorage} from './features/user/userSlice';
import { getBagFromStorage } from './features/order/orderSlice';
import OrderDetailsScreen from './features/order/OrderDetailsScreen';
import Edit from './features/product/Edit';
import AddProduct from './features/product/AddProduct';

function App() {
  const dispatch=useDispatch();
  const theme = createTheme({
        direction: 'rtl',
          typography: {
          // אפשר להוסיף עוד גופנים אם רוצים
          },
        palette: {
          primary: {
            light: '#fffff',
            dark: '#000000',
            main: '#8a1c1c',
            contrastText: '#fff'
          },
        },
        secondary: {
          light: '#ff7961',
          main: 'white',
          dark: '#0000008a',
          contrastText: '#000',
        },
        // #ba000d
      });
    useEffect(()=>{
     dispatch(getUserFromStorage());
     dispatch(getBagFromStorage());
    },[])
  return (
  <> 
      <ThemeProvider theme={theme}>
        <NavBar />
        <Routes>
         <Route path="/about" element={<About />} />
         <Route path="/" element={<HomePage />} />
         <Route path="/signIn" element={<SignIn />} />
         <Route path="/signUp" element={<SignUp />} />
         <Route path="/shop" element={<Shop />}>
          <Route path=":index" element={<Details />} />
         </Route>
         <Route path='/bag' element={<Bag/>}/>
         <Route path='/order' element={ <OrderDetailsScreen />}/>
         <Route path='/payment' element={<Payment />}/>
         <Route path='/edit' element={<Edit/>}/>
         <Route path='/addProduct' element={<AddProduct/>}/>
        </Routes> 
      </ThemeProvider >
    </>);
}

export default App;



// import './App.css';
// import List from './features/product/List';
// import Details from './features/product/Details';
// import { Routes, Route } from "react-router-dom";
// import SignIn from "./features/user/signIn.js"
// import SignUp from "./features/user/signUp.js";
// import NavBar from "./NavBer.js"
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import HomePage from "./Home.js"
// import { IconButton } from '@mui/material';
// import WineDetailsPage from "./About.js"
// import OrderDetailsScreen from './features/order/FinishOrder';
// import PaymentForm from './features/order/Pay';
// function App() {

//   const theme = createTheme({
//     direction: 'rtl',
 
//       typography: {
//       // אפשר להוסיף עוד גופנים אם רוצים
//       },
//     palette: {
//       primary: {
//         light: '#757ce8',
//         dark: '#002884',
//         main: '#8a1c1c',
//         contrastText: '#fff'
//       },
//     },
//     secondary: {
//       light: '#ff7961',
//       main: 'white',
//       dark: '#ba000d',
//       contrastText: '#000',
//     },
//   });


//   return (
//     <>
   
      
//       <ThemeProvider theme={theme}>
//         <NavBar />
//         <Routes>
//           <Route path="/about" element={<WineDetailsPage />} />
//           <Route path="/" element={<HomePage />} />
//           <Route path="/SignIn" element={<SignIn />} />
//           <Route path="/SignUp" element={<SignUp />} />
//           <Route path="/list" element={<List />}>
//           <Route path=":id" element={<Details />} />
//            </Route>
//           <Route path='order' element={ <OrderDetailsScreen />}/>
//           <Route path='/pay' element={<PaymentForm />}/>
//       </Routes>
   
//     </ThemeProvider >
//   </>
//   );
// }

// export default App;