import React from 'react';
import {Link} from "react-router-dom";
import {Button, Typography} from "@mui/material";

const Anonymous = ({link}) => {
  return (
    <>
      <Button className={link} component={Link} to="/register" color="inherit">
        Регистрация
      </Button>
      <Typography variant="span" padding="13px 5px 0px">/</Typography>
      <Button className={link} component={Link} to="/login" color="inherit">
        Вход
      </Button>
    </>
  );
};

export default Anonymous;