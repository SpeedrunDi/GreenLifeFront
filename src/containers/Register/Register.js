import React, {useState} from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import {registrationRequest} from "../../store/actions/usersActions";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import FormElement from "../../components/UI/Form/FormElement/FormElement";

const Register = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  })

  const inputChangeHandler = (e) => {
    const { name, value } = e.target
    setState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(registrationRequest({ ...state }))
  }

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'green' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <FormElement onChange={inputChangeHandler}
                         value={state.name}
                         name="name"
                         label="Имя"
                         required
                         type="text"
            />
            <FormElement onChange={inputChangeHandler}
                         value={state.email}
                         name="email"
                         label="Электронная почта"
                         required
                         type="email"
            />
            <FormElement onChange={inputChangeHandler}
                         value={state.password}
                         name="password"
                         label="Пароль"
                         required
                         type="password"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Зарегистрироваться
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">
                У вас уже есть аккаунт? войти
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default Register