import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MoreIcon from "@mui/icons-material/MoreVert";
import Logout from "@mui/icons-material/Logout";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import SideNav from "./SideNav";
import SearchBox from "./SearchBox";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "#c9c9c9",
  "&:hover": {
    color: "white",
  },
  "&:focus": {
    color: "white",
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [sideNav, setSideNav] = useState(false);
  const [cartLength, setCartLength] = useState(0);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (cartItems) {
      setCartLength(cartItems.length);
    }
  }, [cartItems]);

  const logoutHandler = () => {
    handleMenuClose();
    dispatch(logout());
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    anchorEl === event.currentTarget
      ? handleMobileMenuClose()
      : setAnchorEl(event.currentTarget);
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    mobileMoreAnchorEl === event.currentTarget
      ? handleMobileMenuClose()
      : setMobileMoreAnchorEl(event.currentTarget);
    setAnchorEl(null);
  };

  const menuItems = userInfo ? (
    <Box>
      <Link
        underline="none"
        component={RouterLink}
        to="/profile"
        sx={{ color: "inherit" }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
          >
            <AccountCircle />
          </ListItemIcon>
          Profile
        </MenuItem>
      </Link>

      <Link
        underline="none"
        component={RouterLink}
        to="/myorders"
        sx={{ color: "inherit" }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon
            aria-label="orders of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
          >
            <ShoppingBagIcon />
          </ListItemIcon>
          Orders
        </MenuItem>
      </Link>

      <Divider />
      <MenuItem onClick={logoutHandler}>
        <ListItemIcon aria-label="logout">
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Box>
  ) : (
    <Box>
      <Link
        underline="none"
        component={RouterLink}
        to="/login"
        sx={{ color: "inherit" }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon
            aria-label="login link"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
          >
            <AccountCircle />
          </ListItemIcon>
          Login
        </MenuItem>
      </Link>
      <Divider />
      <Link
        underline="none"
        component={RouterLink}
        to="/register"
        sx={{ color: "inherit" }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon
            aria-label="register link"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
          >
            <PersonAddIcon />
          </ListItemIcon>
          Register
        </MenuItem>
      </Link>
    </Box>
  );

  // const menuId = "primary-search-account-menu";
  // const renderMenu = (
  //   <Menu
  //     id={menuId}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //     onClick={handleMenuClose}
  //     keepMounted
  //     anchorEl={anchorEl}
  //     PaperProps={{
  //       elevation: 0,
  //       sx: {
  //         overflow: "visible",
  //         filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  //         mt: { xs: 10.5, sm: 7.5 },
  //         "& .css-i4bv87-MuiSvgIcon-root": {
  //           width: 32,
  //           height: 32,
  //           ml: -0.5,
  //           mr: 1,
  //         },
  //         "&:before": {
  //           content: '""',
  //           display: "block",
  //           position: "absolute",
  //           top: 0,
  //           right: 14,
  //           width: 10,
  //           height: 10,
  //           bgcolor: "background.paper",
  //           transform: "translateY(-50%) rotate(45deg)",
  //           zIndex: 0,
  //         },
  //       },
  //     }}
  //     transformOrigin={{ horizontal: "right", vertical: "top" }}
  //     anchorOrigin={{ horizontal: "right", vertical: "top" }}
  //   >
  //     {menuItems}
  //   </Menu>
  // );

  // const mobileMenuId = "primary-search-account-menu-mobile";
  // const renderMobileMenu = (
  //   <Menu
  //     id={mobileMenuId}
  //     open={isMobileMenuOpen}
  //     onClose={handleMobileMenuClose}
  //     onClick={handleMobileMenuClose}
  //     anchorEl={mobileMoreAnchorEl}
  //     transitionDuration={0}
  //     PaperProps={{
  //       elevation: 0,
  //       sx: {
  //         overflow: "visible",
  //         filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
  //         mt: { xs: 8, sm: 7.5 },
  //         "& .css-i4bv87-MuiSvgIcon-root": {
  //           width: 32,
  //           height: 32,
  //         },
  //         "&:before": {
  //           content: '""',
  //           display: "block",
  //           position: "absolute",
  //           top: 0,
  //           right: 17,
  //           width: 10,
  //           height: 10,
  //           bgcolor: "background.paper",
  //           transform: "translateY(-50%) rotate(45deg)",
  //           zIndex: 0,
  //         },
  //       },
  //     }}
  //     transformOrigin={{ horizontal: "right", vertical: "top" }}
  //     anchorOrigin={{ horizontal: "right", vertical: "top" }}
  //   >
  //     <Link
  //       underline="none"
  //       component={RouterLink}
  //       to="/cart"
  //       sx={{ color: "inherit" }}
  //     >
  //       <MenuItem onClick={handleMobileMenuClose}>
  //         <ListItemIcon aria-label="show 4 cart items">
  //           <Badge
  //             badgeContent={cartLength}
  //             color="error"
  //             position="fixed"
  //             ml="-0.5"
  //             mr="1"
  //           >
  //             <ShoppingCartIcon />
  //           </Badge>
  //         </ListItemIcon>
  //         Cart
  //       </MenuItem>
  //     </Link>
  //     {menuItems}
  //   </Menu>
  // );

  return (
    <>
      <Link
        variant="h6"
        underline="none"
        component={RouterLink}
        to="/"
        sx={{
          backgroundColor: "#171717",
          color: "#c9c9c9",
          "&:hover": {
            color: "white",
          },
          "&:active": {
            color: "white",
          },
          "&:focus": {
            color: "white",
          },
          mx: "auto",
          justifyContent: "center",
          display: { xs: "flex", sm: "none" },
          fontFamily: "Playfair Display",
          position: "relative",
          zIndex: 1400,
        }}
      >
        House Of wear
      </Link>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            backgroundColor: "#171717",
            color: "#f5f5f7",
            position: "relative",
            zIndex: 1400,
          }}
        >
          <Toolbar>
            <StyledIconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open side navbar"
              sx={{ mr: 2 }}
              onClick={() => {
                setSideNav(!sideNav);
              }}
            >
              <MenuIcon />
            </StyledIconButton>
            <Link
              variant="h6"
              underline="none"
              component={RouterLink}
              to="/"
              noWrap
              sx={{
                display: { xs: "none", sm: "block" },
                fontFamily: "Playfair Display",
                color: "#c9c9c9",
                "&:hover": {
                  color: "white",
                },
                "&:active": {
                  color: "white",
                },
                "&:focus": {
                  color: "white",
                },
              }}
              style={{ flex: 1 }}
            >
              House Of Wear
            </Link>

            <Route
              render={({ history }) => (
                <SearchBox history={history} setSideNav={setSideNav} />
              )}
            />

            {/* <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Link
                underline="none"
                component={RouterLink}
                to="/cart"
                sx={{ color: "inherit" }}
              >
                <StyledIconButton
                  size="large"
                  aria-label="show 4 cart items"
                  color="inherit"
                >
                  <Badge badgeContent={cartLength} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </StyledIconButton>
              </Link>
              <StyledIconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                // aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
              >
                <AccountCircle />
              </StyledIconButton>
            </Box> */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <StyledIconButton
                size="large"
                aria-label="show more"
                // aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </StyledIconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {/* {renderMobileMenu}
        {renderMenu} */}
        <SideNav
          sideNav={sideNav}
          setSideNav={setSideNav}
          isAdmin={userInfo ? userInfo.isAdmin : false}
        />
      </Box>
    </>
  );
};

export default Header;
