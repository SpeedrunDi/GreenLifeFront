import {useState} from "react";
import * as React from 'react';
import {useDispatch} from "react-redux";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import {logoutUser} from "../../../../store/actions/usersActions";

const UserMenu = ({user, link}) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        className={link}
        id="basic-button"
        color="inherit"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{marginTop: "7px"}}
      >
        {user.name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {user?.role === 'admin' ? (
          [
            <MenuItem key="add" onClick={handleClose} component={Link} to="/add_product">Добавить новый
              товар</MenuItem>,
            <MenuItem key="order" onClick={handleClose} component={Link} to="/orders">Все заказы</MenuItem>
          ]
        ) : <MenuItem onClick={handleClose} component={Link} to="/orders">Мои заказы</MenuItem>}
        <MenuItem onClick={() => dispatch(logoutUser())}>Выйти</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
