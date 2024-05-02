import { useEffect, useState } from "react";
import { getAllProducts } from "./productApi";
import OneProduct from "./OneProduct";
import { Grid, Drawer, Box, CssBaseline, IconButton, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import SmallBag from "../order/SmallBag";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

const drawerWidth = 340;

const Main = styled('main')(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Shop = () => {
  const theme = useTheme();
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  let bag = useSelector(st => st.order.bag);

  useEffect(() => {
    const fetchData = async () => {
      let respons = await getAllProducts(page, 30,"");
      let data = respons.data;
      setProductList(data);
    };
    fetchData();
  }, [page]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (<>
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <SmallBag />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 15, sm: 3, md: 3 }}>
          {productList.map((item, index) => {
            return (
              <Grid item xs={3}>
                <OneProduct key={index} product={item} index={index} handleDrawerOpen={handleDrawerOpen} />
              </Grid>
            )
          })}
        </Grid>
      </Main>
    </Box>
  </>);
}

export default Shop;


// import React, { useState, useEffect } from 'react';
// import ListItem from './ListItem';
// import { getAllwines,getNumOfAllPages } from './productApi';
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import Grid from '@mui/material/Grid'; // Import Grid component from Material-UI
// import Container from '@mui/material/Container'; // Import Container component from Material-UI
// import Typography from '@mui/material/Typography'; // Import Typography component from Material-UI
// import Pagination from '@mui/material/Pagination';
// import PaginationItem from '@mui/material/PaginationItem';
// import Stack from '@mui/material/Stack';

// const List = () => {
//   const navigate = useNavigate();

 
//   const [page, setPage] = useState(1);
//   const [search,setSearch]=useState("");
//   // useEffect(() => {
//   //   getProducts()
//   //     .then(res => setArr(res.data))
//   //     .catch(error => console.error("Failed to fetch products:", error));
//   // }, [page]);

//   const [count, setCount] = useState(6);
//   const [products, setProducts] = useState([]);
//   let [cnt, setCnt] = useState(1);
//   useEffect(() => {
//       async function fetchData() {
//           const pageCount = await getNumOfAllPages();
//           setCount(pageCount);
//           console.log('page',pageCount)
//           console.log(pageCount.data)
//           setCnt(pageCount.data.numPages);
//       }
//       fetchData();
//   }, [page]);

//   useEffect(() => {
//       async function addSomeBags() {
//           try {
//               let res = await getAllwines(page,6,"");
//               setProducts(res.data);
//           } catch (err) {
//               console.log(err)
//           }
//       }

//       addSomeBags();

//   }, [page, count]);


//   const handleChange = (event, value) => {

//       setPage(value);
//   };

//   return (
//     <Container>
//      <Stack sx={{direction:'rtl'}} spacing={2} color="secondary">
//                         <Pagination count={cnt} page={page} onChange={handleChange} />
//                     </Stack>
//       <Grid container spacing={2} justifyContent="center">
//          {/* Use Grid container to create a grid layout */}
//         {products.map((item,index) => (
//           <Grid item key={index} xs={12} sm={6} md={4} lg={4} style={{ padding:'0px' }}>
//             <Link to={`:${index}`} state={item}  >
//               <ListItem one={item} />
//             </Link>
//           </Grid>
//         ))}
//       </Grid>
//       <Outlet />
//     </Container>
//   );
// };

// export default List;