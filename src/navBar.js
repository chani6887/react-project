import { useEffect } from 'react';
import { AppBar, Toolbar, Button, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { userOut } from './features/user/userSlice'
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
import { styled, useTheme } from '@mui/material/styles';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const NavBar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  let numProductsInBag = useSelector(st => st.order.numProductsInBag);
  let user = useSelector(st => st.user.currentUser);

  useEffect(() => { }, [user]);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid`,
      padding: '0 4px',
    },
  }));

  const disconnection = () => {
    //פה אפשר לשים אלרט חמוד
    dispatch(userOut());
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar sx={{ bgcolor: 'white', padding: '20px', boxShadow: '0px 0px 10px 10px rgba(0,0,0,0.2)', marginTop: '20px' }}>
          <Button component={Link} to="/about" sx={{ color: theme.palette.primary.dark }}>About</Button>
          <Button component={Link} to="/" sx={{ color: theme.palette.primary.dark }}>Home</Button>
          <Button component={Link} to="/shop" sx={{ color: theme.palette.primary.dark }}>Shop</Button>
          <IconButton aria-label="cart" component={Link} to="/bag">
            <StyledBadge badgeContent={numProductsInBag}>
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
          {user ? (<>
            <Button onClick={() => { disconnection() }}>התנתקות</Button>
            {user.role === 'ADMIN' ? (<>
              <IconButton>
                {user.userName}
                <AdminPanelSettingsIcon />
              </IconButton>
              <Button component={Link} to="/addProduct" sx={{ color: theme.palette.primary.dark }} >Add product</Button>
            </>
            ) : (
              <IconButton>
                {user.userName}
                <PersonIcon />
              </IconButton>
            )}</>
          ) : (
            <Button component={Link} to="/signIn" sx={{ color: theme.palette.primary.dark }}>Sign In</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
